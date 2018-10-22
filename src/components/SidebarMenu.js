import React from 'react'
import { connect } from 'react-redux'
import * as actions from  '../actions'
import FavoritesContainer from './FavoritesContainer'
import { Icon, Menu, Sidebar, Header, Button } from 'semantic-ui-react'

class SidebarMenu extends React.Component {

  render() {

    return (
      <div>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          direction='right'
          onHide={this.props.hideMenu}
          vertical
          visible={this.props.showMenuBoolean}
          width='very wide'
        >
          <Icon name='close' link onClick={this.props.hideMenu} style={{position:'fixed', left:'0', top:'0', margin:'5px'}} />
          <Header style={{position:'fixed', top:'0', left:'0', marginLeft:'30px'}} as='h3' textAlign='right'> {this.props.user.user_name}'s Favorites</Header>
          <Button content='Log Out' style={{position:'fixed', top:'0', right:'0', margin:'15px'}} onClick={this.props.logOut} />
          <FavoritesContainer unsaveFavorite={this.props.unsaveFavorite}/>
        </Sidebar>
      </div>
    )
  }
}

const mapStateToProps = ({ usersReducer: { user, showMenuBoolean } }) => {
  return {
    user,
    showMenuBoolean,
  }
}

export default connect(mapStateToProps, actions)(SidebarMenu)
