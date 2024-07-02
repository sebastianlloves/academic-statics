import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronsUpDown } from 'lucide-react'

interface SubRowProps {
  triggerContent: number,
  subjects: string[],
  open: {
    tableExpanded: boolean,
    rowExpanded: boolean
  },
  handleClick: () => void
}

function SubRow ({ triggerContent, subjects, handleClick, open } : SubRowProps) {
  return (
    <>
      <Collapsible open={open.rowExpanded || open.tableExpanded}>
        <CollapsibleTrigger asChild className='cursor-pointer' onClick={handleClick}>
          <div className='flex items-center h-10 gap-x-2 -ml-4'>
            <Button variant='ghost' size='sm' className='w-7 p-0'>
              <ChevronsUpDown className='h-3.5 w-3.5 text-muted-foreground' />
              <span className='sr-only'>Toggle</span>
            </Button>
            <h4 className='text-sm text-muted-foreground font-semibold'>
              {triggerContent}
            </h4>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className='text-accent-foreground'>
          <ul className='pl-4 pt-0 -mt-1 space-y-1'>
            {subjects.map(subject => <li className='text-xs' key={subject}>{subject}</li>)}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}

export default SubRow
