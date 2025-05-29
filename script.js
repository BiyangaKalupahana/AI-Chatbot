// script.js

// Get DOM elements
const messagesContainer = document.getElementById('messages-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// --- Avatar URLs ---
// Keeping your base64 images.
// You can replace these with paths to your actual image files if you prefer,
// e.g., './images/bot-avatar.png' and './images/user-avatar.png'
const botAvatarUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAABKpJREFUeF7tm8trHXUUx79z595MmlcbqrTxAaIIpfgARXBRXOhGXLhwowuxIIoL/wgXbqQgiIgURQRBEdGibhTcWCgquBJ8VESNMU3Jo3nUPO7M3Jmf/AYjwcyNJ2nmcDLzne09d87h85kzv9/85jfBT8+sOvAwQyCgEDMuikIoxJYPCjHmg0IoxBoBY/VwDKEQYwSMlcMOoRBjBIyVww6hEGMEjJXDDqEQYwSMlcMOoRBjBIyVww6hEGMEjJXDDqEQYwSMlcMOoRBjBIyVww6hEGMEjJXDDqEQYwSMlcMOoRBjBIyVY6pDjp+OcORU+9oR5UCeOrgM6C06bPyaY/lCiu5kfu3nrvgM9RRSAs3lwPrPGRY+TrDxm10xjRGy6Sj7y2HuXIKVC72Kr/W9nb5xQjym3pLD5XdirH2f7Y1ahf9qpBDP048nUy93kXdtfR7TWCGuB1z5PMXCJ0mF1/vuT31ghPgrefa9BCtf73zvb48HGD4RYviOECN3hmgdCvpSWf8lw9SZ7u6pVfiP2gnZyspLmXgqgpdUdqRXHC6d7ZqaDtdaiJdw/MkIRx5oAyVOessOM2/FWL9oZ3CvvZDxBzu4/rEBtKLtPUIh/3Pv3elJXTqG/DfF0Yc7uO7RAQSd7cmTuRzTr8ZIZu08KNa+Q254NsLYfeW3rNXvMky/xkG9b5/sd4eMP+S7o4NwaPsAkscO8x+mWPoyrXDOtPtT165DBm9pYej2ECN3hTh0W1h6q4ID1n7M8OcrtrrD6zswQnZ/rfX/RzydY+bNGPGMnbFjs9pmCXHAxmSOufdjsyu+jRHi342sfNXD3AeJufWrrb3cGCH/Lr+vumL5ZeHT1KSYxgkpxDjAr2PNvpuYG0eaKeQfKWsXM1x6PTbVKQdGiPRJ3U93w7GgmPIOnwzR8QuL/RZ8c2DpfFqsIls5aidkK9jWYIBjjw9g7P42gj57J/yK78wbXTOzrloL8XK8lJuejzB0IixtAj/7WvwixfxHNrqk9kK8hZ1WfP3vlta0GiFk5O4QE6cjhKPlg0l3KsfkixsmhpFGCPGD+8TTEdqHy4X4JZTfX6CQbVfkfq/2biY4fKqNY0/4l1TlQvzOxj9eohA1ITc+F2H03vJ3IhxDdrhTV9Eh/o3h0Uc6fXefWNsOVMsxxE9xB29uYfSeEIO3hgha/a8CPofssUMqmQI54Oq3veLdiJXjwHRIFcDSRYfLb3Mb0J7eqe+3kGzdYf5cguXztnbBN7JDvIzFz9Jib6+1o1lCcqA7nRedsfaDnd2K9X9j6IDcrxU6B//lVPFZ22SOq9/0iq+oLB+mOsQyKK3aKESLtDAPhQhBaYVRiBZpYR4KEYLSCqMQLdLCPBQiBKUVRiFapIV5KEQISiuMQrRIC/NQiBCUVhiFaJEW5qEQISitMArRIi3MQyFCUFphFKJFWpiHQoSgtMIoRIu0MA+FCEFphVGIFmlhHgoRgtIKoxAt0sI8FCIEpRVGIVqkhXkoRAhKK4xCtEgL81CIEJRWGIVokRbmoRAhKK0wCtEiLcxDIUJQWmEUokVamIdChKC0wihEi7QwD4UIQWmFUYgWaWGevwGPEiSKImf+VAAAAABJRU5ErkJggg==';
const userAvatarUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAA9JJREFUeF7tnEtrE1EcxU+aZNI8GrVt6qNCi6BQfCC40NKFj42CuFRw62fxc7gRtwoKPqAILsSFCqKI3ShWoTa1tTVp3smM3IhS6GSamUnghJ5sO/fOuec35/7vndw0cnthzYE+NA5EBISGRVuIgHDxEBAyHgIiIGwOkOlRDREQMgfI5CghAkLmAJkcJURAyBwgk6OECAiZA2RylBABIXOATI4SIiBkDpDJUUIEhMwBMjlKiICQOUAmRwkREDIHyOQoIQJC5gCZHCVEQMgcIJNDlZCrB9I4vSfhalGxaePhjxK+lhu+LDw/nsTsaBLRyPZmLQd49auCF6sVX33282IBEZDOz5cSQnbYWkAERDXEqyAqIUqIEqKEeC+atezVslfLXq+MKCFKiBKihOhdVrDXb9qHaB+ifYj2IdqH6PuQYBUEUA1RDVENUQ1RDVENUQ0J6sAuryEN28Hz1QrerFeDO9jjlgPzcrFmO3iSL+Fjoe7LAq9jQHXbwdN8GR8KNV999vNiKiD9MO/CeBLnOrzLEpAdHi0vIEGnF6+9TaX1N3Wfiv5St2sScjKbwJX9KVhD248Zmn+d+najimf5si8/rk9mcCxj9fQ0pC8BPi+mmrKOZuLt3Xo6OuQ6jOVaC3e/FWCmmm4+o1YUNyYzGLOirpev1Vu4s9h9f93cM+w1VEBMMm5NZTsaaDi83qhifqW7lFzMJXF2n/u5XmOcOSd873sxrIc9bU8FxIzMa4oxf286Dt79ru04dc2ODmNuLImEy/Rn+mnDXa9i/md3cHvqukdndEDO7E3gUs69jmwdx3rDxkKxji+lxv8T8YeGY5hOxzGTiWMiEUMHFu1uSk0bj5ZL+Fzyd5q+32DogJgB3zw8giPpeF/HblZW95c2+3qPIJ1TAplOxXHtYBrZmHtxDzLQrW1Wai08WNrEar0Vtquet6cEYkZ5Imu1p66RHkMpNG08Jpyq/pGlBWIETqXiuDyRQi7hvmz1+3iaZbNZoS36/BWW3/uEuZ4aiBmYWQrPjQ3jVDaBTMC0bDZtvC/U8HKt2vUeJoypYdrSA9k6uONZCzMjFnJWFOnYEGKRyLbfDprlrFkal1sO8rVm+7WI3xeSYQwN23aggIQd7CC0FxAySgIiIGQOkMlRQgSEzAEyOUqIgJA5QCZHCREQMgfI5CghAkLmAJkcJURAyBwgk6OECAiZA2RylBABIXOATI4SIiBkDpDJUUIEhMwBMjlKiICQOUAmRwkREDIHyOQoIQJC5gCZHCVEQMgcIJOjhAgImQNkcpQQASFzgEyOEkIG5A99kZqyqkrG8gAAAABJRU5ErkJggg==';
// -------------------

let chatHistory = [];
let isLoading = false; 


const scrollToBottom = () => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
};


