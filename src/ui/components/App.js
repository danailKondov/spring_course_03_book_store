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
        this.fetchBooks();
    }

    fetchBooks = () => {
        this.setState({ isLoading: true });
        getAllBooks()
            .then(response => response.json())
            .then(books => this.setState({isLoading: false, books: books}));
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