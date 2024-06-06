import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from 'styled-components';
import axios from "../../api/axios";
import MovieCard from "../MovieCard/MovieCard.jsx";
import useDebounce from '../../hooks/useDebounce.jsx';

const Search = () => {
  const [movieList, setMovieList] = useState([]);

  const navigate = useNavigate();

  return (
    <Container>
      <div className="search-container">
        {movieList.length === 0 ? (
          <div className="search-noresult">찾으신 영화가 검색 결과에 없습니다.</div>
          ) : (movieList.map((item) => (
              (<div className="search-find" key={item} {...item}></div>)
            ))
          )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 75px;
`;

export default Search

