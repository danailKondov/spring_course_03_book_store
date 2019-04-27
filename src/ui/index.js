import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import AdminPanel from "./components/AdminPanel";
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/admin" component={AdminPanel} />
            <Route component={() => <h2>Ресурс не найден</h2>} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
