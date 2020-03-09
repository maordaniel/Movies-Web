import React from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import HomePage from "../Pages/HomePage"

function Router() {
    const Error = () =>{
        return(
            <div >
                <h1>This Page Is Not Found!</h1>
            </div>
    )};
    return(
        <BrowserRouter >
            <Switch >
                <Route exact path='/' component={HomePage}/>
                <Route component={Error}/>
            </Switch>
        </BrowserRouter>

    )
}

export default Router;
