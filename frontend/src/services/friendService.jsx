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

export const getRequestedPeople = (userId) => {
    return fetch(`${baseURL}/api/requests/${userId}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
}

export const acceptFriendRequest = (requesterId, userId) => {
   return fetch(`${baseURL}/api/accept/${requesterId}/${userId}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
    }).then(res => res.json())
}

export const declineFriendRequest = (requesterId, userId) => {
   return fetch(`${baseURL}/api/decline/${requesterId}/${userId}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
    }).then(res => res.json())
}
