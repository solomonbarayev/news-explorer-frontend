import './App.css';

//import react router dom
import { Switch, Route } from 'react-router-dom';

import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/saved-news">
          <SavedNews />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

// const [isHome, setIsHome] = useState(true);
// const location = useLocation();

// useEffect(() => {
//   if (location.pathname !== '/') {
//     setIsHome(false);
//   }
// }, [location]);
