import {useNavigate} from "react-router-dom";
import "./MovieCard.css";

const MovieCard = (item) => {
  const navigate = useNavigate();

  const handelClick = () => {
    navigate(`/detail/${item.id}`);
  };

  return (
    <div className="card" onClick={handelClick}>
      <div className="card-poster-box">
      <img 
        className="card-poster"
        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} 
        alt="poster" 
      />
      </div>
      <div className="card-info">
        <p className="card-title">{item.title}</p>
        <p className="card-vote_average">⭐{item.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;

/* 1) put 통째로 정보를바꿈(멱등성)덮어쓰기처럼됨 / fetch 일부만 바꿈
2) ?(옵셔널 체이닝) : null이면 ~가 되고 아니면 ~~~를 가져온다 조건문 대체가능(MovieDetails 에서 25줄 대신 사용할수있는 문법)
3) MovieDetails- movie에 null말고 숫자나 아무거나 적어도 실행은 됨 자바스크립트니깐..
*/