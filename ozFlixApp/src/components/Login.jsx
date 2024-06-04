import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <div className='login-container'>
        <h1>로그인</h1>
        <form className="login-form">
            <div className="login-input">
              <input id="email" type="email" placeholder="이메일"required/>
            </div>
            <div className="login-input">
              <input id="password" type="password" placeholder="비밀번호" required/>
            </div>
          <button className="login-btn">로그인</button>
        </form>
      </div>
    </div>
  )
}

export default Login
