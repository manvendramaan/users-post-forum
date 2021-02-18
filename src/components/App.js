import { BrowserRouter, Route, Switch } from "react-router-dom";

import PostsList from './PostsList';
import User from './User';
import Post from './Post';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ PostsList } />
        <Route path="/user/:userId" component={ User } />
        <Route path="/post/:id" component={ Post } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
