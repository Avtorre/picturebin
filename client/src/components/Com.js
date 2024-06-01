import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { $host } from '../http/http'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

const Com = observer((com) => {

    return (
        <Row>
            <p>
                <a style={{fontSize:"1.3rem", fontWeight: "bold"}}>{com.com.userName}</a> <br/>
                {com.com.text}
                <br/>
            </p>
            <hr/>
        </Row>
    )
})

export default Com
