import React from 'react'
import Ingredient from './Ingredient'
import { Container, Button, Label } from 'semantic-ui-react'

const IngredientsContainer = (props) => {

  let ingredientsArr = props.ingredients.map(ingredient => <Ingredient key={ingredient} ingredient={ingredient} removeIngredient={props.removeIngredient }/>)

  return (
    <Label.Group size="big" className="ui grid container centered">
        {ingredientsArr}
        {props.ingredients.length === 0 ? null : <Button style={{margin:'20px'}} size="big" fluid onClick={props.setAllowedIngredients}>Get Recipes</Button>}
    </Label.Group>
  )
}

export default IngredientsContainer
