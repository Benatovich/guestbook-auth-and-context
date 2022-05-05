import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import { UserProvider } from './context/UserContext'
import Authentication from './views/Authentication'
import PrivateRoute from './components/PrivateRoute'
import List from './views/List'

export default function App() {
  return (
    <UserProvider>
      <Header />
      <Switch>
        <Route path='/login'>
          <Authentication />
        </Route>
        <PrivateRoute path='/'>
          <List />
        </PrivateRoute>
      </Switch>
    </UserProvider>
  )
}
