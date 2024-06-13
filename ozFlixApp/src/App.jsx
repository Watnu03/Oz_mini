import "./App.css";
import {useEffect, useState} from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import Nav from './components/Nav/Nav';
import axios from "./api/axios";
import MovieCard from "./components/MovieCard/MovieCard";
import MovieDetail from "./pages/MovieDetailPage/MovieDetail";
import Search from "./pages/Search/Search";
import Signup from './pages/SignupPage/SignUp';
import Login from './pages/LoginPage/Login';

//! firebase 배포
/*1)npm run build
2)firebase CLI설치: npm install -g firebase-tools /firebase로그인: firebase login
3)프로젝트 초기화: firebase init
4)호스팅옵션은 Hosting : Congifure files for Firebase Hosting and (optionally) set up GitHub Action deploys 스페이스바선택>엔터
5)Use an existing project 선택
6-1)What do you want to use as your public directory? :dist
6-2)Configure as a single-page app (rewrite all urls to /index.html)? :y
6-3)Set up automatic builds and deploys with GitHub? :n
6-4)File build/index.html already exists. Overwrite? :n
7)firebase 배포: firebase deploy
8)코드가 변경되면 build부터 다시하고 deploy까지> 페이지 들어가면 새로고침 한번 하기*/

function App() {

  const [movieList, setMovieList] = useState([]);

  /*HTTPS 요청방법
  1)get 받아오는거 2)post 입력한정보 보내느거 3)put 데이터업데이트 4)delete
  async await를 사용해서 비동기 함수를 통햇 서버랑 통신함(get을 사용해서)
  axios가 편하게하기위한 라이브러리/HTTP할때 get요청을 사용해서*/
  const fetchMovieData = async () => {
    const response = await axios.get('/movie/popular');
    // console.log(response.data.results);
    setMovieList(response.data.results);

  }
  useEffect(()=> {fetchMovieData()},[]);  
  // console.log(movieList);0

  // Outlet 하위태그에 위치
  // 페이지 하나당 하나의 element가들어감 outlet에 하나의 컴포턴트태그
  const Layout = () => {
    return (
      <>
        <Nav />
        <Outlet />
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path = "/" element = {<Layout />}>
          <Route path = "/" element = {
              <main>
                {movieList.map((item) => {
                  return <MovieCard key={item.id} {...item} />;
                })}
              </main>
            }
          />
          <Route path = "/detail/:id" element = {< MovieDetail />} />
          <Route path = "/Search" element = {< Search />} />
        </Route>
          
        <Route path = "/login" element = {<Login />}/>
        <Route path = "/signup" element = {<Signup />}/>
      </Routes>
    </>
  );
}

export default App;