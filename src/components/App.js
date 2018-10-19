import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from  '../actions'
import LoggedOutHeader from './LoggedOutHeader'
import LoggedInHeader from './LoggedInHeader'
// import AppHeader from './AppHeader'
import SearchBar from './SearchBar'
import IngredientsContainer from './IngredientsContainer'
import RecipesContainer from './RecipesContainer'
import FavoritesContainer from './FavoritesContainer'
import './App.css';

// let url = `https://api.yummly.com/v1/api/recipes?_app_id=${APP_ID}&_app_key=${APP_KEY}`

class App extends Component {

  state = {
    ingredientInput: '',
    allowedIngredients: '',
    ingredients: [],
    recipes: [],
    noResults: false,
    showFavoritesContainer: false
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
    // fetch(`${newUrl}`)
    // .then(res => res.json())
    // .then(json => {
    //   this.setState({recipes: json.matches})
    // })
  }

  showFavoritesContainer = () => {
    this.setState({
      showFavoritesContainer: true
    })
  }

  hideFavoritesContainer = event => {
    // event.target.parentNode.className = "hide-favorites-container"
    // console.log(event.target.parentNode)
    // debugger
    // this.changeState()
    // setTimeout(() => {
      this.setState({
        showFavoritesContainer: false
      })
    // }, 2000)
  }

  changeState = () => {
    this.setState({
        showFavoritesContainer: false
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
        recipe_object: recipe,
        user: this.state.user
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
    // console.log(this.signUpLogIn);
    return (
      <div>
        {this.props.loggedIn ? <LoggedInHeader /> : <LoggedOutHeader />}
        <SearchBar
          handleIngredientSubmit={this.handleIngredientSubmit}
          handleChange={this.handleChange}
          hideSignUpLogIn={this.hideSignUpLogIn}
          ingredientInput={this.state.ingredientInput}
        />
        <IngredientsContainer
          ingredients={this.state.ingredients}
          setAllowedIngredients={this.setAllowedIngredients}
          removeIngredient={this.removeIngredient}
          hideSignUpLogIn={this.hideSignUpLogIn}
          reset={this.reset}
        />
        <RecipesContainer
          ingredients={this.state.ingredients}
          recipes={this.state.recipes}
          noResults={this.state.noResults}
          hideFavoritesContainer={this.hideFavoritesContainer}
          saveFavorite={this.saveFavorite}
        />
        {this.state.showFavoritesContainer ? <FavoritesContainer hideSignUpLogIn={this.hideSignUpLogIn} hideFavoritesContainer={this.hideFavoritesContainer} /> : null}
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
