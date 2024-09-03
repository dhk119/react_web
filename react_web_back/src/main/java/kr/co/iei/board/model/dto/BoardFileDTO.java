package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="boardFile")
public class BoardFileDTO {
	private int boardFileNo;
	private int boardNo;
	private String filename;
	private String filepath;
}
