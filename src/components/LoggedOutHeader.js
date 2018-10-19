import React from 'react'
import { connect } from 'react-redux'
import SignUpLogIn from './SignUpLogIn'
import { TransitionablePortal, Segment, Header, Button } from 'semantic-ui-react'

class LoggedOutHeader extends React.Component {
  state = { open: false }

  handleClick = () => this.setState({ open: !this.state.open })

  render() {
    const { open } = this.state

    return (
      <div className="header-container">
        <Button
          style={{position:'absolute', top:'0', right:'0', margin:'10px'}}
          content="Log In / Sign Up"
          onClick={this.handleClick} />
        <TransitionablePortal open={open} transition={{ animation: 'fade up', duration: 500 }}>
          <Segment style={{ position: 'absolute', top: '22%', left: '35%', zIndex: 1000, backgroundColor: 'white', borderRadius: '5px', border: '1px solid #D4D4D5', height: '430px', width: '450px' }}>
            <SignUpLogIn />
          </Segment>
        </TransitionablePortal>
        <Header as="h1">
          Cook Smart
          <Header.Subheader>Find Recipes for the Ingredients You Already Have</Header.Subheader>
        </Header>
      </div>
    )
  }
}

const mapStateToProps = ({ usersReducer: { user, loggedIn, failedLogin, error } }) => {
  return {
    user,
    loggedIn,
    failedLogin,
    error,
  }
}

export default connect(mapStateToProps, null)(LoggedOutHeader)
