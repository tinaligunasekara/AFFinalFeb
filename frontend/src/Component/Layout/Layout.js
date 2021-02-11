import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navigationbar from '../Navigationbar/Navigationbar';
import Auxi from '../Hoc/Auxi';
import Footer from "../Footer/Footer";

class Layout extends Component {
    render() {
        return (
            <Auxi>
                <Navigationbar/>
                <Footer></Footer>
            </Auxi>
        );
    }
}

Layout.propTypes = {};

export default Layout;