import {useState,useEffect} from "react";
import axios from "../api/axios";
// import requests from "../api/requests";
import { useParams } from 'react-router-dom';
import "./MovieDetail.css";

const MovieDetail = () => {
  //MovieCard 에서 navigate로 받아온 id 로 똑같이 적어줘야 받아온다
  const {id} = useParams();
  const [movie, setMovie] = useState([]);

  // console.log(useParams());
  // console.log(id);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/movie/${id}`);
      setMovie(response.data)
    }
    fetchData()
  },[id])
  // console.log(movie);

  return (
    <div className="detail-container">
      <div className="detail-media">
        <img className='detail-poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
        <button className="trailer-btn">View Trailer</button>
      </div>
      <div className="detail-info">
        <div className="detail-info-main">
          <span className="detail-info-title">
            <p className="detail-title-tagline">{movie.original_title}</p>
            <p className="detail-title-name">{movie.title}</p>
          </span>
          <span className="detail-vote_average">⭐{movie.vote_average}</span>
        </div>
        {/* home에서 받아올때  genre가 map으로 못받아온다고 오류가뜸
        화면이 로딩된 상태에서 주석했다가 주석풀면 다시 정상작동*/}
        <div className="detail-genres">
          {/* {movie.genres.map((genre) => {
            return (
              <span className="detail-genre" key={genre.id}>{genre.name}</span>
            );
          })} */}
        </div>
        <div className="detail-overview">{movie.overview}</div>
      </div>
    </div>
  );
};

export default MovieDetail;
