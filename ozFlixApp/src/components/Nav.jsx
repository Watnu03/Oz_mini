import {useNavigate} from "react-router-dom";
import "./Nav.css";
import { IoIosSearch } from "react-icons/io";


const Nav = () => {
  const navigate = useNavigate();

  const handelHomeClick = () => {
    navigate('/');
  };
  const clickMoveLogin = () => {
    navigate('/login');
  };
  const clickMoveSignUp = () => {
    navigate('/signUp');
  };

  return (
    <div className='nav'>
      <span className='logo' onClick={handelHomeClick}>로고자리</span>
      <span className="search" >
        <input type="text" className="search-bar"/>
        <IoIosSearch className="search-icon"/>
      </span>
      <span className='nav-btn'>
        <button className="login-btn" onClick={clickMoveLogin}>로그인</button>
        <button className="sign-btn" onClick={clickMoveSignUp}>회원가입</button>
      </span>
      
    </div>
  )
}

export default Nav
