import "./App.css";
import { useEffect, useState } from "react";
import Chat from "./components/chat";
import { socket } from "./socket";
import { getRandomFruitOrVegetableWithEmoji } from "./fruit-code";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      socket.emit("user-information", {
        identifier: getRandomFruitOrVegetableWithEmoji(),
        id: socket.id,
      });
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onChatEvent(value) {
      console.log("chat", value);
      setChats((chats) => [...chats, value]);
    }

    function onConnectedUsers(value) {
      console.log("connected-users", value);
      setUserCount(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat", onChatEvent);
    socket.on("connected-users", onConnectedUsers);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat", onChatEvent);
    };
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    socket.emit("chat", {
      message: message,
      id: socket.id,
      time: new Date().toLocaleTimeString(),
    });
    setMessage("");
  }

  return (
    <>
      <div className="chat-container">
        <div className="navbar bg-neutral text-neutral-content">
          <div className="btn btn-ghost normal-case text-xl">
            WebProgrammierung Live!
          </div>
          <div className="header-status">
            <div>
              Status: {isConnected ? "Connected" : "Offline"}
            </div>
            <div>Online: {userCount}</div>
          </div>
        </div>
        <div className="chat-content">
          <ul>
            {chats.map((chat, index) => (
              <li key={index}>
                <Chat chat={chat} id={socket.id} />
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-footer">
          <form className="controls" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Type here"
              className="input w-full"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              disabled={!isConnected}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isConnected}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
