import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Image from "../View/Images/background.jpg";
import View from "../View/View.css";
import Navigation from "../Navigationbar/Navigationbar";
import Popup from "../View/popup";
import Login from "../View/Login";
import {
    MDBMask,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBView,
    MDBContainer,
    MDBAnimation,
    MDBAlert,
    MDBModal,
    MDBModalHeader, MDBModalBody, MDBModalFooter
} from 'mdbreact';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            showPopup: false
        };
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    componentDidMount(){
        if(localStorage.getItem("CustomerLogged")!=="CustomerLogged"){
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="Bimagee">
                <div className='app'>
                    <div class="center">
                        <p><h1 class="display-1" style={{color: 'white'}}><b><b>ORG Foods</b></b></h1></p>
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <div>
                        <button type="button" class="btn btn-warning" style={{backgroundColor: '#E65100'}}
                                onClick={this.togglePopup.bind(this)}>Login</button>
                    </div>

                    <div>
                        {this.state.showPopup ?
                            <Login
                                text='Close Me'
                                closePopup={this.togglePopup.bind(this)}
                            />
                            : null
                        }
                    </div>


                </div>
            </div>
        );
    }
}

Home.propTypes = {};

export default Home;