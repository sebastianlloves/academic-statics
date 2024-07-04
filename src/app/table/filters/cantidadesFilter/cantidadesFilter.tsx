// import { Button } from '@/components/ui/button'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
// import { CaretSortIcon } from '@radix-ui/react-icons'
// import SliderItem from '../sliderItem'

// function CantidadesFilter () {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild className='w-fit'>
//         <Button variant='outline' className='font-normal'>
//           Cantidades<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align='start' className='p-3'>
//         <DropdownMenuGroup>
//           <SliderItem
//             rangeValues={materiasFilterValue.troncalesRange}
//             maxCant={maxCantTroncales}
//             handleValueChange={(value: [number, number]) => {
//               const newState = { ...materiasFilterValue, troncalesRange: value }
//               setMateriasFilterValue(newState)
//               table.getColumn('troncales')?.setFilterValue(newState)
//               table.getColumn('generales')?.setFilterValue(newState)
//             }}
//             materiaType='troncales'
//           />
//           <SliderItem
//             rangeValues={materiasFilterValue.generalesRange}
//             maxCant={maxCantGenerales}
//             handleValueChange={(value: [number, number]) => {
//               const newState = { ...materiasFilterValue, generalesRange: value }
//               setMateriasFilterValue(newState)
//               table.getColumn('troncales')?.setFilterValue(newState)
//               table.getColumn('generales')?.setFilterValue(newState)
//             }}
//             materiaType='generales'
//           />
//           <SliderItem
//             rangeValues={materiasFilterValue.enProceso2020Range}
//             maxCant={maxCantEnProceso2020}
//             handleValueChange={(value: [number, number]) => {
//               const newState = { ...materiasFilterValue, enProceso2020Range: value }
//               setMateriasFilterValue(newState)
//               table.getColumn('enProceso2020')?.setFilterValue(newState)
//             }}
//             materiaType='en proceso 2020'
//           />
//         </DropdownMenuGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

// export default CantidadesFilter
