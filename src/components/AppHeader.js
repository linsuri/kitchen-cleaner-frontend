import React from 'react'
import { Container, Header } from 'semantic-ui-react'

const AppHeader = () => {
  return (
    <Container style={{padding:'70px', width:'100%', backgroundColor:'pink'}}>
      <Header
        as="h1">
        Cook Smart
        <Header.Subheader>Find Recipes for the Ingredients You Already Have</Header.Subheader>
      </Header>
    </Container>
  )
}

export default AppHeader
