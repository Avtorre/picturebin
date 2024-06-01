import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import CollectionItem from './CollectionItem';
import { $host } from '../http/http';

const CollectionList = observer(() => {
    const {picture} = useContext(Context)

    return (
        <Row className="d-flex">
            <h2>Collections</h2>
            {picture.collections.map(collection =>
                <CollectionItem key={collection.pictureID} collection={collection}/>
            )}
        </Row>
    );
});

export default CollectionList;