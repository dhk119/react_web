import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BoardView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const boardNo = params.boardNo;
  const [board, setBoard] = useState({});
  useEffect(() => {
    axios
      .get(`${backServer}/board/boardNo/${boardNo}`)
      .then((res) => {
        console.log(res);
        setBoard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="section board-view-wrap">
      <div className="page-title">게시글</div>
      <div className="board-view-content">
        <div className="board-view-info">
          <div className="board-thumbnail">
            <img
              src={
                board.boardThumb
                  ? `${backServer}/board/thumb/${board.boardThumb}`
                  : "/image/default_img.png"
              }
            />
          </div>
          <div className="board-view-preview">
            <table className="tbl">
              <tbody>
                <tr>
                  <td className="left" colSpan={4}>
                    {board.boardTitle}
                  </td>
                </tr>
                <tr>
                  <th style={{ width: "20%" }}>작성자</th>
                  <td style={{ width: "30%" }}>{board.boardWriter}</td>
                  <th style={{ width: "20%" }}>작성일</th>
                  <td style={{ width: "30%" }}>{board.boardDate}</td>
                </tr>
              </tbody>
            </table>
            <p className="file-title">첨부파일</p>
            <div className="file-zone">
              {board.fileList
                ? board.fileList.map((file, i) => {
                    return <FileItem key={"file-" + i} file={file} />;
                  })
                : ""}
            </div>
          </div>
        </div>
        {/* 
        html로 저장된 데이터를 화면에 띄울때는 {} 문법이 아니라 속성을 이용해서 표현
        dangerouslySetInnerHTML={{ __html: board.boardContent }} 강제로 적용하고 싶으면 이렇게
        {} mustache 방법은 text 방식으로만 보여줌 왜? 핵킹 우려가 있기 때문
        <div
          className="board-content-wrap"
          dangerouslySetInnerHTML={{ __html: board.boardContent }}
        ></div> */}
        <div className="board-content-wrap">
          {board.boardContent ? (
            <Viewer initialValue={board.boardContent} />
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};
const FileItem = (props) => {
  const file = props.file;
  return (
    <div className="board-file">
      <span className="material-icons file-icon">file_download</span>
      <span className="file-name">{file.filename}</span>
    </div>
  );
};

export default BoardView;