const addMessageToUI = (sender, text) => {
    // The initial welcome message is now handled directly in HTML, so no need to remove an 'initial-message' div by ID
    // if (initialMessage) {
    //     initialMessage.remove(); 
    //     initialMessage = null; 
    // }

    const messageDiv = document.createElement('div');
    // Align messages and ensure items are aligned to the end (bottom) if they wrap
    messageDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} items-end`; 

    // Create the avatar image element
    const avatarImg = document.createElement('img');
    avatarImg.className = 'w-8 h-8 rounded-full object-cover'; // Tailwind classes for avatar size (32x32px) and shape (circle)

    const messageBubble = document.createElement('div');
    messageBubble.className = `max-w-xs sm:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
        sender === 'user'
            ? 'bg-indigo-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
    }`;
    
    // --- MODIFIED LINE FOR LINE BREAKS ---
    // Replace newline characters with HTML <br> tags to ensure proper paragraph spacing
    messageBubble.innerHTML = text.replace(/\n/g, '<br>'); 
    // -------------------------------------

    // Append avatar and message bubble based on sender
    if (sender === 'user') {
        avatarImg.src = userAvatarUrl;
        avatarImg.alt = 'User Avatar';
        messageDiv.appendChild(messageBubble);
        messageDiv.appendChild(avatarImg);
        messageBubble.classList.add('mr-2'); // Add margin to separate bubble from avatar
    } else { // sender === 'ai'
        avatarImg.src = botAvatarUrl;
        avatarImg.alt = 'Bot Avatar';
        messageDiv.appendChild(avatarImg);
        messageDiv.appendChild(messageBubble);
        messageBubble.classList.add('ml-2'); // Add margin to separate bubble from avatar
    }

    messagesContainer.appendChild(messageDiv);
    scrollToBottom(); 
};


const toggleLoadingIndicator = (show) => {
    if (show) {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-indicator';
        // Adjust alignment for loading indicator to match avatar position
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
        // Your API key - Caution advised for production environments.
        const apiKey = "AIzaSyCgy8GzbFzxeA-l0fKlZNRds4NbXnFyEeY"; 
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