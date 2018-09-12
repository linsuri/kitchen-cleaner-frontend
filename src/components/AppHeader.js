import React from 'react'
import { Header, Button } from 'semantic-ui-react'

const AppHeader = (props) => {

  return (
    <div className="header-container">
      <Button style={{position:'absolute', top:'0', right:'0', margin:'10px'}} content="Log In / Sign Up" onClick={props.showSignUpLogIn} />
      <div onClick={props.hideSignUpLogIn}>
        <Header as="h1">
          Cook Smart
          <Header.Subheader>Find Recipes for the Ingredients You Already Have</Header.Subheader>
        </Header>
      </div>
    </div>
  )
}

export default AppHeader
