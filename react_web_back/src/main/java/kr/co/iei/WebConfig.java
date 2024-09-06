package kr.co.iei;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import kr.co.iei.chat.model.service.AllMemberChatHandler;

@Configuration
@EnableWebSocket
public class WebConfig implements WebMvcConfigurer, WebSocketConfigurer{
	
	@Value("${file.root}")
	private String root;
	
	@Autowired
	private AllMemberChatHandler allMemberChat;
	
	
	@Bean
	public BCryptPasswordEncoder bCrypt() {
		return new BCryptPasswordEncoder();
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //                  /editor/**하고 요청이 들어오면 (/**는 뒤 경로는 상관없다는 뜻)
        registry
        	.addResourceHandler("/editor/**")
        	.addResourceLocations("file:///"+root+"/editor/");//여기 경로로 보내라는 뜻
        
        registry
        	.addResourceHandler("/board/thumb/**")
        	.addResourceLocations("file:///"+root+"/board/thumb/");
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(allMemberChat, "/allChat").setAllowedOrigins("*"); //crossorigin 처럼 다른 소켓에서들어와도 허용해줘 
		
	}
	
	
	
	
}
