import styled from 'styled-components';

export const StyledNav = styled.div`
    display: flex;
    flex-direction: column;
    height: 97.5vh; 
    width: 200px; 
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 20px;
    background-color: rgb(83, 80, 80) !important;
    position: fixed;
    transition: transform 0.3s ease-in-out;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
`;
