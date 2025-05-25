function goto(url) {
  window.location.href = url;
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  console.log('Searching for:', searchInput.value);
  // You can implement dynamic filtering or API search later
});

function openChatbot() {
  document.getElementById('chatbot-modal').style.display = 'block';
}

function closeChatbot() {
  document.getElementById('chatbot-modal').style.display = 'none';
}

async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  const chatWindow = document.getElementById('chat-window');
chatWindow.innerHTML += `
  <div class="user-msg-wrapper">
    <div class="user-msg-content">
      <div class="user-bubble">${escapeHTML(message)}</div>
      <div class="timestamp">${getTime()}</div>
    </div>
  </div>
`;

  input.value = '';
  scrollToBottom(chatWindow);

  showTypingIndicator();

  try {
    const res = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    const botReply = data.reply || "Sorry, I couldn't get a response.";

    const formattedReply = botReply
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // bold
      .replace(/\n/g, '<br>');                           // line breaks

    hideTypingIndicator();
chatWindow.innerHTML += `
  <div class="bot-msg-wrapper">
    <img src="https://thumbs.dreamstime.com/b/d-doctor-icon-white-background-ai-generated-image-content-title-354627067.jpg" class="bot-avatar" alt="Bot Avatar">
    <div class="bot-msg-content">
      <div class="bot-bubble">${formattedReply}</div>
      <div class="timestamp">${getTime()}</div>
    </div>
  </div>
`;



    scrollToBottom(chatWindow);
  } catch (error) {
    hideTypingIndicator();
    chatWindow.innerHTML += `
      <div class="bot error">
        <span class="timestamp">${getTime()}</span>
        <p>❌ Error getting response from server.</p>
      </div>`;
    console.error("Error in chat fetch:", error);
  }
}

// Helper function to sanitize user input if needed
function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}



function scrollToBottom() {
  const chatWindow = document.getElementById("chat-window");
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function sendQuick(text) {
  document.getElementById('user-input').value = text;
  sendMessage();
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom(container) {
  container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
  const chatWindow = document.getElementById("chat-window");

  const typingHTML = `
    <div class="bot-msg-wrapper" id="typing-bubble">
      <div class="avatar-and-bubble">
        <img src="https://thumbs.dreamstime.com/b/d-doctor-icon-white-background-ai-generated-image-content-title-354627067.jpg" class="bot-avatar" alt="Bot Avatar">
        <div class="bot-bubble typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  `;

  chatWindow.innerHTML += typingHTML;
  chatWindow.scrollTop = chatWindow.scrollHeight;
}



function hideTypingIndicator() {
  const bubble = document.getElementById("typing-bubble");
  if (bubble) bubble.remove();
}












async function getBotReply(message) {
  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  const data = await res.json();
  return data.reply;
}


document.getElementById("hospitalForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const hospitalName = document.getElementById("hospital").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hospitalName, password })
  });

  if ((await res.json()).success) {
    document.getElementById("hospitalForm").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
  } else {
    alert("Login failed");
  }
});

function addDoctor() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Doctor Name" class="docName" />
    <input placeholder="Timing" class="docTime" />
  `;
  document.getElementById("doctorSection").appendChild(div);
}

async function submitUpdate() {
  const hospitalName = document.getElementById("hospital").value;
  const beds = document.getElementById("beds").value;
  const doctors = [...document.querySelectorAll(".docName")].map((_, i) => ({
    name: document.querySelectorAll(".docName")[i].value,
    time: document.querySelectorAll(".docTime")[i].value
  }));

  await fetch("/updateHospital", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hospitalName, beds, doctors })
  });

  alert("Update successful!");
}
