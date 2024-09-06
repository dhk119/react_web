package kr.co.iei.chat.model.service;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class AllMemberChatHandler extends TextWebSocketHandler {
	
	//클라이언트가 소켓에 최초접속하면 자동으로 호출되는 메소드
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("클라이언트 접속 : "+session);
	}

	//클라이언트가 소켓으로 데이터를 전송하면 자동으로 호출되는 메소드
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// TODO Auto-generated method stub
		super.handleTextMessage(session, message);
	}

	//클라이언트가 소켓에서 접속이 끊어지면 자동으로 호출되는 메소드
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("클라이언트 접속 끊김 : " + session);
	}
	
}
