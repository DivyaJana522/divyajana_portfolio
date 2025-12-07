// Portfolio Data (would be loaded from data.json in production)
let portfolioData = {};

fetch('./data.json')
  .then(res => res.json())
  .then(data => {
    portfolioData = data;
    // Data loaded successfully, initialization will happen on DOMContentLoaded
  })
  .catch(err => console.error('Error loading portfolio data:', err));


// DOM Elements
const messagesContainer = document.getElementById('messagesContainer');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const suggestions = document.getElementById('suggestions');
const typingIndicator = document.getElementById('typingIndicator');

// Chat State
let chatHistory = [];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadInitialSuggestions();
});

function setupEventListeners() {
    // Send button click
    sendButton.addEventListener('click', handleSendMessage);
    
    // Enter key to send
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    
    // Suggestion chips
    suggestions.addEventListener('click', function(e) {
        if (e.target.classList.contains('suggestion-chip')) {
            const action = e.target.getAttribute('data-action');
            handleSuggestionClick(action, e.target.textContent);
        }
    });
    
    // Auto-scroll on new messages
    const observer = new MutationObserver(() => {
        scrollToBottom();
    });
    observer.observe(messagesContainer, { childList: true });
}

function handleSendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    addUserMessage(message);
    chatInput.value = '';
    sendButton.disabled = true;
    
    // Process message after delay
    setTimeout(() => {
        processUserMessage(message);
        sendButton.disabled = false;
    }, getRandomDelay());
}

function handleSuggestionClick(action, text) {
    // Map action to user-friendly text
    const actionTexts = {
        'about': 'Tell me about yourself',
        'skills': 'What are your technical skills?',
        'experience': 'Show me your work experience',
        'projects': 'Tell me about your projects',
        'achievements': 'What are your achievements?',
        'contact': 'How can I contact you?',
        'education': 'Tell me about your education',
        'languages': 'What languages do you speak?'
    };
    
    const userText = actionTexts[action] || text;
    addUserMessage(userText);
    
    setTimeout(() => {
        generateResponse(action);
    }, getRandomDelay());
}

