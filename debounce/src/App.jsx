import { useState } from 'react'

import './App.css'
import DebounceSortComponent from './Component/DebounceSortComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <DebounceSortComponent/>
    </>
  )
}

export default App
