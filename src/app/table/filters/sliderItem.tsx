import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Student } from '@/types'
import { Column } from '@tanstack/react-table'
import { useState } from 'react'

interface SliderItemProps {
  maxCant: number,
  materiaType: 'troncales' | 'generales' | 'en proceso (2020)',
  column?: Column<Student>
}

function SliderItem ({ maxCant, materiaType, column } : SliderItemProps) {
  const [range, setRange] = useState([0, maxCant])

  return (
    <>
      <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
        <div className='grid py-2'>
          <h5 className='capitalize text-center text-accent-foreground font-normal tracking-tight py-0'>
            {materiaType}
          </h5>
          <div className='flex justify-between space-x-2'>
            <span className='w-8 font-light text-sm text-center'>{range[0]}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Slider
                    value={range}
                    onValueChange={(value) => {
                      setRange(value)
                      column?.setFilterValue(value)
                    }}
                    max={maxCant}
                    step={1}
                    className='w-52'
                    color='bg-primary'
                  />
                </TooltipTrigger>
                <TooltipContent side='bottom' className='bg-background border rounded-md w-fit p-3'>
                  <p className='text-sm text-center text-muted-foreground'>{range[0] === range[1]
                    ? `Estudiantes que tengan ${range[1]} materias ${materiaType}`
                    : `Estudiantes que tengan entre ${range[0]} y ${range[1]} materias ${materiaType}`}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className='w-8 font-light text-sm text-center'>{range[1]}</span>
          </div>
        </div>
      </DropdownMenuItem>
    </>
  )
}

export default SliderItem
