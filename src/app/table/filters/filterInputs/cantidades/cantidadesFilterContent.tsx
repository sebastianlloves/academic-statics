import { useMemo } from 'react'
import SliderItem from './sliderItem'
import { CantidadesFilterProps } from './cantidadesFilter'

interface CantidadesFilterContentProps extends CantidadesFilterProps {
}

function CantidadesFilterContent ({ table } : CantidadesFilterContentProps) {
  const data = table.getCoreRowModel().rows
  const [maxCantTroncales, maxCantGenerales, maxCantEnProceso2020] = useMemo(() => {
    const [maxCantTroncales, maxCantGenerales, maxCantEnProceso2020] = data.length > 0
      ? data.reduce((prevValue, newValue) => {
        const [accCantTroncales, accCantGenerales, accCantEnProceso2020] = prevValue
        const newCantTroncales = newValue?.original?.cantTroncales ?? 0
        const newCantGenerales = newValue?.original?.cantGenerales ?? 0
        const newCantEnProceso2020 = newValue?.original?.materiasEnProceso2020?.cantidad ?? 0
        return [
          newCantTroncales > accCantTroncales ? newCantTroncales : accCantTroncales,
          newCantGenerales > accCantGenerales ? newCantGenerales : accCantGenerales,
          newCantEnProceso2020 > accCantEnProceso2020 ? newCantEnProceso2020 : accCantEnProceso2020
        ]
      }, [0, 0, 0])
      : [0, 0, 0]
    return [maxCantTroncales, maxCantGenerales, maxCantEnProceso2020]
  }, [data])

  return (
    <>
      {table.getColumn('troncales')?.getIsVisible() && (
        <SliderItem
          maxCant={maxCantTroncales}
          column={table.getColumn('troncales')}
        />
      )}
      {table.getColumn('generales')?.getIsVisible() && (
        <SliderItem
          maxCant={maxCantGenerales}
          column={table.getColumn('generales')}
        />
      )}
      {table.getColumn('enProceso2020')?.getIsVisible() && (
        <SliderItem
          maxCant={maxCantEnProceso2020}
          column={table.getColumn('enProceso2020')}
        />
      )}
    </>
  )
}

export default CantidadesFilterContent
