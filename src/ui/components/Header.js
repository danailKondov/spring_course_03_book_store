import React from 'react'
import {Link} from 'react-router-dom'
import {ACCESS_TOKEN, ROLE_ADMIN} from "./Const";
const jwt = require('jsonwebtoken');

export class Header extends React.Component {

    state = {
        isAuthenticated: false,
        isAdmin: false,
        roles: [],
        userName: ''
    };

    componentDidMount() {
        this.updateTokenStatus();
        window.headerComponent = this;
    }

    componentWillUnmount() {
        window.headerComponent = null;
    }

    updateTokenStatus = () => {
        let token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            let decodedToken = jwt.decode(token);
            if (decodedToken.exp > Date.now() / 1000) {
                const roles = decodedToken.role;
                const isAdmin = roles.includes(ROLE_ADMIN);
                this.setState({
                    isAuthenticated: true,
                    isAdmin: isAdmin,
                    roles: roles,
                    userName: decodedToken.sub
                });
            } else {
                this.handleLogout();
            }
        }
    };

    handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            isAuthenticated: false,
            isAdmin: false,
            roles: [],
            userName: ''
        });
        this.props.history.push("/");
    };

    render() {

        const {isAuthenticated, isAdmin, userName} = this.state;

        return (
            <header>
                <nav>
                    <Link className="btn btn-default links" to='/'>Книги</Link>
                    <Link className="btn btn-default links" to='/cart'>Корзина</Link>
                    <Link className="btn btn-default links" to='/info'>Контакты</Link>
                    {
                        isAdmin ? <Link className="btn btn-default links" to='/admin'>Панель администратора</Link> : null
                    }

                    <div className="auth_block">
                        {
                            isAuthenticated ?
                                <div>
                                    <p className="username left">Пользователь: {userName}</p>
                                    <button className="btn btn-default links right" onClick={this.handleLogout}>Выход</button>
                                </div>
                                 :
                                <div>
                                    <Link className="btn btn-default links left" to='/signin'>Регистрация</Link>
                                    <Link className="btn btn-default links right" to='/login'>Вход</Link>
                                </div>
                        }
                    </div>
                    <hr/>
                </nav>
            </header>
        )
    }
}