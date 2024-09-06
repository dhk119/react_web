import { useRecoilState, useRecoilValue } from "recoil";
import "./chat.css";
import { isLoginState, loginIdState, memberTypeState } from "./RecoilData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ChatMain = () => {
  const isLogin = useRecoilValue(isLoginState);
  const [chatList, setChatList] = useState([]);
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [ws, setWs] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  //http://192.168.10.35:9999
  const socketServer = backServer.replace("http://", "ws://");
  const [chatMsg, setChatMsg] = useState({
    type: "enter",
    memberId: loginId,
    message: "",
  });
  const inputMsg = (e) => {
    setChatMsg({ ...chatMsg, message: e.target.value });
  };
  useEffect(() => {
    //ws://192.168.10.35:9999/allChat
    chatMsg.memberId = loginId === "" ? "" : loginId;
    setChatMsg({ ...chatMsg });
    if (chatMsg.memberId !== "") {
      const socket = new WebSocket(`${socketServer}/allChat`);
      setWs(socket);
      return () => {
        console.log("이거보이니?");
        socket.close();
      };
    }
  }, [loginId]);
  const startChat = () => {
    console.log("웹소켓 연결 시 실행되는 함수");
    const data = JSON.stringify(chatMsg);
    ws.send(data);
    setChatMsg({ ...chatMsg, type: "chat" });
  };
  const receiveMsg = (receiveData) => {
    console.log("서버에서 데이터를 받으면 실행되는 함수");
    //서버가 보낸 문자열을 받아서 객체로 변환
    const data = JSON.parse(receiveData.data);
    console.log(data);
    setChatList([...chatList, data]);
  };
  const endChat = () => {
    console.log("웹소켓 연결이 끊어지면 실행되는 함수");
  };
  //소켓 연결하면 실행되는 함수 지정
  ws.onopen = startChat;
  //서버에서 데이터를 받으면 처리할 함수 지정
  ws.onmessage = receiveMsg;
  //소켓 연결이 끊어지면 실행되는 함수 지정
  ws.onclose = endChat;

  const sendMessage = () => {
    //JSON.stringify(obj) => json 데이터를 문자열로 변환
    const data = JSON.stringify(chatMsg);
    ws.send(data); //웹소켓객체의 send함수가 서버쪽으로 웹소켓을 통해서 데이터를 전송 (단 문자열로 바꾼 타입으로 보내줘야 된다.)
    setChatMsg({ ...chatMsg, message: "" });
    console.log(data);
  };
  return (
    <section className="section chat-wrap">
      <div className="page-title">전체회원 채팅</div>
      {isLogin ? (
        <div className="chat-content-wrap">
          <div className="chat-message-area">
            {chatList.map((chat, index) => {
              return (
                <Chatting
                  key={"chat-" + index}
                  chat={chat}
                  memberId={loginId}
                />
              );
            })}
          </div>
          <div className="message-input-box">
            <div className="input-item">
              <textarea
                id="chat-message"
                value={chatMsg.message}
                onChange={inputMsg}
              ></textarea>
              <button className="btn-primary" onClick={sendMessage}>
                전송
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="login-info-box">
          <h3>로그인 후 이용 가능합니다.</h3>
          <Link to="/login">로그인 페이지로 이동</Link>
        </div>
      )}
    </section>
  );
};

const Chatting = (props) => {
  const chat = props.chat;
  const memberId = props.memberId;
  return (
    <>
      {chat.type === "enter" ? (
        <p className="info">
          <span>{chat.memberId}</span>님이 입장하셨습니다.
        </p>
      ) : chat.type === "out" ? (
        <p className="info">
          <span>{chat.memberId}</span>님이 퇴장하셨습니다.
        </p>
      ) : (
        <div
          className={chat.memberId === memberId ? "chat right" : "chat left"}
        >
          <div className="user">
            <span className="material-icons">account_circle</span>
            <span className="name">{chat.memberId}</span>
          </div>
          <div className="chat-message">{chat.message}</div>
        </div>
      )}
    </>
  );
};

export default ChatMain;
