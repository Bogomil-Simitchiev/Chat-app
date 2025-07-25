const baseURL = 'http://localhost:5000';

export const register = (email, nickname, password) => {
    return fetch(`${baseURL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, nickname, password })
    }).then(res => res.json())
}

export const login = (nickname, password) => {
    return fetch(`${baseURL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ nickname, password })
    }).then(res => res.json())
}
