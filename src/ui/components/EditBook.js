import React from 'react'
import {Link, withRouter} from "react-router-dom";
import PropTypes from 'prop-types'
import './css/store.css'
import {getBookById, getFileById, updateBook} from "./Service";

class EditBook extends React.Component {

    state = {
        isSuccessfulUpdate: null,
        isLoadingCover: false,
        isLoadingContent: false,
        book: {
            id: ' ',
            authors: ' ',
            title: ' ',
            genre: ' ',
            description: ' ',
            contentId: ' ',
            coverId: ' '
        },
        oldContent: null,
        oldCover: null
    };

    componentDidMount() {
        const id = this.props.bookId;
        getBookById(id)
            .then(response => response.json())
            .then(book => this.setState({book: book}))
            .then(() => {
                this.getBookCover();
                this.getBookContent();
            });
    }

    getBookContent = () => {
        const contentId = this.state.book.contentId;
        this.setState({isLoadingContent: true});
        getFileById(contentId)
            .then(response => {
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response)
                } else {
                    return Promise.reject(new Error('Error loading content with id: ' + contentId))
                }
            })
            .then(response => response.blob())
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res], { type: 'application/pdf' }));
                this.setState({oldContent: url, isLoadingContent: false});
            })
    };

    getBookCover = () => {
        const coverId = this.state.book.coverId;
        this.setState({isLoadingCover: true});
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
                    this.setState({oldCover: url, isLoadingCover: false});
                };
                reader.readAsDataURL(blob);
            });
    };

    handleUpdate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const book = this.state.book;
        updateBook(book)
            .then(() => {
                this.setState({isSuccessfulUpdate: true});
                console.log('updated book: ', book);
                this.props.onUpdate(book);
            })
            .catch(() => this.setState({isSuccessfulUpdate: false}));
    };

    handleChange = (e) => {
        const { id, value } = e.currentTarget;
        this.setState({book: Object.assign({}, this.state.book, { [id]: value })})
    };

    render() {

        const isSuccessfulUpdate = this.state.isSuccessfulUpdate;
        const {oldContent, oldCover, book, isLoadingContent, isLoadingCover} = this.state;
        const {id, authors, title, genre, description} = book;

        return(
            <div>
                <div id="edit">
                    <h2>Редактирование информации о книге</h2>
                    <form id="editform" className="form-horizontal">
                        <div className="form-group">
                            <div className="col-sm-10">
                                <label>Идентификатор
                                    <input id="id"
                                           className="form-control"
                                           type="text"
                                           value={id}
                                           readOnly={true}
                                           onChange={this.handleChange}/>
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-10">
                                <label>Новое название
                                    <input id="title"
                                           className="form-control"
                                           type="text"
                                           value={title}
                                           onChange={this.handleChange}/>
                                </label>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='col-sm-10'>
                                <label>Авторы
                                    <input id='authors'
                                           className='form-control'
                                           type='text'
                                           value={authors}
                                           onChange={this.handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='col-sm-10'>
                                <label>Жанр
                                    <input id='genre'
                                           className='form-control'
                                           type='text'
                                           value={genre}
                                           onChange={this.handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='col-sm-10'>
                                <label>Описание
                                    <textarea id='description'
                                              rows={10}
                                              cols={45}
                                              className='form-control'
                                              type='text'
                                              value={description}
                                              onChange={this.handleChange}
                                    />
                                </label>
                            </div>
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
                    </form>
                    <div className="content-box">
                        <div className="content-item">
                            <a href={oldContent}
                               target='_blank'
                               className="btn btn-default"
                               disabled={isLoadingContent || isLoadingCover}>
                                {isLoadingContent || isLoadingCover ?
                                    <p className='goodMsg'>Загружается книга...</p> :
                                    <p>Посмотреть содержание</p> }
                            </a>
                        </div>
                        <div  className="content-item">
                            <img src={oldCover} width={150} alt="Обложка"/>
                        </div>
                    </div>
                    {
                            isSuccessfulUpdate === true ?
                                <p className='goodMsg'>Книга успешно обновлена</p> :
                                isSuccessfulUpdate === false ?
                                    <p className='badMsg'>Что-то пошло не так</p> :
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