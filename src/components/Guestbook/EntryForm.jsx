import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { createEntry } from '../../services/entries'

export default function EntryForm({ onAddEntry }) {
    const [content, setContent] = useState('')
    const { user } = useUser()

    const handleAddEntry = async (e) => {
        e.preventDefault()

        const entry = await createEntry({ userId: user.id, content })

        onAddEntry(entry)
        setContent('')
    }

  return (
    <div className='entry-form'>
        <form onSubmit={handleAddEntry}>
            <textarea
                id='content'
                name='content'
                aria-label='create new entry in guestbook'
                required
                value={content}
                onChange={({ target }) => setContent(target.value)}
            />
            <button
                aria-label='submit entry button'
                type='submit'
            >
                Add Entry
            </button>
        </form>
    </div>
  )
}

