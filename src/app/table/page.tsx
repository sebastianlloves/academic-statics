import useStudentsData from '@/hooks/useStudentsData'
import { DataTable } from './data-table'

function StudentsTable () {
  const { data, loading } = useStudentsData()

  return (
    <div className='flex w-full'>
      <DataTable data={data} loading={loading} />
    </div>
  )
}

export default StudentsTable
