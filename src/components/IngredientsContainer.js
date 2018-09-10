import React from 'react'
import Ingredient from './Ingredient'
import { List, Segment, Button } from 'semantic-ui-react'

const IngredientsContainer = (props) => {

  let ingredientsArr = props.ingredients.map(ingredient => <Ingredient key={ingredient} ingredient={ingredient}/>)

  return (
    <Segment raised>
      <Segment>
        {ingredientsArr}
      </Segment>
      {props.ingredients.length === 0 ? null : <Button onClick={props.getRecipes}>Get Recipes</Button>}
    </Segment>
  )
}

export default IngredientsContainer
