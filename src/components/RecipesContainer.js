import React from 'react'
import Recipe from './Recipe.js'
import { Message } from 'semantic-ui-react'

const RecipesContainer = (props) => {

  let recipesArr = props.recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe}/>)

  return (
    <div className='ui grid container'>
      {props.noResults === false ? recipesArr : <div className='ui grid container centered'><Message header='No result matches' content='Try removing an ingredient for recipe result.' /></div>}
    </div>
  )
}

export default RecipesContainer
