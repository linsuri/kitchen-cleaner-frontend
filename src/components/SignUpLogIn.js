import React from 'react'
import { Tab, Form, Button, Message } from 'semantic-ui-react'

const SignUpLogIn = (props) => {

  console.log(props)

  // All the error messages (including the one from log in) will render on the sign up tab.
  // Fix: Don't use tabs. Use something else and toggle between returning log in or sign up with an if else statement.

  const errorMesssage = (props) => {
    if (props.errorMesssage) {
      <Message error content={props.errorMesssage}/>
    }
  }

  const panes = [
    { menuItem: 'Log In', render: () => {
      if (props.errorMesssage) {
        return (
          <Tab.Pane style={{width:'400px', height:'280px'}}>
            <Form style={{padding:'30px'}} onSubmit={props.logIn}>
              <Form.Field>
                <label>Username</label>
                <input placeholder='Username' value={props.usernameInput} onChange={props.handleUsernameInput} />
              </Form.Field>
              <Message error content={props.errorMesssage}/>
              <Button type='submit'>Log In</Button>
            </Form>
          </Tab.Pane>
        )
      } else {
        return (
          <Tab.Pane style={{width:'400px', height:'280px'}}>
            <Form style={{padding:'30px'}} onSubmit={props.logIn}>
              <Form.Field>
                <label>Username</label>
                <input placeholder='Username' value={props.usernameInput} onChange={props.handleUsernameInput} />
              </Form.Field>
              <Button type='submit'>Log In</Button>
            </Form>
          </Tab.Pane>
        )
      }
    }},
    { menuItem: 'Sign Up', render: () => {
      if (props.errorMesssage) {
        return (
          <Tab.Pane style={{width:'400px', height:'280px'}}>
            <Form error style={{padding:'30px'}} onSubmit={props.signUp}>
              <Form.Field>
                <label>Username</label>
                <input placeholder='Username' value={props.usernameInput} onChange={props.handleUsernameInput} />
              </Form.Field>
              <Message error content={props.errorMesssage}/>
              <Button type='submit'>Sign Up</Button>
            </Form>
          </Tab.Pane>
        )
      } else {
        return (
          <Tab.Pane style={{width:'400px', height:'280px'}}>
            <Form error style={{padding:'30px'}} onSubmit={props.signUp}>
              <Form.Field>
                <label>Username</label>
                <input placeholder='Username' value={props.usernameInput} onChange={props.handleUsernameInput} />
              </Form.Field>
              <Button type='submit'>Sign Up</Button>
            </Form>
          </Tab.Pane>
        )
      }
    }}
  ]

  return (
    <div className="sign-up-log-in">
      <Tab panes={panes}/>
    </div>
  )
}

export default SignUpLogIn








// import React from 'react'
// import { Tab, Card } from 'semantic-ui-react'
//
// const SignUpLogIn = (props) => {
//
//   const panes = [
//     { menuItem: 'Log In', render: () => <Tab.Pane style={{width:'400px', height:'400px'}}>Tab 1 Content</Tab.Pane> },
//     { menuItem: 'Sign Up', render: () => <Tab.Pane style={{width:'400px', height:'400px'}}>Tab 2 Content</Tab.Pane> }
//   ]
//
//   return (
//     <div style={{zIndex:'2', width:'400px', position:'absolute', top:'22%', left:'35%'}}>
//       <Tab panes={panes}/>
//     </div>
//   )
// }
//
// export default SignUpLogIn
