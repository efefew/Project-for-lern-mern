import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';
function App() {
  const{token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if(!ready){
    return <Loader/>
  }
  //AuthContext.Provider чтобы было доступно внутри (не древовидно)
  return (
    <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
    <Router>
    <div className="container">
      {isAuthenticated && <Navbar/>}
      <h1>
        {routes}
      </h1>
    </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App
