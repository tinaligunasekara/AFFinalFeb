import React, {Component} from 'react';
import PropTypes from 'prop-types';
import View from "../View/View.css";
import Login from "../View/Login"

class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>

                    {/*<button className=" fas fa-times float-right"  onClick={this.props.closePopup}/>*/}
                    <Login/>
                </div>
            </div>
        );
    }
}

Popup.propTypes = {};

export default Popup;