import React, { Component } from 'react';
import AppHeader from './AppHeader'
import SearchBar from './SearchBar'
import IngredientsContainer from './IngredientsContainer'
import RecipesContainer from './RecipesContainer'
import './App.css';

// let url = `https://api.yummly.com/v1/api/recipes?_app_id=${APP_ID}&_app_key=${APP_KEY}`

class App extends Component {

  state = {
    input: '',
    allowedIngredients: '',
    ingredients: [],
    recipes: [],
    noResults: false
  }

  handleChange = event => this.setState({input: event.target.value})

  handleIngredientSubmit = event => {
    event.preventDefault()
    if (this.state.input !== '') {
      this.setState({
        ingredients: [...this.state.ingredients, this.state.input],
        input: '',
        noResults: false
      })
    }
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
    // this.setAllowedIngredients()
    // let newUrl = (url+this.state.allowedIngredients)
    // debugger
    fetch("http://localhost:3000/api/v1/show_recipes", {
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
        this.setState({recipes: json.matches})
      } else {
        this.setState({noResults: true})
      }
    })
    // fetch(`${newUrl}`)
    // .then(res => res.json())
    // .then(json => {
    //   this.setState({recipes: json.matches})
    // })
  }

  render() {
    // console.log("state is", this.state);
    return (
      <div>
        <AppHeader />
        <SearchBar handleIngredientSubmit={this.handleIngredientSubmit} handleChange={this.handleChange} input={this.state.input} />
        <IngredientsContainer ingredients={this.state.ingredients} setAllowedIngredients={this.setAllowedIngredients} removeIngredient={this.removeIngredient} />
        <RecipesContainer recipes={this.state.recipes} noResults={this.state.noResults}/>
      </div>
    );
  }
}

export default App;
