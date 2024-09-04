import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import { useRef } from "react";

const ToastEditor = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const boardContent = props.boardContent;
  const setBoardContent = props.setBoardContent;
  const editorRef = useRef(null); //Ref를 써서 Editor에 접근할 수 있는 권한을 준다
  const changeValue = () => {
    const editorData = editorRef.current.getInstance().getHTML();
    setBoardContent(editorData);
  };
  const uploadImage = (file, callbackFunc) => {
    //비동기요청으로 이미지파일을 업로드하고, 업로드된 파일의 경로를 결과로 받아옴
    const form = new FormData();
    form.append("image", file);
    axios
      .post(`${backServer}/board/editorImage`, form, {
        headers: { contentType: "multipart/form-data", processData: false },
      })
      .then((res) => {
        console.log(res);
        callbackFunc(`${backServer}${res.data}`, "이미지");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      {boardContent || boardContent === "" ? (
        <Editor
          ref={editorRef}
          initialValue={boardContent}
          initialEditType="wysiwyg"
          language="ko-KR"
          height="600px"
          onChange={changeValue}
          hooks={{
            addImageBlobHook: uploadImage,
          }}
        ></Editor>
      ) : (
        ""
      )}
    </div>
  );
};

export default ToastEditor;
