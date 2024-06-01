import React, { useContext, useEffect, useState } from 'react'
import { $host } from '../http/http'
import { Button, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import Com from './Com'

const Comments = observer(() => {
    const {picture, user} = useContext(Context)
    const [comms, setComms] = useState([])
    const {id} = useParams()
    const [ct, setCt] = useState('')
    const c =[]
    let r=0
    let userUserID 
    let picturePictureID = id
    const loadComms = async () => {
        const {data} = await $host.get(`api/comment/`+id)
        return data
    }
    
    useEffect(() => {
        loadComms().then(data => {
          setComms(data)
        })

    },[r])

    const sendComment = async () => {
        let body = {"userUserID":`${localStorage.getItem('userUserID')}`,"text":`${ct}`,"picturePictureID":`${picturePictureID}`,"userName":`${localStorage.getItem('userName')}`}
        console.log(body)
        const {data} = await $host.post('api/comment', body)
        r+=1
        window.location.reload()
        return data
    }

    return (
        <Row>
            <Form className='d-flex flex-column'>
                <Form.Control
                style={{backgroundColor: 'rgb(225, 225, 225)'}}
                className='mt-3'
                placeholder='Leave your comment here...'
                value={ct}
                onChange={e =>setCt(e.target.value)}
                />
                <Button onClick={sendComment} style={{marginTop:'5px',marginLeft:'auto', width:'20%'}} variant='success'>Send</Button>
            </Form>
            <Row className='mt-4 d-flex'>
                {comms.map(com => 
                    <Com key={com.commentID} com = {com}/>
                )}
            </Row>
        </Row>
    )
})

export default Comments


/*
  const load = async () => {
        if (comms.length){
        comms.map(async com => {
            let userID = com.userUserID
            userUserID = userID
            const {data} = await $host.get('api/user/load/'+userID)
            let userName = data.user.userName
            com.userName = userName
            com.txt = com.text
            c.push(com)
        })
        console.log(c)
        }
        return c
    }

    useEffect(() => {
        load().then(c => {
            setComms(c)
        })
    },[r])

*/