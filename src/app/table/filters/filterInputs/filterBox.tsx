import { ReactNode } from 'react'

interface FilterBoxProps {
  children: ReactNode | ReactNode[]
}

function FilterBox ({ children } : FilterBoxProps) {
  return (
    <div className='border rounded-md w-full'>
      {children}
    </div>
  )
}

export default FilterBox
