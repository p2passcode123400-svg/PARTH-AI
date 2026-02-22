// chat.js

// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    // Clear the input
    messageInput.value = '';
    // Add message to chat
    addMessageToChat('You', message);
    // Simulate response
    setTimeout(() => {
        addMessageToChat('Bot', 'This is a response to: ' + message);
    }, 1000);
}

// Function to add messages to the chat window
function addMessageToChat(sender, message) {
    const chatWindow = document.getElementById('chatWindow');
    const messageElement = document.createElement('div');
    messageElement.textContent = sender + ': ' + message;
    chatWindow.appendChild(messageElement);
}

// Event listener for send button
const sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', sendMessage);

// Event listener for Enter key
const messageInput = document.getElementById('messageInput');
messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});