import { useEffect, useState } from "react"
import Navbar from '../components/Navbar';
import Slider from "../components/Slider";
import backgroundImage from '../assets/home.jpg';
import MovieLogo from '../assets/homeTitle.webp';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";


export default function Netflix() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // used to dispatch the action(js object which contains type and payload) to redux store
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded); // this hook is used to get the state or part of state from store it takes a fuction which select the part of state and returns it
    const movies = useSelector((state) => state.netflix.movies);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ type: "all" }));
        }
    }, [genresLoaded]);

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <Container>
            <Navbar isScrolled={isScrolled}></Navbar>
            <div className="hero">
                <img src={backgroundImage} alt="background" className="background-image" />
                <div className="container">
                    <div className="logo">
                        <img src={MovieLogo} alt="Movie Logo" />
                    </div>
                    <div className="buttons flex">
                        <button className="flex j-center a-center" onClick={() => navigate('/player')}>
                            <FaPlay></FaPlay> Play
                        </button>
                        <button className="flex a-center j-center">
                            <AiOutlineInfoCircle></AiOutlineInfoCircle> More Info
                        </button>
                    </div>
                </div>
            </div>
            <Slider movies={movies}></Slider>
        </Container>
    )
}

const Container = styled.div`
    background-color: black;
    .hero{
        position: relative;
        .background-image{
            filter: brightness(60%);
        }
        img{
            height: 100vh;
            width: 100vw;
        }
        .container{
            position: absolute;
            bottom: 5rem;
            .logo{
                img{
                    width: 100%;
                    height: 100%;
                    margin-left: 5rem;
                }
            }
            .buttons{
                margin:5rem;
                gap: 2rem;
                button{
                    font-size: 1.4rem;
                    gap: 1rem;
                    border-radius: 0.2rem;
                    padding: 0.5rem;
                    padding-left: 2rem;
                    padding-right: 2.4rem;
                    border: none;
                    cursor: pointer;
                    transition: 0ms.3 ease-in-out;
                    &:hover{
                        opacity: 0.8;
                    }
                    &:nth-of-type(2){
                        background-color: rgba(109,109,110,0.7);
                        color: white;
                        svg{
                            font-size: 1.8rem;
                        }
                    }
                }
            }
        }
    }
`;