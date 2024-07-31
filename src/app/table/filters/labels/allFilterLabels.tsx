import { X } from 'lucide-react'
import LabelBadge from './labelBadge'
import { FilterData, LabelsBoxProps } from './labelsBox'

export interface AllFilterLabelsProps extends Omit<LabelsBoxProps, 'maxLabels'> {
  filterValues: FilterData[],
  handleItemClick: (filter: FilterData) => () => void
}

export function AllFilterLabels ({ filterValues, handleItemClick, handleBoxClick }: AllFilterLabelsProps) {
  return (
    <div className='w-full my-1'>
      {filterValues.length > 1 && (
        <X
          size={15} strokeWidth='1.8px'
          className='text-muted-foreground/80 cursor-pointer ml-auto mb-1'
          onClick={handleBoxClick}
        />)}
      <div className='flex justify-start gap-1.5 flex-wrap overflow-hidden'>
        {(filterValues).sort((filterA, filterB) => filterA.label.localeCompare(filterB.label)).map((filter) => (
          <LabelBadge
            key={(filter.label)}
            handleClick={handleItemClick(filter)}
          >
            <p className='font-normal text-wrap tracking-wide'>
              {filter.label}
              {filter.quantity !== undefined && (
                <span className='text-xs font-mono tracking-tight font-normal text-muted-foreground'>
                  {` (${filter.quantity})`}
                </span>
              )}
            </p>
          </LabelBadge>))}
      </div>
    </div>
  )
}
