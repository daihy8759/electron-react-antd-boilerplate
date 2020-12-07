import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

/* Entries */
import App from '../entries/Index';
import MainPage from '../entries/Main';

const MainRouter = (
    <Router>
        <Route
            exact={false}
            path="/"
            render={(props) => (
                <App {...props}>
                    <Switch>
                        <Route path="/" component={MainPage} />
                    </Switch>
                </App>
            )}
        />
    </Router>
);

export default MainRouter;
