from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI()

# Permite que React (puerto 5173) haga peticiones a esta API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexión a la base de datos en Docker
def get_db_connection():
    return psycopg2.connect(
        host="db",  # Coincide con el nombre del servicio en docker-compose.yml
        database="taskdb",
        user="admin",
        password="adminpassword"
    )

# Estructura de datos esperada desde React
class Task(BaseModel):
    nombreProyecto: str
    tipoActividad: str
    estado: str = "Pendiente"
    resumen: Optional[str] = ""
    descripcion: Optional[str] = ""
    prioridad: str = "Media"
    informador: Optional[str] = ""
    personaAsignada: Optional[str] = ""
    precondicion: Optional[str] = ""
    fechaCreacion: str
    fechaCierre: Optional[str] = None
    sprint: Optional[str] = ""

@app.get("/tasks")
def get_tasks():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM tasks ORDER BY id DESC;")
    tasks = cursor.fetchall()
    cursor.close()
    conn.close()
    return tasks

@app.post("/tasks")
def create_task(task: Task):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
        INSERT INTO tasks (nombre_proyecto, tipo_actividad, estado, resumen, descripcion, prioridad, informador, persona_asignada, precondicion, fecha_creacion, fecha_cierre, sprint)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
    """
    values = (
        task.nombreProyecto, task.tipoActividad, task.estado, task.resumen, 
        task.descripcion, task.prioridad, task.informador, task.personaAsignada, 
        task.precondicion, task.fechaCreacion, task.fechaCierre or None, task.sprint
    )
    cursor.execute(query, values)
    new_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    conn.close()
    return {"id": new_id, "message": "Tarea creada con éxito"}

@app.put("/tasks/{task_id}/finalizar")
def finalize_task(task_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE tasks SET estado = 'Finalizado' WHERE id = %s;", (task_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Tarea finalizada"}

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = %s;", (task_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Tarea eliminada"}