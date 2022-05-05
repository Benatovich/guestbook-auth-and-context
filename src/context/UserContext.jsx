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
        {children}
    </UserContext.Provider>
    )
}

const useUser = () => {
    const context = useContext(UserContext)

    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }

    return context
}

export { UserProvider, useUser }