import { Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/Footer";
import Main from "./components/common/Main";
import Join from "./components/member/Join";
import Login from "./components/member/Login";
import axios from "axios";
import MemberMain from "./components/member/MemberMain";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "./components/utils/RecoilData";
import { useEffect } from "react";
import BoardMain from "./components/board/BoardMain";
import AdminMain from "./components/admin/AdminMain";
// import { useState } from "react"; //리코일 Recoil 대체를 하기 위해서 안쓰임

function App() {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  useEffect(() => {
    refreshLogin();
    //아래 작업이 없을 경우 한곳에서 한시간 넘게 작업 했을때 토큰이 refresh안되서 토큰이 만료 되서 동작을 안한다. 에러 발생함.
    window.setInterval(refreshLogin, 60 * 60 * 1000); //한시간이 지나면 로그인정보 자동으로 refresh될 수 있게
  }, []);
  // const [isLogin, setIsLogin] = useState(false); //로그인 여부 추가할때
  // const [memberId, setMemberId] = useState(null); //Login 과 HeaderLink에게 같이 주기 위한 state 부모인 App에게 주기
  const refreshLogin = () => {
    //최초화면에 접속하면 LocalStorage에 저장한 refreshToken을 가져와서 자동으로 로그인 처리
    const refreshToken = window.localStorage.getItem("refreshToken");
    //한번도 로그인하지 않았거나, 로그아웃을 했으면 refreshToken은 존재하지 않음
    if (refreshToken != null) {
      //refreshToken이 존재하면 -> 해당 토큰으로 다시 로그인 처리
      axios.defaults.headers.common["Authorization"] = refreshToken;
      axios
        .post(`${backServer}/member/refresh`)
        .then((res) => {
          //refresh토큰을 전송해서 로그인 정보를 새로 갱신해옴
          console.log(res);
          setLoginId(res.data.memberId);
          setMemberType(res.data.memberType);
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
        })
        .catch((err) => {
          console.log(err);
          setLoginId("");
          setMemberType(0);
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("refreshToken");
        });
    }
  };
  return (
    <div className="wrap">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/member/*" element={<MemberMain />} />
          {/* 서브 라우터 쓰려면 /member/* 이렇게 해서 *을 사용하여 다음에 들어올 모든거를 표시해야 쓸 수 있음 */}
          <Route path="/board/*" element={<BoardMain />} />
          <Route path="/admin/*" element={<AdminMain />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
