import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const Login = React.lazy(() => import('./views/pages/login/Login'));

class App extends Component {

  
  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
            <Route path="/Dashboard" name="Dashboard" render={props => <TheLayout {...props}/>} />            
            <Route path="/users/:id" name="Usuario" render={props => <TheLayout {...props}/>} />
            <Route path="/User/Api/:id" name="Usuario" render={props => <TheLayout {...props}/>} />
            <Route path="/User/Password/:id" name="Usuario" render={props => <TheLayout {...props}/>} />
            <Route path="/User/Password" name="Usuario" render={props => <TheLayout {...props}/>} />
            <Route path="/User/Add" name="Usuario" render={props => <TheLayout {...props}/>} />
            <Route path="/Usuarios" name="Usuario" render={props => <TheLayout {...props}/>} />
            <Route path="/" name="Login Page" render={props => <Login {...props}/>} />
            
            
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
