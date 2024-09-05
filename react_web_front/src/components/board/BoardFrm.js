import { useRef, useState } from "react";

const BoardFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const loginId = props.loginId;
  const boardTitle = props.boardTitle;
  const setBoardTitle = props.setBoardTitle;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;
  const boardFile = props.boardFile;
  const setBoardFile = props.setBoardFile;
  //수정인 경우에 추가로 전송되는 데이터 (마이페이지 수정 할때 적용 시키면 됨)
  const boardThumb = props.boardThumb;
  const setBoardThumb = props.setBoardThumb;
  const fileList = props.fileList;
  const setFileList = props.setFileList;
  const delBoardFileNo = props.delBoardFileNo;
  const setDelBoardFileNo = props.setDelBoardFileNo;
  const thumbnailRef = useRef(null);
  //썸네일 미리보기용 state(데이터전송하지 않음)
  const [boardImg, setBoardImg] = useState(null);

  //썸네일 이미지 첨부파일이 변경되면 동작할 함수
  const changeThumbnail = (e) => {
    //요소들이 겹쳐있는 상태에서 해당 요소를 선택할 때는 currentTarget(target을 사용하면 여러요소가 한번에 선택)
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] !== 0) {
      //썸네일 파일 객체를 글작성 시 전송하기 위한 값 저장
      setThumbnail(files[0]);
      //화면에 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setBoardImg(reader.result);
      };
    } else {
      setThumbnail(null);
      setBoardImg(null);
    }
  };
  //첨부파일 화면에 띄울 state
  const [showBoardFile, setShowBoardFile] = useState([]);
  //첨부파일 추가시 동작할 함수
  const addBoardFile = (e) => {
    const files = e.currentTarget.files; //배열처럼 보이지만 배열이 아니기 때문에 직접for문써서 넣어주기
    const fileArr = new Array(); //글작성 시 전송할 파일 배열
    const filenameArr = new Array(); //화면에 노출시킬 파일이름 배열
    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
      filenameArr.push(files[i].name);
    }
    setBoardFile([...boardFile, ...fileArr]);
    setShowBoardFile([...showBoardFile, ...filenameArr]);
  };
  return (
    <div>
      <div className="board-thumb-wrap">
        {boardImg ? (
          <img
            src={boardImg}
            onClick={() => {
              thumbnailRef.current.click();
            }}
          />
        ) : boardThumb ? (
          <img
            src={`${backServer}/board/thumb/${boardThumb}`}
            onClick={() => {
              thumbnailRef.current.click();
            }}
          />
        ) : (
          <img
            src="/image/default_img.png"
            onClick={() => {
              thumbnailRef.current.click();
            }}
          />
        )}
        <input
          ref={thumbnailRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={changeThumbnail}
        ></input>
      </div>
      <div className="board-info-wrap">
        <table className="tbl">
          <tbody>
            <tr>
              <th style={{ width: "30%" }}>
                <label htmlFor="boardTitle">제목</label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text"
                    id="boardTitle"
                    name="boardTitle"
                    value={boardTitle}
                    onChange={setBoardTitle}
                  ></input>
                </div>
              </td>
            </tr>
            <tr>
              <th>작성자</th>
              <td className="left">{loginId}</td>
            </tr>
            <tr>
              <th>
                <label htmlFor="boardFile">첨부파일</label>
              </th>
              <td className="left">
                <label htmlFor="boardFile" className="btn-primary sm">
                  파일 첨부
                </label>
                <input
                  type="file"
                  id="boardFile"
                  style={{ display: "none" }}
                  onChange={addBoardFile}
                  multiple
                />
                {/* input 을 숨기고 label로 버튼 형식으로 진행 할 수 있게 처리 */}
              </td>
            </tr>
            <tr>
              <th>첨부파일 목록</th>
              <td>
                <div className="board-file-wrap">
                  {fileList
                    ? fileList.map((boardFile, i) => {
                        const deleteFile = () => {
                          const newFileList = fileList.filter((item) => {
                            return item !== boardFile;
                          });
                          setFileList(newFileList); //화면에 반영
                          //Controller로 전송하기 위해서 배열에 추가
                          setDelBoardFileNo([
                            ...delBoardFileNo,
                            boardFile.boardFileNo,
                          ]);
                        };
                        return (
                          <p key={"oldFile-" + i}>
                            <span className="filename">
                              {boardFile.filename}
                            </span>
                            <span
                              className="material-icons del-file-icon"
                              onClick={deleteFile}
                            >
                              delete
                            </span>
                          </p>
                        );
                      })
                    : ""}
                  {showBoardFile.map((filename, i) => {
                    const deleteFile = () => {
                      boardFile.splice(i, 1);
                      setBoardFile([...boardFile]);
                      showBoardFile.splice(i, 1);
                      setShowBoardFile([...showBoardFile]);
                    };
                    return (
                      <p key={"newFile-" + i}>
                        <span className="filename">{filename}</span>
                        <span
                          className="material-icons del-file-icon"
                          onClick={deleteFile}
                        >
                          delete
                        </span>
                      </p>
                    );
                  })}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoardFrm;
