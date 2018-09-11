import React from 'react'
import { Header } from 'semantic-ui-react'

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
