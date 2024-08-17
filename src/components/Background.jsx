import background from '../assets/home.jpg'
import styled from 'styled-components'

export default function Background() {
    return (
        <Container>
            <img src={background} alt="" />
        </Container>
    )
}

const Container = styled.div`
    img{
        height:100vh;
        width:100vw;
    }
`;