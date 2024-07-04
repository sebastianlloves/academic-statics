import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface SliderItemProps {
  rangeValues: [number, number],
  maxCant: number,
  handleValueChange: (value: [number, number]) => void,
  materiaType: 'troncales' | 'generales' | 'en proceso 2020'
}

function SliderItem ({ rangeValues, maxCant, handleValueChange, materiaType } : SliderItemProps) {
  return (
    <>
      <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
        <div className='grid py-2'>
          <h5 className='capitalize text-center text-accent-foreground font-normal tracking-tight py-0'>
            {materiaType}
          </h5>
          <div className='flex justify-between space-x-2'>
            <span className='w-8 font-light text-sm text-center'>{rangeValues[0]}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Slider
                    defaultValue={rangeValues}
                    onValueChange={handleValueChange}
                    max={maxCant}
                    step={1}
                    className='w-52'
                    color='bg-primary'
                  />
                </TooltipTrigger>
                <TooltipContent side='bottom' className='bg-background border rounded-md w-fit p-3'>
                  <p className='text-sm text-center text-muted-foreground'>{rangeValues[0] === rangeValues[1]
                    ? `Estudiantes que tengan ${rangeValues[1]} materias ${materiaType}`
                    : `Estudiantes que tengan entre ${rangeValues[0]} y ${rangeValues[1]} materias ${materiaType}`}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className='w-8 font-light text-sm text-center'>{rangeValues[1]}</span>
          </div>
        </div>
      </DropdownMenuItem>
    </>
  )
}

export default SliderItem
