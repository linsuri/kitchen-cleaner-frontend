import React from 'react'
import { Container, Header } from 'semantic-ui-react'
// import Background from '../imgs/basil-background.jpg'


const AppHeader = () => {
  return (
    <div className="header-container">
      <Header as="h1">
        Cook Smart
        <Header.Subheader>Find Recipes for the Ingredients You Already Have</Header.Subheader>
      </Header>
    </div>
  )
}

export default AppHeader
