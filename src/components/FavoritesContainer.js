import React from 'react'
import { connect } from 'react-redux'
import * as actions from  '../actions'
import Recipe from './Recipe.js'
import { Message, Pagination } from 'semantic-ui-react'

class FavoritesContainer extends React.Component {

  state = {
    activePage: 1,
  }

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }

  recipesArr = () => {
    if (this.props.user.recipes.length !== 0) {
      return this.props.user.recipes.slice((this.state.activePage-1)*4, this.state.activePage*4).map(recipe => <div className='ui eight wide column' key={recipe.id}><Recipe key={recipe.id} recipe={recipe.recipe_object} saveFavorite={this.props.saveFavorite} unsaveFavorite={this.props.unsaveFavorite}/></div>)
    }
  }

  handlePaginationChange = (event, data) => {
    this.setState({activePage: data.activePage})
  }

  pagination = () => {
    return (
      <div style={{margin:'auto', display:'grid'}}>
        <Pagination style={{margin:'auto', marginBottom:'50px'}}  activePage={this.state.activePage} onPageChange={this.handlePaginationChange} totalPages={Math.ceil(this.props.user.recipes.length/4)} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className='ui grid container' style={{margin:'60px 30px'}}>
          {this.props.user.recipes.length !== 0 ? this.recipesArr() : <div className='ui grid container centered' style={{padding: '30px'}}><Message size="large" header="You don't have any favorites." content='Click on the heart icon to save a menu to your list of favorites the next time you search.' /></div>}
        </div>
        {this.props.user.recipes.length !== 0 ? this.pagination() : null}
      </div>
    )

  }
}

const mapStateToProps = ({ usersReducer: { user, showMenuBoolean } }) => {
  return {
    user,
  }
}

export default connect(mapStateToProps, actions)(FavoritesContainer)
