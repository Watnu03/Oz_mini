import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Nav.css";
import { IoIosSearch } from "react-icons/io";

const Nav = () => {
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <div className="header">
      <div className='nav'>
        <span className='logo' onClick={()=>{navigate('/')}}>OZFLIX</span>
        <span className='nav-btn'>
          <button className="login-btn" onClick={()=>{navigate('/login')}}>로그인</button>
          <button className="sign-btn" onClick={()=>{navigate('/signUp')}}>회원가입</button>
        </span>
        <span className="search" >
          <span className="search-dummy"></span>
          <input 
            type="text" 
            className="search-bar"
            value={searchValue}
            onChange={handleChange}/>
          <IoIosSearch className="search-icon"/>
        </span>
      </div>  
    </div>
  )
}

export default Nav
