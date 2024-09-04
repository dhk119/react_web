const PageNavi = (props) => {
  const pi = props.pi;
  const reqPage = props.reqPage;
  const setReqPage = props.setReqPage;
  //paging jsx가 저장될 배열 선언
  const arr = new Array();
  //제일 앞으로
  arr.push(
    <li key="first-page">
      <span
        onClick={() => {
          setReqPage(1);
        }}
        className="material-icons page-item"
      >
        first_page
      </span>
    </li>
  );
  arr.push(
    <li key="prev-page">
      <span
        onClick={() => {
          if (reqPage !== 1) {
            setReqPage(reqPage - 1);
          }
        }}
        className="material-icons page-item"
      >
        navigate_before
      </span>
    </li>
  );

  //페이징 숫자
  let pageNo = pi.pageNo;
  for (let i = 0; i < pi.pageNaviSize; i++) {
    arr.push(
      <li key={"page-" + i}>
        <span
          onClick={(e) => {
            setReqPage(Number(e.target.innerText));
          }}
          className={"page-item" + (pageNo === reqPage ? " active-page" : "")}
        >
          {pageNo}
        </span>
      </li>
    );
    pageNo++;
    if (pageNo > pi.totalPage) {
      break; //만약에 페이지수가 없으면 숫자 안나오게 break
    }
  }
  //다음페이지
  arr.push(
    <li key="next-page">
      <span
        onClick={() => {
          if (reqPage !== pi.totalPage) {
            setReqPage(reqPage + 1);
          }
        }}
        className="material-icons page-item"
      >
        navigate_next
      </span>
    </li>
  );
  //제일 끝으로
  arr.push(
    <li key="last-page">
      <span
        onClick={() => {
          setReqPage(pi.totalPage);
        }}
        className="material-icons page-item"
      >
        last_page
      </span>
    </li>
  );
  return <ul className="pagination">{arr}</ul>;
};

export default PageNavi;
