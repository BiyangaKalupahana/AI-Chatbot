
const messagesContainer = document.getElementById('messages-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
let initialMessage = document.getElementById('initial-message'); 


let chatHistory = [];
let isLoading = false; 


const scrollToBottom = () => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
};


const addMessageToUI = (sender, text) => {
    if (initialMessage) {
        initialMessage.remove(); 
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
    scrollToBottom(); 
};


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
    messageInput.disabled = show; 
    sendButton.disabled = show;   
    isLoading = show;
};


const handleSendMessage = async () => {
    const input = messageInput.value.trim();
    if (input === '' || isLoading) return; 

    addMessageToUI('user', input); 
    chatHistory.push({ role: 'user', parts: [{ text: input }] }); 
    messageInput.value = ''; 

    toggleLoadingIndicator(true); 

    try {
        const payload = { contents: chatHistory };
        const apiKey = "AIzaSyCgy8GzbFzxeA-l0fKlZNRds4NbXnFyEeY"; // API key 
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
            addMessageToUI('ai', aiResponseText); 
            chatHistory.push({ role: 'model', parts: [{ text: aiResponseText }] }); 
        } else {
            addMessageToUI('ai', 'Sorry, I could not get a response.');
            console.error('Unexpected API response structure:', result);
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        addMessageToUI('ai', 'An error occurred while fetching the response.');
    } finally {
        toggleLoadingIndicator(false); 
    }
};


sendButton.addEventListener('click', handleSendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});


window.onload = () => {
    scrollToBottom();
};