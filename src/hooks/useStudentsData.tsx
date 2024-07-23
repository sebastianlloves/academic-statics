import { useEffect, useState } from 'react'
import { formatData } from '../utils/formatData'
import { Student } from '@/types'

function useStudentsData () {
  const [data, setData] = useState<Student[] | false>(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
    setLoading(true)
    // console.time('fetch + res.text()')
    // console.log('Empezó fetch')
    fetch(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFM0_HRdLzWPQjgMU7_6dUfm6LWNYyQAckFT-EKb6aCAgwvUzZZsCTr8KS_Legk1_2Fe1U00tF-gWA/pub?gid=0&single=true&output=tsv'
    )
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
  }, [])

  return { data, loading, error }
}

export default useStudentsData
