import React from 'react'
import { Card } from 'semantic-ui-react'

const Recipe = (props) => {

  let {imageUrlsBySize, recipeName, sourceDisplayName} = props.recipe
  let {course, cuisine} = props.recipe.attributes
  let desc = `Course: ${course}  |  Cuisine: ${cuisine}`
  let image = imageUrlsBySize[90].slice(0, -6)

  return (
    <div className='ui four wide column'>
      <div className='ui card'>
        <Card
          image={image}
          header={recipeName}
          meta={sourceDisplayName}
          description={desc}
        />
      </div>
    </div>
  )
}

export default Recipe
