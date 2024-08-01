import { useEffect, useState } from 'react'
import { formatData } from '../utils/formatData'
import { Student } from '@/types'

function useStudentsData (url : string) {
  const [data, setData] = useState<Student[] | false>(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
    setLoading(true)
    // console.time('fetch + res.text()')
    // console.log('Empezó fetch')
    fetch(url)
      .then((res) => {
        // console.timeEnd('fetch')
        // console.time('res.text()')
        return res.text()
      })
      .then((text) => setData(() => {
        // console.timeEnd('fetch + res.text()')
        // console.time('formatData')
        const newState = formatData(text)
        // console.timeEnd('formatData')
        return newState
      }))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}

export default useStudentsData
