import React from 'react';
import '../css/store.css';
import deleteImg from '../img/delete.jpg';
import {getAllBooks} from "../Service";
import {Counter} from "./Counter";
import {Header} from "../Header";

export default class Cart extends React.Component {

    state = {
        order: []
    };

    componentDidMount() {
        let cart = sessionStorage.getItem("books_cart");
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
        const cart = JSON.parse(sessionStorage.getItem("books_cart"));
        const newCart = cart.filter(book => book.id !== id);
        sessionStorage.setItem("books_cart", JSON.stringify(newCart));

        const newOrder = this.state.order.filter(book => book.id !== id);
        this.setState({order: newOrder});
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
                </div>
            </React.Fragment>
        )
    }
}