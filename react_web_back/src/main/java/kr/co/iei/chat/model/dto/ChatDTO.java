package kr.co.iei.chat.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
//저장 할거면 alias도 붙여야 되는데 저장 안할거기 때문에 안붙임
public class ChatDTO {
	private String type;
	private String memberId;
	private String message;
}
