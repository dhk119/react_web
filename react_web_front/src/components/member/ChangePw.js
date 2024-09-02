import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ChangePw = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [member, setMember] = useState({ memberId: loginId, memberPw: "" });
  useEffect(() => {
    setMember({ ...member, memberId: loginId });
  }, [loginId]);
  const [memberPwRe, setMemberPwRe] = useState("");
  const [isAuth, setIsAuth] = useState(false); // 현재비밀번호 인증이 되었는지
  const changeMemberPw = (e) => {
    setMember({ ...member, memberPw: e.target.value }); //아이디는 바꿀 필요 없으니까 비밀번호로만 받기
  };
  const pwCheck = () => {
    axios
      .post(`${backServer}/member/pw`, member)
      .then((res) => {
        if (res.data === 1) {
          setIsAuth(true);
          //member state를 재사용하기위해서 비밀번호 값 초기와
          setMember({ ...member, memberPw: "" });
        } else {
          Swal.fire({
            title: "비밀번호를 확인하세요",
            icon: "question",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changePw = () => {
    if (member.memberPw === memberPwRe) {
      axios
        .patch(`${backServer}/member/pw`, member)
        .then((res) => {
          console.log(res);
          if (res.data === 1) {
            Swal.fire({
              title: "비밀번호 수정 완료",
              icon: "success",
            }).then(() => {
              setIsAuth(false);
              setMember({ ...member, memberPw: "" });
              setMemberPwRe("");
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "비밀번호가 일치하지 않습니다",
        icon: "info",
      });
    }
  };
  return (
    <>
      <div className="page-title">비밀번호 변경</div>
      <div style={{ width: "60%", margin: "0 auto" }}>
        {isAuth ? (
          <>
            <div className="input-wrap" style={{ marginBottom: "50px" }}>
              <div className="input-title">
                <label htmlFor="newPw">새 비밀번호 입력</label>
              </div>
              <div className="input-item">
                <input
                  type="password"
                  id="newPw"
                  name="newPw"
                  value={member.memberPw}
                  onChange={changeMemberPw}
                ></input>
              </div>
            </div>
            <div className="input-wrap">
              <div className="input-title">
                <label htmlFor="newPwRe">새 비밀번호 확인</label>
              </div>
              <div className="input-item">
                <input
                  type="pasww"
                  id="newPwRe"
                  name="newPwRe"
                  value={memberPwRe}
                  onChange={(e) => {
                    setMemberPwRe(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="button-zone">
              <button
                type="button"
                className="btn-primary lg"
                onClick={changePw}
              >
                변경하기
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="input-wrap">
              <div className="input-title">
                <label htmlFor="oldPw">기존 비밀번호 입력</label>
              </div>
              <div className="input-item">
                <input
                  type="password"
                  name="oldPw"
                  id="oldPw"
                  value={member.memberPw}
                  onChange={changeMemberPw}
                ></input>
              </div>
            </div>
            <div className="button-zone">
              <button
                type="button"
                className="btn-primary lg"
                onClick={pwCheck}
              >
                확인
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChangePw;
