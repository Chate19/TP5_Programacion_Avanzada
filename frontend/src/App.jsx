import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  return (
    <div className="container">
      <div className="section">
        <h1>Gestor de Tareas</h1>
        <TaskForm />
      </div>

      <div className="section task-list-container">
        <TaskList />
      </div>
    </div>
  )
}

export default App