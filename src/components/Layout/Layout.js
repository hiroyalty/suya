import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
//import Backdrop from '../UI/Backdrop/Backdrop';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    togglesideDrawerHandler = () => {
        let slideToggle = this.state.showSideDrawer;
        this.setState({showSideDrawer: !slideToggle});
        
        // Better way of doing it is here below
        // this.setState( ( prevState ) => {
        //     return { showSideDrawer: !prevState.showSideDrawer };
        // })
    }

    render() {

        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.togglesideDrawerHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;