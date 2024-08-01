import { coursesByYear } from '@/constants'
import { DropdownMenuCheckboxItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'
import Item from '../item'
import { CURSO } from '@/types'
import { CursosFilterProps } from './cursosFilter'

function CursosFilterContent ({ table, cursosFilter, facets }: CursosFilterProps) {
  const cursoFilterValues = (cursosFilter?.value as string[]) || []
  return (
    <>
      {
          Object.keys(coursesByYear).map(anio => {
            const anioCantidad = (facets && Array.from(facets)
              .filter(([curso]) => curso.slice(0, 2) === anio.split(' año')[0])
              .reduce((acc, [, newValueCantidad]) => acc + newValueCantidad, 0)) || 0
            return (
              <DropdownMenuSub key={anio}>
                <DropdownMenuSubTrigger className='pl-3'>
                  {anio}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent alignOffset={-5} sideOffset={6}>
                    {coursesByYear[anio].map(curso => {
                      const cantidad = facets?.get(curso) || 0
                      return (
                        <DropdownMenuCheckboxItem
                          key={curso}
                          className='cursor-pointer'
                          checked={cursoFilterValues.includes(curso)}
                          onSelect={(e) => e.preventDefault()}
                          onCheckedChange={(checked) => {
                            const newCursosState = !checked
                              ? cursoFilterValues.filter(prevCurso => prevCurso !== curso)
                              : [...cursoFilterValues, curso]
                            table.getColumn('curso')?.setFilterValue(newCursosState.length ? newCursosState : undefined)
                          }}
                        >
                          <Item value={curso} quantity={cantidad} />
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      className='cursor-pointer font-medium text-foreground'
                      onSelect={(e) => e.preventDefault()}
                      checked={coursesByYear[anio].every(course => cursoFilterValues.includes(course))}
                      onCheckedChange={(checked) => {
                        const newCursosState = !checked
                          ? cursoFilterValues.filter(curso => !coursesByYear[anio].includes(curso as CURSO))
                          : Array.from(new Set([...cursoFilterValues, ...coursesByYear[anio]]))
                        table.getColumn('curso')?.setFilterValue(newCursosState.length ? newCursosState : undefined)
                      }}
                    >
                      <Item value={`Todos los ${anio.split(' año')[0]}`} quantity={anioCantidad} />
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            )
          })
        }
    </>
  )
}

export default CursosFilterContent
