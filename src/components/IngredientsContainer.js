import React from 'react'
import Ingredient from './Ingredient'
import { Segment, Button } from 'semantic-ui-react'

const IngredientsContainer = (props) => {

  let ingredientsArr = props.ingredients.map(ingredient => <Ingredient key={ingredient} ingredient={ingredient} removeIngredient={props.removeIngredient }/>)

  return (
    <Segment raised>
        {ingredientsArr}
        {props.ingredients.length === 0 ? null : <Button fluid onClick={props.setAllowedIngredients}>Get Recipes</Button>}
    </Segment>
  )
}

export default IngredientsContainer
