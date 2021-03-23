import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './screens/Home';
import Player from './screens/Player';
import Description from './screens/Description';

function Routes(){

    return (
        <Router>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/player" component={Player} />
                <Route path="/description" component={Description} />
            </Switch>
        </Router>
    );

}
export default Routes;