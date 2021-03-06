import React from 'react'
import PropTypes from 'prop-types'
import {Link, withRouter} from "react-router-dom";
import '../css/store.css'
import {deleteById} from "../Service";

class BookTable extends React.Component {

    state = {
        books: [],
    };

    static defaultProps = {
        books: []
    };

    static getDerivedStateFromProps(props, state) {
        let books = [...props.books];
        return {
            books: books,
        }
    }

    componentDidMount() {
        this.setState({books: this.props.books})
    }

    handleDelete = (id) => {
        deleteById(id)
            .then(resp => {
                if (resp.ok) {
                    this.props.onDelete(id);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    render() {

        let books = this.state.books;

        return(
            <div className="table_container">
            <table className="table" id="bookstable">
                <thead>
                <tr>
                    <th>Идентификатор</th><th>Название</th><th>Автор</th><th>Жанр</th><th>Описание</th><th>Действие</th>
                </tr>
                </thead>
                <tbody id="tablebody">
                    {
                        books.map(({id, title, authors, genre, description}, i) => (
                            <tr key={"tableRow" + i}>
                                <td>{id}</td>
                                <td>{title}</td>
                                <td>{authors}</td>
                                <td>{genre}</td>
                                <td>{description}</td>
                                <td>
                                    <button
                                        className='btn btn-default'
                                        onClick={() => this.props.onEditView(id)}>
                                        Edit
                                    </button>
                                    <button
                                        className='btn btn-default'
                                        onClick={() => this.handleDelete(id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        )
    }
}

BookTable.propTypes = {
    books: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEditView: PropTypes.func.isRequired
};

export default withRouter(BookTable);