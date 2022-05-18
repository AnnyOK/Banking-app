import React from 'react';
import classes from "./styles/NavBar.module.css"
import{Link, NavLink} from 'react-router-dom';
function NavBar(){
return <div className={classes.nav}>
    <Link to="/"> Login</Link>
    <Link to="/">Register </Link>
    <Link to="/"> transfer</Link>
    <Link to="/"> History</Link>

</div>
}
export default NavBar