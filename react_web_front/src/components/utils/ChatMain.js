import { useRecoilState, useRecoilValue } from "recoil";
import "./chat.css";
import { isLoginState, loginIdState, memberTypeState } from "./RecoilData";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const ChatMain = () => {
  const isLogin = useRecoilValue(isLoginState);
  const [chatList, setChatList] = useState([]);
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [ws, setWs] = useState({});
  const [btnStatus, setBtnStatus] = useState(true); // 버튼 상태 처음에 비활성화로 button disable을 줘야 되서 true로 시작
  const backServer = process.env.REACT_APP_BACK_SERVER;
  //http://192.168.10.35:9999
  const socketServer = backServer.replace("http://", "ws://");
  const [chatMsg, setChatMsg] = useState({
    type: "enter",
    memberId: loginId,
    message: "",
  });
  const inputMsg = (e) => {
    // e.target.value = 여기서만 textarea에 들어있는 값
    // \n은 엔터 없애는거 엔터를 누를시 엔터가 적용되서 아래로 내려가는데 이때 \n\r이런게 작동되서 엔터를 눌러도 작동이 됨 그거를 없애기 위해 하는 작업
    const checkValue = e.target.value.replaceAll("\n", "");
    if (checkValue === "" && chatMsg.message === "") {
      // 기존에 메세지가 하나도 없는데 checkValue마저 비어 있고 \n(엔터)만 쳤을때
      setBtnStatus(true); // 값을 바꾸지 않겠다는 거임
      return;
    }
    setChatMsg({ ...chatMsg, message: e.target.value });
    if (e.target.value === "") {
      setBtnStatus(true); //글썼다 지웠을때 전성버튼 비활성화
    } else {
      setBtnStatus(false); //글을 입력하면 활성화 시켜주기
    }
  };
  //   //글썼다 지웠을때 전송버튼 비활성화
  //   useEffect(() => {
  //     if (chatMsg.message === "") {
  //       setBtnStatus(true);
  //     }
  //   }, []);
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
    setBtnStatus(true);
  };
  //채팅 스크롤 최신으로 보이게 올리는거
  const chatDiv = useRef(null);
  useEffect(() => {
    if (chatDiv.current) {
      chatDiv.current.scrollTop = chatDiv.current.scrollHeight;
    }
  }, [chatList]);
  //엔터 누르면 send작동하게
  const inputKeyboard = (e) => {
    //엔터에 키코드가 13 / !e.shiftKey shift키 누르고 엔터 누르면 send 작동 안되게 / 빈문자열이 아닐때만 보내게(하지만 버튼상태를 만들어야 작동)
    if (e.keyCode === 13 && !e.shiftKey && chatMsg.message !== "") {
      sendMessage();
    }
  };
  return (
    <section className="section chat-wrap">
      <div className="page-title">전체회원 채팅</div>
      {isLogin ? (
        <div className="chat-content-wrap">
          <div className="chat-message-area" ref={chatDiv}>
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
                onKeyUp={inputKeyboard} // 엔터 누르면 작동하게
              ></textarea>
              <button
                className={btnStatus ? "btn-secondary" : "btn-primary"}
                onClick={btnStatus ? null : sendMessage} //버튼상태가 true이면 비활성화 false면 함수가 들어가게
                disabled={btnStatus}
              >
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
