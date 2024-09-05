package kr.co.iei.board.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="board")
public class BoardDTO {
	private int boardNo;
	private String boardTitle;
	private String boardThumb;
	private String boardContent;
	private String boardWriter;
	private int boardStatus;
	private String boardDate;
	private List<BoardFileDTO> fileList;
	private int[] delBoardFileNo;
}
