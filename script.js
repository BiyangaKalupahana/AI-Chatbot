// script.js

// Get DOM elements
const messagesContainer = document.getElementById('messages-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
let initialMessage = document.getElementById('initial-message'); // Use let as it will be removed

// Array to store chat history for API calls
let chatHistory = [];
let isLoading = false; // To prevent multiple API calls while one is in progress

// Function to scroll to the bottom of the messages container
const scrollToBottom = () => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

// Function to add a message to the chat UI
const addMessageToUI = (sender, text) => {
    if (initialMessage) {
        initialMessage.remove(); // Remove initial message once conversation starts
        initialMessage = null; // Set to null to prevent re-removal
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

    const messageBubble = document.createElement('div');
    messageBubble.className = `max-w-xs sm:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
        sender === 'user'
            ? 'bg-indigo-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
    }`;
    messageBubble.textContent = text;

    messageDiv.appendChild(messageBubble);
    messagesContainer.appendChild(messageDiv);
    scrollToBottom(); // Scroll to the new message
};

// Function to show/hide loading indicator
const toggleLoadingIndicator = (show) => {
    if (show) {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-indicator';
        loadingDiv.className = 'flex justify-start';
        loadingDiv.innerHTML = `
            <div class="max-w-xs sm:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md bg-gray-200 text-gray-800 rounded-bl-none">
                <div class="flex items-center animate-bounce-dots">
                    <span class="text-xl mr-1">.</span>
                    <span class="text-xl mr-1">.</span>
                    <span class="text-xl">.</span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(loadingDiv);
        scrollToBottom();
    } else {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }
    messageInput.disabled = show; // Disable input while loading
    sendButton.disabled = show;   // Disable button while loading
    isLoading = show;
};

// Function to handle sending a message
const handleSendMessage = async () => {
    const input = messageInput.value.trim();
    if (input === '' || isLoading) return; // Don't send empty messages or if loading

    addMessageToUI('user', input); // Add user message to UI
    chatHistory.push({ role: 'user', parts: [{ text: input }] }); // Add to chat history
    messageInput.value = ''; // Clear input field

    toggleLoadingIndicator(true); // Show loading indicator

    try {
        const payload = { contents: chatHistory };
        const apiKey = ""; // API key is provided by the environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const aiResponseText = result.candidates[0].content.parts[0].text;
            addMessageToUI('ai', aiResponseText); // Add AI response to UI
            chatHistory.push({ role: 'model', parts: [{ text: aiResponseText }] }); // Add to chat history
        } else {
            addMessageToUI('ai', 'Sorry, I could not get a response.');
            console.error('Unexpected API response structure:', result);
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        addMessageToUI('ai', 'An error occurred while fetching the response.');
    } finally {
        toggleLoadingIndicator(false); // Hide loading indicator
    }
};

// Event listeners
sendButton.addEventListener('click', handleSendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// Initial scroll to ensure the input is visible if the page loads with content
window.onload = () => {
    scrollToBottom();
};