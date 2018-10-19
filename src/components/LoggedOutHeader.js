import React from 'react'
import { connect } from 'react-redux'
import * as actions from  '../actions'
import SignUpLogIn from './SignUpLogIn'
import { TransitionablePortal, Segment, Header, Button } from 'semantic-ui-react'

class LoggedOutHeader extends React.Component {

  render() {
    
    return (
      <div className="header-container">
        <Button
          style={{position:'absolute', top:'0', right:'0', margin:'10px'}}
          content="Log In / Sign Up"
          onClick={this.props.openSignUpLogIn} />
        <TransitionablePortal open={this.props.openSignUpLogInBoolean}  onClose={this.props.openSignUpLogIn} transition={{ animation: 'fade up', duration: 500 }}>
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

const mapStateToProps = ({ usersReducer: { openSignUpLogInBoolean } }) => {
  return {
    openSignUpLogInBoolean,
  }
}

export default connect(mapStateToProps, actions)(LoggedOutHeader)
