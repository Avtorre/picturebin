import React, { useContext, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from '../utils/consts'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { $host } from '../http/http'

const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  const click = async () => {
    const load = async () => {
      const {data} = await $host.get('api/user/load/e/'+email)
      let userName = data.user.userName
      let userUserID = data.user.userID
      setUserName(userName)
      localStorage.setItem('userName', userName)
      localStorage.setItem('userUserID', userUserID)
    }
    try {
      let data;
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(userName, email, password);
      }
    user.setUser(user)
    load()
    user.setIsAuth(true)
    
    navigate(MAIN_ROUTE)
    } catch (e) {
      alert(e)
    }
  }

  return (
    <Container 
    className='d-flex justify-content-center align-items-center'
    style={{height: window.innerHeight-54}}
    >
      <Card style={{width: 600}} className='p-5'>
        <h2 className='m-auto'>{isLogin ? 'Authorization' : 'Registration'}</h2>
        <Form className='d-flex flex-column'>
        {!isLogin ?  
          <Form.Control
            className='mt-3'
            placeholder='Enter your Username'
            value={userName}
            onChange={ e => setUserName(e.target.value)}
          />
          :
          <div></div>}
          <Form.Control
            className='mt-3'
            placeholder='Enter your e-mail'
            value={email}
            onChange={ e => setEmail(e.target.value)}
          />
          <Form.Control
            className='mt-3'
            placeholder='Enter your password'
            value={password}
            onChange={ e => setPassword(e.target.value)}
            type='password'
          />
          <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
            {isLogin ?
              <div>
                Don't have an account yet? <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
              </div>
              :
              <div>
                Already have an account? <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
              </div>
            }
              <Button variant='outline-success' onClick={click}>
                {isLogin ? 'Log in' : 'Register'}
              </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  )
});

export default Auth