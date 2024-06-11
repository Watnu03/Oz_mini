import "./Signup.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

//컴포넌트 첫글자를 소문자로 오타났더니 Hook이 안써짐
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [chkPassword, setChkPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  //이메일 유효성 검사 정규표현식
  const checkEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // ^ = 문자열 시작에서 [^\s@] 공백이나 @문자가 아닌 문자가 + 하나이상 와야한다
    // @ = @문자 뒤에 [^\s@] 공백이나 @문자가 아닌 문자가 + 하나이상 와야한다
    // \. = .문자 뒤에 [^\s@] 공백이나 @문자가 아닌 문자가 + 하나이상 오고 문자열의 끝이여야함을 의미
    return emailRegex.test(email);
    // emailRegex.test(email);
  };
  //패스워드 유효성 검사 정규표현식
  const checkPassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    //(?=.*[a-z]) 최소 하나의 소문자 포함
    //(?=.*[A-Z]) 최소 하나의 대문자 포함
    //(?=.*\d) 최소 하나의 숫자
    //(?=.*[!@#$%^&*]) 최소 하나의 특수문자
    //이모든걸 합해서 최소 8자 이상으로
    return passwordRegex.test(password);
  };
  

  //가입하기 버튼 클릭 시
  const onSubmitSighup = async(e) => {
    //새로고침 방지
    e.preventDefault();

    //유효성 검사
    if (!checkEmail(email)) {
      setError("유효한 이메일을 입력해주세요.");
      return;
    }
    if (!checkPassword(password)) {
      setError(
        "패스워드는 최소 8자 이상, 하나 이상의 대소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      return;
    }
    if (password !== chkPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    //생성
    try {
      // createUserWithEmailAndPassword함수로new 사용자 등록
      await createUserWithEmailAndPassword(auth, email, password);
      // 회원가입 후 로그인 페이지로 이동
      navigate("/login"); 
    } 
    catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup">
      <div className='signup-container'>
        <div className="sub-title">
          <div className="sub-logo" onClick={()=>{navigate('/')}} >OZFLIX</div>
          <h1>회원가입</h1>
        </div>
        <form className="signup-form" onSubmit={onSubmitSighup}>
          <div className="sign-text">
            {/* label에 for문이 오류남 */}
            <label>이름</label>
            <div className="sign-input">
              <input 
                id="name" 
                type="name" 
                placeholder="김아무개" required
                value={name}
                onChange={(e)=> setName(e.target.value)}/>
            </div>
          </div>
          <div className="sign-text">
            <label>이메일</label>
            <div className="sign-input">
              <input 
                id="email" 
                type="email" 
                placeholder="example@inflab.com" required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}/>
            </div>
          </div>
          <div className="sign-text">
            <label>비밀번호</label>
            <div className="sign-input">
              <input 
                id="password" 
                type="password" 
                placeholder="********" required
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className="password-required">
              <p>✔ 8자리 이상 15자리 이하 입력 (공백 제외)</p>
              <p>✔ 하나이상의 대소문자영문/숫자/특수문자 포함</p>
            </div>
          </div>
          <div className="sign-text">
            <label>비밀번호 확인</label>
            <div className="sign-input">
              <input 
                id="password-check" 
                type="password" 
                placeholder="********"  
                value={chkPassword} 
                onChange={(e)=> setChkPassword(e.target.value)}/>
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="signup-btn" >가입하기</button>
        </form>
      </div>
    </div>
  )
}

export default Signup;

