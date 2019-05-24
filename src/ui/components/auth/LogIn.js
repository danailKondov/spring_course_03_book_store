import React from 'react'
import '../css/store.css'
import {login} from "../Service";
import {ACCESS_TOKEN} from "../Const";
import {Header} from "../Header";

export default class LogIn extends React.Component {

    state = {
        name: '',
        password: '',
        message: ''
    };

    handleChange = (e) => {
        const { id, value } = e.currentTarget;
        this.setState({ [id]: value })
    };

    validate = () => {
        const { name, password } = this.state;
        if (name && name.trim() && password && password.trim()){
            return true;
        }
        return false;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const {name, password} = this.state;
        const authRequest = {name, password};

        login(authRequest)
            .then(resp => resp.json())
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.setState({message: 'Вход успешно осуществлен'});

                // обновляем хэдер
                window.headerComponent.updateTokenStatus();

                // если пришли из заказа, то после авторизации возвращаемся обратно
                if (this.props.location.state && this.props.location.state.source === 'login') {
                    this.props.history.push('/cart');
                }
            })
            .catch(error => {
                if(error.status === 401) {
                    this.setState({message: 'Имя или пароль неверны. Попробуйте еще раз!'});
                } else {
                    this.setState({message: error.message || 'Что-то пошло не так...'});
                }
            });
    };

    render() {

        const {name, password, message} = this.state;
        const locationState = this.props.location.state;

        return (
            <div>
                <Header history={this.props.history}/>
                <form className='form-horizontal'>
                    <div className='form-group'>
                        <div className='col-sm-10'>
                            <label>Логин
                                <input id='name'
                                       className='form-control'
                                       type='text'
                                       value={name}
                                       required={true}
                                       onChange={this.handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='col-sm-10'>
                            <label>Пароль
                                <input id='password'
                                       className='form-control'
                                       type='password'
                                       value={password}
                                       required={true}
                                       onChange={this.handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='col-sm-10'>
                            <button
                                className='btn btn-primary submit_login'
                                onClick={this.handleSubmit}
                                disabled={!this.validate()}>
                                Войти
                            </button>
                        </div>
                    </div>
                </form>
                {
                    message ? <p className="message">{message}</p> : null
                }
                {
                    locationState ? <p className="message">{locationState.message}</p> : null
                }
            </div>
        )
    }
}
