import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface SubRowProps {
  triggerContent: number,
  subjects: string[],
  handleClick: () => void
}

function SubRow ({ triggerContent, subjects, handleClick } : SubRowProps) {
  return (
    <>
      {triggerContent > 0
        ? (<Accordion type='single' collapsible onClick={handleClick}>
          <AccordionItem value='item-1' className='border-b-0'>
            <AccordionTrigger className='hover:no-underline justify-start gap-x-4 text-muted-foreground py-0 -ml-4'>{triggerContent}</AccordionTrigger>
            <AccordionContent className='text-muted-foreground '>
              <ul className='pt-1 pl-4'>
                {subjects.map(subject => <li className='pt-1.5' key={subject}>{subject}</li>)}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>)
        : <p className='text-center font-medium text-muted-foreground'>{triggerContent}</p>}
    </>
  )
}

export default SubRow
