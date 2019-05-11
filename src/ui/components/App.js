import React from 'react'
import './css/store.css'
import {Header} from "./Header";
import MainBookPanel from "./MainBookPanel";
import {getAllBooks} from "./Service";

export default class App extends React.Component {

    state = {
        books: [],
        isLoading: false,
    };

    componentDidMount() {
        const books = sessionStorage.getItem("book_items");
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
                sessionStorage.setItem("book_items", JSON.stringify(books));
            });
    };

    render() {

        const books = this.state.books;

        return (
            <React.Fragment>
                <Header/>
                <MainBookPanel books={books}/>
            </React.Fragment>
        )
    }
}