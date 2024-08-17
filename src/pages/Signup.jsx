import styled from 'styled-components';
import Background from '../components/Background';
import Header from '../components/Header';
import { useRef, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firebaseauth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const email = useRef();
    const password = useRef();

    async function handleSignIn() {
        const formData = {
            'email': email.current.value,
            'password': password.current.value,
        }
        try {
            await createUserWithEmailAndPassword(firebaseauth, formData.email, formData.password)
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
        <Container showPassword={showPassword}>
            <Background></Background>
            <div className="content">
                <Header login ></Header>
                <div className="flex column a-center j-center body">
                    <div className="text flex column">
                        <h1>Unlimited Movies, TV shows and more</h1>
                        <h4>Watch anywhere. Cancel anytime.</h4>
                        <h6>Ready to watch? Enter you Email or Restart you Membership</h6>
                    </div>
                    <form className='form' action="">
                        <input type="email" name='email' placeholder='Enter you email address' ref={email} />
                        {
                            showPassword && <input type="password" name="password" id="" placeholder='Password' ref={password} />
                        }
                        {
                            !showPassword && <button onClick={() => setShowPassword(true)}>Get Started</button>
                        }
                    </form>
                    <button onClick={handleSignIn}>Sign In</button>
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
    .body{
        gap:1rem;
        .text{
            gap:1rem;
            text-align:center;
            font-size:2rem;
            h1{
                padding:0 25rem;
            }
        }
        .form{
            display:grid;
            grid-template-columns: ${({ showPassword }) => (showPassword ? "1fr 1fr" : "2fr 1fr")};
            width:60%;
            input{
                color:black;
                border:none;
                padding:1.5rem;
                font-size:1.2rem;
                border:1px solid black;
                &:focus{
                    outline:none
                }
            }
            button{
                padding: 0.5rem 1rem;
                background-color:#e50914;
                border:none;
                cursor:pointer;
                color:white;
                font-weight:bolder;
                font-size:1.05rem;
            }
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
