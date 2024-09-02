package kr.co.iei.util;

import java.util.Calendar;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import kr.co.iei.member.model.dto.LoginMemberDTO;

@Component
public class JwtUtils { //application.properties에 저장한거를 따로 뽑아오기 위한 작업
	@Value("${jwt.secret-key}")
	public String secretKey;
	@Value("${jwt.expire-hour}")
	public int expireHour;
	@Value("${jwt.expire-hour-refresh}")
	public int expireHourRefresh;
	
	//1시간짜리 토큰 생성
	//service에 autowired를 해주기
	public String createAccessToken(String memberId, int memberType) {
		//1. 작성해둔 키값을 이용해서 암호화 코드 생성
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		//2. 토큰 생성시간 및 만료시간 설정
		Calendar c = Calendar.getInstance();//현시간 기준으로 시작하는 시간 
		Date startTime = c.getTime(); //시간 가져와서 넣어주기
		c.add(Calendar.HOUR, expireHour);//끝나는 시간 
		//c.add(Calendar.SECOND, 30);
		Date expireTime = c.getTime(); 
		
		String token = Jwts.builder()					//JWT 생성 시작
						.issuedAt(startTime)			//토큰발행 시작시간
						.expiration(expireTime)			//토큰 만료 시간
						.signWith(key)					//암호화서명
						.claim("memberId", memberId)	//토큰에 포함할 회원정보 세팅(key = value)
						.claim("memberType", memberType)//토큰에 포함할 회원정보 세팅(key = value)
						.compact();						//생성
		return token;
	}	
	
	//8760시간(1년) 짜리 accessToken 
	public String createRefreshToken(String memberId, int memberType) {
		//1. 작성해둔 키값을 이용해서 암호화 코드 생성
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		//2. 토큰 생성시간 및 만료시간 설정
		Calendar c = Calendar.getInstance();//현시간 기준으로 시작하는 시간 
		Date startTime = c.getTime(); //시간 가져와서 넣어주기
		c.add(Calendar.HOUR, expireHourRefresh);//끝나는 시간 
		Date expireTime = c.getTime(); 
				
		String token = Jwts.builder()					//JWT 생성 시작
						.issuedAt(startTime)			//토큰발행 시작시간
						.expiration(expireTime)			//토큰 만료 시간
						.signWith(key)					//암호화서명
						.claim("memberId", memberId)	//토큰에 포함할 회원정보 세팅(key = value)
						.claim("memberType", memberType)//토큰에 포함할 회원정보 세팅(key = value)
						.compact();						//생성
		return token;
	}
	
	//토큰을 받아서 확인을 하는 작업
	public LoginMemberDTO checkToken(String token) {
		//1. 토큰 해석을 위한 암호화 키 세팅 (암호화로 세팅한 그 키를 똑같이 사용 한다)
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		Claims claims = (Claims) Jwts.parser()			//토큰해석 시작
									.verifyWith(key)	//암호화 키
									.build()
									.parse(token)
									.getPayload();
		String memberId = (String)claims.get("memberId");
		int memberType = (int)claims.get("memberType");
		LoginMemberDTO loginMember = new LoginMemberDTO();
		loginMember.setMemberId(memberId);
		loginMember.setMemberType(memberType);
		return loginMember;
	}
}
