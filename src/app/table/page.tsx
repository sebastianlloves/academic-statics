import useStudentsData from '@/hooks/useStudentsData'
import { DataTable } from './data-table'

function StudentsTable () {
  const { data, loading } = useStudentsData()
  // console.log(data)

  return (
    <div className='flex w-full'>
      <DataTable data={data} loading={loading} />
    </div>
  )
}

export default StudentsTable
