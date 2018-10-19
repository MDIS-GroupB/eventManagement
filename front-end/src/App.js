import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import { setApiToken } from './api/init'
import * as authAPI from './api/auth'
import 'react-toastify/dist/ReactToastify.min.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './custom.css'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

// Pages
import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import NavBar from '../src/components/molecules/NavBar';

import './App.css';

//Token and storing
const tokenKey = 'userToken'
const savedToken = localStorage.getItem(tokenKey)
// const savedToken = null
setApiToken(savedToken)
// injectTapEventPlugin()


class App extends Component {

  state = {
    token: savedToken,
    error: null,
    createAccount: true
  }
  
  handleError = (error) => {
    // console.log(error)
    toast.error(error)
  }

  handleSignIn = ({ email, password }) => {
    authAPI.signIn({ email, password })
      .then(json => {

        console.log(json)
        this.setToken(json.token)
      })
      .catch(error => {
        this.handleError(error.message)
      })
  }

  handleRegister = ({ email, password,firstName,lastName }) => {
    authAPI.register({ email, password,firstName,lastName })
      .then(json => {
        this.setToken(json.token)
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  handleSignOut = () => {
    this.setToken(null)
  }

  // setToken(null) === signOut()
  setToken = (token) => {
    if (token) {
      localStorage.setItem(tokenKey,token)
    } else {
      localStorage.removeItem(tokenKey)
    }
    setApiToken(token)
    this.setState({ token: token })
  }

  componentDidMount(){
    authAPI.init(this.handleError)
  }

  render() {
    return (
      <div className="App">
      <Router>
        {/* apply app theme*/}
        <MuiThemeProvider>
          <main>
            <ToastContainer
              position="top-right"
              hideProgressBar={ false }
              newestOnTop={ false }
              closeOnClick
            />
            <NavBar
              signedIn={ !!this.state.token }
              logOut={
                () => {
                  console.log('asdf')
                  this.setToken(null)
                }
              }
            />
            <Switch>
              { !!this.state.token ?
                (
                  <Route
                    path='/'
                    render={
                      ({location}) => <HomePage
                        pathname={location.pathname.substring(1)}
                        handleError={ this.handleError }
                      />
                    }
                  />
                ) : (
                  // <h1>"Login"</h1>
                  <Route
                    path='/'
                    render={
                      () => <LoginPage
                        handleErrors={this.handleError}
                        setToken={ this.setToken }
                        onSignIn={ this.handleSignIn }
                        onRegister={ this.handleRegister }
                      />
                    }
                  />
                )
              }
              {/* <Route
                exact path='/devices/:deviceId'
                render={
                  ({ match }) => {
                    const deviceId = match.params.deviceId
                    return (
                      <DevicePage
                        handleError={ this.handleError }
                        deviceId={ deviceId }
                      />
                    )
                  }
                }
              />
              <Route
                path='/test'
                render={
                  () => (<TestPage/>)
                }
              />
              <Route
                render={
                  ({ location }) => <p>{
                    location.pathname
                  } not found</p>
                }
              /> */}
            </Switch>
          </main>
        </MuiThemeProvider>
      </Router>
      </div>
    );
  }
}

export default App;
