import './App.css'
import StudentsTable from './app/table/page'
import { ModeToggle } from './components/mode-toggle'
import { ThemeProvider } from './components/theme-provider'

function App () {
  return (
    <ThemeProvider defaultTheme='system' storageKey='ui-theme'>
      <ModeToggle />
      <StudentsTable />
    </ThemeProvider>
  )
}

export default App
