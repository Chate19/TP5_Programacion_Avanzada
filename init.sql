CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    nombre_proyecto VARCHAR(100),
    tipo_actividad VARCHAR(50),
    estado VARCHAR(20) DEFAULT 'Pendiente',
    resumen TEXT,
    descripcion TEXT,
    prioridad VARCHAR(20),
    informador VARCHAR(100),
    persona_asignada VARCHAR(100),
    precondicion TEXT,
    fecha_creacion DATE,
    fecha_cierre DATE,
    sprint VARCHAR(50)
);