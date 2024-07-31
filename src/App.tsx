import StudentsTable from './app/table/page'
import { ModeToggle } from './components/mode-toggle'
import { ThemeProvider } from './components/theme-provider'

function App () {
  return (
    <ThemeProvider defaultTheme='system' storageKey='ui-theme'>
      <div className='flex bg-background-grey justify-end p-4 w-full'>
        <ModeToggle />
      </div>
      <StudentsTable />
    </ThemeProvider>
  )
}

export default App
