import Header from './components/header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import SignUp from './components/sign-up';
import store from '../src/storage';
import CreateBlog from './components/create-blog';
import { useState } from 'react';
import ReadBlog from './components/read-blog';
import MyBlogs from './components/my-blogs';
import ForgotPassword from './components/forgot-password';
import ResetPassword from './components/reset-password';

function App() {
  const [token, setToken] = useState(store.get('token'));
  return (
    <div className="container">
      <Header token={token} />

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route exact path="/login" render={(props) => <Login {...props} setTokenCallback={setToken} />}></Route>
          <Route exact path="/sign-up" component={SignUp}></Route>
          <Route exact path="/create-blog" component={CreateBlog}></Route>
          {token !== null && <Route exact path="/me" component={MyBlogs}></Route>}
          <Route exact path="/read-blog/:id" component={ReadBlog}></Route>
          <Route exact path="/forgot-password" component={ForgotPassword}></Route>
          <Route exact path="/reset-password/:email" component={ResetPassword}></Route>
          <Route path='*' exact={true} render={() => <h1 className="text-center text-danger">Page Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
