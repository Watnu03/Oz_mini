import {useState} from "react";
import movieDetailData from "../../data/movieDetailData.json";
import "./MovieDetail.css";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState(movieDetailData);
  console.log(movieDetail);
  return (
    <div className="detail-container">
      <div className="detail-media">
        <img className='detail-poster' src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`} alt="poster" />
        <button className="trailer-btn">View Trailer</button>
      </div>
      <div className="detail-info">
        <div className="detail-info-main">
          <span className="detail-info-title">
            <p className="detail-title-tagline">{movieDetail.tagline}</p>
            <p className="detail-title-name">{movieDetail.title}</p>
          </span>
          <span className="detail-vote_average">⭐{movieDetail.vote_average}</span>
        </div>
        <div className="detail-genres">
          {movieDetail.genres.map((item) => {
            return (
              <span className="detail-genre" key={item.id}>{item.name}</span>
            );
          })}
        </div>
        <div className="detail-overview">{movieDetail.overview}</div>
      </div>
    </div>
  );
};

export default MovieDetail;
