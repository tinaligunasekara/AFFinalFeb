import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Footer extends Component {
    render() {
        return (
            <footer className="bg-light text-center text-lg-start fixed-bottom">

                <div className="text-center p-3" style={{backgroundColor: 'black'}}>
                    © 2020 Copyright:
                    <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                </div>

            </footer>
        );
    }
}

Footer.propTypes = {};

export default Footer;