# TP5 - Trabajo Práctico Task React

> **Institución:** FCyT - UADER (Sede Concepción del Uruguay)  
> **Cátedra:** Programación Avanzada - 2026  
> **Carrera:** Licenciatura en Sistemas de Información / Analista en Sistemas  
> **Alumno:** Agustin Chatelain  

---

## Descripción del Proyecto

Este proyecto es un manejador de tareas de proyectos de software desarrollado como trabajo práctico para la materia **Programación Avanzada**. La aplicación permite listar, crear, editar, finalizar y eliminar tareas (CRUD completo) utilizando una arquitectura de microservicios.

El ecosistema está completamente contenerizado e incluye:
* **Frontend:** React + Vite (Formulario de 12 campos y listado interactivo).
* **Backend:** API REST desarrollada con Python (FastAPI).
* **Base de Datos:** PostgreSQL para la persistencia relacional de los datos.
* **Orquestación:** Docker y Docker Compose para levantar todos los servicios simultáneamente.

---

## Requisitos Previos

Para ejecutar este proyecto de manera local, es estrictamente necesario tener instalado:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (con el motor en ejecución).
* Git (para clonar el repositorio).

---

## Instrucciones de Instalación y Ejecución

### 1. Clonar el repositorio
Abre tu terminal y ejecuta los siguientes comandos para descargar el código y entrar a la carpeta del proyecto (las comillas son importantes por los espacios en el nombre):

```bash
git clone [https://github.com/Chate19/TPS-ProgramacionAvanzada](https://github.com/Chate19/TPS-ProgramacionAvanzada)
cd "TP5-Trabajo Práctico Task React"
```

### 2. Levantar los contenedores
Posicionado en la raíz del proyecto (donde se encuentra el archivo `docker-compose.yml`), ejecuta el siguiente comando:

```bash
docker-compose up --build
```
*Nota: La primera vez que ejecutes este comando, tomará un par de minutos mientras Docker descarga las imágenes de Node, Python y PostgreSQL.*

### 3. Acceder a la aplicación
Una vez que la terminal indique que todos los servicios están en ejecución, puedes acceder mediante tu navegador web a las siguientes rutas:

* **Frontend (Interfaz de Usuario):** [http://localhost:5173](http://localhost:5173)
* **Backend (Documentación de la API):** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Detener la Aplicación

Para apagar los contenedores de forma segura y liberar los puertos, presiona `Ctrl + C` en la terminal donde se están ejecutando. 

Alternativamente, puedes ejecutar el siguiente comando en una nueva terminal posicionada en la raíz del proyecto:

```bash
docker-compose down
```