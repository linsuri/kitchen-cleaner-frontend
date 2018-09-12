import React from 'react'
import { Container, Input } from 'semantic-ui-react'

const SearchBar = (props) => {

  return (
    <Container style={{margin:'30px'}} onClick={props.hideSignUpLogIn}>
      <form onSubmit={props.handleIngredientSubmit} className="ui centered grid">
        <Input focus className="search-bar"
          size='big'
          placeholder="Add Ingredients Here..."
          value={props.ingredientInput}
          onChange={props.handleChange}
          action='Add Ingredient'
        />
      </form>
    </Container>
  )

}

export default SearchBar
