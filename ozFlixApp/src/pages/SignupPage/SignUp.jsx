import "./SignUp.css";

const signUp = () => {
  return (
    <div className="signUp">
      <div className='signUp-container'>
        <h1>회원가입</h1>
        <form className="signUp-form">
          <div className="sign-text">
            {/* label에 for문이 오류남 */}
            <label>이름</label>
            <div className="sign-input">
              <input id="name" type="text" placeholder="김아무개" required/>
            </div>
          </div>
          <div className="sign-text">
            <label>이메일</label>
            <div className="sign-input">
              <input id="email" type="email" placeholder="example@inflab.com"required/>
            </div>
          </div>
          <div className="sign-text">
            <label>비밀번호</label>
            <div className="sign-input">
              <input id="password" type="password" placeholder="********" required/>
            </div>
          </div>
          <div className="sign-text">
            <label>비밀번호 확인</label>
            <div className="sign-input">
              <input id="password-check" type="password" placeholder="********" required/>
            </div>
          </div>
          <button className="signUp-btn">가입하기</button>
        </form>
      </div>
    </div>
  )
}

export default signUp
