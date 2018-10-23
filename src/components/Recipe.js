import React from 'react'
import { connect } from 'react-redux'
import * as actions from  '../actions'
import { Card, Icon, Image } from 'semantic-ui-react'

class Recipe extends React.Component {

  state = {
    heartColor: 'grey',
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      if (this.props.user.recipes.length > 0) {
        if (!!this.props.user.recipes.find(recipe => recipe.recipe_object.id === this.props.recipe.id)) {
          this.setState({heartColor: 'red'})
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.loggedIn && prevProps.loggedIn) {
      if (this.props.user.recipes !== prevProps.user.recipes) {
        if (!this.props.user.recipes.find(recipe => recipe.recipe_object.id === this.props.recipe.id)) {
          this.setState({heartColor: 'grey'})
        }
      }
    } else if (this.props.loggedIn && !prevProps.loggedIn) {
      if (this.props.user.recipes.length > 0) {
        if (!!this.props.user.recipes.find(recipe => recipe.recipe_object.id === this.props.recipe.id)) {
          this.setState({heartColor: 'red'})
        }
      }
    } else {
      if (this.state.heartColor !== 'grey') {
        this.setState({heartColor: 'grey'})
      }
    }
  }

  handleLike = () => {
    if (this.props.loggedIn) {
      if (this.state.heartColor === 'red') {
        this.setState({heartColor: 'grey'}, () => this.props.unsaveFavorite(this.props.recipe))
      } else {
        this.setState({heartColor: 'red'}, () => this.props.saveFavorite(this.props.recipe))
      }
    } else {
      this.props.openSignUpLogIn()
    }
  }

  render() {

    let {imageUrlsBySize, recipeName, sourceDisplayName, id} = this.props.recipe
    let {course, cuisine} = this.props.recipe.attributes
    if (!course) {
      course = "None"
    }
    if (!cuisine) {
      cuisine = "None"
    }
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
              <Icon name='heart' link color={this.state.heartColor} onClick={this.handleLike}/>
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
                <Icon name='heart' link color={this.state.heartColor} onClick={this.handleLike}/>
              </a>
            </Card.Content>
          </Card>
        )
      }
    }

    return (
      <div>
        {renderImages()}
      </div>
    )
  }

}

const mapStateToProps = ({ usersReducer: { user, loggedIn } }) => {
  return {
    user,
    loggedIn,
  }
}

export default connect(mapStateToProps, actions)(Recipe)
