import React, { useRef, useState } from 'react';
import PropType from 'prop-types';
import Card from './Card';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

function CardSlider({ data, title }) {
    const [showControls, setShowControls] = useState(false);
    const sliderPosition = useRef(0); // Using ref instead of state to avoid re-renders
    const listRef = useRef();

    const handleDirection = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x;
        if (direction === 'left' && sliderPosition.current > 0) {
            listRef.current.style.transform = `translateX(${170 + distance}px)`;
            sliderPosition.current -= 1;
        }
        if (direction === 'right' && sliderPosition.current < 5) {
            listRef.current.style.transform = `translateX(${-270 + distance}px)`;
            sliderPosition.current += 1;
        }
    };

    return (
        <Container className='flex column' onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>
            <h1>{title}</h1>
            <div className="wrapper">
                <div className={`slider-action left ${!showControls ? "none" : ""} flex a-center j-center`}>
                    <AiOutlineLeft onClick={() => handleDirection('left')}></AiOutlineLeft>
                </div>
                <div className='flex slider' ref={listRef}>
                    {data.map((movie, ind) => (
                        <Card movie={movie} ind={ind} key={movie.id}></Card>
                    ))}
                </div>
                <div className={`slider-action right ${!showControls ? "none" : ""} flex a-center j-center`}>
                    <AiOutlineRight onClick={() => handleDirection('right')}></AiOutlineRight>
                </div>
            </div>
        </Container>
    );
}

CardSlider.propTypes = {
    data: PropType.any.isRequired,
    title: PropType.any.isRequired,
};

export default React.memo(CardSlider); // rerender only when prop of component get change 

const Container = styled.div`
    gap: 1rem;
    position: relative;
    padding: 2rem 0;
    h1 {
        margin-left: 50px;
    }
    .wrapper {
        position: relative;
        .slider {
            width: max-content;
            gap: 1rem;
            transform: translateX(0px);
            transition: transform 0.3s ease-in-out;
            margin-left: 50px;
        }
        .slider-action {
            position: absolute;
            z-index: 99;
            height: 100%;
            top: 0;
            bottom: 0;
            width: 50px;
            transition: 0.3s ease-in-out;
            svg {
                font-size: 2rem;
            }
        }
        .none {
            display: none;
        }
        .left {
            left: 0;
        }
        .right {
            right: 0;
        }
    }
`;
