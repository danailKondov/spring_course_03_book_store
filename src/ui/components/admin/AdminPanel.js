import React from 'react'
import Modal from 'react-modal';
import {AddBook} from "./Add";
import BookTable from "./BookTable";
import {getAllBooks} from "../Service";
import {EditBook} from "./EditBook";
import '../css/store.css'
import {Link} from "react-router-dom";
import {ACCESS_TOKEN} from "../Const";

Modal.setAppElement('#root');

export default class AdminPanel extends React.Component {

    state = {
        books: [],
        isLoading: false,
        bookIdToEdit: '',
        isShowEdit: false,
        isShowAdd: false
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

    handleAddBook = (book) => {
        const newBooks = [book, ...this.state.books];
        this.setState({books: newBooks});
    };

    handleDeleteBook = (id) => {
        const isNotId = book => book.id !== id;
        const updatedBooks = this.state.books.filter(isNotId);
        this.setState({books: updatedBooks});
    };

    handleEditView = (id) => {
        this.setState({bookIdToEdit: id, isShowEdit: true});
    };

    closeEditView = () => {
        this.setState({isShowEdit: false});
    };

    closeAddView = () => {
        this.setState({isShowAdd: false});
    };

    openAddView = () => {
        this.setState({isShowAdd: true});
    };

    handleUpdateBook = (updatedBook) => {
        const filteredBooks = this.state.books.filter(book => book.id !== updatedBook.id);
        const updBooks = [updatedBook, ...filteredBooks];
        this.setState({books: updBooks})
    };

    handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        this.props.history.push("/");
    };

    render() {

        const {books, bookIdToEdit, isShowEdit, isShowAdd} = this.state;

        return (
            <React.Fragment>
                <h1>Панель администратора</h1>

                <Link className="btn btn-default book_buttons" to="/"> На главную страницу</Link>

                <button
                    className='btn btn-default book_buttons'
                    onClick={this.openAddView}
                >
                    Добавить новую книгу
                </button>

                <button
                    className="btn btn-default book_buttons"
                    onClick={this.handleLogout}
                >
                    Выход
                </button>

                <BookTable
                    books={books}
                    onDelete={this.handleDeleteBook}
                    onEditView={this.handleEditView}
                />

                <Modal
                    isOpen={isShowEdit}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={this.closeEditView}
                    className="Modal"
                    overlayClassName="Overlay"
                    contentLabel="ModalLabel"
                >
                    <EditBook
                        bookId={bookIdToEdit}
                        onUpdate={this.handleUpdateBook}
                    />
                    <button
                        className='btn btn-default'
                        onClick={this.closeEditView}
                    >
                        Закрыть
                    </button>
                </Modal>

                <Modal
                    isOpen={isShowAdd}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={this.closeAddView}
                    className="Modal"
                    overlayClassName="Overlay"
                    contentLabel="ModalLabel"
                >
                    <AddBook onAdd={this.handleAddBook}/>
                    <button
                        className='btn btn-default'
                        onClick={this.closeAddView}
                    >
                        Закрыть
                    </button>
                </Modal>
            </React.Fragment>
        )
    }
}