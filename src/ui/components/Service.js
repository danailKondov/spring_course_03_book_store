import {ACCESS_TOKEN} from "./Const";

const request = (options) => {
    const headers = new Headers();
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }
    options = Object.assign({}, {headers}, options);
    return fetch(options.url, options);
};

export function postBook(formData) {
    return request( {
        url: '/api/books/',
        method: 'post',
        body: formData
    });
}

export function getAllBooks() {
    return request({url: '/api/books/'});
}

export function getBookById(id) {
    return request({url: '/api/books/' + id});
}

export function getFileById(id) {
    return request({url: '/api/books/file/' + id});
}

export function deleteById(id) {
    return request( {
        url: '/api/books/' + id,
        method: 'delete'
    });
}

export function updateBook(book) {
    return request( {
        url: '/api/books/',
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(book)
    });
}

export function checkNameAvailability(name) {
    return fetch('/api/user/' + name)
}

export function saveUser(user) {
    return fetch('/api/user/', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(user)
    });
}

export function login(authRequest) {
    return fetch('/api/auth/signin/', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(authRequest)
    })
}
