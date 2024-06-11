import "./App.css";
import {useEffect, useState} from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import Nav from './components/Nav/Nav';
import axios from "./api/axios";
import MovieCard from "./components/MovieCard/MovieCard";
import MovieDetail from "./pages/MovieDetailPage/MovieDetail";
import Search from "./pages/Search/Search";
import Signup from './pages/SignupPage/Signup';
import Login from './pages/LoginPage/Login';

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