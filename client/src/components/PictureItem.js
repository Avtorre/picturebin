import React from 'react'
import { Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PICTURE_ROUTE } from '../utils/consts'

const PictureItem = ({picture}) => {
  const navigate = useNavigate()
  return (
    <img
      src={'http://localhost:5000/' + picture.file}
      style={{cursor:'pointer'}} 
      onClick={() => navigate(PICTURE_ROUTE + '/' + picture.pictureID)}
    />
  )
}

export default PictureItem
/*  <Col className='mt-3' style={{cursor:'pointer'}} onClick={() => navigate(PICTURE_ROUTE + '/' + picture.pictureID)}>
        <Image width={300} height={300} src={'http://localhost:5000/' + picture.file}/>
    </Col> 
*/