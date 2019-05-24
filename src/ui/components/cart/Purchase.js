import React from 'react';
import '../css/store.css';
import {Header} from "../Header";
import {getFileByPass} from "../Service";
import {BOOKS_CART} from "../Const";

export default class Purchase extends React.Component {

    state = {
        isLoadingContent: false,
        content: [],
        cart: []
    };

    componentDidMount() {
        this.setState({cart: JSON.parse(sessionStorage.getItem(BOOKS_CART))});
        if (this.props.location.state) {
            const passes = this.props.location.state.passes;
            // выдаем ссылки на купленные книги
            passes.forEach(pass => this.getBookContentByPass(pass));
            // очишаем корзину
            sessionStorage.removeItem(BOOKS_CART);
        }
    }

    getBookContentByPass = (pass) => {
        this.setState({isLoadingContent: true});
        getFileByPass(pass.passId)
            .then(response => {
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response)
                } else {
                    return Promise.reject(new Error('Error loading content with pass: ' + pass))
                }
            })
            .then(response => {
                return response.blob();
            })
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res], { type: 'application/pdf' }));
                this.setState({
                    content: [...this.state.content, {url: url, bookId: pass.bookId}],
                    isLoadingContent: false}
                );
            })
    };

    render() {

        const content = this.state.content;
        const cart = this.state.cart;

        return (
            <React.Fragment>
                <Header history={this.props.history}/>
                <p className="message">Сохраните книги по ссылкам ниже: </p>
                <div className='purchase_content'>
                    {content.map(book => {
                        const cartBook = cart.find(b => b.id === book.bookId);
                        let bookName = cartBook ? cartBook.authors + ' ' + cartBook.title : 'книга';
                        return <div>
                            <a href={book.url}
                               target='_blank'
                            >
                                {bookName}
                            </a>
                        </div>}
                    )}
                </div>
            </React.Fragment>
        )
    }
}