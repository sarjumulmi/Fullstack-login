import { useEffect, useState } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [ resources, setResources ] = useState([])

  useEffect(() => {
    const fetchResources = async () => {
      const resp = await axios.get(baseUrl)
      setResources(resp.data)
    }
    fetchResources()
  }, [baseUrl])

  const create = async (resource) => {
    const resp = await axios.post(baseUrl, resource)
    setResources([...resources, resp.data])
  }

  const service = {
    create
  }

  return [ resources, service ]
}

export default useResource