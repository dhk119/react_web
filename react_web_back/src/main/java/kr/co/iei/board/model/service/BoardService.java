package kr.co.iei.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.board.model.dao.BoardDao;
import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.dto.BoardFileDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class BoardService {
	@Autowired
	private BoardDao boardDao;
	@Autowired
	private PageUtil pageUtil;

	public Map selectBoardList(int reqPage) {
		//게시물 조회 및 페이징에 필요한 데이터를 모두 취합
		int numPerPage = 12;		//한 페이지당 게시물 수
		int pageNaviSize = 5;		//페이지네이션 길이
		int totalCount = boardDao.totalCount();//전체 게시물 수
		//페이징에 필요한 값들을 연산해서 객체로 리턴받음
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = boardDao.selectBoardList(pi);
		Map<String, Object> map =  new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}

	@Transactional
	public int insertBoard(BoardDTO board, List<BoardFileDTO> boardFileList) {
		int result = boardDao.insertBoard(board); // 여기서 selectkey로 boardNo 보내줘서 이시점 이후 set으로 보내준다
		
		for(BoardFileDTO boardFile : boardFileList) {
			boardFile.setBoardNo(board.getBoardNo());
			result += boardDao.insertBoardFile(boardFile);
		}
		return result;
	}

	public BoardDTO selectOneBoard(int boardNo) {
		BoardDTO board = boardDao.selectOneBoard(boardNo);
//		List<BoardFileDTO> fileList = boardDao.selectOneBoardFileList(boardNo);
//		board.setFileList(fileList);
		return board;
	} 
}
