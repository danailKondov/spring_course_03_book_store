import {ACCESS_TOKEN} from "./Const";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(token) {
        headers.append('Authorization', 'Bearer ' + token)
    }
    options = Object.assign({}, {headers}, options);
    return fetch(options.url, options);
};

const requestFile = (options) => {
    const headers = new Headers();
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(token) {
        headers.append('Authorization', 'Bearer ' + token)
    }
    options = Object.assign({}, {headers}, options);
    return fetch(options.url, options);
};

export function postBook(formData) {
    return requestFile( {
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

export function buyOrder(orderRequest) {
    return request({
        url: '/api/order/',
        method: 'post',
        body: JSON.stringify(orderRequest)
    });
}

export function getFileByPass(passId) {
    return request({
        url: '/api/books/pass/' + passId
    });
}
