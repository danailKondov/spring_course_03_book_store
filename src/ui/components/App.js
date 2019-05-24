import React from 'react'
import './css/store.css'
import MainBookPanel from "./MainBookPanel";
import {getAllBooks} from "./Service";
import {Header} from "./Header";
import {BOOKS_ITEMS} from "./Const";

export default class App extends React.Component {

    state = {
        books: [],
        isLoading: false,
    };

    componentDidMount() {
        const books = sessionStorage.getItem(BOOKS_ITEMS);
        if (books) {
            this.setState({books: JSON.parse(books)});
        } else {
            this.fetchBooks();
        }
    }

    fetchBooks = () => {
        this.setState({ isLoading: true });
        getAllBooks()
            .then(response => response.json())
            .then(books => {
                this.setState({isLoading: false, books: books});
                sessionStorage.setItem(BOOKS_ITEMS, JSON.stringify(books));
            });
    };

    render() {

        const books = this.state.books;

        return (
            <React.Fragment>
                <Header history={this.props.history}/>
                <MainBookPanel books={books}/>
            </React.Fragment>
        )
    }
}