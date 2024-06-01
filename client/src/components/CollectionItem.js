import React from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { COLLECTION_ROUTE, DEVICE_ROUTE, PICTURE_ROUTE } from '../utils/consts'

const CollectionItem = ({collection}) => {
  const navigate = useNavigate()
  console.log(collection)
  return (
    <Col className='mt-3' style={{cursor:'pointer'}} onClick={() => navigate(COLLECTION_ROUTE + '/' + collection.collectionID)}>
        <Card style={{ width: 302 }}>
          <Image width={300} height={300} src={'http://localhost:5000/' + collection.preview}/>
          <Card.Body style={{backgroundColor:'rgb(230, 230, 230)'}}>
            <Card.Title>{collection.name}</Card.Title>
            <Card.Text> Pictures : {collection.amount}</Card.Text>
          </Card.Body>
        </Card>
    </Col>
  )
}

export default CollectionItem