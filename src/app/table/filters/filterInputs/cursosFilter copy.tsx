import { CURSOS } from '@/constants'
import { CURSO, Student } from '@/types'
import { Table } from '@tanstack/react-table'
import { useMemo } from 'react'
import Item from './item'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'

interface CursoFilter2Props {
  table: Table<Student>
}

function CursoFilter2 ({ table }: CursoFilter2Props) {
  const coursesByYear = useMemo(() =>
    Object.fromEntries(Object.keys(CURSOS)
      .map(anio => [`${anio}° año`, CURSOS[Number(anio) as keyof(typeof CURSOS)]
        .map(({ nombre }) => nombre)]))
  , [])
  const cursosFilter = (table.getColumn('curso')?.getFilterValue() || []) as CURSO[]

  const facets = table.getColumn('curso')?.getFacetedUniqueValues()

  return (
    <Accordion type='multiple' className='border w-full'>
      {
          Object.keys(coursesByYear).map(anio => (
            <AccordionItem value={anio} key={anio}>
              <div className='flex items-center space-x-2'>
                <Checkbox id={anio} className='rounded-md' />
                <label
                  htmlFor={anio}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
                >
                  {anio}
                </label>
                <AccordionTrigger className='pl-3' />
              </div>
              <AccordionContent className='grid space-y-2 pl-3'>
                {coursesByYear[anio].map(curso => {
                  const cantidad = facets?.get(curso) || 0
                  return (
                    <div key={curso} className='flex items-center border'>
                      <Checkbox id={curso} className='rounded-md' />
                      <label
                        htmlFor={curso}
                        className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer mx-2'
                      >
                        {curso}
                      </label>
                      <p className='font-mono text-muted-foreground align-middle w-5 text-right ml-auto'>{cantidad}</p>
                    </div>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          ))
        }
    </Accordion>
  )
}

export default CursoFilter2
