import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "../utils/PageNavi";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/RecoilData";
import { Link, useNavigate } from "react-router-dom";

const BoardList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [boardList, setBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const isLogin = useRecoilValue(isLoginState);
  useEffect(() => {
    axios
      .get(`${backServer}/board/list/${reqPage}`)
      .then((res) => {
        console.log(res);
        setBoardList(res.data.list); //게시물 목록
        setPi(res.data.pi); // 페이지네이션
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
  return (
    <section className="section board-list">
      <div className="page-title">자유게시판</div>
      {isLogin ? (
        <Link to="/board/write" className="btn-primary">
          글쓰기
        </Link>
      ) : (
        ""
      )}
      <div className="board-list-wrap">
        <ul className="posting-wrap">
          {boardList.map((board, i) => {
            return <BoardItem key={"board-" + i} board={board} />;
          })}
        </ul>
      </div>
      <div className="board-paging-wrap">
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
    </section>
  );
};
const BoardItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const board = props.board;
  const navigate = useNavigate();
  return (
    <li
      className="posting-item"
      onClick={() => {
        navigate(`/board/view/${board.boardNo}`);
      }}
    >
      <div className="posting-img">
        <img
          src={
            board.boardThumb
              ? `${backServer}/board/thumb/${board.boardThumb}`
              : "/image/default_img.png"
          }
        />
      </div>
      <div className="posting-info">
        <div className="posting-title">{board.boardTitle}</div>
        <div className="posting-sub-info">
          <span>{board.boardWriter}</span>
          <span>{board.boardDate}</span>
        </div>
      </div>
    </li>
  );
};
export default BoardList;
