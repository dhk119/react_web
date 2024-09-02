package kr.co.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")
@Tag(name="MEMBER", description = "MEMBER API")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@PostMapping
	public ResponseEntity<Integer> join(@RequestBody MemberDTO member) {
		int result = memberService.insertMember(member);
		if(result>0) {
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.status(500).build();
		}
	}
	
	@GetMapping(value="/memberId/{memberId}/check-id")
	public ResponseEntity<Integer> checkId(@PathVariable String memberId){
		int result = memberService.checkId(memberId);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value="/login")
	public ResponseEntity<LoginMemberDTO> login(@RequestBody MemberDTO member){
		LoginMemberDTO loginMember = memberService.login(member);
		if(loginMember != null) {
			return ResponseEntity.ok(loginMember);
		}else {
			return ResponseEntity.status(404).build();
		}
	}
	@PostMapping(value="/refresh")
	public ResponseEntity<LoginMemberDTO> refresh(@RequestHeader("Authorization") String token) {
		LoginMemberDTO loginMember = memberService.refresh(token);
		if(loginMember != null) {
			return ResponseEntity.ok(loginMember);
		}else {
			return ResponseEntity.status(404).build();
		}
	}
	@GetMapping
	public ResponseEntity<MemberDTO> selectOneMember(@RequestHeader("Authorization") String token){
//		try {
//			Thread.sleep(5000);
//		} catch (InterruptedException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		MemberDTO member = memberService.selectOneMember(token);
		return ResponseEntity.ok(member);
	}
	@PatchMapping
	public ResponseEntity<Integer> updateMember(@RequestBody MemberDTO member){
		int result = memberService.updateMember(member);
		return ResponseEntity.ok(result);
	}
	@PostMapping(value="/pw")
	public ResponseEntity<Integer> checkPw(@RequestBody MemberDTO member){
		int result = memberService.checkPw(member);
		return ResponseEntity.ok(result);
	}
	@PatchMapping(value="/pw")
	public ResponseEntity<Integer> changePw(@RequestBody MemberDTO member){
		int result = memberService.changePw(member);
		return ResponseEntity.ok(result);
	}
	@DeleteMapping
	public ResponseEntity<Integer> deleteMember(@RequestHeader("Authorization") String token){
		int result = memberService.deleteMember(token);
		return ResponseEntity.ok(result);
	}
}
