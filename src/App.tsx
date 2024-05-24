import "./App.css";
import StudentsTable from "./app/students/page";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <ModeToggle />
      <StudentsTable/>
    </ThemeProvider>
  );
}

export default App;
