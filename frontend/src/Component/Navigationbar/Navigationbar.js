import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    MDBBtn,
    MDBCollapse,
    MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBFormInline,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem,
    MDBNavLink
} from "mdbreact";
// import {Redirect, Route} from "react-router";
import Home from "../View/Home";
import Login from "../View/Login";
import {Route} from "react-router-dom";
import AddVegetables from "../View/AddVegetables";
import OrganicHome from "../View/OrganicHome";
import Logout from "../Logout/Logout";

class Navigationbar extends Component {

    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (
            <div>
                <header>
                    <MDBNavbar color="black darken-3" dark expand="md">
                        <MDBNavbarBrand>
                            <strong className="white-text"><p>Organic foods</p></strong>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.toggleCollapse}/>
                        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem active>
                                    <MDBNavLink to="/">Home</MDBNavLink>
                                </MDBNavItem>

                                <MDBNavItem>
                                    <MDBNavLink to="/organicHome">Organic Home</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/logout">Logout</MDBNavLink>
                                </MDBNavItem>

                                <MDBNavItem>

                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>

                </header>

                <main className="container-fluid">

                    <switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/addVegetables' component={AddVegetables}/>
                        <Route exact path='/organicHome' component={OrganicHome}/>
                        <Route exact path='/logout' component={Logout}/>
                    </switch>
                </main>

            </div>
        );
    }
}

Navigationbar.propTypes = {};

export default Navigationbar;