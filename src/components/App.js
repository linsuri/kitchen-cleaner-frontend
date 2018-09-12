import React, { Component } from 'react';
import AppHeader from './AppHeader'
import SearchBar from './SearchBar'
import IngredientsContainer from './IngredientsContainer'
import RecipesContainer from './RecipesContainer'
import SignUpLogIn from './SignUpLogIn'
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
    showSignUpLogIn: false,
    usernameInput: '',
    errorMesssage: '',
    loggedin: false,
    user: {},
    showFavoritesContainer: false
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

  showSignUpLogIn = () => {
    this.setState({
      showSignUpLogIn: true
    })
  }

  hideSignUpLogIn = () => {
    this.setState({
      showSignUpLogIn: false
    })
  }

  handleUsernameInput = event => this.setState({usernameInput: event.target.value})

  signUp = event => {
    event.preventDefault()
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.usernameInput
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.errors) {
        this.setState({
          errorMesssage: json.errors,
          usernameInput: ''
        })
      } else {
        this.setState({
          user: json,
          usernameInput: '',
          loggedin: true,
          showSignUpLogIn: false
        }, () => console.log(this.state.user))
      }
    })
  }

  logIn = event => {
    event.preventDefault()
    fetch("http://localhost:3000/api/v1/users")
    .then(res => res.json())
    .then(json => {
      let findUser = json.find(user => user.name === this.state.usernameInput)
      if (findUser) {
        this.setState({
          user: findUser,
          usernameInput: '',
          loggedin: true,
          showSignUpLogIn: false
        }, () => console.log(this.state.user))
      } else {
        this.setState({
          errorMesssage: 'Invalid username',
          usernameInput: ''
        })
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
        {this.state.showSignUpLogIn ? <SignUpLogIn signUp={this.signUp} logIn={this.logIn} usernameInput={this.state.usernameInput} handleUsernameInput={this.handleUsernameInput} errorMesssage={this.state.errorMesssage} /> : null}
        <AppHeader
          showSignUpLogIn={this.showSignUpLogIn}
          hideSignUpLogIn={this.hideSignUpLogIn}
          showFavoritesContainer={this.showFavoritesContainer}
          loggedin={this.state.loggedin}
          user={this.state.user}
        />
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

export default App;
