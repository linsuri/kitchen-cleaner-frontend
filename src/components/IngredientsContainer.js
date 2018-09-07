import React from 'react'
import Ingredient from './Ingredient'
import { List } from 'semantic-ui-react'

const IngredientsContainer = (props) => {
  console.log(props.ingredients)
  return (
    <List>
      {/* {ingredientsArr.map(ing => <List.Item>ing.name</List.Item>)} */}
    </List>
  )
}

export default IngredientsContainer
