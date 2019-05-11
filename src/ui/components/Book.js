import React from 'react'
import Modal from 'react-modal';
import './css/store.css'
import {getFileById} from "./Service";

Modal.setAppElement('#root');

export default class Book extends React.Component {

    state = {
        id: ' ',
        authors: ' ',
        title: ' ',
        genre: ' ',
        description: ' ',
        price: 0,
        isAvailable: null,
        coverId: ' ',
        isBookViewOpen: false,
        isBookOnCart: false
    };

    componentDidMount() {
        const {id, authors, title, genre, description, coverId, isAvailable, price} = this.props.book;
        this.setState({id, authors, title, genre, description, coverId, isAvailable, price});

        let cart = sessionStorage.getItem("books_cart");
        if (cart) {
            let jsonCart = JSON.parse(cart);
            let bookOnCard = jsonCart.find(book => book.id === id);
            if (bookOnCard) {
                this.setState({isBookOnCart: true});
            }
        }
    }

    closeBookView = () => {
        this.setState({isBookViewOpen: false});
    };

    handleBookViewOpen = () => {
        this.setState({isBookViewOpen: true});
    };

    handleSubmitToCart = () => {
        this.setState({isBookOnCart: true});
        let cart = sessionStorage.getItem("books_cart");
        let jsonCart = [];
        if (cart) {
            jsonCart = JSON.parse(cart);
        }
            jsonCart.push(this.props.book);
            sessionStorage.setItem("books_cart", JSON.stringify(jsonCart));
    };

    render() {

        const {authors, title, genre, description, price, isBookViewOpen, isBookOnCart, isAvailable, coverId} = this.state;

        return (
            <React.Fragment>
                <div className={isAvailable ? 'book' : 'book not_available'}>
                    <img className="book_img" src={"/api/books/file/" + coverId}/>
                    <p className="book_text authors">{authors}</p>
                    <p className="book_text title">{title}</p>
                    <p className="book_text genre">{genre}</p>
                    <p className="book_text price">{`Цена: ${price}`}</p>
                    {
                        isAvailable ? null : <p className="book_text">Книги нет в наличии</p>
                    }
                    <div className="book_buttons_box">
                        <button
                            className='btn btn-default book_buttons'
                            onClick={this.handleBookViewOpen}>
                            Подробнее
                        </button>
                        <button
                            className={isBookOnCart ? 'btn btn-default book_buttons_chosen' : 'btn btn-default book_buttons'}
                            disabled={isBookOnCart || !isAvailable}
                            onClick={this.handleSubmitToCart}>
                            {isBookOnCart ? 'Выбрана' : 'В корзину'}
                        </button>
                    </div>
                </div>
                <Modal
                    isOpen={isBookViewOpen}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={this.closeBookView}
                    className="Modal"
                    overlayClassName="Overlay"
                    contentLabel="ModalLabel"
                >
                    <img className="book_img_large" src={"/api/books/file/" + coverId}/>
                    <p className="book_text authors">{authors}</p>
                    <p className="book_text title">{title}</p>
                    <p className="book_text genre">{genre}</p>
                    <p className="book_text description">{description}</p>
                    {
                        isAvailable ? null : <p>Книги нет в наличии</p>
                    }
                    <button
                        className={isBookOnCart ? 'btn btn-default book_buttons_chosen' : 'btn btn-default book_buttons'}
                        disabled={isBookOnCart || !isAvailable}
                        onClick={this.handleSubmitToCart}>
                        {isBookOnCart ? 'Выбрана' : 'В корзину'}
                    </button>
                    <button
                        className='btn btn-default'
                        onClick={this.closeBookView}
                    >
                        Закрыть
                    </button>
                </Modal>
            </React.Fragment>
        )
    }
}