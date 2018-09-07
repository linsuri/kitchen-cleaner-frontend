import React, { Component } from 'react';
import AppHeader from './AppHeader'
import SearchBar from './SearchBar'
import IngredientsContainer from './IngredientsContainer'
import './App.css';

class App extends Component {

  state = {
    input: '',
    allowedIngredients: '',
    ingredients: [],
    recipes: []
  }

  // APP_ID = '8d1d3268'
  // APP_KEY = 'ccb8a47a38fe914e9ab5698068bc2dec'
  // let ingredientQuery = `&allowedIngredient[]=${this.state.input}`
  // let url = `https://api.yummly.com/v1/api/recipes?_app_id=${APP_ID}&_app_key=${APP_KEY}&${this.state.allowedIngredients}`

  handleChange = event => this.setState({input: event.target.value})

  handleIngredientSubmit = event => {
    event.preventDefault()
    this.setState({ingredients: [...this.state.ingredients, this.state.input]})
  }

  render() {
    return (
      <div>
        <AppHeader />
        <SearchBar handleIngredientSubmit={this.handleIngredientSubmit} handleChange={this.handleChange}/>
        <IngredientsContainer ingredients={this.state.ingredients}/>
      </div>
    );
  }
}

export default App;
