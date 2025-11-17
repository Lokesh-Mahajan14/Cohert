// public/client.js
const socket = io();
const chat = document.getElementById('chat');
const userList = document.getElementById('users');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Wait until connected
socket.on('connect', () => {
  const userName = prompt('Enter your username');
  socket.emit('join', userName);
});

// Display when a user joins
socket.on("userJoined", (user) => {
  addMessage(`${user} has joined the chat`);
});

// Optional: display the updated user list
socket.on("userList", (users) => {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.textContent = user;
    userList.appendChild(li);
  });
});

// Add messages to chat box
function addMessage(text) {
  const messageElement = document.createElement('div');
  messageElement.textContent = text;
  chat.appendChild(messageElement);
  chat.scrollTop = chat.scrollHeight;
}

// Optional: handle sending chat messages
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = messageInput.value;
  if (msg.trim() === '') return;
  addMessage(`Me: ${msg}`);
  socket.emit('message', msg);  // You can handle this server-side
  messageInput.value = '';
});
