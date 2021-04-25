import Home from './components/pages/Home';
import Charts from './components/pages/Charts';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:name" component={Charts} />
      </Switch>
    </Router>
  );
};

export default App;
