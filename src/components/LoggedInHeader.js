import React from 'react'
import { connect } from 'react-redux'
import * as actions from  '../actions'
import SidebarMenu from './SidebarMenu'
import { Header, Icon } from 'semantic-ui-react'

class LoggedInHeader extends React.Component {

  render() {

    return (
      <div className="header-container">
        <Header style={{position:'absolute', top:'10px', right:'50px', margin:'10px'}} as='h3' textAlign='right'>Welcome, {this.props.user.user_name}!</Header>

        <Icon name='bars' link size='big' style={{position:'absolute', top:'18px', right:'15px'}} onClick={this.props.showMenu}/>

        <SidebarMenu unsaveFavorite={this.props.unsaveFavorite}/>

        <Header as="h1" style={{fontFamily: "'Lobster', cursive", fontSize: "4em"}}>
          Kitchen Cleaner
          <Header.Subheader style={{fontFamily: "'Muli', sans-serif", fontSize: "0.4em"}}>Find Recipes for the Ingredients You Already Have</Header.Subheader>
        </Header>
      </div>
    )
  }
}

const mapStateToProps = ({ usersReducer: { user, showMenuBoolean } }) => {
  return {
    user,
  }
}

export default connect(mapStateToProps, actions)(LoggedInHeader)
