import React from 'react'
import Ingredient from './Ingredient'
import { Button, Label } from 'semantic-ui-react'

const IngredientsContainer = (props) => {

  const ingredientsArr = props.ingredients.map(ingredient => <Ingredient key={ingredient} ingredient={ingredient} removeIngredient={props.removeIngredient }/>)

  let showButtons = () => {
    return (
      <div style={{width:'100%'}} onClick={props.hideSignUpLogIn}>
        <Button style={{margin:'10px'}} size="big" fluid onClick={props.setAllowedIngredients}>Get Recipes</Button>
        <Button size="tiny" onClick={props.reset}>Reset</Button>
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
