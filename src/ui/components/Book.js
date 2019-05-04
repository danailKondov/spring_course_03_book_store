import React from 'react'
import './css/store.css'
import {getFileById} from "./Service";

export default class Book extends React.Component {

    state = {
        authors: ' ',
        title: ' ',
        genre: ' ',
        description: ' ',
        coverId: ' ',
        cover: null
    };

    componentDidMount() {
        const {authors, title, genre, description, coverId} = this.props.book;
        this.setState({authors, title, genre, description});

        getFileById(coverId)
            .then(response => {
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response)
                } else {
                    return Promise.reject(new Error('Error loading cover with id: ' + coverId))
                }
            })
            .then(response => response.blob())
            .then(blob => {
                let reader = new FileReader();
                reader.onload = (e) => {
                    let url = e.target.result;
                    this.setState({cover: url});
                };
                reader.readAsDataURL(blob);
            });
    }

    handleDetails = () => {};

    handleSubmitToCart = () => {};

    render() {

        const {authors, title, genre, description, cover} = this.state;

        return (
            <React.Fragment>
                <div className="book">
                    <img className="book_img" src={cover}/>
                    <p className="book_text authors">{authors}</p>
                    <p className="book_text title">{title}</p>
                    <p className="book_text genre">{genre}</p>
                    <div className="book_buttons_box">
                        <button
                            className='btn btn-default book_buttons'
                            onClick={this.handleDetails}>
                            Подробнее
                        </button>
                        <button
                            className='btn btn-default book_buttons'
                            onClick={this.handleSubmitToCart}>
                            В корзину
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}