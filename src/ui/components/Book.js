import React from 'react'
import './css/store.css'
import {getBookCoverById} from "./Service";

export default class Book extends React.Component {

    state = {
        authors: ' ',
        title: ' ',
        genre: ' ',
        description: ' ',
        coverId: ' ',
        cover: null
    };

    componentDidMount() {
        const {authors, title, genre, description, coverId} = this.props.book;
        this.setState({authors, title, genre, description});

        getBookCoverById(coverId)
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
                    this.setState({cover: url});
                };
                reader.readAsDataURL(blob);
            });

    }

    render() {

        const {authors, title, genre, description, cover} = this.state;

        return (
            <React.Fragment>
                <div className="book">
                    <img className="cover" src={cover}/>
                    <p>Author: {authors}</p>
                    <p>Title: {title}</p>
                    <p>Genre: {genre}</p>
                    <p>Description: {description}</p>
                </div>
            </React.Fragment>
        )
    }
}