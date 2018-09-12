import React from 'react'
import { Icon } from 'semantic-ui-react'

const FavoritesContainer = (props) => {
console.log(props)
  // console.log(props)

  // const hideFavoritesContainer = event => {
  //   event.target.parentNode.className = "hide-favorites-container"
  //   props.hideFavoritesContainer()
  // }

  // const favorites = event => {
  //   event.target.parentNode.className = "hide-favorites-container"
  //   debugger
  //   props.hideFavoritesContainer(event)
  // }

  //////////////////////////////// Not completed. Need to fetch all recipes of the current user and render with map on here.
  return (
    <div className="show-favorites-container">
      <Icon name='delete' onClick={props.hideFavoritesContainer}/>
    </div>
  )
}

export default FavoritesContainer







// import React from 'react'
// import { Tab, Form, Button, Message } from 'semantic-ui-react'
//
// const FavoritesContainer = (props) => {
//
//   console.log(props)
//
//   const panes = [
//     { menuItem: 'Log In', render: () => {
//       return (
//         <Tab.Pane style={{width:'400px', height:'280px'}}>
//           <Form style={{padding:'30px'}} onSubmit={props.logIn}>
//             <Form.Field>
//               <label>Username</label>
//               <input placeholder='Username' value={props.usernameInput} onChange={props.handleUsernameInput} />
//             </Form.Field>
//             <Button type='submit'>Log In</Button>
//           </Form>
//         </Tab.Pane>
//       )
//     }},
//     { menuItem: 'Sign Up', render: () => {
//       return (
//         <Tab.Pane style={{width:'400px', height:'280px'}}>
//           <Form error style={{padding:'30px'}} onSubmit={props.signUp}>
//             <Form.Field>
//               <label>Username</label>
//               <input placeholder='Username' value={props.usernameInput} onChange={props.handleUsernameInput} />
//             </Form.Field>
//             {props.errorMesssage ? <Message error content={props.errorMesssage}/> : null}
//             <Button type='submit'>Sign Up</Button>
//           </Form>
//         </Tab.Pane>
//       )
//     }}
//   ]
//
//   return (
//     <div className="sign-up-log-in">
//       <Tab panes={panes}/>
//     </div>
//   )
// }
//
// export default FavoritesContainer
