package kr.co.iei.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.board.model.dao.BoardDao;
import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class AdminService {
	@Autowired
	private BoardDao boardDao;
	
	@Autowired
	private MemberDao memberDao;

	@Autowired
	private PageUtil pageUtil;
	
	public Map selectAdminBoardList(int reqPage) {
		//게시물 조회에 필요한 데이터
		int numPerPage = 10;
		int pageNaviSize = 5;
		int adminTotal = boardDao.adminTotal();
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, adminTotal);
		List list = boardDao.adminBoardList(pi);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}

	public int changeBoardStatus(BoardDTO board) {
		int result = boardDao.updateBoardStatus(board);
		return result;
	}

	public Map selectAdminMemberList(int reqPage) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = memberDao.adminTotalCount();
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = memberDao.adminMemberList(pi);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}
	
	@Transactional
	public int updateMemberType(MemberDTO member) {
		int result = memberDao.updateMemberType(member);
		return result;
	}
	
}
