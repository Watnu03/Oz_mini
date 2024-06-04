import {useNavigate} from "react-router-dom";
import "./MovieCard.css";

const MovieCard = (item) => {
  const navigate = useNavigate();

  const handelClick = () => {
    navigate(`/${item.id}`);
  };

  return (
    <div className="card" onClick={handelClick}>
      <img 
        className="card-poster"
        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} 
        alt="poster" 
      />
      <div className="card-info">
        <p className="card-title">{item.title}</p>
        <p className="card-vote_average">⭐{item.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;
