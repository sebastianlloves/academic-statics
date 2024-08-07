import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu'
import { CURSOS } from '@/constants'
import Item from '../filterInputs/item'
import { RepitenciaFilterProps } from './repitenciaFilter'

interface RepitenciaFilterContentProps extends RepitenciaFilterProps {
  facets?: Map<number, number>
}

function RepitenciaFilterContent ({ table, facets } : RepitenciaFilterContentProps) {
  console.log(facets)
  console.log(facets?.get(1))
  return (
    <>
      {Object.keys(CURSOS).slice(0, -1).map(anio => {
        const quantity = facets?.get(Number(anio)) || 0
        return (
          <DropdownMenuCheckboxItem
            key={anio}
            onSelect={e => e.preventDefault()}
            className='cursor-pointer'
          >
            <Item value={`${anio}° año`} quantity={quantity} />
          </DropdownMenuCheckboxItem>
        )
      })}
    </>
  )
}

export default RepitenciaFilterContent
