/* eslint-disable react/prop-types */

import "./chat.css"

function Chat({ chat, id }) {
  return (
    <>
      <div className={id === chat.id ? 'chat chat-end' : 'chat chat-start'}>
        <div className="chat-header">
          {chat.identifier.emoji} {chat.identifier.name}
          <time className="text-xs opacity-80">{chat.time}</time>
        </div>
        <div className="chat-bubble">{chat.message}</div>
      </div>
    </>
  );
}

export default Chat;