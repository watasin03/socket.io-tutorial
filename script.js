const socket = io('http://localhost:3200');
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');
appendMessage('you joined');
socket.emit('new-user', name);

socket.on('chat-message', data =>{
    if(!data.name){
        appendMessage(`Welcome To Live Chats!`);
    } else {
        appendMessage(`${data.name}:${data.message}`);
    }
});

socket.on('user-connected', name =>{
    appendMessage(`${name} Joined!`);
});

socket.on('user-disconnected', name =>{
    appendMessage(`${name} Leave!`);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`${name}: ${message}`)
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(message) {
    const messageElement =document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}