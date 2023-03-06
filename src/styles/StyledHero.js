import styled from 'styled-components'
import defaultImg from '../images/defaultImg.png'

export const StyledHero = styled.header`
    min-height: 50vh;
    background: url(${props => props.img ? props.img : defaultImg}) center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media (max-width: 600px) {
        min-height: 30vh;
    }
`;

export const StyledBanner = styled.div`
    display: inline-block;
    background: rgba(0, 0, 0, 0.5);
    color: var(--mainWhite);
    padding: 2rem 1rem;
    text-align: center;
    text-transform: capitalize;
    letter-spacing: var(--mainSpacing);
    border-radius: 13px;
    width: 80%;
    font-size: large;
`;

export const StyledTitle = styled.h1`
    font-size: 4rem;

    @media (max-width: 650px) {
        font-size: 2rem;
      }
`;