import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <ul>
          <li>
            <Link to="#">이용약관</Link>
          </li>
          <li>
            <Link to="#">개인정보취급방침</Link>
          </li>
          <li>
            <Link to="#">인재채용</Link>
          </li>
          <li>
            <Link to="#">제휴문의</Link>
          </li>
          <li>
            <Link to="#">인스타그램</Link>
          </li>
        </ul>
        <p>Made by KimDaeHeon</p>
        <p>무단복제 허용하지 않습니다.</p>
      </div>
    </footer>
  );
};

export default Footer;
