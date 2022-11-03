import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import Popups from '../Popups/Popups';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <ProtectedRoute path="/saved-news">
          <SavedNews />
        </ProtectedRoute>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <Footer />

      <Popups />
    </div>
  );
}

export default App;
