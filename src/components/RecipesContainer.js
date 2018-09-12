import React from 'react'
import Recipe from './Recipe.js'
import { Message } from 'semantic-ui-react'

const RecipesContainer = (props) => {

  const recipesArr = () => {
    if (props.ingredients.length !== 0) {
      return props.recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe}           saveFavorite={props.saveFavorite} />)
    }
  }

  return (
    <div className='ui grid container' onClick={props.hideSignUpLogIn}>
      {props.noResults === false ? recipesArr() : <div className='ui grid container centered'><Message size="big" header='No result matches' content='Try removing an ingredient for recipe result.' /></div>}
    </div>
  )
}

export default RecipesContainer
