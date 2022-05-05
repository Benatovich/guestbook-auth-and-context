import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { signOutUser } from '../services/user'
import guestbook from '../assets/guestbook.png'

export default function Header() {
    const { user, setUser } = useUser();
    
    const handleSignOut = async () => {
        setUser('')
        await signOutUser()
    }

  return (
    <div className='header'>
        {/* <Link to='/'>
            !!KEEP WORKING HERE!!
        </Link> */}
    </div>
  )
}
