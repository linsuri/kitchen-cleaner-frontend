export const signUp = (user_name, password) => {
  return (dispatch) => {
    fetch("https://kitchen-cleaner-backend.herokuapp.com/api/v1/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          user_name: user_name,
          password: password,
        }
      })
    })
    .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
    .then(json => {
      localStorage.setItem('jwt', json.jwt)
      dispatch({ type: 'SET_CURRENT_USER', payload: json.user })
    })
    .catch(r => r.json().then(json => dispatch({ type: 'FAILED_LOGIN', payload: json.errors })))
  }
}

export const logIn = (user_name, password) => {
  return (dispatch) => {
    fetch("https://kitchen-cleaner-backend.herokuapp.com/api/v1/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          user_name: user_name,
          password: password,
        }
      })
    })
    .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
    .then(json => {
      localStorage.setItem('jwt', json.jwt)
      dispatch({ type: 'SET_CURRENT_USER', payload: json.user })
    })
    .catch(r => r.json().then(json => dispatch({ type: 'FAILED_LOGIN', payload: json.message })))
  }
}

export const fetchCurrentUser = () => {
  return (dispatch) => {
    fetch("https://kitchen-cleaner-backend.herokuapp.com/api/v1/profile", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(response => response.json())
    .then((json) => dispatch(setCurrentUser(json.user)))
  }
}

export const setCurrentUser = userData => ({
  type: 'SET_CURRENT_USER',
  payload: userData,
})

export const failedLogin = errorMsg => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

export const logOut = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch({ type: 'LOG_OUT' })
  }
}

export const openSignUpLogIn = () => ({
  type: 'OPEN_SIGN_UP_LOG_IN',
})

export const showLogInForm = () => ({
  type: 'SHOW_LOG_IN_FORM',
})

export const showSignUpForm = () => ({
  type: 'SHOW_SIGN_UP_FORM',
})

export const showMenu = () => ({
  type: 'SHOW_MENU',
})

export const hideMenu = () => ({
  type: 'HIDE_MENU',
})

export const addSavedRecipe = recipe_object => ({
  type: 'ADD_SAVED_RECIPE',
  payload: recipe_object,
})

export const deleteSavedRecipe = recipe_object => ({
  type: 'DELETE_SAVED_RECIPE',
  payload: recipe_object,
})
