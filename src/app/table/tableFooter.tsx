import { Skeleton } from '@/components/ui/skeleton'

interface TableFooterProps {
  totalQuantity: number,
  filteredQuantity: number,
  isloading: boolean
}

function TableFooter ({ isloading, totalQuantity, filteredQuantity }: TableFooterProps) {
  return (
    <div className='bg-accent h-9 flex justify-center items-center text-accent-foreground italic border-t border-input/60 z-30 scroll-m-20 text-sm font-medium rounded-b-lg'>
      {isloading
        ? <Skeleton className='h-2 rounded-full w-36 mx-auto' />
        : (
          <p>
            Mostrando {filteredQuantity} resultados
            {filteredQuantity < totalQuantity && filteredQuantity > 0 && (
              <span className='text-accent-foreground font-normal text-sm'>
                {` (${(filteredQuantity / totalQuantity * 100).toFixed(1)}% del total)`}
              </span>
            )}
          </p>
          )}
    </div>
  )
}

export default TableFooter
