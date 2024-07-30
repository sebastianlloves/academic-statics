import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { Student } from '@/types'
import { Column } from '@tanstack/react-table'

interface SliderItemProps {
  maxCant: number,
  column?: Column<Student>
}

function SliderItem ({ column, maxCant } : SliderItemProps) {
  const range = (column?.getFilterValue() as (number[] & {length: 2})) ?? [0, maxCant]
  const { title } = column?.columnDef.meta ?? {}

  return (
    <>
      <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
        <div className='grid py-2'>
          <h4 className='text-sm capitalize text-center text-accent-foreground font-normal tracking-tight py-0'>{title}</h4>
          <div className='flex justify-between space-x-2'>
            <span className='w-8 font-light text-sm text-center'>{range[0]}</span>
            <Slider
              value={range}
              onValueChange={(value) => {
                const isMaxRange = value[0] === 0 && value[1] === maxCant
                column?.setFilterValue(isMaxRange ? undefined : value)
              }}
              max={maxCant}
              step={1}
              className='w-40'
              color='bg-primary'
            />

            <span className='w-8 font-light text-sm text-center'>{range[1]}</span>
          </div>
        </div>
      </DropdownMenuItem>
    </>
  )
}

export default SliderItem
