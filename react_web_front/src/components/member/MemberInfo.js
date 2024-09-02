import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import Loading from "../utils/Loading";
import { useNavigate } from "react-router-dom";

const MemberInfo = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  useEffect(() => {
    axios
      .get(`${backServer}/member`)
      .then((res) => {
        console.log(res);
        setMember(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginId]);
  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };
  const updateMember = () => {
    axios
      .patch(`${backServer}/member`, member)
      .then((res) => {
        console.log(res);
        if (res.data === 1) {
          Swal.fire({
            title: "정보수정완료",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteMember = () => {
    Swal.fire({
      icon: "warning",
      title: "회원탈퇴",
      text: "회원을 탈퇴하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(`${backServer}/member`)
          .then((res) => {
            if (res.data === 1) {
              Swal.fire({
                title: "회원탈퇴완료",
                icon: "info",
              }).then(() => {
                setLoginId("");
                setMemberType(0);
                delete axios.defaults.headers.common["Authorization"];
                window.localStorage.removeItem("refreshToken");
                navigate("/");
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <>
      <div className="page-title">내 정보</div>
      {member ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateMember();
          }}
        >
          <table
            className="tbl my-info"
            style={{ width: "80%", margin: "0 auto" }}
          >
            <tbody>
              <tr>
                <th style={{ width: "20%" }}>아이디</th>
                <td className="left">{member.memberId}</td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="memberName">이름</label>
                </th>
                <td className="left">
                  <div className="input-item">
                    <input
                      type="text"
                      name="memberName"
                      id="memberName"
                      value={member.memberName || ""}
                      onChange={changeMember}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="memberPhone">전화번호</label>
                </th>
                <td className="left">
                  <div className="input-item">
                    <input
                      type="text"
                      name="memberPhone"
                      id="memberPhone"
                      value={member.memberPhone || ""}
                      onChange={changeMember}
                    ></input>
                  </div>
                </td>
              </tr>
              <tr>
                <th>회원등급</th>
                <td className="left">
                  {member.memberType == 1 ? "관리자" : "일반회원"}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="button-zone">
            <button type="submit" className="btn-primary lg">
              정보수정
            </button>
            <button
              type="button"
              className="btn-secondary lg"
              onClick={deleteMember}
            >
              회원탈퇴
            </button>
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MemberInfo;
