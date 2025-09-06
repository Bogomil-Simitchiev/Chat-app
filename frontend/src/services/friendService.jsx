const baseURL = 'http://localhost:5000';

export const addFriend = (senderNickname, recipientNickname) => {
    return fetch(`${baseURL}/api/add-friend`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ senderNickname, recipientNickname })
    }).then(res => res.json())
}