export function setToken(token) {
    sessionStorage.setItem('token', token);
}

export function getToken() {
    return sessionStorage.getItem('token');
}

export function removeTkoen() {
    // sessionStorage.removeItem('token');
    sessionStorage.clear();
}
