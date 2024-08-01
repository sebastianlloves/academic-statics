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
      <Collapsible open={open} className='-z-10'>
        <CollapsibleTrigger asChild className=''>
          <div className='flex items-center h-10'>
            {triggerContent === 0
              ? (
                <Badge
                  variant='outline'
                  className='text-sm text-success bg-success/5 font-medium border-0'
                >
                  {triggerContent}
                </Badge>
                )
              : (
                <Badge
                  variant='outline'
                  className='text-sm font-medium'
                >
                  {triggerContent}
                </Badge>
                )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className='mt-2 mb-2 ml-4 -z-50'>
          <div className='flex flex-col items-start space-y-1.5'>
            {subjects.map(subject => (
              subject === 'No adeuda'
                ? <Badge variant='outline' className='text-xs px-3 rounded-md font-normal text-success border-0 bg-success/5' key={subject}>{subject}</Badge>
                : <Badge variant='outline' className='text-xs px-3 rounded-md font-normal' key={subject}>{subject}</Badge>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}

export default SubRow
