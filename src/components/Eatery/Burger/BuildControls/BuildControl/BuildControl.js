import React from 'react';
import classes from "./BuildControl.module.css"

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.Less}
            onClick={props.added}><strong>+</strong></button>
        <button 
            className={classes.More}
            onClick={props.remove}
            disabled={props.disabled}><strong>-</strong></button>
    </div>
)

export default buildControl;