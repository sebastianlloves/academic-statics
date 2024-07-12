import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Student } from '@/types'
import { Column } from '@tanstack/react-table'
import Item from './item'

interface SliderItemProps {
  column?: Column<Student>
}

function SliderItem ({ column } : SliderItemProps) {
  const minMax = column?.getFacetedMinMaxValues() ?? [0, 0]
  const min = (Array.isArray(minMax[0]) ? minMax[0][0] : minMax[0]) ?? 0
  const max = minMax[1] ?? 0
  const range = (column?.getFilterValue() as (number[] & {length: 2})) ?? [min, max]
  const { title } = column?.columnDef.meta ?? {}
  console.log(min, max)
  const uniqueValues = column?.getFacetedUniqueValues()
  let cantidad = 0
  uniqueValues?.forEach((value, key) => {
    if (key >= range[0] && key <= range[1]) cantidad = cantidad + value
  })
  return (
    <>
      <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
        <div className='grid py-2'>
          <Item value={title || ''} quantity={cantidad} />
          <div className='flex justify-between space-x-2'>
            <span className='w-8 font-light text-sm text-center'>{range[0]}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Slider
                    value={range}
                    onValueChange={(value) => {
                      const isMaxRange = value[0] === min && value[1] === max
                      column?.setFilterValue(isMaxRange ? undefined : value)
                    }}
                    min={min}
                    max={max}
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
