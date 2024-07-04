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
      <Collapsible open={open} className=''>
        <CollapsibleTrigger asChild className=''>
          <div className='flex items-center h-10'>
            {triggerContent === 0
              ? (
                <Badge
                  variant='success'
                  className='text-sm font-medium'
                >
                  {triggerContent}
                </Badge>
                )
              : (
                <Badge
                  variant='secondary'
                  className='text-sm font-medium bg-secondary/70 border-secondary-foreground/5'
                >
                  {triggerContent}
                </Badge>
                )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className='mt-3 mb-2'>
          <div className='flex flex-col items-start space-y-1.5'>
            {subjects.map(subject => (
              subject === 'No adeuda'
                ? <Badge variant='success' className='text-xs px-4 rounded-xl tracking-tight border-success/10' key={subject}>{subject}</Badge>
                : <Badge variant='secondary' className='text-xs px-4 rounded-xl tracking-tight bg-secondary/70 border-secondary-foreground/5' key={subject}>{subject}</Badge>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}

export default SubRow
