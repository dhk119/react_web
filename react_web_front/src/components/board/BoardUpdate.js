import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import BoardFrm from "./BoardFrm";
import ToastEditor from "../utils/ToastEditor";

const BoardUpdate = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const boardNo = params.boardNo;
  const navigate = useNavigate();

  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  //썸네일파일을 새로 전송하기 위한 state 자바스크립트 파일 객체를 받아오기 위한 state
  const [thumbnail, setThumbnail] = useState(null);
  //첨부파일을 새로 전송하기 위한 state 자바스크립트 파일 객체를 받아오기 위한 state
  const [boardFile, setBoardFile] = useState([]);
  //조회해온 썸네일을 화면에 보여주기 위한 state (기존썸네일)
  const [boardThumb, setBoardThumb] = useState(null);
  //조회해온 파일목록을 화면에 보여주기위한 state
  const [fileList, setFileList] = useState([]);
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  //기존 첨부파일을 삭제하면 삭제한 파일번호를 저장할 배열
  const [delBoardFileNo, setDelBoardFileNo] = useState([]);
  const inputTitle = (e) => {
    setBoardTitle(e.target.value);
  };
  useEffect(() => {
    axios
      .get(`${backServer}/board/boardNo/${boardNo}`)
      .then((res) => {
        console.log(res);
        setBoardTitle(res.data.boardTitle);
        setBoardContent(res.data.boardContent);
        setBoardThumb(res.data.boardThumb);
        setFileList(res.data.fileList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateBoard = () => {
    if (boardTitle !== "" && boardContent !== "") {
      const form = new FormData();
      form.append("boardTitle", boardTitle);
      form.append("boardContent", boardContent);
      form.append("boardNo", boardNo);
      if (boardThumb !== null) {
        form.append("boardThumb", boardThumb);
      }
      if (thumbnail !== null) {
        form.append("thumbnail", thumbnail);
      }
      for (let i = 0; i < boardFile.length; i++) {
        form.append("boardFile", boardFile[i]);
      }
      for (let i = 0; i < delBoardFileNo.length; i++) {
        form.append("delBoardFileNo", delBoardFileNo[i]);
      }
      axios
        .patch(`${backServer}/board`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            navigate(`/board/view/${boardNo}`);
          } else {
            //실패 시 로직
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className="section board-content-wrap">
      <div className="page-title">게시글 수정</div>
      <form
        className="board-write-frm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <BoardFrm
          loginId={loginId}
          boardTitle={boardTitle}
          setBoardTitle={inputTitle}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          boardFile={boardFile}
          setBoardFile={setBoardFile}
          boardThumb={boardThumb}
          setBoardThumb={setBoardThumb}
          fileList={fileList}
          setFileList={setFileList}
          delBoardFileNo={delBoardFileNo}
          setDelBoardFileNo={setDelBoardFileNo}
        />
        <div className="board-content-wrap">
          <ToastEditor
            boardContent={boardContent}
            setBoardContent={setBoardContent}
            type={1}
          />
        </div>
        <div className="button-zone">
          <button className="btn-primary lg" onClick={updateBoard}>
            수정하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default BoardUpdate;
