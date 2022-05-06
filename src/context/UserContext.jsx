// share the user's email using context
import { 
    createContext, useContext,
    useEffect, useMemo, useState
} from 'react';
import { getUser } from '../services/user'

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ id: null, email: null })

    const value = useMemo(() => ({ user, setUser }), [user.id, user.email])

    useEffect(() => {
        const currentUser = getUser();
        if (currentUser) setUser(currentUser)
    }, [])

    return (
    <UserContext.Provider value={value}>
        {/* use children prop to render child components from within a Provider */}
        {children}
    </UserContext.Provider>
    )
}

// use a custom hook to expose context state for reading/writing
const useUser = () => {
    const context = useContext(UserContext)

    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }

    return context
}

export { UserProvider, useUser }