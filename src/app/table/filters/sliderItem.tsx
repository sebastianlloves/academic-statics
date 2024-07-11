import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Student } from '@/types'
import { Column } from '@tanstack/react-table'

interface SliderItemProps {
  minMaxCant: number[],
  column?: Column<Student>
}

function SliderItem ({ minMaxCant, column } : SliderItemProps) {
  const range = (column?.getFilterValue() as (number[] & {length: 2})) ?? minMaxCant
  const { title } = column?.columnDef.meta ?? {}
  console.log(range)

  return (
    <>
      <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
        <div className='grid py-2'>
          <h5 className='capitalize text-center text-accent-foreground font-normal tracking-tight py-0'>
            {title || column?.id}
          </h5>
          <div className='flex justify-between space-x-2'>
            <span className='w-8 font-light text-sm text-center'>{range[0]}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Slider
                    value={range}
                    onValueChange={(value) => {
                      const isMaxRange = value[0] === minMaxCant[0] && value[1] === minMaxCant[1]
                      column?.setFilterValue(isMaxRange ? undefined : value)
                    }}
                    min={minMaxCant[0]}
                    max={minMaxCant[1]}
                    step={1}
                    className='w-52'
                    color='bg-primary'
                  />
                </TooltipTrigger>
                <TooltipContent side='bottom' className='bg-background border rounded-md w-fit p-3'>
                  <p className='text-sm text-center text-muted-foreground'>{range[0] === range[1]
                    ? `Estudiantes que tengan ${range[1]} materias ${title}`
                    : `Estudiantes que tengan entre ${range[0]} y ${range[1]} materias ${title}`}
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
