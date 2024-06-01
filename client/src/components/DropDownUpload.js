import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { Context } from '..'

const DropDownUpload = observer(() => {
  const {picture} = useContext(Context)
  return (
    <DropdownButton id="dropdown-basic-button" variant='transparent' title={picture.uploadTheme.name}>
      {picture.themes.map( theme =>
        <Dropdown.Item
         onClick={() => picture.setUploadTheme(theme)} 
         key= {theme.themeID}
        >
          {theme.name}
        </Dropdown.Item>
      )}  
    </DropdownButton>
  )
})

export default DropDownUpload