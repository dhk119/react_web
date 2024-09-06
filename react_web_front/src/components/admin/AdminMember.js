import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "../utils/PageNavi";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";

const AdminMember = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberList, setMemberList] = useState([]);
  const [pi, setPi] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const changeMemberType = (i, memberType) => {
    memberList[i].memberType = memberType;
    setMemberList([...memberList]);
  };
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
              return (
                <MemberItem
                  key={"member-" + index}
                  member={member}
                  changeMemberType={changeMemberType}
                  index={index}
                />
              );
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
  const changeMemberType = props.changeMemberType;
  const index = props.index;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const handleChange = (e) => {
    const memberType = e.target.value;
    const obj = { memberId: member.memberId, memberType: memberType };
    axios
      .patch(`${backServer}/admin/member`, obj)
      .then((res) => {
        console.log(res);
        changeMemberType(index, memberType);
        Swal.fire({
          title: "등급 변경",
          text: "변경 완료!",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    changeMemberType(index, memberType);
  };
  return (
    <tr>
      <td>{member.memberId}</td>
      <td>{member.memberName}</td>
      <td>{member.memberPhone}</td>
      <td>
        <Select
          style={{ width: "150px", height: "50px" }}
          value={member.memberType}
          onChange={handleChange}
        >
          <MenuItem value={1}>관리자</MenuItem>
          <MenuItem value={2}>일반회원</MenuItem>
        </Select>
      </td>
    </tr>
  );
};

export default AdminMember;
