import useStudentsData from '@/hooks/useStudentsData'
import { DataTable } from './data-table'

function StudentsTable () {
  const { data, loading } = useStudentsData()

  return (
    <div className='grid gap-y-4 justify-center'>
      <DataTable data={data} loading={loading} />
    </div>
  )
}

export default StudentsTable
