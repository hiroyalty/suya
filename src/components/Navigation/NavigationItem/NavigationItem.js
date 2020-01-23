import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link}>{props.children}</NavLink>
            {/* className={props.active ? classes.active : null} */}
    </li>
);

export default navigationItem;