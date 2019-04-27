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
        cover: null
    };

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { authors, title, genre, description, content, cover} = this.state;
        let formData = new FormData();
        formData.append('authors', authors);
        formData.append('title', title);
        formData.append('genre', genre);
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
                    cover: null
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
        const { authors, title, genre, description, content, cover } = this.state;
        if (authors.trim() && title.trim() && genre.trim() && description.trim() && content && cover){
            return true
        }
        return false
    };

    render() {

        return(
            <div id='add'>
                <h2>Add new Book</h2>
                <form id='addform' className='form-horizontal'>
                    <div className='form-group'>
                        <div className='col-sm-10'>
                            <label>Authors
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
                            <label>Title
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
                            <label>Genre
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
                            <label>Description
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
                        <label>Content
                            <input id='content'
                                   type='file'
                                   name='files'
                                   onChange={this.handleFileChange}
                            />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label>Cover
                            <input id='cover'
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
                                Add Book
                            </button>
                        </div>
                    </div>
                    {
                        this.state.addResult === true ?
                            <p className='goodMsg'>Book was added successfully</p> :
                            this.state.addResult === false ?
                                <p className='badMsg'>Something's go wrong...</p> :
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