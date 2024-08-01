import useStudentsData from '@/hooks/useStudentsData'
import { DataTable } from './data-table'
import { URL_TRAYECTORIA_2023, URL_TRAYECTORIA_2024 } from '@/constants'

function StudentsTable () {
  const { data, loading } = useStudentsData(URL_TRAYECTORIA_2023)
  // const data2023 = useStudentsData(URL_TRAYECTORIA_2023).data

  return (
    <div className='flex w-full'>
      {/* <p>{JSON.stringify(data2023)}</p> */}
      {/* <p>{JSON.stringify(data)}</p> */}
      <DataTable data={data} loading={loading} />
    </div>
  )
}

export default StudentsTable
