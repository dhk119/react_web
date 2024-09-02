//Recoil을 이용해서 전체 애플리케이션에서 사용할 데이터를 선언
//로그인정보는 특정컴포넌트가 아니라 애플리케이션 전체적으로 영향을 줌
// -> 관련데이터를 App 컴포넌트에 선언하고 계속 전달
//기존 ssr(서버사이드렌더링)에서 session역할을 recoil이 대신 수행 -> 서버는 더이상 상태를 갖지 않을 것이므로(session을 사용하지 않음)

import { atom, selector } from "recoil";

//atom : 데이터를 저장 할 수 있음 -> 사용 시 userRecoilState() => state타입 리턴
//selector :존재하는 데이터를 이용해서 함수에서 데이터를 편집하여 리턴할 수 있음
//              -> 사용시 useRecoilValue() => 함수에서 리턴하는 데이터 타입

//외부에서 데이터를 저장하거나 또는 사용하고싶은 경우 atom을 사용
//외부에서 특정 데이터를 통한 특정 연산결과를 도출하고 싶으면 selector를 사용

//1. 로그인한 아이디를 저장하는 저장소를 먼저 만들기
//값(atom)만 가지고 있어도 된다 다만 변수를 쓰기 위해 loginIdState로 만듬 아래2번도 마찬가지
const loginIdState = atom({
  key: "loginIdState",
  default: "",
});

//2. 로그인한 회원 타입을 저장하는 저장소 만들기
const memberTypeState = atom({
  key: "memberTypeState",
  default: 0,
});

//atom으로 생성한 데이터로 처리하는 함수
const isLoginState = selector({
  key: "isLoginState",
  get: (state) => {
    //매개변수 state는 recoil에 저장된 데이터를 불러오기 위한 객체
    //미리만들어진 LoginIdState의 값 가져오기
    const loginId = state.get(loginIdState);
    //미리만들어진 memberTypeState의 값 가져오기
    const memberType = state.get(memberTypeState);
    //로그인 여부 -> loginIdState값이 빈문자열("")이 아니고, memberTypeState값이 0이 아닌경우
    return loginId !== "" && memberType !== 0;
  },
});

export { loginIdState, memberTypeState, isLoginState };
