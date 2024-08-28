import styled from 'styled-components'
import PropTypes from 'prop-types'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { FaPowerOff, FaSearch } from 'react-icons/fa';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseauth } from '../utils/firebase-config';

export default function Navbar({ isScrolled }) {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    const links = [
        { name: "Home", link: '/' },
        { name: "Tv Shows", link: '/tv' },
        { name: "Movies", link: '/movies' },
        { name: "My List", link: '/mylist' }

    ]

    onAuthStateChanged(firebaseauth, (currentUser) => {
        if (!currentUser) navigate('/login');
    })

    return (
        <Container>
            <nav className={`flex ${isScrolled ? 'scrolled' : ''}`}>
                <div className="left flex a-center">
                    <div className="brand">
                        {/* <img src={logo} alt="Netflix logo" /> */}
                        STREAMFLIX
                    </div>
                    <ul className='flex list'>
                        {
                            links.map((item, ind) => {
                                return <li key={ind} onClick={() => navigate(item.link)}>{item.name}</li>  // here 'to' inside Link element can also be used to navigate from react router dom (usenavigate hook of Link with to)
                            })
                        }
                    </ul>
                </div>
                <div className="right flex a-center">
                    <div className={`search ${showSearch ? "show-search" : ""}`}>
                        <button
                            onFocus={() => { setShowSearch(true) }}
                            onBlur={() => { if (!inputHover) setShowSearch(false) }}
                        >
                            <FaSearch></FaSearch>
                        </button>
                        <input type="text"
                            placeholder='Search'
                            onMouseEnter={() => { setInputHover(true) }}
                            onMouseLeave={() => { setInputHover(false) }}
                            onBlur={() => {
                                setShowSearch(false);
                                setInputHover(false);
                            }}
                        />
                    </div>
                    <button onClick={() => signOut(firebaseauth)}>
                        <FaPowerOff></FaPowerOff>
                    </button>
                </div>
            </nav>
        </Container>
    )
}

const Container = styled.div`
    .scrolled{
        background-color:black;
    }
    nav{
        top:0;
        height:6.5rem;
        width:100%;
        justify-content:space-between;
        position:fixed;
        z-index:2;
        padding:0 4rem;
        align-items:center;
        transition:0.3s ease-in-out;
        .left{
            gap:3rem;
            .brand{
                font-size: 4rem;
                color: red;
                /* img{
                    /* height:4rem; */
                } */
            }
            .list{
                gap:2rem;
                list-style-type:none;
                font-size:1.5rem;
                cursor:pointer;
            }
        }
            .right{
                gap:1rem;
                button{
                    background-color:transparent;
                    border:none;
                    cursor:pointer;
                    &:focus{
                        outline:none;
                    }
                    svg{
                        color:#f34242;
                        font-size:1.2rem;
                    }
                }
                .search{
                    display:flex;
                    gap:0.4rem;
                    align-items:center;
                    justify-content:center;
                    padding:0.2rem;
                    padding-left:0.5rem;
                    button {
                        background-color:transparent;
                        svg{
                            color:white;
                        }
                    }
                    input{
                        width:0;
                        visibility:hidden;
                        background-color:transparent;
                        border:none;
                        color:white;
                        &:focus{
                            outline:none;
                        }
                    }
                }
                .show-search{
                    border:1px solid white;
                    background-color:rgba(0,0,0,0.6);
                    input{
                        width:100%;
                        opacity:1;
                        visibility:visible;
                        padding:0.3rem;
                    }
                }
                
            }
    }
`;

Navbar.propTypes = {
    isScrolled: PropTypes.bool.isRequired
}