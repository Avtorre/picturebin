import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { Context } from '..'
import { $host } from '../http/http'
import { useParams } from 'react-router-dom'
import Comments from '../components/Comments'
import AddToCol from '../components/modals/AddToCol'

const Picture = observer(() => {
  const {picture} = useContext(Context)
  const [pic, setPic] = useState({})
  const [user, setUser] = useState({user:''})
  const {id} = useParams()
  const [addVisible, setAddVisible] = useState(false)

  const loadPic = async () => {
    const {data} = await $host.get(`api/picture/`+id)
    return data
  }

  useEffect(() => {
    loadPic().then(data => {
      setPic(data)
    })
  },[])

  const loadUser = async () => {
    let userID = await pic.userUserID
    const {data} = await $host.get('api/user/load/'+userID)
    return data
  }


  useEffect(() => {
    if (pic.userUserID){
      loadUser().then(data => {
      setUser(data)
    })}
  },[pic])

  return (
    <Container>
      <Row className='mt-4 d-flex'>
        <Col style={{paddingRight: 0}} md={8}>
          <Image style={{maxWidth: '100%'}} src={'http://localhost:5000/' + pic.file}/>
        </Col>
        <Col md={4} style={{paddingLeft: 0}}>
          <div style={{backgroundColor: 'rgb(225, 225, 225)', height: '100%'}}>
            <div style={{paddingLeft: '15px', maxWidth: '100%'}}>
              <h2>{pic.name}</h2>
              <p>
                Uploaded by: {user.user.userName} <br/>
                Tags: {pic.tags} <br/>
                Source: {pic.source} <br/>
                Uploaded at: {pic.createdAt}
              </p>
              <Button variant='success' onClick={() => setAddVisible(true)}>Add to collection</Button>
            </div>
          </div>
        </Col>
        <AddToCol show={addVisible} onHide={() => setAddVisible(false)}/>
      </Row>
      <h2 className='mt-3'>Comments</h2>
      <Comments/>
    </Container>
  )
})

export default Picture
