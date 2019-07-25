const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_REGISTER_PENDING = 'SET_REGISTER_PENDING';
const SET_REGISTER_SUCCESS = 'SET_REGISTER_SUCCESS';
const SET_REGISTER_ERROR = 'SET_REGISTER_ERROR';
const LOG_OUT = 'LOG_OUT';

export function login(email, password , userPass) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(email, password, userPass, error => {
      dispatch(setLoginPending(false));
      if (!error) {
        dispatch(setLoginSuccess(true));
      } else {
        dispatch(setLoginError(error));
      }
    });
  }
}

export function logout() {
  return dispatch => {
    dispatch(refreshlog(true));
  }
}

export function register(email, password , userEmail , userPass) {
  return dispatch => {
    dispatch(setRegisterPending(true));
    dispatch(setRegisterSuccess(false));
    dispatch(setregistorError(null));

    callregisterApi(email, password, userEmail , userPass, error => {
      dispatch(setRegisterPending(false));
      if (!error) {
        dispatch(setRegisterSuccess(true));
      } else {
        dispatch(setregistorError(error));
      }
    });
  }
}

function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

function setRegisterPending(isRegisterPending) {
  return {
    type: SET_REGISTER_PENDING,
    isRegisterPending
  };
}

function setRegisterSuccess(isRegisterSuccess) {
  return {
    type: SET_REGISTER_SUCCESS,
    isRegisterSuccess
  };
}

function setregistorError(registorError) {
  return {
    type: SET_REGISTER_ERROR,
    registorError
  }
}

function refreshlog(logOut)
{
  return{
    type:LOG_OUT,
    logOut
  }
}

function callLoginApi(email, password, userPass, callback) {
  setTimeout(() => {
    if (userPass) {
      return callback(null);
    } else {
      return callback(new Error('Invalid email and password'));
    }
  }, 1000);
}

function callregisterApi(email, password, userEmail , userPass, callback) {
  setTimeout(() => {
    if (userEmail && userPass) {
      return callback(null);
    } else {
      return callback(new Error('Invalid email and password'));
    }
  }, 1000);
}

export default function reducer(state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
  isRegisterSuccess:false,
  isRegisterPending:false,
  registorError:null
}, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });
      case SET_REGISTER_PENDING:
        return Object.assign({}, state, {
          isRegisterPending: action.isRegisterPending
        });
  
      case SET_REGISTER_SUCCESS:
        return Object.assign({}, state, {
          isRegisterSuccess: action.isRegisterSuccess
        });
  
      case SET_REGISTER_ERROR:
        return Object.assign({}, state, {
          registorError: action.registorError
        });
        case LOG_OUT:
        return Object.assign({}, state, {
          isLoginSuccess: false,
          isLoginPending: false,
          loginError: null,
          isRegisterSuccess:false,
          isRegisterPending:false,
          registorError:null
        });
    default:
      return state;
  }
}