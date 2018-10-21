import React from 'react'
import Ingredient from './Ingredient'
import { Button, Label } from 'semantic-ui-react'

const IngredientsContainer = (props) => {

  const ingredientsArr = props.ingredients.map(ingredient => <Ingredient key={ingredient} ingredient={ingredient} removeIngredient={props.removeIngredient }/>)

  let showButtons = () => {
    return (
      <div style={{width:'100%'}}>
        <div style={{width:'70%', margin:'auto'}}>
          <Button style={{margin:'10px'}} size="huge" fluid onClick={props.setAllowedIngredients}>Get Recipes</Button>
          <Button size="tiny" onClick={props.reset}>Reset</Button>
        </div>
      </div>
    )
  }

  return (
    <Label.Group size="big" className="ui grid container centered">
        {ingredientsArr}
        {props.ingredients.length === 0 ? null : showButtons()}
    </Label.Group>
  )
}

export default IngredientsContainer
