import useStudentsData from '@/hooks/useStudentsData'
import { columns } from './columns'
import { DataTable } from './data-table'
import { LOADING_DATA } from '@/constants'

function StudentsTable () {
  const { data, loading } = useStudentsData()

  return (
    <div className='grid gap-y-4 justify-center'>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default StudentsTable
