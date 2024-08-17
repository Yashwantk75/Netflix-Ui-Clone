import { useState } from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import video from '../assets/video.mp4';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri';
import { BsCheck } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { firebaseauth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeFromLikedMovies } from '../store/index';

function Card({ movie, isLiked = false }) {
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState(undefined);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    onAuthStateChanged(firebaseauth, (currentUser) => {
        if (currentUser) {
            setEmail(currentUser.email);
        }
        else navigate('/login');
    });

    const addToList = async () => {
        try {
            await axios.post('https://netflix-clone-ye9l.onrender.com/add', {
                email,
                data: movie,
            }).catch((err) => { console.log(err); });
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <Container onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => { setIsHovered(false) }}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt="movie" />
            {
                isHovered && (
                    <div className="hover">
                        <div className="image-video-container">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt="movie" onClick={() => { navigate('/player') }} />
                            <video src={video} autoPlay loop muted onClick={() => { navigate('/player') }}></video>
                        </div>
                        <div className="info-container flex column">
                            <h3 className="name" onClick={() => { navigate('/player') }}>{movie.name}</h3>
                            <div className="icons flex j-between">
                                <div className="controls flex">
                                    <IoPlayCircleSharp title='play' onClick={() => navigate('/player')}></IoPlayCircleSharp>
                                    <RiThumbUpFill title='like'></RiThumbUpFill>
                                    <RiThumbDownFill title='dislike'></RiThumbDownFill>
                                    {
                                        isLiked ? (<BsCheck title='Remove from List' onClick={() => { dispatch(removeFromLikedMovies({ movieId: movie.id, email })) }} />) : (<AiOutlinePlus title='Add to my List' onClick={addToList} />)
                                    }
                                </div>
                                <div className="info">
                                    <BiChevronDown title='More Info' />
                                </div>
                            </div>
                            <div className="genres flex">
                                <ul className="flex">
                                    {movie.genres.map((genre) => {
                                        return <li key={genre}>{genre}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </Container>
    )
}

const Container = styled.div`
    max-width: 230px;
    width: 230px;
    height: 100%;
    cursor: pointer;
    position: relative;
    img{
        border-radius: 0.2rem;
        width:100%;
        height:100%;
        z-index:10;
    }
    .hover{
        z-index:90;
        height:max-content;
        width:20rem;
        position:absolute;
        top:-18vh;
        left:0;
        border-radius:0.3rem;
        box-shadow:rgba(0,0,0,0.75) 0px 3px 10px;
        background-color:#181818;
        transition:0.3s ease-in-out;
        .image-video-container{
            position:relative;
            height:140px;
            img{
                width:100%;
                height:140px;
                object-fit: cover;
                border-radius: 0.3rem;
                top: 0;
                z-index: 4;
                position:absolute;
            }
            video{
                width:100%;
                height: 140px;
                object-fit:cover;
                border-radius: 0.3rem;
                top:0;
                z-index: 5;
                position: absolute;
            }
        }
        .info-container{
            padding: 1rem;
            gap: 0.5rem;
        }
        .icons{
            .controls{
                display: flex;
                gap: 1rem;
            }
            svg{
                font-size: 2rem;
                cursor: pointer;
                transition: 0ms.3s ease-in-out;
                &:hover{
                    color:#b8b8b8;
                }
            }
        }
        .genres{
            ul{
                gap: 1rem;
                li{
                    padding-right: 0.7rem;
                    &:first-of-type{
                        list-style-type: none;
                        
                    }
                }
            }
        }
    }
`;

Card.propTypes = {
    movie: PropTypes.any.isRequired,
    isLiked: PropTypes.any,
}

export default Card;
