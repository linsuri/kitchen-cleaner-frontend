const defaultState = {
  user: null,
  loggedIn: false,
  failedLogin: false,
  error: null,
  openSignUpLogInBoolean: false,
  showLogInFormBoolean: true,
  showMenuBoolean: false,
}

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
      }
    case 'FAILED_LOGIN':
      return {
        ...state,
        failedLogin: true,
        error: action.payload,
      }
    case 'LOG_OUT':
      return {
        ...state,
        user: null,
        loggedIn: false,
        failedLogin: false,
        error: null,
      }
    case 'OPEN_SIGN_UP_LOG_IN':
      return {
        ...state,
        error: null,
        openSignUpLogInBoolean: !state.openSignUpLogInBoolean,
      }
    case 'SHOW_LOG_IN_FORM':
      return {
        ...state,
        error: null,
        showLogInFormBoolean: true,
      }
    case 'SHOW_SIGN_UP_FORM':
      return {
        ...state,
        error: null,
        showLogInFormBoolean: false,
      }
    case 'SHOW_MENU':
      return {
        ...state,
        showMenuBoolean: true,
      }
    case 'HIDE_MENU':
      return {
        ...state,
        showMenuBoolean: false,
      }
    default:
      return state
  }
}

export default usersReducer
