import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Pagination from './components/Pagination'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pagination></Pagination>
    </>
  )
}

export default App
