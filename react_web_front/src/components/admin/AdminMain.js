import { useState } from "react";
import LeftSideMenu from "../utils/LeftSideMenu";
import { Route, Routes } from "react-router-dom";
import AdminBoard from "./AdminBoard";
import AdminMember from "./AdminMember";

const AdminMain = () => {
  const [menus, setMenus] = useState([
    { url: "member", text: "회원 관리" },
    { url: "board", text: "게시글 관리" },
  ]);
  return (
    <div className="mypage-wrap">
      <div className="mypage-side">
        <section className="section account-box">
          <div className="account-info">
            <span className="material-icons">manage_accounts</span>
            <span className="member-name">관리자 페이지</span>
          </div>
        </section>
        <section className="section">
          <LeftSideMenu menus={menus} />
        </section>
      </div>
      <div className="mypage-content">
        <section className="section">
          <Routes>
            <Route path="board" element={<AdminBoard />} />
            <Route path="member" element={<AdminMember />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default AdminMain;