function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    messageElement.innerHTML = `
        <div class="message-avatar">🙋‍♂️</div>
        <div class="message-bubble">
            <div class="message-content">
                <p>${formatMessage(message)}</p>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(messageElement);
    chatHistory.push({ type: 'user', message: message });
}

function addBotMessage(content) {
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        messageElement.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-bubble">
                <div class="message-content">
                    ${content}
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        chatHistory.push({ type: 'bot', content: content });
        
        // Update suggestions based on context
        updateSuggestions();
    }, getRandomDelay());
}

function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Intent detection
    if (lowerMessage.includes('skill') || lowerMessage.includes('technolog') || lowerMessage.includes('expertise') || lowerMessage.includes('programming') || lowerMessage.includes('eda') || lowerMessage.includes('vlsi')) {
        generateResponse('skills');
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('professional')) {
        generateResponse('experience');
    } else if (lowerMessage.includes('cert') || lowerMessage.includes('qualification') || lowerMessage.includes('badge')) {
        generateResponse('achievements');
    } else if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('built')) {
        generateResponse('projects');
    } else if (lowerMessage.includes('achievement') || lowerMessage.includes('award') || lowerMessage.includes('accomplish')) {
        generateResponse('achievements');
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('hire') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
        generateResponse('contact');
    } else if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('study') || lowerMessage.includes('college') || lowerMessage.includes('university')) {
        generateResponse('education');
    } else if (lowerMessage.includes('language') || lowerMessage.includes('speak')) {
        generateResponse('languages');
    } else if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('yourself') || lowerMessage.includes('tell')) {
        generateResponse('about');
    } else {
        generateResponse('general');
    }
}

function generateResponse(type) {
    let content = '';
    
    switch (type) {
        case 'about':
            content = `
                <p><strong>👨‍💻 About Me</strong></p>
                <p>I'm ${portfolioData.personal ? portfolioData.personal.name : 'there'}, a <strong>${portfolioData.personal ? portfolioData.personal.title : 'Professional'}</strong> based in ${portfolioData.personal ? portfolioData.personal.location : 'somewhere'}.</p>
                <p>${portfolioData.personal ? portfolioData.personal.summary : 'A skilled professional with years of experience.'}</p>
                <p><strong>🏆 Key Highlights:</strong></p>
                <ul class="achievement-list">
                    ${portfolioData.personal && portfolioData.personal.highlights && portfolioData.personal.highlights.length > 0 ? portfolioData.personal.highlights.map(highlight => `<li>${highlight}</li>`).join('') : '<li>Dedicated professional with extensive experience</li>'}
                </ul>
                <p>I'm currently <strong class="status status--success">${portfolioData.personal ? portfolioData.personal.status : 'Open to opportunities'}</strong>!</p>
            `;
            break;
            
        case 'skills':
            content = `
                <p><strong>🛠️ Technical Skills</strong></p>
                <p>Here's my comprehensive technical expertise in VLSI automation and EDA:</p>
                <div class="skills-grid">
                    ${portfolioData.skills.programming && portfolioData.skills.programming.length > 0 ? `
                    <div class="skill-category">
                        <h4>Programming Languages</h4>
                        <div class="skill-tags">
                            ${portfolioData.skills.programming.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                    ${portfolioData.skills.eda_tools && portfolioData.skills.eda_tools.length > 0 ? `
                    <div class="skill-category">
                        <h4>EDA Tools</h4>
                        <div class="skill-tags">
                            ${portfolioData.skills.eda_tools.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                    ${portfolioData.skills.devops && portfolioData.skills.devops.length > 0 ? `
                    <div class="skill-category">
                        <h4>DevOps & CI/CD</h4>
                        <div class="skill-tags">
                            ${portfolioData.skills.devops.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                    ${portfolioData.skills.ai_ml && portfolioData.skills.ai_ml.length > 0 ? `
                    <div class="skill-category">
                        <h4>AI & Machine Learning</h4>
                        <div class="skill-tags">
                            ${portfolioData.skills.ai_ml.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                    ${portfolioData.skills.generative_ai && portfolioData.skills.generative_ai.length > 0 ? `
                    <div class="skill-category">
                        <h4>Generative AI & LLMs</h4>
                        <div class="skill-tags">
                            ${portfolioData.skills.generative_ai.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                    ${portfolioData.skills.version_control && portfolioData.skills.version_control.length > 0 ? `
                    <div class="skill-category">
                        <h4>Version Control</h4>
                        <div class="skill-tags">
                            ${portfolioData.skills.version_control.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                    ${portfolioData.skills.visualization && portfolioData.skills.visualization.length > 0 ? `
                    <div class="skill-category">
                        <h4>Visualization & Tools</h4>
                        <div class="skill-tags">
                            ${portfolioData.skills.visualization.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            `;
            break;
            
        case 'experience':
            content = `
                <p><strong>💼 Work Experience</strong></p>
                <p>Here's my professional journey:</p>
                <div class="experience-list">
                    ${portfolioData.experience && portfolioData.experience.length > 0 ? portfolioData.experience.map(exp => `
                        <div class="experience-item">
                            <div class="experience-position">${exp.position}</div>
                            <div class="experience-company">${exp.company}</div>
                            <div class="experience-meta">
                                <span>📅 ${exp.duration}</span>
                                <span>📍 ${exp.location}</span>
                            </div>
                            <ul class="achievement-list">
                                ${exp.achievements && exp.achievements.length > 0 ? exp.achievements.map(achievement => `<li>${achievement}</li>`).join('') : '<li>Professional experience</li>'}
                            </ul>
                        </div>
                    `).join('') : '<p>No experience data available</p>'}
                </div>
            `;
            break;
            
        
            
        case 'projects':
            content = `
                <p><strong>🚀 Key Projects</strong></p>
                <p>Here are some impactful projects I've delivered:</p>
                <div class="experience-list">
                    ${portfolioData.projects.map(project => `
                        <div class="experience-item">
                            <div class="experience-position">${project.title}</div>
                            <div class="experience-company">${project.description}</div>
                            ${project.impact ? `<div class="experience-meta"><strong>💡 Impact:</strong> ${project.impact}</div>` : ''}
                            ${project.technologies && project.technologies.length > 0 ? `
                            <div class="skill-tags">
                                ${project.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                            </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
            break;
            
        case 'achievements':
            content = `
                <p><strong>🎯 Achievements</strong></p>
                <p>Some highlights from my career:</p>
                <ul class="achievement-list">
                    ${portfolioData.achievements && portfolioData.achievements.length > 0 ? portfolioData.achievements.map(achievement => `<li>${achievement}</li>`).join('') : '<li>Accomplished professional</li>'}
                </ul>
                <p>I'm proud of these accomplishments and always striving for excellence!</p>
            `;
            break;
            
        case 'contact':
            content = `
                <p><strong>📞 Let's Connect!</strong></p>
                <p>I'm <strong class="status status--success">Available Immediately</strong> for new opportunities. Here's how you can reach me:</p>
                <div class="contact-buttons">
                    ${portfolioData.contact && portfolioData.contact.email ? `
                    <a href="mailto:${portfolioData.contact.email}?subject=Job Opportunity - Senior ASIC Digital Design Engineer" class="contact-btn">
                        <span class="contact-icon">📧</span>
                        <span>Email</span>
                    </a>
                    ` : ''}
                    ${portfolioData.contact && portfolioData.contact.phone ? `
                    <a href="tel:${portfolioData.contact.phone}" class="contact-btn">
                        <span class="contact-icon">📞</span>
                        <span>Call</span>
                    </a>
                    ` : ''}
                    ${portfolioData.contact && portfolioData.contact.whatsapp ? `
                    <a href="https://wa.me/${portfolioData.contact.whatsapp}?text=Hi%20Divya%2C%20I%20found%20your%20portfolio!" class="contact-btn" target="_blank">
                        <span class="contact-icon">💬</span>
                        <span>WhatsApp</span>
                    </a>
                    ` : ''}
                    ${portfolioData.contact && portfolioData.contact.linkedin ? `
                    <a href="${portfolioData.contact.linkedin}" class="contact-btn" target="_blank">
                        <span class="contact-icon">🔗</span>
                        <span>LinkedIn</span>
                    </a>
                    ` : ''}
                    ${portfolioData.contact && portfolioData.contact.portfolio ? `
                    <a href="${portfolioData.contact.portfolio}" class="contact-btn" target="_blank">
                        <span class="contact-icon">📄</span>
                        <span>Resume</span>
                    </a>
                    ` : ''}
                </div>
                <p>I typically respond within <strong>2-4 hours</strong> during business hours!</p>
            `;
            break;
            
        case 'education':
            content = `
                <p><strong>🎓 Education</strong></p>
                <p>My educational background:</p>
                <div class="experience-list">
                    ${portfolioData.education && portfolioData.education.length > 0 ? portfolioData.education.map(edu => `
                        <div class="experience-item">
                            <div class="experience-position">${edu.degree}</div>
                            <div class="experience-company">${edu.institution}</div>
                            <div class="experience-meta">
                                <span>📅 ${edu.year}</span>
                                ${edu.grade ? `<span>🎯 ${edu.grade}</span>` : ''}
                            </div>
                        </div>
                    `).join('') : '<p>No education data available</p>'}
                </div>
            `;
            break;
            
        case 'languages':
            content = `
                <p><strong>🌐 Languages</strong></p>
                <p>I can communicate in multiple languages:</p>
                <div class="experience-list">
                    ${portfolioData.languages && portfolioData.languages.length > 0 ? portfolioData.languages.map(lang => `
                        <div class="experience-item">
                            <div class="experience-position">${lang.language}</div>
                            <div class="experience-company">${lang.level}</div>
                        </div>
                    `).join('') : '<p>No language data available</p>'}
                </div>
            `;
            break;
            
        default:
            content = `
                <p><strong>👋 Hello!</strong></p>
                <p>I'm ${portfolioData.personal.name}, a <strong>${portfolioData.personal.title}</strong> with <strong>5+ years</strong> of experience in VLSI automation and ASIC design.</p>
                <p>I specialize in <strong>automation frameworks, EDA tools, Python scripting, and AI/ML integration</strong> in semiconductor workflows.</p>
                <p>I'm <strong class="status status--success">Available Immediately</strong> for new opportunities!</p>
                <p>What would you like to know about my background?</p>
            `;
    }
    
    addBotMessage(content);
}

function updateSuggestions() {
    // Contextual suggestions based on conversation
    const contextualSuggestions = [
        { action: 'skills', text: 'Skills' },
        { action: 'experience', text: 'Experience' },
        { action: 'projects', text: 'Projects' },
        { action: 'education', text: 'Education' },
        { action: 'languages', text: 'Languages' },
        { action: 'contact', text: '📞 Contact' }
    ];
    
    // Randomly shuffle and pick 5
    const shuffled = contextualSuggestions.sort(() => 0.5 - Math.random()).slice(0, 5);
    
    suggestions.innerHTML = shuffled.map(suggestion => 
        `<button class="suggestion-chip" data-action="${suggestion.action}">${suggestion.text}</button>`
    ).join('');
}

function loadInitialSuggestions() {
    const initialSuggestions = [
        { action: 'about', text: 'About' },
        { action: 'skills', text: 'Skills' },
        { action: 'projects', text: 'Projects' },
        { action: 'experience', text: 'Experience' },
        { action: 'education', text: 'Education' },
        { action: 'languages', text: 'Languages' },
        { action: 'contact', text: '📞 Contact' }
    ];
    
    suggestions.innerHTML = initialSuggestions.map(suggestion => 
        `<button class="suggestion-chip" data-action="${suggestion.action}">${suggestion.text}</button>`
    ).join('');
}

function showTypingIndicator() {
    typingIndicator.classList.remove('hidden');
    scrollToBottom();
}

function hideTypingIndicator() {
    typingIndicator.classList.add('hidden');
}

function scrollToBottom() {
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
}

function formatMessage(message) {
    // Simple markdown-like formatting for **bold**
    return message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function getRandomDelay() {
    // Random delay between 600-900ms as specified
    return Math.floor(Math.random() * 300) + 600;
}

// Auto-focus input on load
window.addEventListener('load', () => {
    chatInput.focus();
});