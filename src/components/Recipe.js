import React from 'react'
import { Card } from 'semantic-ui-react'

const Recipe = (props) => {

  let {imageUrlsBySize, recipeName, sourceDisplayName} = props.recipe
  let {course, cuisine} = props.recipe.attributes
  let desc = `Course: ${course}  |  Cuisine: ${cuisine}`

  const renderImages = () => {
    if (imageUrlsBySize) {
      let formattedImage = imageUrlsBySize[90].slice(0, -6)
      return (
        // image={formattedImage}
        <Card
          image={formattedImage}
          header={recipeName}
          meta={sourceDisplayName}
          description={desc}
        />
      )
    } else {
      return (
        <Card
          header={recipeName}
          meta={sourceDisplayName}
          description={desc}
        />
      )
    }
  }

  return (
    <div className='ui four wide column'>
      <div className='ui card'>
        {renderImages()}
      </div>
    </div>
  )
}

export default Recipe
