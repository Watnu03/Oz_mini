import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./Nav.css";
import { IoIosSearch } from "react-icons/io";
import styled from 'styled-components';

import {getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import auth from '../../firebase';

const Nav = () => {
  const [searchValue, setSearchValue] = useState('');
  const [user, setUser] = useState(null);

  const auth = getAuth();


  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    // console.log(searchValue);
    navigate(`/search?q=${e.target.value}`);
    //query 문법
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //Firebase Authentication에서 사용자의 인증 상태가 변경될 때마다 호출되는 콜백 함수입니다. 이 콜백 함수는 사용자가 로그인하거나 로그아웃할 때마다 호출되며, 현재 로그인된 사용자의 정보를 제공한다
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  //로그아웃 버튼 클릭시
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        alert('로그아웃 되었습니다');
        localStorage.removeItem('user');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="header">
      <div className='nav'>
        <span className='logo' onClick={()=>{navigate('/')}}>OZFLIX</span>
        {!user && (
          <span className='nav-btn'>
            <button className="login-btn" onClick={()=>{navigate('/login')}}>로그인</button>
            <button className="sign-btn" onClick={()=>{navigate('/signUp')}}>회원가입</button>
          </span>
        )}

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
        {user && (
          <span className='nav-btn'>
            <UserImg
              src={user.photoURL}
              alt={user.displayName}
              />
            <DropDown>
              <button className="bookmark-btn">북마크</button>
              <button className="logout-btn" onClick={handleLogOut}>로그아웃</button>
            </DropDown>
            
          </span>
        )}
        
      </div>  
    </div>
  )
}

const UserImg = styled.img`
  border-radius: 50%;
  width: 35px;
  height: 35px;
`;

const DropDown = styled.div`
/* 이후에 css 예정 */
`;

export default Nav
