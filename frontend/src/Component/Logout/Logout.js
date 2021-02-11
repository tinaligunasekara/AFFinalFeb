import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem('UserLogged');
        localStorage.removeItem('UserId');
        this.props.history.push('/Login');
        window.location.reload();
    }

    render() {
        return (
            <div className="Bimagee">

            </div>
        );
    }
}

Logout.propTypes = {};

export default Logout;