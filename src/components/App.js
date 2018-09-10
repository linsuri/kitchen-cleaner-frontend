import React, { Component } from 'react';
import AppHeader from './AppHeader'
import SearchBar from './SearchBar'
import IngredientsContainer from './IngredientsContainer'
import RecipesContainer from './RecipesContainer'
import './App.css';

const APP_ID = '8d1d3268'
const APP_KEY = 'ccb8a47a38fe914e9ab5698068bc2dec'
// let ingredientQuery = `&allowedIngredient[]=${this.state.input}`
let url = `https://api.yummly.com/v1/api/recipes?_app_id=${APP_ID}&_app_key=${APP_KEY}`

class App extends Component {

  state = {
    input: '',
    allowedIngredients: '',
    ingredients: [],
    recipes: []
  }

  handleChange = event => this.setState({input: event.target.value})

  handleIngredientSubmit = event => {
    event.preventDefault()
    this.setState({ingredients: [...this.state.ingredients, this.state.input], input: ''})
  }

  setAllowedIngredients = () => {
    let ingredientQueries = this.state.ingredients.map(ingredient => `&allowedIngredient[]=${ingredient}`)
    this.setState({allowedIngredients: ingredientQueries.join("")})
  }

  getRecipes = event => {
    this.setAllowedIngredients()
    let newUrl = (url+this.state.allowedIngredients)
    fetch(`${newUrl}`)
    .then(res => res.json())
    .then(json => this.setState({recipes: json.matches}))
  }

  render() {
    return (
      <div>
        <AppHeader />
        <SearchBar handleIngredientSubmit={this.handleIngredientSubmit} handleChange={this.handleChange} input={this.state.input} />
        <IngredientsContainer ingredients={this.state.ingredients} getRecipes={this.getRecipes}/>
        <RecipesContainer recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;
