import './App.css'
import { Button } from './components/ui/button'
import useStudentsData from './hooks/useStudentsData'

function App() {
  const { data, loading, error } = useStudentsData();
  console.log(JSON.stringify(data))

  return (

    <>
    <Button variant={'secondary'}>Hola</Button>
    </>
  )
}

export default App
