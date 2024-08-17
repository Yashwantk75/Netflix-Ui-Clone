// import React from 'react'

import { useEffect, useState } from "react";
import { getUserLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseauth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

function UserLiked() {

    const dispatch = useDispatch();
    const movies = useSelector((state) => state.netflix.movies);
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(undefined);
    onAuthStateChanged(firebaseauth, (currentUser) => {
        if (currentUser) {
            setEmail(currentUser.email);
        }
        else navigate('/login');
    });


    useEffect(() => {
        if (email) dispatch(getUserLikedMovies(email));
    }, [email, dispatch]);


    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    console.log(movies);

    return (
        <Container>
            <Navbar isScrolled={isScrolled}></Navbar>
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {movies.map((movie, index) => {
                        return <Card movie={movie} index={index} key={movie.id} isLiked={true}></Card>
                    })}
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    .content{
        margin: 2.3rem;
        margin-top: 8rem;
        gap: 3rem;
        h1{
            margin-left: 3rem;
        }
        .grid{
            flex-wrap: wrap;
            gap: 1rem;
        }
    }
`;

export default UserLiked;
