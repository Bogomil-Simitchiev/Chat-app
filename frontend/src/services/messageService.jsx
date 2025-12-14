const baseURL = "http://localhost:5000";

export const getOrCreateChat = (userId, friendId) => {
  return fetch(`${baseURL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, friendId }),
  }).then(res => res.json());
};

export const getMessages = (chatId, userId) => {
  return fetch(
    `${baseURL}/api/messages/${chatId}?userId=${userId}`
  ).then(res => res.json());
};
