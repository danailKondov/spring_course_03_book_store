import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import AdminPanel from "./components/admin/AdminPanel";
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import Cart from "./components/cart/Cart";
import SignIn from "./components/auth/SignIn";
import LogIn from "./components/auth/LogIn";
import Purchase from "./components/cart/Purchase";


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/admin" component={AdminPanel} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/purchase" component={Purchase} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/login" component={LogIn} />
            <Route component={() => <h2>Ресурс не найден</h2>} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
