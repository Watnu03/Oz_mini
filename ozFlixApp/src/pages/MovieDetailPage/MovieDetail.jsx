import {useState,useEffect} from "react";
import axios from "../../api/axios";
import { useParams } from 'react-router-dom';
import "./MovieDetail.css";

const MovieDetail = () => {
  //MovieCard 에서 navigate로 받아온 id 로 똑같이 적어줘야 받아온다
  //useParams는 URL에 있는 값을 가져온다
  const {id} = useParams();
  const [movie, setMovie] = useState(null);

  // console.log(useParams());
  // console.log(id);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/movie/${id}`);
      setMovie(response.data)
    }
    fetchData()
  },[id])
  console.log(movie);
  
  {/* 1) movie가 로드되기전에 null 상태인 movie에 접근하려고 하면 TypeError가 발생함 => if문을 사용해서 null이 아닌경우에만 렌더링 하게 함*/}
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-container">
      <div className="detail-media">
        <img className='detail-poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
        <img className='detail-background-poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
      </div>
      <div className="detail-info">
        <div className="detail-info-main">
          <span className="detail-info-title">
            <p className="detail-title-tagline">{movie.original_title}</p>
            <p className="detail-title-name">{movie.title}</p>
          </span>
          <span className="detail-vote_average">⭐{movie.vote_average}</span>
        </div>
        {/*? 1) home에서 받아올때  genre가 map으로 못받아온다고 오류가뜸
        화면이 로딩된 상태에서 주석했다가 주석풀면 다시 정상작동 */}
        <div className="detail-genres">
          {movie.genres && movie.genres.map((genre) => {
            return (
              <span className="detail-genre" key={genre.id}>{genre.name}</span>
            );
          })}
        </div>
        <div className="detail-overview">{movie.overview}</div>
      </div>
    </div>
  );
};

export default MovieDetail;
