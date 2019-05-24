import React from 'react';
import '../css/store.css';
import deleteImg from '../img/delete.jpg';
import {Counter} from "./Counter";
import {Header} from "../Header";
import {ACCESS_TOKEN, BOOKS_CART, ROLE_USER} from "../Const";
import {buyOrder} from "../Service";
const jwt = require('jsonwebtoken');

export default class Cart extends React.Component {

    state = {
        order: []
    };

    componentDidMount() {
        let cart = sessionStorage.getItem(BOOKS_CART);
        if (cart) {
            let order = JSON.parse(cart).map(book => { return {
                id: book.id,
                title: book.title,
                authors: book.authors,
                genre: book.genre,
                price: book.price,
                quantity: 1,
                totalPrice: book.price}});
            this.setState({order});
        }
    }

    onQuantityChangePlus = (id) => {
        let newOrder = this.state.order.slice(0);
        let book = newOrder.find(book => book.id === id);
        book.quantity++;
        book.totalPrice = book.quantity * book.price;
        this.setState({order: newOrder});
    };

    onQuantityChangeMinus = (id) => {
        let newOrder = this.state.order.slice(0);
        let book = newOrder.find(book => book.id === id);
        if (book.quantity > 1) {
            book.quantity--;
        }
        book.totalPrice = book.quantity * book.price;
        this.setState({order: newOrder});
    };

    removeItemFromOrder = (id) => {
        const cart = JSON.parse(sessionStorage.getItem(BOOKS_CART));
        const newCart = cart.filter(book => book.id !== id);
        sessionStorage.setItem(BOOKS_CART, JSON.stringify(newCart));

        const newOrder = this.state.order.filter(book => book.id !== id);
        this.setState({order: newOrder});
    };

    validate = () => this.state.order.length > 0;

    handleSubmitOrder = () => {
        let token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            let decodedToken = jwt.decode(token);
            const isNotExpired = decodedToken.exp > Date.now() / 1000;
            const isUser = decodedToken.role.includes(ROLE_USER);
            if (isNotExpired && isUser) {
                const userName = decodedToken.sub;
                const orderRequest = {
                    customer: userName,
                    date: Date.now(),
                    books: this.state.order
                };
                buyOrder(orderRequest)
                    .then(resp => resp.json())
                    .then(orderResponse => {
                        if (orderResponse.successful) {
                            this.props.history.push({
                                pathname: "/purchase",
                                state: {passes: orderResponse.passes} // this.props.location.state.passes
                            });
                        }
                    });
                this.setState({});
            } else {
                this.redirectToLogin(
                    isUser ?
                        'Для покупки необходимо зарегистрироваться и/или войти' :
                    'Покупки может совершать только пользователь. Необходимо перелогиниться.'
                );
            }
        } else {
            this.redirectToLogin('Для покупки необходимо зарегистрироваться и/или войти');
        }
    };

    redirectToLogin = (message) => {
        this.props.history.push({
            pathname: "/login",
            state: {source: 'login', message: message} // this.props.location.state.source
        });
    };

    render() {

        const order = this.state.order;
        let orderPrice = this.state.order.reduce((sum, book) => sum + book.totalPrice, 0);

        return (
            <React.Fragment>
                <Header history={this.props.history}/>
                <div className="table_container">
                    <table className="table" id="carttable">
                        <thead>
                        <tr>
                            <th>Название</th><th>Автор</th><th>Жанр</th><th>Количество</th><th>Цена</th><th>Стоимость</th>
                        </tr>
                        </thead>
                        <tbody id="tablebody">
                        {
                            order.map(({id, title, authors, genre, price, quantity, totalPrice}, i) => (
                                <tr key={"tableRow" + i}>
                                    <td>{title}</td>
                                    <td>{authors}</td>
                                    <td>{genre}</td>
                                    <td>
                                        <Counter
                                            onQuantityChangePlus={this.onQuantityChangePlus}
                                            onQuantityChangeMinus={this.onQuantityChangeMinus}
                                            bookId={id}
                                        >
                                            {quantity}
                                        </Counter>
                                    </td>
                                    <td>{price}</td>
                                    <td>{totalPrice}</td>
                                    <td><img src={deleteImg} className="delete_img" onClick={() => this.removeItemFromOrder(id)}/></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <p>{`Всего: ${orderPrice} руб.`}</p>
                    <button
                        className='btn btn-primary submit_buy'
                        onClick={this.handleSubmitOrder}
                        disabled={!this.validate()}>
                        Купить
                    </button>
                </div>
            </React.Fragment>
        )
    }
}