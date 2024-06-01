import React, { useContext } from 'react'
import { Context } from '../index'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, useNavigate } from 'react-router-dom'
import {ADMIN_ROUTE, COLLECTION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE} from '../utils/consts'
import {Button, Container, NavDropdown} from "react-bootstrap"
import {observer} from 'mobx-react-lite'

const NavBar = observer( () => {
    const {user} = useContext(Context)
    const history = useNavigate()
  
    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
    }
  
    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav.Link style={{color: 'white'}} href={MAIN_ROUTE}>PictureBin</Nav.Link>
            <Nav className="mr-auto" style={{fontSize: 25}}>
                <Nav.Link active={window.location.pathname === MAIN_ROUTE} href={MAIN_ROUTE}>Pictures</Nav.Link>
                <Nav.Link active={window.location.pathname === COLLECTION_ROUTE} href={COLLECTION_ROUTE}>Collections</Nav.Link>
            </Nav>
          {user.isAuth
              ?    
              <Nav className='ml-auto' style={{color: 'white'}}>
                  
                  <Button 
                    variant={"outline-light"} 
                    className="ml-2" 
                    onClick={() => logOut()}
                  >
                    Log out
                  </Button>
              </Nav>
              :
              <Nav className='ml-auto' style={{color: 'white'}}>
                  <Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Authorization</Button>
              </Nav>
          }
        </Container>
      </Navbar>
    )
  });
  
  export default NavBar
  