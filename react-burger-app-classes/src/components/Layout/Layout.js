import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary'
import styles from './layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer})
    }
    
    render(){
        return (<Aux>
            <Toolbar 
                toggleMenu={this.sideDrawerClosedHandler}/>
            <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}/>
            <main className={styles.Content}>
                {this.props.children}
            </main>
        </Aux>)
    }
} 

export default Layout;