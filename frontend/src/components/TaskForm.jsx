import { useState } from 'react';

const TaskForm = () => {
  const [task, setTask] = useState({
    nombreProyecto: '',
    tipoActividad: '',
    estado: 'Pendiente',
    resumen: '',
    descripcion: '',
    prioridad: 'Media',
    informador: '',
    personaAsignada: '',
    precondicion: '',
    fechaCreacion: '',
    fechaCierre: '',
    sprint: ''
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      
      if (response.ok) {
        alert("¡Tarea creada exitosamente!");
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input type="text" name="nombreProyecto" placeholder="Nombre del Proyecto" onChange={handleChange} required />
      <input type="text" name="tipoActividad" placeholder="Tipo de Actividad" onChange={handleChange} required />
      
      <select name="estado" onChange={handleChange} value={task.estado}>
        <option value="Pendiente">Pendiente</option>
        <option value="En Progreso">En Progreso</option>
        <option value="Finalizado">Finalizado</option>
      </select>

      <textarea name="resumen" placeholder="Resumen corto" rows="2" onChange={handleChange}></textarea>
      <textarea name="descripcion" placeholder="Descripción detallada" rows="3" onChange={handleChange}></textarea>
      
      <select name="prioridad" onChange={handleChange} value={task.prioridad}>
        <option value="Baja">Prioridad Baja</option>
        <option value="Media">Prioridad Media</option>
        <option value="Alta">Prioridad Alta</option>
      </select>

      <input type="text" name="informador" placeholder="Informador (Ej. QA)" onChange={handleChange} />
      <input type="text" name="personaAsignada" placeholder="Persona asignada (Ej. Desarrollador)" onChange={handleChange} />
      <textarea name="precondicion" placeholder="Precondición" rows="2" onChange={handleChange}></textarea>
      
      <label>Fecha de Creación:</label>
      <input type="date" name="fechaCreacion" onChange={handleChange} required />
      
      <label>Fecha de Cierre (Opcional):</label>
      <input type="date" name="fechaCierre" onChange={handleChange} />
      
      <input type="text" name="sprint" placeholder="Sprint (Ej. Sprint 4)" onChange={handleChange} />

      <button type="submit" className="btn-submit">Guardar Tarea</button>
    </form>
  );
};

export default TaskForm;