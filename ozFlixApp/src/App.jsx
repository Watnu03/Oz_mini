import "./App.css";
import {useEffect, useState} from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import Nav from './components/Nav'
import axios from "./api/axios";
// import requests from "./api/requests";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {

  const [movieList, setMovieList] = useState([]);

  const fetchMovieData = async () => {
    const response = await axios.get('/movie/popular');
    // console.log(response.data.results);
    setMovieList(response.data.results);

  }
  useEffect(()=> {fetchMovieData()},[]);  
  // console.log(movieList);

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
      <Layout />
      <Routes>
        <Route
          path = "/"
          element = {
            <main>
              {movieList.map((item) => {
                return <MovieCard key={item.id} {...item} />;
              })}
            </main>
          }
        />
        <Route path = "/:id" element = {< MovieDetail />} />
        <Route path = "/login" element = {<Login />}/>
        <Route path = "/signUp" element = {<SignUp />}/>
      </Routes>
    </>
  );
}

export default App;
