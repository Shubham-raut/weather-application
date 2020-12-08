import React from 'react';
import { NavLink } from 'react-router-dom';
// import styled from 'styled-components';

// const Nav = styled.nav`
// padding: 15px 15px;
// width: 100%;
// border-radius: 0px;
// z-index: 999;
// margin-bottom: 0px;
// transition: all 0.5s ease-in-out;
// border-bottom: 1px solid rgba(255, 255, 255, 0.07);
// `;

const Header = () => {
    return (
        <header>
            <nav>
                <NavLink exact to="/" >
                    <p className='Nav-Title'>My Weather Application</p>
                </NavLink>
                <div className='NavItemContainer'>
                    <NavLink exact to="/" activeClassName='Active'>Home    </NavLink>
                    <NavLink to="/mycities" activeClassName='Active'>My Cities</NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Header;