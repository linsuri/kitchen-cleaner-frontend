import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from  '../actions'
import LoggedOutHeader from './LoggedOutHeader'
import LoggedInHeader from './LoggedInHeader'
import SearchBar from './SearchBar'
import IngredientsContainer from './IngredientsContainer'
import RecipesContainer from './RecipesContainer'
import { Dimmer, Loader } from 'semantic-ui-react'
import './App.css';

class App extends Component {

  state = {
    ingredientInput: '',
    allowedIngredients: '',
    ingredients: [],
    fetching: false,
    recipes: [],
    noResults: false,
  }

  componentDidMount() {
    if (localStorage.getItem('jwt') && !this.props.loggedIn) this.props.fetchCurrentUser()
  }

  handleChange = event => this.setState({ingredientInput: event.target.value})

  handleIngredientSubmit = event => {
    event.preventDefault()
    if (this.state.ingredientInput !== '') {
      this.setState({
        ingredients: [...this.state.ingredients, this.state.ingredientInput],
        ingredientInput: '',
        noResults: false
      })
    }
  }

  reset = () => {
    this.setState({
      ingredients: [],
      allowedIngredients: '',
      recipes: []
    })
  }

  removeIngredient = event => {
    this.setState({
      ingredients: [...this.state.ingredients].filter(ingredient => ingredient !== event.target.parentNode.innerText),
      noResults: false
    })
  }

  setAllowedIngredients = () => {
    let ingredientQueries = this.state.ingredients.map(ingredient => `&allowedIngredient[]=${ingredient}`)
    this.setState({allowedIngredients: ingredientQueries.join("")}, this.getRecipes)
  }

  getRecipes = () => {
    this.setState({fetching: true})
    fetch("http://kitchen-cleaner-backend.herokuapp.com/api/v1/show_recipes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: this.state.allowedIngredients
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.matches.length !== 0) {
        this.setState({recipes: json.matches, fetching: false})
      } else {
        this.setState({noResults: true, fetching: false})
      }
    })
  }

  saveFavorite = (recipe) => {
    fetch("http://kitchen-cleaner-backend.herokuapp.com/api/v1/recipes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipe: {
          recipe_object: recipe,
          user_id: this.props.user.id
        }
      })
    })
    .then(res => res.json())
    .then(json => this.props.addSavedRecipe(json.recipe))
  }

  unsaveFavorite = (recipe) => {
    fetch("http://kitchen-cleaner-backend.herokuapp.com/api/v1/recipes", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipe: {
          recipe_object: recipe,
          user_id: this.props.user.id
        }
      })
    })
    .then(res => res.json())
    .then(json => this.props.deleteSavedRecipe(json.recipe))
  }

  render() {
    return (
      <div>
        {this.state.fetching ? <Dimmer active inverted><Loader inverted /></Dimmer> : null}
        {this.props.loggedIn ? <LoggedInHeader unsaveFavorite={this.unsaveFavorite}/> : <LoggedOutHeader />}
        <SearchBar
          handleIngredientSubmit={this.handleIngredientSubmit}
          handleChange={this.handleChange}
          ingredientInput={this.state.ingredientInput}
        />
        <IngredientsContainer
          ingredients={this.state.ingredients}
          setAllowedIngredients={this.setAllowedIngredients}
          removeIngredient={this.removeIngredient}
          reset={this.reset}
        />
        <RecipesContainer
          ingredients={this.state.ingredients}
          recipes={this.state.recipes}
          noResults={this.state.noResults}
          saveFavorite={this.saveFavorite}
          unsaveFavorite={this.unsaveFavorite}
        />
        <p className='footer'>Kitchen Cleaner 2018 by Lin Sriuthenchai • Recipe search powered by <a href='http://www.yummly.co/recipes'><img alt='Yummly' src='https://static.yummly.co/api-logo.png'/></a></p>
      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer: { user, loggedIn } }) => {
  return {
    user,
    loggedIn,
  }
}

export default connect(mapStateToProps, actions)(App)
