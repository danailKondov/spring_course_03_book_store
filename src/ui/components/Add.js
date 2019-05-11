import React from 'react'
import PropTypes from 'prop-types'
import './css/store.css'
import {postBook} from "./Service";

class AddBook extends React.Component {

    state = {
        addResult: null,
        authors: ' ',
        title: ' ',
        genre: ' ',
        description: ' ',
        content: null,
        cover: null,
        quantity: 0,
        price: 0,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { authors, title, genre, description, content, cover, quantity, price} = this.state;
        let formData = new FormData();
        formData.append('authors', authors);
        formData.append('title', title);
        formData.append('genre', genre);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('content', content, content.name);
        formData.append('cover', cover, cover.name);
        postBook(formData)
            .then(resp => {
                this.setState({
                    addResult: true,
                    authors: ' ',
                    title: ' ',
                    genre: ' ',
                    description: ' ',
                    content: null,
                    cover: null,
                    quantity: 0,
                    price: 0,
                });
                return resp.json();
            })
            .then(book => {
                this.props.onAdd(book);
            })
            .catch(
                this.setState({addResult: false})
            );
    };

    handleChange = (e) => {
        const { id, value } = e.currentTarget;
        this.setState({ [id]: value })
    };

    handleFileChange = (e) => {
        const files = e.target.files;
        const id = e.currentTarget.id;
        this.setState({ [id]: files[0] });
    };

    validate = () => {
        const { authors, title, genre, description, content, cover, quantity, price } = this.state;
        if (authors.trim() && title.trim() && genre.trim() && description.trim() && quantity && price && content && cover){
            return true
        }
        return false
    };

    render() {

        return(
            <div id='add' className="modal_content">
                <h2>Добавить книгу</h2>
                <form id='addform' className='form-horizontal'>
                    <div className='form-group'>
                        <div className='col-sm-10'>
                            <label>Авторы
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
                            <label>Заголовок
                                <input id='title'
                                       className='form-control'
                                       type='text'
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
                                       onChange={this.handleChange}
                                 />
                            </label>
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='col-sm-10'>
                            <label>Количество
                                <input id='quantity'
                                       className='form-control'
                                       type='number'
                                       min={0}
                                       onChange={this.handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='col-sm-10'>
                            <label>Цена
                                <input id='price'
                                       className='form-control'
                                       type='number'
                                       min={0}
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
                                       onChange={this.handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label>Файл книги
                            <input id='content'
                                   className="content"
                                   type='file'
                                   name='files'
                                   onChange={this.handleFileChange}
                            />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label>Обложка
                            <input id='cover'
                                   className="cover"
                                   type='file'
                                   name='files'
                                   onChange={this.handleFileChange}
                            />
                        </label>
                    </div>
                    <div className='form-group'>
                        <div className='col-sm-10'>
                            <button
                                className='btn btn-default'
                                onClick={this.handleSubmit}
                                disabled={!this.validate()}>
                                Добавить
                            </button>
                        </div>
                    </div>
                    {
                        this.state.addResult === true ?
                            <p className='goodMsg'>Книга добавлена</p> :
                            this.state.addResult === false ?
                                <p className='badMsg'>Что-то пошло не так...</p> :
                                null
                    }
                </form><br/>
            </div>
        )
    }
}

AddBook.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export {AddBook}