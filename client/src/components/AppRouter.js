import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../routes'
import Main from '../pages/Main'
import { Context } from '..'

const AppRouter = () => {
  const {user} = useContext(Context)
  return (
    <Routes>
        {routes.map(({path, Component}) => 
            <Route key={path} path={path} Component={Component}/>
        )}
        <Route key={'default'} path='*' Component={Main}/>
    </Routes>
  )
}

export default AppRouter
