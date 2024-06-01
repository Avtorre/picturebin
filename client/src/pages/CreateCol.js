import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from '../utils/consts'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { $host } from '../http/http'
import DropDown from '../components/DropDown'
import DropDownUpload from '../components/DropDownUpload'

const CreateCol = observer(() => {
    const {picture} = useContext(Context)
    const [title, setTitle] = useState('')
    const navigate = useNavigate()
  
    const loadThemes = async () => {
        const {data} = await $host.get('api/theme')
        return data
    }

    useEffect(() => {
        loadThemes().then(data => {
            picture.setThemes(data)
        })
    },[])

    const click = async () => {
        const formData = new FormData()
        formData.append('name', title)
        formData.append('userUserID', localStorage.getItem('userUserID'))
        const {data} = await $host.post('api/collection', formData)
        navigate(MAIN_ROUTE)
    }
  
    return (
      <Container 
      className='d-flex justify-content-center align-items-center'
      style={{height: window.innerHeight-54}}
      >
        <Card style={{width: 600}} className='p-5'>
          <h2 className='m-auto'>Create a collection</h2>
          <Form className='d-flex flex-column'> 
            <Form.Control
              className='mt-3'
              placeholder='Enter a title'
              value={title}
              onChange={ e => setTitle(e.target.value)}
            />
            <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                <Button variant='success' onClick={click}>
                  Create
                </Button>
            </Row>
          </Form>
        </Card>
      </Container>
    )
  });

export default CreateCol
