import { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const finalizarTarea = async (id) => {
    await fetch(`http://localhost:8000/tasks/${id}/finalizar`, { method: 'PUT' });
    fetchTasks();
  };

  const eliminarTarea = async (id) => {
    await fetch(`http://localhost:8000/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  return (
    <>
      <h2>Listado de Tareas</h2>
      
      {tasks.length === 0 ? <p className="empty-state">No hay tareas registradas aún.</p> : null}

      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h3>{task.nombre_proyecto}</h3>
          
          <div className="task-details">
            <p><strong>Actividad:</strong> {task.tipo_actividad}</p>
            <p><strong>Estado:</strong> 
              <span className={`badge ${task.estado === 'Finalizado' ? 'badge-success' : task.estado === 'En Progreso' ? 'badge-warning' : 'badge-danger'}`}>
                {task.estado}
              </span>
            </p>
            <p><strong>Prioridad:</strong> {task.prioridad}</p>
            {task.sprint && <p><strong>Sprint:</strong> {task.sprint}</p>}
          </div>
          
          <div className="task-actions">
            {task.estado !== 'Finalizado' && (
              <button onClick={() => finalizarTarea(task.id)} className="btn btn-finish">
                ✓ Finalizar
              </button>
            )}
            <button className="btn btn-edit">
              ✎ Editar
            </button>
            <button onClick={() => eliminarTarea(task.id)} className="btn btn-delete">
              🗑 Eliminar
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskList;