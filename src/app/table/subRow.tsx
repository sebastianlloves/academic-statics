import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface SubRowProps {
  triggerContent: number,
  subjects: string[],
  open: {
    tableExpanded: boolean,
    rowExpanded: boolean
  }
}

function SubRow ({ triggerContent, subjects, open } : SubRowProps) {
  return (
    <>
      <Collapsible open={open.rowExpanded || open.tableExpanded}>
        <CollapsibleTrigger asChild>
          <div className='flex items-center h-10 gap-x-2'>
            <h4 className='text-sm text-muted-foreground font-semibold pl-1'>
              {triggerContent}
            </h4>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className='text-accent-foreground'>
          <ul className='pt-0 space-y-1'>
            {subjects.map(subject => <li className='text-xs' key={subject}><Badge variant='secondary' className='text-muted-foreground'>{subject}</Badge></li>)}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}

export default SubRow
