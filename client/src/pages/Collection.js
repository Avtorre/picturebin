import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { $host } from '../http/http'
import { Context } from '..'
import PictureList from '../components/PictureList'
import { useParams } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'

const Collection = observer(() => {
  const {picture} = useContext(Context)
  const {id} = useParams()

  const loadPics = async () => {
    const {data} = await $host.get('api/collection/'+id)
    console.log(data)
    return data
  }

  useEffect(() => {
    loadPics().then(data => {
      picture.setPictures(data)
    })
  },[])

  return (
    <Container style={{maxWidth: '78%'}}>
      <Row className='mt-3' style={{width: '95%'}}>
        <PictureList/>
      </Row>
    </Container>
  )
})

export default Collection
