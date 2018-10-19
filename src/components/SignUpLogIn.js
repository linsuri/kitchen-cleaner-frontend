import React from 'react'
import Login from './Login'
import Signup from './Signup'
import { connect } from 'react-redux'
import * as actions from  '../actions'
import { Button } from 'semantic-ui-react'

const SignUpLogIn = props => {

  return (
    <div>
      {props.showLogInFormBoolean ? <Login /> : <Signup />}
      <Button.Group widths='2' style={{padding: '30px', position: 'absolute', bottom: '0', left: '0'}}>
        <Button basic onClick={props.showLogInForm}>Log In</Button>
        <Button basic onClick={props.showSignUpForm}>Sign Up</Button>
      </Button.Group>
    </div>
  )

}

const mapStateToProps = ({ usersReducer: { showLogInFormBoolean } }) => {
  return {
    showLogInFormBoolean,
  }
}

export default connect(mapStateToProps, actions)(SignUpLogIn)
