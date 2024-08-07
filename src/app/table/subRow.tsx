import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import { Check } from 'lucide-react'

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
                <Badge variant='outline' className='text-xs px-3 rounded-md font-normal text-success border-0 bg-success/[0.05] flex gap-x-2'><Check size={16} strokeWidth='1.0px' />No adeuda</Badge>
                )
              : (
                <Badge
                  variant='secondary'
                  className='text-sm font-medium bg-secondary/80'
                >
                  {triggerContent}
                </Badge>
                )}
          </div>
        </CollapsibleTrigger>
        {triggerContent > 0 && (
          <CollapsibleContent className='mt-2 mb-2 ml-2 -z-50'>
            <div className='flex flex-col items-start space-y-2'>
              {subjects.map(subject => (
                <Badge variant='secondary' className='text-pretty text-xs px-2 rounded-md font-normal bg-secondary/80' key={subject}>{subject}</Badge>
              ))}
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    </>
  )
}

export default SubRow
