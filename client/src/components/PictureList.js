import React, {useContext} from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import PictureItem from './PictureItem';

const PictureList = observer(() => {
    const {picture} = useContext(Context)

    return (
        <Row className="d-flex">
            <h2>Pictures</h2>
            <ResponsiveMasonry className='mt-3' columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                <Masonry gutter='15px'>
                    {picture.pictures.map(picture =>
                        <PictureItem key={picture.pictureID} picture={picture}/>
                    )}
                </Masonry>
            </ResponsiveMasonry>
        </Row>
    );
});

export default PictureList;
/*
        <Row className="d-flex">
            <h2>Pictures</h2>
            {picture.pictures.map(picture =>
                <PictureItem key={picture.pictureID} picture={picture}/>
            )}
        </Row>
*/