// script.js

// Get DOM elements
const messagesContainer = document.getElementById('messages-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
// initialMessage is no longer needed as a specific ID due to the direct HTML welcome message
// let initialMessage = document.getElementById('initial-message'); 

// --- Avatar URLs ---
// Replace these with paths to your actual image files
const botAvatarUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAABDxJREFUeF7tm8uLFFcYxU/NVFW/ZiZLQTQk0UgIClHQhSC4yEJIAiEE8vfkr3CRRUIghIQkKIgiOMGFj43iI24ETcz7Ic6ju+vR1fUI9zIDE60eB6d7crrq3O0MVWfOr8797nz3Xmf5438KaNA44AgIDQsrREC4eAgIGQ8BERA2B8j0qIYICJkDZHKUEAEhc4BMjhIiIGQOkMlRQgSEzAEyOUqIgJA5QCZHCREQMgfI5CghAkLmAJkcJURAyBwgk6OECAiZA2RylBABIXOATI4SIiBkDpDJoUpI+715+Ieb27eoAIphAeRAvpoh/W2I5FaM7I90+8+e8BOqCaTMtBxIHyWIL4cWEOuoD5A1AkWQI1oMkNyOKZnUDoihkHdzROd6GD5I6KDUEoihYOpJ//MVFAnX9ZjaAkEGxFdDxJcDqpRMDRDzJUfn+0jubj73zyzMwH3Fh7vfh/e6D6fhjDQ8/WWI/mcrAjLKgc2WvVsFsvHZ3n4frXfnYSCVLrxWMgTfdKmWw5VLyNPGt96ZQ+NICygJSt7LEZ7pIv2JZxlceSCNoy003+7A8Z4lIiDPma3HPWWZ1zWOt9E82YbjlgBZytD/chX5k4ymjlQ+Ie0PFuAfbJQaPryfIPhqlQaGEVJpII1jLTRPduA0n02HWSTElwIMbkQCMslV1uxuF+7LHrwDDczucUunKvP+9GGC/hdc6ZiqhIzzM87+ThF+10X2mKd2rP99UzNljQtI9vsQ0cWAtuNbHyA5kNyJEV3s0/WvNn5s9QGy3n4PcyR3B7aHxdZYrG0NsUX95yGi8z26OlK7hGycHtIfEwRfd6mSMjVAttpctB3ezgzcvR7cff7IxqIFU8D+HxJd6I9rzbDt51QOyH8KpO+gdWoO/qEmMFvulTkEEX7bo1l1VRqILZK+g85HL8F91RtBBBhcD+0+O8OoPBDbYNyk42t+ztTTqgUQ74AP00k2taVsZH+m6H2yzBCQajcX1x12X/PRfn8eM3MjgDzO0Du9JCBPOzCJ/RDzDv+tpi3upp6UjfTXIfqfcuyt12LK6ny4AO/N8j0R1ZBNJoZJJMTuGJ5ojz59QnYcqJIJMUvc2V0uvDcacPd4QHnpsJ+G/g95wYRMquIm9wZ2b4RlTE1CJmGYOeMbntUxoJHeju1+yBboFXGBeDHA4Kb21P93IBbGlRCDa+EW0O3sr9RryiqA7K8U0feBPeTAOCoLxF5pMzcN1q61mesHyQ8x0kc8x0bLPggqIIxf7E5rEpCddvw57xMQASFzgEyOEiIgZA6QyVFCBITMATI5SoiAkDlAJkcJERAyB8jkKCECQuYAmRwlREDIHCCTo4QICJkDZHKUEAEhc4BMjhIiIGQOkMlRQgSEzAEyOUqIgJA5QCZHCREQMgfI5CghAkLmAJkcJURAyBwgk6OECAiZA2RylBABIXOATM6/gMQoVrfHrE8AAAAASUVORK5CYII='; // Placeholder: Purple background, white 'B'
const userAvatarUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAABDxJREFUeF7tm0tIVGEUx//qOE4zmg+MHqaW0QsyNxXUooLatOpFmwra1UbatUmI9tKiIHosahG0q1XRpiKCahMV0tPCXpJllKaj44zziE8oSMfruTPj6Yj/2Xrud879/eZ8597rnaKdd3sz4McMgSIKMeNirBAKseWDQoz5oBAKsUbAWD2cIRRijICxctghFGKMgLFy2CEUYoyAsXLYIRRijICxctghFGKMgLFy2CEUYoyAsXLYIRRijICxctghFGKMgLFy2CEUYoyAsXLYIRRijICxctghFGKMgLFyTHVI66oKbF8YyoroRzyN068G0NE36gvh/qUR7GkII1A88bBkGrj+aRhX3w/5WnM6gymEQib/frFDjL1sTSEUwhniNRDZIewQdgg7xPuimZe9vOzlZa9Xj7BD2CHsEHYIn2Xl9viN9yG8D+F9CO9DeB/C/4fkNkEAzhDOEM4QzhDOEM4QzpBcCczyGTKSyuBK1xBudsdyJ1jgI2fMw8XhZAbnOwdx/1vcFwKv14BiqQwudEZx7+uIrzWnM9iUkOmAd6Apgt312d/LopApvlpeQnLdXrzubaKjGZzrHMSDXn9dN2s6ZOuCEI6sKMeckqIJ55zJALe+xHCxM+qLx/HmSmyoDRb0bUhfBfgMNrVlra8NonVlBSqDWd77BNAVTaLtST/cViP5LAqXoK25EnXhkqzh3cMpHHvcJ15PkjPfGFNCXGe0r6vG4kkAOg83umO4/E7WJQebItg1yfxw4Dr6Ejjx7Fe+DAt6vCkh7sy8thj390Q6g9s9I1NuXbsbwtjXGEY4MHH7c+v4lVtQ6h6LmROyo24ODi2LIJRljvw5D7dhfYul8Oh7HE9/Jv6+Eb98bgAt1UFsnFeGJeUBeCyB/kQaZ14P4smPhBZrUR5zQlzVJ1sq0VITRPbvtui8PIOc0Ie9cbS/GMh/sQKvYFLI2upSHF09F7Vl2Yd7vgw+RJM49XIAn4dS+S5V8ONNCnFnuWV+aGzrqimwFPfDn7Nv7G1Vf8yaFeIKXFNVisMrylEfCeS9fblt6n00iUtvo3je7+9XWAVvg5k01MfX6i6F9zaGsW1hCFXBYt9inAg3wO/0jODax2FT9xzZvJjukPEFb55fhk3zytAQCYzJKS0GSov/Hf3uctZdGg8k0mMd8fB73PcDSc2OGJ9rRgn5n6C0clOIFmlhHgoRgtIKoxAt0sI8FCIEpRVGIVqkhXkoRAhKK4xCtEgL81CIEJRWGIVokRbmoRAhKK0wCtEiLcxDIUJQWmEUokVamIdChKC0wihEi7QwD4UIQWmFUYgWaWEeChGC0gqjEC3SwjwUIgSlFUYhWqSFeShECEorjEK0SAvzUIgQlFYYhWiRFuahECEorTAK0SItzEMhQlBaYRSiRVqYh0KEoLTCKESLtDAPhQhBaYVRiBZpYR4KEYLSCvsN5SF/qlpq1OQAAAAASUVORK5CYII='; // Placeholder: Blue background, white 'U'
// -------------------

let chatHistory = [];
let isLoading = false; 


const scrollToBottom = () => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
};


const addMessageToUI = (sender, text) => {
    // We no longer need to remove an 'initial-message' div by ID, as it's now a standard message bubble
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
    messageBubble.textContent = text;

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