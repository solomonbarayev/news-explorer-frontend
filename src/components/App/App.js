import './App.css';

//import react router dom
import { Switch, Route } from 'react-router-dom';

import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';

import { useIsHome } from '../../contexts/IsHomeContext';

function App() {
  const { isHome } = useIsHome();

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main isHome={isHome} />
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
