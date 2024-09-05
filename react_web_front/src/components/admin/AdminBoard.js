import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "../utils/PageNavi";
import Switch from "@mui/material/Switch";

const AdminBoard = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [boardList, setBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  useEffect(() => {
    axios
      .get(`${backServer}/admin/board/${reqPage}`)
      .then((res) => {
        console.log(res);
        setBoardList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
  //몇번째 걸 이상태로 바꿔줘
  const changeStatus = (i, boardStatus) => {
    boardList[i].boardStatus = boardStatus;
    setBoardList([...boardList]);
  };
  return (
    <>
      <div className="page-title">게시글 관리</div>
      <table className="tbl">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>글번호</th>
            <th style={{ width: "40%" }}>제목</th>
            <th style={{ width: "15%" }}>작성자</th>
            <th style={{ width: "15%" }}>작성일</th>
            <th style={{ width: "20%" }}>공개여부</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((board, index) => {
            return (
              <BoardItem
                key={"board-" + index}
                board={board}
                changeStatus={changeStatus}
                index={index}
              />
            );
          })}
        </tbody>
      </table>
      <div className="admin-page-wrap" style={{ marginTop: "30px" }}>
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
    </>
  );
};
const BoardItem = (props) => {
  const board = props.board;
  const changeStatus = props.changeStatus;
  const index = props.index;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const handleChange = () => {
    console.log("스위치를 클릭하면 동작");
    const boardStatus = board.boardStatus === 1 ? 2 : 1;
    //DB작업 -> 그 이후에 화면에 반영
    const obj = { boardNo: board.boardNo, boardStatus: boardStatus };
    axios
      .patch(`${backServer}/admin/board`, obj)
      .then((res) => {
        console.log(res);
        changeStatus(index, boardStatus);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <tr>
      <td>{board.boardNo}</td>
      <td>{board.boardTitle}</td>
      <td>{board.boardWriter}</td>
      <td>{board.boardDate}</td>
      <td>
        {board.boardStatus}
        <Switch checked={board.boardStatus === 1} onChange={handleChange} />
      </td>
    </tr>
  );
};

export default AdminBoard;
