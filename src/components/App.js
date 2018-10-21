import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from  '../actions'
import LoggedOutHeader from './LoggedOutHeader'
import LoggedInHeader from './LoggedInHeader'
import SearchBar from './SearchBar'
import IngredientsContainer from './IngredientsContainer'
import RecipesContainer from './RecipesContainer'
import './App.css';

// let url = `https://api.yummly.com/v1/api/recipes?_app_id=${APP_ID}&_app_key=${APP_KEY}`

class App extends Component {

  state = {
    ingredientInput: '',
    allowedIngredients: '',
    ingredients: [],
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
  }

  /////////////////// Params is not correct. Backend would not take params, therefore not saving.
  saveFavorite = (recipe) => {
    fetch("http://localhost:3000/api/v1/recipes", {
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
    .then(json => {console.log(json)
      // if (json.errors) {
      //   this.setState({
      //     errorMesssage: json.errors,
      //     usernameInput: ''
      //   })
      // } else {
      //   this.setState({
      //     user: json,
      //     usernameInput: '',
      //     loggedin: true,
      //     showSignUpLogIn: false
      //   }, () => console.log(this.state.user))
      // }
    })
  }

  render() {
    return (
      <div>
        {this.props.loggedIn ? <LoggedInHeader /> : <LoggedOutHeader />}
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
