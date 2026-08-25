import { useState, useEffect } from 'react'

export function useCities() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api-colombia.com/api/v1/City')
      .then((res) => res.json())
      .then((data) => {
        const options = data.map(({ id, name }) => ({ value: id, label: name }))
        setCities(options)
      })
      .finally(() => setLoading(false))
  }, [])

  return { cities, loading }
}