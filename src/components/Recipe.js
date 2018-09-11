import React from 'react'
import { Card } from 'semantic-ui-react'

const Recipe = (props) => {

  let {imageUrlsBySize, recipeName, sourceDisplayName, id} = props.recipe
  let {course, cuisine} = props.recipe.attributes
  course ? course = course : course = "None"
  cuisine ? cuisine = cuisine : cuisine = "None"
  let desc = `Course: ${course}  |  Cuisine: ${cuisine}`
  let href = `https://www.yummly.com/recipe/${id}`

  const renderImages = () => {
    if (imageUrlsBySize) {
      let formattedImage = imageUrlsBySize[90].slice(0, -6)
      return (
        // image={formattedImage}
        <Card
          as="a"
          href={href}
          target="_blank"
          image={formattedImage}
          header={recipeName}
          meta={sourceDisplayName}
          description={desc}
        />
      )
    } else {
      return (
        <Card
          as="a"
          href={href}
          target="_blank"
          header={recipeName}
          meta={sourceDisplayName}
          description={desc}
        />
      )
    }
  }

  return (
    <div className='ui four wide column'>
      <div>
        {renderImages()}
      </div>
   </div>
  )
}

export default Recipe
