import React from 'react';
import "./NavBarOption.css";

function NavBarOption({ Icon, title }) {
    return (
        <div className="navbar-option main-theme">
            {Icon && <Icon className="navbar-option-icon" />}
            {<h4>{title}</h4>}
        </div>
    )
}

export default NavBarOption
