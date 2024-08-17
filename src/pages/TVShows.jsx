import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
// import { onAuthStateChanged } from 'firebase/auth';
// import { firebaseauth } from '../utils/firebase-config';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import styled from 'styled-components';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelelctGenre';

function TVShows() {
    const dispatch = useDispatch();
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ type: "tv" }));
        }
    }, [genresLoaded]);

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    // onAuthStateChanged(firebaseauth, (currentUser) => {
    //     // if (currentUser) {
    //     //     navigate('/');
    //     // }
    // });

    return (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={isScrolled}></Navbar>
            </div>
            <div className="data">
                <SelectGenre genres={genres} type='tv'></SelectGenre>
                {
                    movies.length ? <Slider movies={movies}></Slider> : <NotAvailable></NotAvailable>
                }
            </div>
        </Container>
    )
}

const Container = styled.div`
    .data{
        margin-top: 8rem;
        .not-available{
            text-align: center;
            color:white;
            margin: 4rem;;
        }
    }
`;

export default TVShows;
