import React from 'react'
import '../css/store.css'
import {checkNameAvailability, saveUser} from "../Service";
import {Header} from "../Header";

export default class SignIn extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        addResult: null,
        errorMessage: ''
    };

    handleChange = (e) => {
        const { id, value } = e.currentTarget;
        this.setState({ [id]: value })
    };

    validate = () => {
        const { name, email, password } = this.state;
        if (name.trim() && email.trim() && password.trim()){
            return true;
        }
        return false;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const {name, email, password} = this.state;
        const user = {name, email, password};

        if (this.checkEmail(email)) {
            this.checkNameAndSave(user);
        }
    };

    checkNameAndSave = (user) => {
        return checkNameAvailability(user.name)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.isAvailable) {
                    this.saveUserToDB(user);
                } else {
                    this.setState({errorMessage: 'Имя ' + name + ' уже занято'});
                }
            })
            .catch((err) => {
                    this.setState(
                        {
                            addResult: false,
                            errorMessage: err.message || 'Error'
                        });
                }
            );
    };

    checkEmail = (email) => {
        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            this.setState({errorMessage: 'Неверный адрес электронной почты'});
            return false;
        }
        return true;
    };

    saveUserToDB = (user) => {
        saveUser(user)
            .then(resp => resp.json())
            .then(response => {
                if (response.success) {
                    this.setState({addResult: true});
                    this.props.history.push("/login");
                } else {
                    this.setState({addResult: false});
                }
            })
    };

    render() {

        const {name, email, password, addResult, errorMessage} = this.state;

        return (
            <div>
                <Header/>
                <form className='form-horizontal'>
                    <div className='form-group'>
                        <div className='col-sm-10'>
                            <label>ФИО
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
                            <label>Email
                                <input id='email'
                                       className='form-control'
                                       type='email'
                                       value={email}
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
                                className='btn btn-default'
                                onClick={this.handleSubmit}
                                disabled={!this.validate()}>
                                Добавить
                            </button>
                        </div>
                    </div>
                </form>
                {
                    addResult === true ?
                        <p className='goodMsg'>Регистрация прошла успешно</p> :
                        addResult === false ?
                            <p className='badMsg'>Что-то пошло не так...</p> :
                            null
                }
                {
                    errorMessage ? <p className='badMsg'>{errorMessage}</p> : null
                }
            </div>
        )
    }
}