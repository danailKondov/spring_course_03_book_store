import React from 'react'
import {Link, withRouter} from "react-router-dom";
import PropTypes from 'prop-types'
import './css/store.css'
import {getBookById, updateBook} from "./Service";

class EditBook extends React.Component {

    state = {
        isSuccessfulUpdate: null,
        book: {
            authors: ' ',
            title: ' ',
            genre: ' ',
            description: ' ',
            content: null,
            cover: null
        }
    };

    componentDidMount() {
        const id = this.props.bookId;
        const book = getBookById(id);
        this.setState({book: book});
    }

    handleUpdate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const book = this.state.book;
        updateBook(book)
            .then(() => {
                this.setState({isSuccessfulUpdate: true});
                this.props.onUpdate(book);
            })
            .catch(() => this.setState({isSuccessfulUpdate: false}));
    };

    handleChange = (e) => {
        const { id, value } = e.currentTarget;
        this.setState({book: Object.assign({}, this.state.book, { [id]: value })})
    };

    handleContentChange = (e) => {
        const files = e.target.files;
        let reader = new FileReader();
        reader.readAsArrayBuffer(files[0]);
        reader.onload = (e) => {
            this.setState({ content: e.target.result })
        };
    };

    handleCoverChange = (e) => {
        const files = e.target.files;
        let reader = new FileReader();
        reader.readAsArrayBuffer(files[0]);
        reader.onload = (e) => {
            this.setState({ cover: e.target.result })
        };
    };

    render() {

        const isSuccessfulUpdate = this.state.isSuccessfulUpdate;

        return(
            <div>
                <div id="edit">
                    <h2>Edit book </h2>
                    <form id="editform" className="form-horizontal">
                        <div className="form-group">
                            <div className="col-sm-10">
                                <label>Enter new title
                                    <input id="title"
                                           className="form-control"
                                           type="text"
                                           onChange={this.handleChange}
                                           required/>
                                </label>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='col-sm-10'>
                                <label>Enter new authors
                                    <input id='authors'
                                           className='form-control'
                                           type='text'
                                           onChange={this.handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='col-sm-10'>
                                <label>Enter new genre
                                    <input id='genre'
                                           className='form-control'
                                           type='text'
                                           onChange={this.handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='col-sm-10'>
                                <label>Enter new description
                                    <input id='description'
                                           className='form-control'
                                           type='text'
                                           onChange={this.handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Enter new content
                                <input id='content'
                                       type='file'
                                       name='files'
                                       onChange={this.handleContentChange}
                                />
                            </label>
                        </div>
                        <div className='form-group'>
                            <label>Enter new cover
                                <input id='cover'
                                       type='file'
                                       name='files'
                                       onChange={this.handleCoverChange}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-10">
                                <button
                                    className='btn btn-default'
                                    onClick={(e) => this.handleUpdate(e)}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </form><br/>
                    {
                        isSuccessfulUpdate === true ?
                            <p className='goodMsg'>Book was updated successfully</p> :
                            isSuccessfulUpdate === false ?
                                <p className='badMsg'>Something's go wrong...</p> :
                                null
                    }
                </div>
            </div>
        )
    }
}

EditBook.propTypes = {
    bookId: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export {EditBook}