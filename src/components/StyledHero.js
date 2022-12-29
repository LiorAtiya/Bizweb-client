import styled from 'styled-components'
import defaultImg from '../images/defaultImg.png'

const StyledHero = styled.header`
    min-height: 55vh;
    background: url(${props => props.img? props.img : defaultImg}) center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default StyledHero;