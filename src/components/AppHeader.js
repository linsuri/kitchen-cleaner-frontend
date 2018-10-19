import React from 'react'
import { connect } from 'react-redux'

import { Header, Button } from 'semantic-ui-react'

const AppHeader = (props) => {

  const logInButton = <Button style={{position:'absolute', top:'0', right:'0', margin:'10px'}} content="Log In / Sign Up" onClick={props.showSignUpLogIn} />

  const usernameAndMyFavorites =
    <div style={{position:'absolute', top:'0', right:'0', margin:'10px'}}>
      {/* <h3>Welcome, {props.user.user_name}!</h3> */}
      <Button content="My Favorites" onClick={props.showFavoritesContainer} />
    </div>

  console.log(props)
  return (
    <div className="header-container">
      {!props.loggedIn ? logInButton : usernameAndMyFavorites}
      <div onClick={props.hideSignUpLogIn}>
        <Header as="h1">
          Cook Smart
          <Header.Subheader>Find Recipes for the Ingredients You Already Have</Header.Subheader>
        </Header>
      </div>
    </div>
  )
}

const mapStateToProps = ({ usersReducer: { user, loggedIn, error } }) => {
  return {
    user,
    loggedIn,
    error,
  }
}

export default connect(mapStateToProps, null)(AppHeader)
