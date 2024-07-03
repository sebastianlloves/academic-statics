import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface SubRowProps {
  triggerContent: number,
  subjects: string[],
  open: boolean
}

function SubRow ({ triggerContent, subjects, open } : SubRowProps) {
  return (
    <>
      <Collapsible open={open}>
        <CollapsibleTrigger asChild>
          <div className='flex items-center h-10 gap-x-2'>
            <h4 className='text-base text-foreground font-normal pl-1'>
              {triggerContent}
            </h4>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className='text-accent-foreground'>
          <div className='flex flex-col items-start space-y-1.5 py-1'>
            {subjects.map(subject => (
              subject === 'No adeuda'
                ? <Badge variant='success' className='text-xs rounded-full' key={subject}>{subject}</Badge>
                : <Badge variant='secondary' className='text-xs' key={subject}>{subject}</Badge>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}

export default SubRow
