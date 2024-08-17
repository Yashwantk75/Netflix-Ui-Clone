import styled from 'styled-components';
import Background from '../components/Background';
import Header from '../components/Header';
import { useRef } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firebaseauth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
    const email = useRef();
    const password = useRef();

    async function handleLogIn() {
        const formData = {
            'email': email.current.value,
            'password': password.current.value,
        }
        try {
            await signInWithEmailAndPassword(firebaseauth, formData.email, formData.password)
        } catch (error) {
            console.log(error);
        }
    }

    onAuthStateChanged(firebaseauth, (currentUser) => {
        if (currentUser) {
            navigate('/');
        }
    });

    return (
        <Container>
            <Background></Background>
            <div className="content">
                <Header></Header>
                <div className="form-container flex column a-center j-center">
                    <div className="form flex column a-center j-center">
                        <div className="title">
                            <h3>Login</h3>
                        </div>
                        <div className="container flex column">
                            <input type="email" name='email' placeholder='Enter you email address' ref={email} />
                            <input type="password" name="password" id="" placeholder='Password' ref={password} />
                            <button onClick={handleLogIn}>LogIn</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position:relative;
    .content{
        height:100vh;
        width:100vw;
        position:absolute;
        top:0;
        left:0;
        background-color:rgb(0,0,0,0.5);
        display:grid;
        grid-template-rows: 15vh 85vh;
    }
    .form-container{
        /* gap:2rem; */
        height:85vh;
    }
    .form{
        gap:2rem;
        padding:2rem;
        background-color:#000000b0;
        width:25vw;
        color:white;
        .container{
            gap:2rem;
            input{
                padding:0.5rem 1rem;
                width:15rem;
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
        }
    }
`;
