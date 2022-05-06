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
      <div>
        <div>
          <div>
            <Link to='/'>
              <span>Guestbook</span>
              <img src={guestbook} alt='guestbook' />
            </Link>
          </div>
          <div>
            {user?.email ? (
              <>
                <p>Signed in as {user.email}</p>
                <button onClick={handleSignOut}>
                  Sign out
                </button>
              </>
            ) : (
              // WORK HERE
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
