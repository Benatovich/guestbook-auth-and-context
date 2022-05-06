import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { getEntries } from '../services/entries'
import Entry from '../components/Guestbook/Entry'
import EntryForm from '../components/Guestbook/EntryForm'

export default function EntryList() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  const fetchEntries = () => {
      getEntries()
        .then(setEntries)
        .catch(console.error)
        .finally(() => setLoading(false))
  }

  useEffect(() => {
      fetchEntries()
  }, [])
  
    return (
      <>
        <EntryForm onAddEntry={} />
      </>
  )
}
