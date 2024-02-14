import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './login';
import Signup from './Signup';
import App from './App';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
