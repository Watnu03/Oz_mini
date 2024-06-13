import "./Login.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

import app from '../../firebase';
//아래는 firebase.js에서 불러온게 아니라 npm설치한 firebase에서 불러오는거다
import { 
  getAuth, 
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider
} from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(app);

  const navigate = useNavigate();

  const chkEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  //Email로그인시
  const handleEmailLogin = async (e) => {
    e.preventDefault();

    //여기서 getAuth()메소드를 새로 안가져오니 typeerror가 뜸
    // const auth = getAuth();

    if (!chkEmail(email)) {
        alert('유효한 이메일 주소를 입력해주세요.');
        return;
    }

    try {
      const result = await signInWithEmailAndPassword(app, email, password);
      const user = result.user;
      console.log(user);
      alert('로그인되었습니다');
      navigate('/');
    } 
    catch (error) {
      console.error(error);
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };
  
  //Google로그인 클릭시
  const handleGoogleLogin = (e) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)

    //async와 .then은 같이 못쓴다
    //작업 성공시
    .then((result) => {
      console.log(result);
      // localStorage.setItem('userData', JSON.stringify(result.user));
      alert('로그인되었습니다');
      navigate("/");
    })
    //작업 실패시
    .catch((error) => {
      alert(error.message);
      navigate("/login");
    });
  };

  return (
    <div className="login">
      <div className='login-container'>
        <div className="sub-title">
          <div className="sub-logo" onClick={()=>{navigate('/')}} >OZFLIX</div>
          <h1>로그인</h1>
        </div>
        <form className="login-form" onSubmit={handleEmailLogin}>
            <div className="login-input">
              <input 
                id="email" 
                type="email" 
                placeholder="이메일" required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="login-input">
              <input 
                id="password" 
                type="password" 
                placeholder="비밀번호" required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
          <button 
            type="submit" 
            className="login-btn" 
            onClick={handleEmailLogin}>로그인</button>
          <button 
            type="button"
            className="google-login login-btn" 
            onClick={handleGoogleLogin} >구글 로그인</button>
        </form>
      </div>
    </div>
  )
}

export default Login
