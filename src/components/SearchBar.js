import React from 'react'
import { Input, Button } from 'semantic-ui-react'

const SearchBar = (props) => {

  return (
    <form onSubmit={props.handleIngredientSubmit}>
      <Input focus className="search-bar"
        placeholder="Add Ingredients Here..."
        value={props.input}
        onChange={props.handleChange}  
      />
      <Button>Add</Button>
    </form>
  )

}

export default SearchBar
