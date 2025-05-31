// script.js

// Get DOM elements
const messagesContainer = document.getElementById('messages-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// --- Avatar URLs ---
// IMPORTANT: Changed to file paths for consistency with index.html.
// Ensure 'bot1.png' and 'user1.png' are in the same directory as this script.
const botAvatarUrl = './bot1.png';   
const userAvatarUrl = './user1.png'; // Make sure you have a user1.png or adjust this path
// -------------------

let chatHistory = [];
let isLoading = false; 


const scrollToBottom = () => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
};


const addMessageToUI = (sender, text) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} items-end`; 

    const avatarImg = document.createElement('img');
    avatarImg.className = 'w-8 h-8 rounded-full object-cover';

    const messageBubble = document.createElement('div');
    // --- MODIFIED LINE FOR USER MESSAGE COLOR ---
    messageBubble.className = `max-w-xs sm:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
        sender === 'user'
            ? 'bg-blue-200 text-gray-800 rounded-br-none' // Changed from bg-indigo-500 text-white
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
    }`;
    // ---------------------------------------------
    
    // Markdown rendering for AI messages and simple newline for user messages
    if (sender === 'ai') {
        messageBubble.innerHTML = marked.parse(text); 
    } else {
        messageBubble.innerHTML = text.replace(/\n/g, '<br>'); 
    }

    if (sender === 'user') {
        avatarImg.src = userAvatarUrl;
        avatarImg.alt = 'User Avatar';
        messageDiv.appendChild(messageBubble);
        messageDiv.appendChild(avatarImg);
        messageBubble.classList.add('mr-2'); 
    } else { // sender === 'ai'
        avatarImg.src = botAvatarUrl;
        avatarImg.alt = 'Bot Avatar';
        messageDiv.appendChild(avatarImg);
        messageDiv.appendChild(messageBubble);
        messageBubble.classList.add('ml-2'); 
    }

    messagesContainer.appendChild(messageDiv);
    scrollToBottom(); 
};


const toggleLoadingIndicator = (show) => {
    if (show) {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-indicator';
        loadingDiv.className = 'flex justify-start items-end'; 
        loadingDiv.innerHTML = `
            <img src="${botAvatarUrl}" alt="Bot Avatar" class="w-8 h-8 rounded-full object-cover mr-2">
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
        // Your API key - CAUTION: Do NOT expose this in a public-facing application.
        // For local development/testing, it's generally okay.
        const apiKey = ""; // <--- INSERT YOUR ACTUAL GEMINI API KEY HERE
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