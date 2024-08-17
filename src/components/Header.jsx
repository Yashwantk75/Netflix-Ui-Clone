import logo from '../assets/logo.png'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
export default function Header({ login }) {
    const navigate = useNavigate();

    return (
        <Container className='flex a-center j-between'>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <button onClick={() => login ? navigate('/login') : navigate('/signup')}>{login ? "Log In" : "Sign In"}</button>
        </Container>
    )
}

const Container = styled.div`
    padding:0 4rem;
    .logo{
        img{
            height:5rem;
        }
    }
    button{
        padding: 0.5rem 1rem;
        background-color:#e50914;
        border:none;
        cursor:pointer;
        color:white;
        border-radius:0.2rem;
        font-weight:bolder;
        font-size:1.05rem;
    }
`;

Header.propTypes = {
    login: PropTypes.bool,
}