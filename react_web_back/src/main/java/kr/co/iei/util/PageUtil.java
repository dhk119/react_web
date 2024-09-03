package kr.co.iei.util;

import org.springframework.stereotype.Component;

@Component
public class PageUtil {//페이징 처리해주는 계산식
	public PageInfo getPageInfo(int reqPage, int numPerPage, int pageNaviSize, int totalCount) {
		int end = reqPage * numPerPage;
		int start = end - numPerPage + 1;
		//int totalPage = (totalCount%numPerPage !=0? totalCount/numPerPage+1 : totalCount/numPerPage); 와 같음
		int totalPage = (int)Math.ceil(totalCount/(double)numPerPage); //ceil은 올림을 해주는 용도
		int pageNo = ((reqPage-1)/pageNaviSize)*pageNaviSize +1;
		PageInfo pi = new PageInfo(start, end, pageNo, pageNaviSize, totalPage);
		return pi;
	}
}
