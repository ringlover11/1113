// 動物回覆資料庫
const animalResponses = {
    dog: {
        icon: '🐕',
        name: '小狗',
        responses: [
            '汪汪！你說得對！🐕',
            '太棒了！我也這樣想！🎉',
            '汪汪汪！我很開心跟你聊天！💕',
            '你真的很聰明呢！🌟',
            '我喜歡和你聊天！🦴',
            '讓我們成為最好的朋友吧！👋',
            '汪！這是個好主意！💡',
            '你讓我很快樂！😊'
        ]
    },
    cat: {
        icon: '🐱',
        name: '小貓',
        responses: [
            '喵喵～你說得不錯呢！😺',
            '有趣的想法！😸',
            '喵喵喵！我同意你的看法！🐾',
            '你真優雅，就像我一樣～😻',
            '哼！你確實不錯嘛！😽',
            '喵～讓我思考一下…✨',
            '你讓我舒服得像在曬太陽！☀️',
            '喵！這個話題很有趣！🎀'
        ]
    },
    rabbit: {
        icon: '🐰',
        name: '小兔',
        responses: [
            '蹦蹦蹦！你好棒！🐰',
            '我也覺得是呢！💚',
            '蹦蹦！這讓我很高興！✨',
            '你的想法令人耳目一新！🌸',
            '完全同意！我們想法一致！💕',
            '蹦～你真的很會聊天！😊',
            '這個話題讓我跳起來了！🎪',
            '你真的很有趣呢！🥕'
        ]
    },
    fox: {
        icon: '🦊',
        name: '小狐狸',
        responses: [
            '嘎嘎！你很聰明呢！🦊',
            '我喜歡你的想法！很狡猾！😉',
            '有趣的觀點！👀',
            '你和我想的一樣！我們是靈魂伴侶！💫',
            '嗯...我覺得你說的很有道理！🤔',
            '你讓我這隻狐狸印象深刻！✨',
            '哈哈！我喜歡和聰慧的人聊天！🎭',
            '你的聰穎讓我著迷！🧡'
        ]
    },
    panda: {
        icon: '🐼',
        name: '熊貓',
        responses: [
            '呃...你說得好呢！🐼',
            '我也是這樣想的！吃著竹子同意！🎋',
            '很不錯的觀點！我很欣賞！😌',
            '呃呃呃～你真的很特別！💚',
            '你讓我停下吃竹子來聽你說話！🥟',
            '太棒了！我很喜歡這個想法！🎉',
            '你就像竹子一樣珍貴！🌿',
            '呃…這是我今天最喜歡的話題！😊'
        ]
    }
};

let currentAnimal = 'dog';
let messageHistory = [];

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const animalButtons = document.querySelectorAll('.animal-btn');

// 初始化
function init() {
    // 動物選擇按鈕事件
    animalButtons.forEach(btn => {
        btn.addEventListener('click', handleAnimalChange);
    });

    // 發送訊息事件
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// 切換動物
function handleAnimalChange(e) {
    const animal = e.target.dataset.animal;
    
    // 移除所有按鈕的 active 類別
    animalButtons.forEach(btn => btn.classList.remove('active'));
    
    // 為選中的按鈕添加 active 類別
    e.target.classList.add('active');
    
    // 更新當前動物
    currentAnimal = animal;
    
    // 清空聊天記錄
    messageHistory = [];
    chatMessages.innerHTML = '';
    
    // 顯示問候訊息
    showGreeting();
}

// 顯示問候訊息
function showGreeting() {
    const animal = animalResponses[currentAnimal];
    const greeting = getRandomResponse(animal.responses.slice(0, 2));
    addBotMessage(greeting);
}

// 發送訊息
function sendMessage() {
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // 清空輸入框
    userInput.value = '';
    
    // 添加用戶訊息
    addUserMessage(message);
    
    // 保存到歷史記錄
    messageHistory.push({
        type: 'user',
        message: message,
        timestamp: new Date()
    });
    
    // 模擬機器人延遲回覆（更自然的效果）
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addBotMessage(botResponse);
        
        messageHistory.push({
            type: 'bot',
            message: botResponse,
            timestamp: new Date()
        });
    }, 300 + Math.random() * 700);
}

// 添加用戶訊息到聊天框
function addUserMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message user-message';
    messageEl.innerHTML = `
        <div class="message-content">
            <p>${escapeHtml(message)}</p>
        </div>
        <span class="animal-icon">👤</span>
    `;
    chatMessages.appendChild(messageEl);
    scrollToBottom();
}

// 添加機器人訊息到聊天框
function addBotMessage(message) {
    const animal = animalResponses[currentAnimal];
    const messageEl = document.createElement('div');
    messageEl.className = 'message bot-message';
    messageEl.innerHTML = `
        <span class="animal-icon">${animal.icon}</span>
        <div class="message-content">
            <p>${escapeHtml(message)}</p>
        </div>
    `;
    chatMessages.appendChild(messageEl);
    scrollToBottom();
}

// 生成機器人回應
function generateBotResponse(userMessage) {
    const animal = animalResponses[currentAnimal];
    
    // 簡單的關鍵字檢測
    const keywords = {
        greeting: ['嗨', '你好', '早上好', '晚上好', '安'],
        joy: ['開心', '快樂', '棒', '好'],
        question: ['？', '嗎', '呢', '嗎'],
        farewell: ['拜拜', '再見', '掰掰', '回見']
    };
    
    let response = getRandomResponse(animal.responses);
    
    // 根據關鍵字調整回應
    if (keywords.farewell.some(kw => userMessage.includes(kw))) {
        const farewells = {
            dog: '汪汪！拜拜！下次再聊吧！🐕',
            cat: '喵喵～再見了！😸',
            rabbit: '蹦蹦！再見囉！🐰',
            fox: '嘎嘎！期待和你下次相遇！🦊',
            panda: '呃呃～再見！🐼'
        };
        response = farewells[currentAnimal];
    } else if (keywords.question.some(kw => userMessage.includes(kw))) {
        response = getRandomResponse(animal.responses) + ' 🤔';
    } else if (keywords.joy.some(kw => userMessage.includes(kw))) {
        response = getRandomResponse(animal.responses) + ' 🎉';
    }
    
    return response;
}

// 取得隨機回應
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// 捲軸到最下方
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// HTML 轉義（防止 XSS）
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', init);
