import React, { useContext, useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import DropDown from '../components/DropDown'
import { observer } from 'mobx-react-lite'
import { COLLECTION_ROUTE, MAIN_ROUTE, PICTURE_ROUTE } from '../utils/consts'
import PictureList from '../components/PictureList'
import { Context } from '..'
import { $host } from '../http/http'
import CollectionList from '../components/CollectionList'
import { useNavigate } from 'react-router-dom'

const Main = observer(() => {

  const {picture} = useContext(Context)
  const history = useNavigate()

  const isCollection = window.location.pathname === COLLECTION_ROUTE
  const loadPics = async () => {
    let id = picture.selectedTheme.themeID
    if (picture.selectedTheme.name === 'Any') { 
      const {data} = await $host.get('api/picture')
      picture.setAmount(data.length)
      return data
    } else {
      const {data} = await $host.get('api/picture/theme/'+id)
      return data
    }
  }
  const loadCols = async () => {
    const {data} = await $host.get('api/collection')
    return data
  }
  const loadThemes = async () => {
    const {data} = await $host.get('api/theme')
    return data
  }

  useEffect(() => {
    loadPics().then(data => {
      picture.setPictures(data)
    })
    loadCols().then(data => {
      picture.setCollections(data)
    })
    loadThemes().then(data => {
      picture.setThemes(data)
    })
  },[picture.selectedTheme])

  return (
    <Container>
      <Row className='mt-2'>
        <Col md={2} className='mt-5'>
        {!isCollection
          ?
          <Button style={{height:50}} variant='success' onClick={()=> history('/upload')}>Upload picture</Button>
          :
          <Button style={{height:50}} variant='success' onClick={()=> history('/createCollection')}>Create collection</Button>
        }
        {!isCollection
          ?
          <h3 style={{marginLeft: 5, marginTop: 5}}>Theme</h3>
          :
          <div></div>
        }
        {!isCollection
          ?
          <DropDown/>
          :
          <div></div>
        }
        </Col>
        <Col md={9}>
          {!isCollection
            ?
              <PictureList/>
            :
              <CollectionList/>
          }
          
        </Col>
      </Row>
    </Container>
  )
})

export default Main
