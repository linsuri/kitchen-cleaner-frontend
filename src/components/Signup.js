import React from 'react'
import { connect } from 'react-redux'
import * as actions from  '../actions'
import { Form, Button, Message } from 'semantic-ui-react'

class Signup extends React.Component {
  
  state = {
    usernameInput: '',
    passwordInput: '',
  }

  handleInput = event => this.setState({[event.target.className]: event.target.value})

  handleSubmit = event => {
    event.preventDefault()
    this.props.signUp(this.state.usernameInput, this.state.passwordInput)
  }

  render() {
    return (
      <div>
        <Form style={{padding:'30px'}} onSubmit={this.handleSubmit}>
          <h3>Welcome!</h3>
          <Form.Field>
            <label>Username</label>
            <input className='usernameInput' placeholder='Username' value={this.state.usernameInput} onChange={this.handleInput} />
            <label>Password</label>
            <input className='passwordInput' placeholder='Password' value={this.state.passwordInput} onChange={this.handleInput} type='password' />
          </Form.Field>
          <Button type='submit'>Sign Up</Button>
        </Form>
        {this.props.error ? <Message error content={this.props.error} style={{margin:'0px 30px'}}/> : null}
      </div>
    )
  }

}

const mapStateToProps = ({ usersReducer: { error } }) => {
  return {
    error,
  }
}

export default connect(mapStateToProps, actions)(Signup)
