import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Form, Modal, Row } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import DropDownCol from '../DropDownCol'
import { MAIN_ROUTE } from '../../utils/consts'
import { Context } from '../..'
import { $host } from '../../http/http'

const AddToCol = observer(({show, onHide}) => {
    const {picture} = useContext(Context)
    const [title, setTitle] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()
  
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
        formData.append('collectionCollectionID', picture.addToCol.collectionID)
        formData.append('picturePictureID', id)
        const {data} = await $host.post('api/collection/add', formData)
        navigate(MAIN_ROUTE)
    }
  
    return (
    <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
    >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            Add this picture to collection
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <DropDownCol/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='success' onClick={click}>Add</Button>
            <Button variant='danger' onClick={onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
    )
  });

export default AddToCol