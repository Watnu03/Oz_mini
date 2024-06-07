import {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import axios from "../../api/axios";
import useDebounce from '../../hooks/useDebounce';

const Search = () => {
  const navigate = useNavigate();

  //searchTerm이 바뀔때마다 새로운 영화 데이터 가져오기
  const [searchResult, setSearchResult] = useState([]);

  //Search페이지에서 SearchTerm가져오기
  const useQuery = () => {
    /*1. useLocation() 를 사용하여 현재URL정보 가져오기
    2. 가져온 URL객체에서 search부분 을 return하기
    3. URLSearchParams가 URL뒤에 복잡하게 붙은 애들(파라미터)를 쉽게 쪼갤수 있다
    new 키워드를 이용한 생성자를 통해 초기화하고 사용한다*/
    return new URLSearchParams(useLocation().search);
  };
  
  //딜레이 설정하기
  //가져온 'query'값이 바뀔때마다 500의 딜레이를 가지고 useDebounce가 실행됨
  const debounceSearchQuery = useDebounce(query.get('query'), 500);
  
  let query = useQuery();

  //사용자가 입력한 검색어만 가져와서 searchTerm에 넣기
  const searchTerm = query.get('q');

  const fetchSearchMovie = async (searchTerm) => {
    try{
      const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      console.log(response);
      setSearchResult(response.data.results);
    }
    catch(error){
      console.log(error);
    }
  }

  //[debounceSearchQuery]값이 변경될때마다 useEffect 실행
  useEffect(() => {
    console.log('useEffect 작동함');
    fetchSearchMovie(debounceSearchQuery);
  },[debounceSearchQuery]);


  if(searchResult.length > 0){
    return(
      <Container>
        <section className="search-container">
          {searchResult.map((movie) => {
            if(movie.backdrop_path !== null && movie.media_type !== 'person'){
              //만약 무비 backdrop_path가 null이 아니라면
              // movieImageUrl에 주소+포스터 주소 붙히기
              const movieImageUrl =
                "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
              return (
                <div className="movie" key={movie.id}>
                  <div
                    onClick={() => navigate(`/detail/${movie.id}`)}
                    className="movie__column-poster"
                  >
                    <img
                      src={movieImageUrl}
                      alt="movie"
                      className="movie-poster"
                    />
                  </div>
                </div>
              );
            }
          })}
        </section>
      </Container>
    );
  }
  else {
    return (
      <Container>
        <section className="no-search-container">
          <div className="no-search">
            <p>검색하신 "{searchTerm}"에 맞는 영화가 없습니다.</p>
          </div>
        </section>
      </Container>
    );
  }
}

const Container = styled.section`
  width: 80%;
  height: 100%;
  padding-top: 75px;
  margin: auto;

  .search-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .movie{
    margin: 10px;
  }
  .movie:hover .movie-poster{
  transform: scale(1.1);
  transition: all 0.3s ;
  }
  .movie__column-poster{
    width:360px;
    height: auto;
    border-radius: 10px;

    overflow: hidden;
  }
  .movie-poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .card-info{
    width: 100%;
    height: auto;
    margin-top: 8px;
    padding-left: 2px;

    display: flex;
    flex-direction: column;
  }
  .card-title {
    margin-bottom: 5px;
    font-size: 0.9em;
  }
  .card-vote_average {
    font-size: 0.8em;
  }

  .no-search-container{
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .no-search{
    font-size: 1.2em;
    font-weight: 700;
  }

  /* 테블릿 가로 (해상도 768px ~ 1023px)*/ 
  @media all and (min-width:768px) and (max-width:1023px) { 
    section{
      width: 100%;
      margin: auto;
    }
  } 
  /* 모바일 가로 & 테블릿 세로 (해상도 480px ~ 767px)*/ 
  @media all and (min-width:480px) and (max-width:767px) {
    section{
      width: 100%;
      margin: auto;
    }
  } 
  /* 모바일 세로 (해상도 ~ 479px)*/ 
  @media all and (max-width:479px) {
    section{
      width: 100%;
      margin: auto;
    }
  }
`;

export default Search