import React, {Component} from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    //An ulternate methods for saving resource and runing this component only if show props
    // change exist using a Functional component, with React.memo.
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    // componentDidUpdate() {
    //     console.log('[Modal.js] update');
    // }

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.clicked} />
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    { this.props.children }
                </div>
            </Aux>
        )
    }   
}

export default Modal;
//export default React.memo(modal);