import React from 'react';
import classes from "./styles/Home.module.css";
import {Link}from 'react-router-dom'

function Home(props) {
    return (
        <div className={classes.mainNav}>
            <div className={classes.navbox}>Create New Account?</div>
            <div className={classes.navbox}>Transfer Funds</div>
            <div className={classes.navbox}>Make A deposit</div>
            <div className={classes.navbox}>Transactions history</div>
            <div className={classes.navbox}>Find a transaction</div>
            <div className={classes.navbox}>Updates</div>
            
        </div>
    );
}

export default Home;