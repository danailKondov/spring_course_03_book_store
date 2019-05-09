export function postBook(formData) {
    return fetch('/api/books/', {
        method: 'post',
        body: formData
    });
}

export function getAllBooks() {
    return fetch('/api/books/');
}

export function getBookById(id) {
    return fetch('/api/books/' + id);
}

export function getFileById(id) {
    return fetch('/api/books/file/' + id);
}

export function deleteById(id) {
    return fetch('/api/books/' + id, {
        method: 'delete'
    });
}

export function updateBook(book) {
    return fetch('/api/books/', {
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(book)
    });
}
