import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'

export function ModeToggle () {
  const { theme, setTheme } = useTheme()
  const handleClick = () =>
    theme === 'dark' ? setTheme('light') : setTheme('dark')

  return (
    <Button variant='outline' size='icon' onClick={handleClick}>
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration-100' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
