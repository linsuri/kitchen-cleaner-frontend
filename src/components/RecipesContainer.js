import React from 'react'

import Recipe from './Recipe.js'
import { Message, Pagination } from 'semantic-ui-react'

class RecipesContainer extends React.Component {

  state = {
    activePage: 1,
    // sliceFirstNum
  }

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }

  recipesArr = () => {
    if (this.props.recipes.length !== 0) {
      return this.props.recipes.slice((this.state.activePage-1)*20, this.state.activePage*20).map(recipe => <Recipe key={recipe.id} recipe={recipe} saveFavorite={this.props.saveFavorite} />)
    }
  }

  handlePaginationChange = (event, data) => {
    this.setState({activePage: data.activePage})
  }

  pagination = () => {
    return (
      <div style={{margin:'auto', display:'grid'}}>
        <Pagination style={{margin:'auto', marginBottom:'100px'}}  activePage={this.state.activePage} onPageChange={this.handlePaginationChange} totalPages={Math.ceil(this.props.recipes.length/20)} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className='ui grid container' style={{margin:'30px'}}>
          {this.props.noResults === false ? this.recipesArr() : <div className='ui grid container centered' style={{padding: '30px'}}><Message size="big" header='No result matches' content='Try removing an ingredient for recipe result.' /></div>}
        </div>
        {this.props.recipes.length !== 0 ? this.pagination() : null}
      </div>
    )

  }
}

export default RecipesContainer
