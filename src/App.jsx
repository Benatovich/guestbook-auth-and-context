import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import { UserProvider } from './context/UserContext'
import Login from './views/Login'
import PrivateRoute from './components/PrivateRoute'
import EntryList from './views/EntryList'

export default function App() {
  return (
    <UserProvider>
      <Header />
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <PrivateRoute path='/'>
          <EntryList />
        </PrivateRoute>
      </Switch>
    </UserProvider>
  )
}
