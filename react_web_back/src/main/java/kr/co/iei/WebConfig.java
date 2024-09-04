package kr.co.iei;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{
	
	@Value("${file.root}")
	private String root;
	
	
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
	
	
	
}
