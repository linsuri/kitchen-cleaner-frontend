import React from 'react'
import { Icon, Label } from 'semantic-ui-react'

const Ingredient = (props) => {
  return (
    <Label>
      {props.ingredient}
      <Icon name='delete' onClick={props.removeIngredient}/>
    </Label>
  )
}

export default Ingredient
