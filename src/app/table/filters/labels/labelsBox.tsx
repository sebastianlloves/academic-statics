import { AccordionResume } from './accordionResume'
import { AllFilterLabels } from './allFilterLabels'

export interface FilterData {
  id: string,
  label: string,
  value: unknown,
  quantity?: number
}

export interface LabelsBoxProps {
  filterValues: FilterData[],
  handleItemClick: (filter: FilterData) => () => void,
  handleBoxClick: () => void,
  maxLabels: number
}

function LabelsBox ({ filterValues, handleBoxClick, handleItemClick, maxLabels }: LabelsBoxProps) {
  return (
    <div className='w-full px-2 py-2 bg-muted/25 shadow-inner'>
      {filterValues.length <= maxLabels
        ? (
          <AllFilterLabels filterValues={filterValues} handleItemClick={handleItemClick} handleBoxClick={handleBoxClick} />
          )
        : (
          <AccordionResume filtersQuantity={filterValues.length} handleBoxClick={handleBoxClick}>
            <AllFilterLabels filterValues={filterValues} handleItemClick={handleItemClick} handleBoxClick={handleBoxClick} />
          </AccordionResume>
          )}
    </div>
  )
}

export default LabelsBox
