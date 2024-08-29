import { Link } from "react-router-dom";
import "./default.css";

const Header = () => {
  return (
    <header className="header">
      <div>
        <div className="logo">
          <Link to="/">KIM's WORLD</Link>
        </div>
        <MainNavi />
        <HeaderLink />
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
  return (
    <ul className="user-menu">
      <li>
        <Link to="#">로그인</Link>
      </li>
      <li>
        <Link to="#">회원가입</Link>
      </li>
    </ul>
  );
};

export default Header;
