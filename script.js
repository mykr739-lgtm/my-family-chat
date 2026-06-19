let username = "";
let isAdmin = false;

// 🔐 ورود
function login() {
    let pass = document.getElementById("pass").value;

    if (pass === "8585") {

        username = prompt("اسم شریف شما چیست؟👤");
        if (!username || username.trim() === "") username = "ناشناس";

        isAdmin = false;
        openChat();
    }

    else if (pass === "شاه یزدان") {

        username = prompt("ادمین اسمت چیه🛡");
        if (!username || username.trim() === "") {
            username = "ادمین";
        } else {
            username = "🛡 " + username;
        }

        isAdmin = true;
        openChat();
    }

    else {
        document.getElementById("msg").innerText = "❌ رمز اشتباه";
    }
}

// 💬 ورود به چت
function openChat() {
    document.getElementById("login").style.display = "none";
    document.getElementById("chatPage").style.display = "flex";

    loadMessages(); // 👈 پیام‌های ذخیره‌شده لود می‌شن
}

// 💾 گرفتن پیام‌ها از حافظه
function getMessages() {
    let data = localStorage.getItem("messages");
    if (!data) return [];
    return JSON.parse(data);
}

// 💾 ذخیره پیام
function saveMessages(messages) {
    localStorage.setItem("messages", JSON.stringify(messages));
}

// 📩 ارسال پیام
function send() {
    let text = document.getElementById("text");

    if (text.value.trim() === "") return;

    let messages = getMessages();

    let newMsg = {
        name: username,
        text: text.value
    };

    messages.push(newMsg);
    saveMessages(messages);

    text.value = "";

    renderMessages();
}

// 📺 نمایش پیام‌ها
function renderMessages() {
    let box = document.getElementById("messages");
    box.innerHTML = "";

    let messages = getMessages();

    messages.forEach((m, index) => {
        let div = document.createElement("div");
        div.className = "msg";

        div.innerHTML = `<b>${m.name}:</b> ${m.text}`;

        // 🗑 فقط ادمین می‌تواند حذف کند
        if (isAdmin) {
            let btn = document.createElement("button");
            btn.innerText = "حذف";
            btn.style.marginLeft = "10px";
            btn.style.background = "red";
            btn.style.color = "white";

            btn.onclick = function () {
                messages.splice(index, 1);
                saveMessages(messages);
                renderMessages();
            };

            div.appendChild(btn);
        }

        box.appendChild(div);
    });
}

// 📥 لود اولیه
function loadMessages() {
    renderMessages();
}