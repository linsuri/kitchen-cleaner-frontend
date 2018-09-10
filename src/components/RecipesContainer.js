import React from 'react'
import Recipe from './Recipe.js'
// import { Card } from 'semantic-ui-react'

const RecipesContainer = (props) => {

  let recipesArr = props.recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe}/>)

  // console.log("RecipesContainer:", props)
  return (
    <div className='ui grid container'>
      {recipesArr}
    </div>
  )
}

export default RecipesContainer
