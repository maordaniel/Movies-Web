import React, {useState, useEffect, Suspense} from 'react';
import {GetData} from '../services/api';
import '../Css/home_css.css'
import {Button} from 'react-bootstrap'
import AddItem from "../component/AddItem";
import CardItem from "../component/CardItem";


function HomePage() {
    const [movieList, setMovieList] = useState([]);
    const [sortedMovieList, setSortedMovieList] = useState([]);
    const [displayNewMovie, setDisplayNewMovie] = useState(false);

    useEffect( ()=>{
        document.title = 'Top10 Movies';
        getMovies()
    },[]);

     const MovieGenres = ["Action", "Adventure", "Animation", "Comedy", "Crime",
                "Documentary", "Drama", "Family", "Fantasy", "History", "Horror",
                "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"];

    const getMovies = async () =>{
        try {
            const res = await GetData();
            let sortedMovies = res.sort((a, b) => b.vote_average - a.vote_average);
            setMovieList(sortedMovies);
            setSortedMovieList(sortedMovies)
        }catch (e) {
            console.log(e)
        }
    };

    const onSelect = e => {
        let sortedMovies = movieList.filter(item => item.genre.includes(e.target.value));
        setSortedMovieList(sortedMovies)
    };

    const resetList = ()=>{
        let sortedMovies = movieList.sort((a, b) => b.vote_average - a.vote_average);
        setSortedMovieList(sortedMovies);
    };

    return (
        <div className='App' >
            <div className="web_title">
                <p>Top10 Movies</p>
            </div>
            <div>
                <Button className='btn-custom'
                    onClick={()=> !displayNewMovie ? setDisplayNewMovie(true): setDisplayNewMovie(false)}>
                    {!displayNewMovie ? "Click to add a new movie": "Close"}
                </Button>
            </div>
            <div className="add_item" style={{display:!displayNewMovie ? 'none' : ''}}>
                <h3>New Movie</h3>
                <AddItem getData={(e, v)=> {setMovieList(e);
                    setSortedMovieList(e);
                    setDisplayNewMovie(v)}}  movieList={movieList} genres={MovieGenres}/>
            </div>
            <div className="filter_select">
                <label>Filter By:</label>
                <select defaultValue={'DEFAULT'} onChange={onSelect}>
                    <option value={"DEFAULT"} disabled>
                        Choose a genre ...
                    </option>
                    {MovieGenres.map(val =>
                        <option value={val} key={val}>
                            {val}
                        </option>)}
                </select>
                <Button className="but" onClick={resetList} >Clear</Button>
            </div>
            {sortedMovieList ? <CardItem getData={(e)=> setSortedMovieList(e)} sortedMovie={sortedMovieList}/>:null}
        </div>
    )
}


const Loader = () => (
  <div>
    <div>loading...</div>
  </div>
);

export default function HomeApp() {
  return (
    <Suspense fallback={<Loader />}>
      <HomePage />
    </Suspense>
  );
}
