import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Nav.css";
import { IoIosSearch } from "react-icons/io";

const Nav = () => {
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    // console.log(searchValue);
    navigate(`/search?q=${e.target.value}`);
    //query 문법
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
            type="search" 
            className="search-bar"
            placeholder="영화를 검색해주세요."
            value={searchValue}
            onChange={handleChange}/>
          <button className="search-icon"><IoIosSearch /></button>
        </span>
      </div>  
    </div>
  )
}

export default Nav
