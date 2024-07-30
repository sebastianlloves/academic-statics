import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'
import LabelBadge from './labelBadge'
import { LabelsBoxProps } from './labelsBox'

export interface AccordionResumeProps extends Pick<LabelsBoxProps, 'handleBoxClick'>{
  filtersQuantity: number,
  children?: React.ReactNode
}

export function AccordionResume ({ filtersQuantity, handleBoxClick, children }: AccordionResumeProps) {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='filter' className='border-b-0 my-1'>
        <div className='flex items-center w-full'>
          <AccordionTrigger className='hover:no-underline py-0 w-full'>
            <LabelBadge
              handleClick={handleBoxClick}
            >
              <p>
                <span className='font-medium'>{filtersQuantity}</span> seleccionados
              </p>
            </LabelBadge>
          </AccordionTrigger>
        </div>
        <AccordionContent className='ml-2 mt-1 pb-0'>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
