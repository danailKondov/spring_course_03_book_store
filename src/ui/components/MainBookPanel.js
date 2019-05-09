import React from 'react'
import './css/store.css'
import Book from "./Book";

export default class MainBookPanel extends React.Component {

    state = {
        books: [],
    };

    static getDerivedStateFromProps(props, state) {
        let books = [...props.books];
        return {
            books: books,
        }
    }

    componentDidMount() {
        this.setState({books: this.props.books});
    }

    render() {

        const books = this.state.books;

        return (
            <React.Fragment>
                <div className="bookPanel">
                    {books.map((book, i) => <Book key={"book-" + i} book={book}/>)}
                </div>
            </React.Fragment>
        )
    }
}