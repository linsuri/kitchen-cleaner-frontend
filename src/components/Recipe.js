import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

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
        <Card>
          <Image src={formattedImage} as="a" href={href} target="_blank" />
          <Card.Content as="a" href={href} target="_blank">
                <Card.Header>{recipeName}</Card.Header>
                <Card.Meta>{sourceDisplayName}</Card.Meta>
                <Card.Description>{desc}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='heart' onClick={() => props.saveFavorite(props.recipe)}/>
                </a>
              </Card.Content>
        </Card>
      )
    } else {
      return (
        <Card as="a" href={href} target="_blank">
          <Card.Content>
                <Card.Header>{recipeName}</Card.Header>
                <Card.Meta>{sourceDisplayName}</Card.Meta>
                <Card.Description>{desc}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='heart' onClick={props.saveFavorite}/>
                </a>
              </Card.Content>
        </Card>
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
