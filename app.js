// MoonChat preview. This is local-only until Firebase is configured.
// See SETUP.md for instructions to enable real-time messaging.
const form = document.querySelector("#messageForm");
const input = document.querySelector("#messageInput");
const messages = document.querySelector("#messages");
const charCount = document.querySelector("#charCount");
const statusText = document.querySelector("#statusText");

input.addEventListener("input", () => {
  charCount.textContent = `${input.value.length} / 500`;
});

function addMessage(text) {
  const row = document.createElement("div");
  row.className = "message-row sent";
  const content = document.createElement("div");
  content.className = "message-content";
  const sender = document.createElement("span");
  sender.className = "sender";
  sender.textContent = "You";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  const time = document.createElement("time");
  time.textContent = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
  content.append(sender, bubble, time);
  row.append(content);
  messages.append(row);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage(text);
  input.value = "";
  charCount.textContent = "0 / 500";
  input.focus();
});

statusText.textContent = "Preview mode";
