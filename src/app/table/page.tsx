import useStudentsData from '@/hooks/useStudentsData'
import { columns } from './columns'
import { DataTable } from './data-table'
import { LOADING_DATA } from '@/utils/formatData'

function StudentsTable () {
  const { data, loading } = useStudentsData()

  return (
    <div className='grid gap-y-4 justify-center'>
      <DataTable columns={columns} data={loading ? LOADING_DATA : data} />
    </div>
  )
}

export default StudentsTable
