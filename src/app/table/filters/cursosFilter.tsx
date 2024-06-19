import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ANIOS, CURSOS } from '@/constants'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

interface CursoFilterProps<TData> {
  table: Table<TData>
}

function CursoFilter<TData> ({ table }: CursoFilterProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>Curso<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {
          Object.keys(CURSOS).map((anio, index) => (
            <DropdownMenuGroup key={anio}>
              {index > 0 && <DropdownMenuSeparator />}
              <DropdownMenuLabel>
                <DropdownMenuCheckboxItem>{`${anio}° año`}</DropdownMenuCheckboxItem>
              </DropdownMenuLabel>
              {CURSOS[Number(anio) as typeof ANIOS[number]].map(objCurso => {
                const { division } = objCurso
                return (
                  <DropdownMenuCheckboxItem key={division}>{`${anio}° ${division}°`}</DropdownMenuCheckboxItem>
                )
              }
              )}

            </DropdownMenuGroup>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CursoFilter
