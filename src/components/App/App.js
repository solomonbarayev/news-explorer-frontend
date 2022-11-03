import './App.css';

//import react router dom
import { Switch, Route } from 'react-router-dom';

import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import Popups from '../Popups/Popups';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/saved-news">
          <SavedNews />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
      <Footer />

      <Popups />
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
