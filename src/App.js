import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/navigation/navigation';
import PostList from './components/content/post/PostList/PostList';
import Account from './components/content/account/Account';
import PostForm from './components/content/post/PostForm/PostForm';
import Footer from './components/footer/footer';
import { UserProvider } from './context/userContext';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
  
  return (
    <Router>
      <UserProvider>
        <Navigation />
      
        <Switch>
          
          <Route path="/signin">
            <Account action="signin" />
          </Route>

          <Route path="/createAccount">
            <Account action="createAccount" />
          </Route>

          <Route path="/myAccount">
            <Account action="account" />
          </Route>

          <Route path="/posts/new">
            <PostForm action="new" />
          </Route>

          <Route path="/posts/update/:id">
            <PostForm action="update" />
          </Route>

          <Route path="/posts/list/:user">
            <PostList />
          </Route>

          <Route path="/">
            <Redirect to="/posts/list/all" />
          </Route>
        </Switch>

        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
