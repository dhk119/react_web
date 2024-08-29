package kr.co.iei;

import java.util.HashSet;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
@EnableWebMvc
public class SwaggerConfig {
	//자동으로 문서 작성할때 제목부분
	private ApiInfo	swaggerInfo() {
		return new ApiInfoBuilder()
						.title("REACT_WEB API")
						.build();
	}
	//요청형식지정
	private Set<String> getConsumeContentType(){
		Set<String> consumes = new HashSet<String>();
		consumes.add("application/json;charset=UTF-8");
		consumes.add("application/x-www-form-urlencoded");
		return consumes;
	}
	//응답 형식 지정
	private Set<String> getProduceContentType(){
		Set<String> produces = new HashSet<String>();
		produces.add("application/json;charset=UTF-8");
		produces.add("plain/text;charset=UTF-8");
		return produces;
	}
	
	@Bean
	public Docket swaggerApi() {
		return new Docket(DocumentationType.SWAGGER_2)
					.consumes(getConsumeContentType())
					.produces(getProduceContentType())
					.apiInfo(swaggerInfo()).select()
					.apis(RequestHandlerSelectors.basePackage("kr.co.iei"))
					.paths(PathSelectors.any())
					.build()
					.useDefaultResponseMessages(false);
	}
}
