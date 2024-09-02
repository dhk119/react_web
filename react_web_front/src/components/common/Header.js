import { Link } from "react-router-dom";
import "./default.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isLoginState,
  loginIdState,
  memberTypeState,
} from "../utils/RecoilData";
import axios from "axios";

const Header = () => {
  //   const isLogin = props.isLogin;
  //   const setIsLogin = props.setIsLogin;
  //   const memberId = props.memberId;
  //   const setMemberId = props.setMemberId;
  return (
    <header className="header">
      <div>
        <div className="logo">
          <Link to="/">KIM's WORLD</Link>
        </div>
        <MainNavi />
        <HeaderLink
        //   isLogin={isLogin}
        //   setIsLogin={setIsLogin}
        //   memberId={memberId}
        //   setMemberId={setMemberId}
        />
      </div>
    </header>
  );
};

const MainNavi = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="#">메뉴1</Link>
        </li>
        <li>
          <Link to="#">메뉴2</Link>
        </li>
        <li>
          <Link to="#">메뉴3</Link>
        </li>
        <li>
          <Link to="#">메뉴4</Link>
        </li>
      </ul>
    </nav>
  );
};

const HeaderLink = () => {
  //   const isLogin = props.isLogin;
  //   const setIsLogin = props.setIsLogin;
  //   const memberId = props.memberId;
  //   const setMemberId = props.setMemberId;
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);

  const isLogin = useRecoilValue(isLoginState);
  console.log("header : ", loginId, memberType, isLogin);
  const logout = () => {
    // setIsLogin(false);
    // setMemberId(null);
    setLoginId("");
    setMemberType(0);
    //로그아웃에도 적용을 해야 나가진다
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem("refreshToken");
  };
  return (
    <ul className="user-menu">
      {isLogin ? (
        <>
          <li>
            <Link to="/member">{loginId}</Link>
          </li>
          <li>
            <Link to="#" onClick={logout}>
              로그아웃
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/join">회원가입</Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default Header;
