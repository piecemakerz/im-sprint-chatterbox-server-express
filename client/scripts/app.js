// eslint-disable-next-line

const button = document.getElementById("submit");
const clear = document.getElementById("clearBtn");
const roomSelector = document.getElementById("roomSelector");
const userComponent = document.getElementById("inputUserName");
const messageComponent = document.getElementById("inputMessage");
const roomCreateButton = document.getElementById("createRoom");
const userForm = document.getElementById("userForm");
const roomForm = document.getElementById("roomForm");
const cancelBtn = document.getElementById("cancel");
const newRoomButton = document.getElementById("newRoomSubmit");
const newRoomName = document.getElementById("newRoomName");

const app = {
  server: "http://localhost:3002/messages",
  fetch: async (roomname) => {
    const res = await window.fetch(app.server);
    const { results } = await res.json();
    if (roomname) {
      const result = results.filter((element) => element.roomname === roomname);
      return result;
    } else {
      return results;
    }
  },
  // 서버에 데이터를 넣어주는 메소드
  send: (message) => {
    window.fetch(app.server, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  // 현재 메시지들을 브라우저에서 지우는 메소드
  clearMessages: () => {
    const chats = document.getElementById("chats");
    chats.textContent = "";
  },
  // 입력값을 서버가 아니라 브라우저에만 추가시키는 메소드
  renderMessage: (message) => {
    const chats = document.getElementById("chats");
    const newMessage = document.createElement("div");
    newMessage.classList.add("chat");

    const userName = document.createElement("div");
    const body = document.createElement("div");

    userName.classList.add("username");
    body.classList.add("body");

    userName.textContent = message.username;
    body.textContent = message.text;

    newMessage.appendChild(userName);
    newMessage.appendChild(body);

    chats.prepend(newMessage);
  },
  // 입력값을 서버로 받아와 모든 메시지를 출력하는 함수
  renderAllMessages: (messages) => {
    messages.forEach((message) => {
      app.renderMessage(message);
    });
  },
  getSendData: () => {
    return {
      username: userComponent.value,
      text: messageComponent.value,
      roomname: roomSelector.value,
    };
  },
  init: (roomname) => {
    app.clearMessages();
    app.fetch(roomname).then((messages) => {
      app.renderAllMessages(messages);
    });
  },
};

const handlePostButtonClick = (event) => {
  event.preventDefault();

  const message = app.getSendData();
  app.send(message);
  app.renderMessage(message);

  userComponent.value = "";
  messageComponent.value = "";
};

const handleRoomChange = () => {
  const roomname = roomSelector.value;

  app.clearMessages();

  app.fetch(roomname).then((messages) => {
    messages.forEach((message) => app.renderMessage(message));
  });
};

const handleRoomCreateButtonClick = (event) => {
  event.preventDefault();
  userForm.style.display = "none";
  roomForm.style.display = "block";
  roomCreateButton.style.display = "none";
};

const handleCancelButtonClick = (event) => {
  event.preventDefault();
  userForm.style.display = "block";
  roomForm.style.display = "none";
  roomCreateButton.style.display = "block";
};

const handleRoomCreate = (event) => {
  // 3. 방 생성 버튼 클릭 시 selector에 새로운 방 이름을 생성해주는 이벤트 핸들러 배정
  event.preventDefault();
  const option = document.createElement("option");
  const roomname = newRoomName.value;
  option.textContent = roomname;
  option.value = roomname;
  roomSelector.appendChild(option);
  roomSelector.value = roomname;

  app.clearMessages();
  // 3-1. 이벤트 핸들러에서는 생성한 방에 입장하는 동작도 포함한다.
  app.init(roomname);

  newRoomName.value = "";
  userForm.style.display = "block";
  roomForm.style.display = "none";
  roomCreateButton.style.display = "block";
};

button.addEventListener("click", handlePostButtonClick);

roomSelector.addEventListener("change", handleRoomChange);

clear.addEventListener("click", () => {
  app.clearMessages();
});

roomCreateButton.addEventListener("click", handleRoomCreateButtonClick);

cancelBtn.addEventListener("click", handleCancelButtonClick);

newRoomButton.addEventListener("click", handleRoomCreate);

const roomname = roomSelector.value;
app.init(roomname);

window.setInterval(app.init.bind(this, roomSelector.value), 10000);
