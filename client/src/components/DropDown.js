import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { Context } from '..'

const DropDown = observer(() => {
  const {picture} = useContext(Context)

  return (
    <DropdownButton id="dropdown-basic-button" variant='transparent' title={picture.selectedTheme.name}>
       <Dropdown.Item onClick={() => picture.setSelectedTheme({name: 'Any'})}>Any ({picture.amount})</Dropdown.Item>
      {picture.themes.map( theme =>
        <Dropdown.Item
         onClick={() => picture.setSelectedTheme(theme)} 
         key= {theme.themeID}
        >
          {theme.name} ({theme.amount})
        </Dropdown.Item>
      )}  
    </DropdownButton>
  )
})

export default DropDown
