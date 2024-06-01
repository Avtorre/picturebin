import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { Context } from '..'

const DropDownCol = observer(() => {
  const {picture} = useContext(Context)

  return (
    <DropdownButton id="dropdown-basic-button" variant='transparent' title={picture.addToCol.name}>
      {picture.collections.map( col =>
        <Dropdown.Item
         onClick={() => picture.setAddToCol(col)} 
         key= {col.collectionID}
        >
          {col.name}
        </Dropdown.Item>
      )}  
    </DropdownButton>
  )
})

export default DropDownCol