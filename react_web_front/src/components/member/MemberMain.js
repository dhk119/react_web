import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, memberTypeState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import LeftSideMenu from "../utils/LeftSideMenu";
import { Routes, Route, useNavigate } from "react-router-dom";
import MemberInfo from "./MemberInfo";
import ChangePw from "./ChangePw";
import Swal from "sweetalert2";

const MemberMain = () => {
  const navigate = useNavigate();
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const isLogin = useRecoilValue(isLoginState);
  if (!isLogin) {
    //마이페이지에서 화면에서 로그아웃 했을때 페이징 처리
    Swal.fire({
      title: "로그인 후 이용 가능합니다.",
      icon: "info",
    }).then(() => {
      navigate("/");
    });
  }
  const [menus, setMenus] = useState([
    { url: "info", text: "내 정보" }, //subRouting : url 에서 앞에 (/) 안 붙으면 그 페이지에서 여기로 넘어가라고 되는것
    { url: "changePw", text: "비밀번호 변경" },
  ]);

  useEffect(() => {
    if (memberType == 1) {
      setMenus([...menus, { url: "/admin", text: "관리자 페이지" }]);
    }
  }, [memberType]);
  console.log(menus);
  return (
    <div className="mypage-wrap">
      <div className="mypage-side">
        <section className="section account-box">
          <div className="account-info">
            {memberType === 1 ? (
              <span className="material-icons">manage_accounts</span>
            ) : (
              <span className="material-icons">person</span>
            )}
            <span>MYPAGE</span>
          </div>
        </section>
        <section className="section">
          <LeftSideMenu menus={menus} />
        </section>
      </div>
      <div className="mypage-content">
        <section className="section">
          <Routes>
            <Route path="info" element={<MemberInfo />} />
            <Route path="changePw" element={<ChangePw />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default MemberMain;
