import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "../utils/PageNavi";

const AdminMember = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberList, setMemberList] = useState([]);
  const [pi, setPi] = useState({});
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/member/${reqPage}`)
      .then((res) => {
        setMemberList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
  return (
    <>
      <div className="page-title">회원 관리</div>
      <div className="admin-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>아이디</th>
              <th style={{ width: "20%" }}>이름</th>
              <th style={{ width: "30%" }}>전화번호</th>
              <th style={{ width: "30%" }}>회원등급</th>
            </tr>
          </thead>
          <tbody>
            {memberList.map((member, index) => {
              return <MemberItem key={"member-" + index} member={member} />;
            })}
          </tbody>
        </table>
        <div className="admin-page-wrap" style={{ marginTop: "30px" }}>
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        </div>
      </div>
    </>
  );
};
const MemberItem = (props) => {
  const member = props.member;
  return (
    <tr>
      <td>{member.memberId}</td>
      <td>{member.memberName}</td>
      <td>{member.memberPhone}</td>
      <td>{member.memberType}</td>
    </tr>
  );
};

export default AdminMember;
