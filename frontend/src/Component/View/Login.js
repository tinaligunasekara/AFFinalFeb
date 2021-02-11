import React, {Component} from 'react';
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
import {MDBCard, MDBCardBody, MDBInput} from 'mdbreact';
// import axios from '../Hoc/Auxi';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import constants from "../Constants/Constant";
import Popup from "../View/popup";
import {Route, withRouter} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        // this.login = this.login.bind(this);

        this.state = {
            collapse: false,
            isWideEnough: false,
            modal: false,
            model2: false,
            fistname: '',
            lastname: '',
            email: '',
            gender: '',
            password: '',
            phone: 0,
            confirmpass: '',
            dob: '',
            MaleCount: 0,
            FemaleCount: 0,
            loginEmail: '',
            loginPass: '',
            loginEmailV: false,
            loginPassV: false
        };
        this.onClick = this.onClick.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeEmailV = this.onChangeEmailV.bind(this);
        this.onChangePassV = this.onChangePassV.bind(this);
        this.addUser = this.addUser.bind(this);
        this.validateUserDetails = this.validateUserDetails.bind(this);


    }


    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggle2 = () => {
        this.setState({
            modal: !this.state.modal,
            modal2: !this.state.model2
        });
    }

    toggle3 = () => {
        this.setState({
            modal2: false,
            firstname: "",
            lastname: "",
            email: "",
            gender: "",
            password: "",
            phone: "",
            dob: '',
            confirmpass: ""

        });
    }

    onChangeEmailV(event) {
        this.setState({
            loginEmail: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangePassV(event) {
        this.setState({
            loginPass: event.target.value,
            [event.target.name]: event.target.value
        })
    }


    onChangeFirstname(event) {
        this.setState({
            firstname: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangeLastname(event) {
        this.setState({
            lastname: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangeEmail(event) {
        this.setState({
            email: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangeGender(event) {
        this.setState({
            gender: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangeDOB(event) {
        this.setState({
            dob: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangeConfirmPassword(event) {
        this.setState({
            confirmpass: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangePhone(event) {
        this.setState({
            phone: event.target.value,
            [event.target.name]: event.target.value
        })

    }

    validateUserDetails(event) {
        event.preventDefault();

        if (this.state.loginEmail != '') {
            this.setState({
                loginEmailV: false
            })
            if (this.state.loginPass != '') {
                this.setState({
                    loginPassV: false
                })

                axios.get(constants.backend_url + 'api/user/validateUsers/' + this.state.loginEmail + '/' + this.state.loginPass)
                    .then(res => {
                            if (res.data.Message !== 'unsuccessful') {
                                localStorage.setItem("CustomerLogged", "CustomerLogged");
                                localStorage.setItem("CustomerId", res.data.Message._id);
                                // this.context.router.push('/');
                                this.props.history.push('/organicHome');
                                window.location.reload();

                                this.setState({
                                    loginEmail: '',
                                    loginPass: '',
                                    loginEmailV: false,
                                    loginPassV: false
                                });

                            } else {
                                Swal.fire(
                                    '',
                                    'Login unsuccessful  !',
                                    'error'
                                )
                            }
                        }
                    );


            } else {
                console.log('email field empty');
                this.setState({
                    loginPassV: true
                })
            }
        } else {
            console.log('email field empty');
            this.setState({
                loginEmailV: true
            })


        }
    }


    addUser(event) {
        event.preventDefault();
        event.target.className += " was-validated";
        if (this.state.password == this.state.confirmpass) {
            if (this.state.firstname != '') {
                if (this.state.lastname != '') {
                    if (this.state.email != '') {
                        if (this.state.gender != '') {
                            if (this.state.phone != 0) {
                                if (this.state.password != '') {
                                    if (this.state.confirmpass != '') {
                                        console.log("Validation complete");
                                        if (this.state.gender == 'Male' || this.state.gender == 'Female') {
                                            const user = {
                                                firstName: this.state.firstname,
                                                lastName: this.state.lastname,
                                                email: this.state.email,
                                                phone: this.state.phone,
                                                gender: this.state.gender,
                                                password: this.state.password

                                            }
                                            console.log("Before...");
                                            console.log("uuu" + user);
                                            axios.post(constants.backend_url + 'api/user/add', user)
                                                .then(res => {
                                                        console.log(res)
                                                        console.log(user);
                                                        if (res.data.user === 'successful') {
                                                            Swal.fire(
                                                                '',
                                                                'User Details added successfully !.',
                                                                'success'
                                                            );
                                                            this.setState({
                                                                firstName: '',
                                                                lastName: '',
                                                                email: '',
                                                                phone: '',
                                                                gender: '',
                                                                password: '',
                                                                confirmpass: ''
                                                            })
                                                        } else {
                                                            Swal.fire(
                                                                '',
                                                                'User Details not added !',
                                                                'error'
                                                            )
                                                        }
                                                    }
                                                );

                                        } else {
                                            Swal.fire(
                                                '',
                                                'Enter correct gender !.',
                                                'error');
                                        }

                                    } else {
                                        console.log(" confirm pass empty");
                                    }
                                } else {
                                    console.log("pass empty");
                                }
                            } else {
                                console.log("phone empty");
                            }
                        } else {
                            console.log("gender empty");
                        }
                    } else {
                        console.log("email empty");
                    }
                } else {
                    console.log("lname empty");
                }
            } else {
                console.log("fname == ''");
            }
        } else {
            console.log("pass != confirm pass");
            Swal.fire(
                '',
                'password and confirm password are not the same !',
                'error'
            );
        }
    };


    render() {
        return (
            <div>
                <div className="vertical-center">
                    <MDBView>
                        <MDBMask className='white-text gradient'/>

                        <MDBContainer
                            style={{height: '100%', width: '100%', paddingTop: '-80rem'}}
                            className='d-flex justify-content-center white-text '
                        >

                            <MDBRow>
                                <MDBCol md='12' className='text-center text-md-left mt-xl-5 mb-5'>
                                    <MDBAnimation type='fadeInLeft' delay='.3s'>
                                        <MDBCard className="loginContainer card"
                                                 style={{height: '80%', width: '100%', backgroundColor: '#CCFF90'}}>


                                            <form className="needs-validation" onSubmit={this.validateUserDetails}>
                                                <MDBCardBody className="mx-4">
                                                    <div className="text-center">
                                                        <h3 className="dark-grey-text mb-5">
                                                            <strong>User Login</strong>
                                                        </h3>
                                                    </div>
                                                    <MDBInput label="Your email" group type="email" validate
                                                              error="wrong" success="right"
                                                              value={this.state.loginEmail}
                                                              onChange={this.onChangeEmailV}/>
                                                    {
                                                        this.state.loginEmailV ?
                                                            <MDBAlert color="danger">
                                                                Please enter a value for email !
                                                            </MDBAlert> : ''
                                                    }


                                                    <MDBInput label="Your password" group type="password" validate
                                                              containerClass="mb-0" value={this.state.loginPass}
                                                              onChange={this.onChangePassV}/>
                                                    {
                                                        this.state.loginPassV ?
                                                            <MDBAlert color="danger">
                                                                Please enter a value for password !
                                                            </MDBAlert> : ''
                                                    }

                                                    <div className="text-center mb-3"
                                                         style={{backgroundColor: 'transparent'}}>
                                                        <button type="button" class="btn btn-warning" style={{backgroundColor: '#E65100'}}
                                                                onClick={this.validateUserDetails}>
                                                            LOGIN
                                                        </button>
                                                    </div>
                                                    <MDBModalFooter className="mx-5 pt-3 mb-1">
                                                        <p className="font-small grey-text d-flex justify-content-end">
                                                            Not a member?
                                                            <MDBBtn outline style={{backgroundColor: '#E65100'}}
                                                                    size="sm" onClick={this.toggle2}>SignIn</MDBBtn>
                                                        </p>
                                                    </MDBModalFooter><br></br>
                                                    <MDBModalFooter className="mx-5 pt-3 mb-1">
                                                        <a style={{color: '#3b5998'}} href="#!" role="button"
                                                        ><i class="fab fa-facebook-f fa-lg"/></a>


                                                        <a style={{color: '#55acee'}} href="#!" role="button"
                                                        ><i class="fab fa-twitter fa-lg"/></a>


                                                        <a style={{color: '#dd4b39'}} href="#!" role="button"
                                                        ><i class="fab fa-google fa-lg"/></a>


                                                        <a style={{color: '#ac2bac'}} href="#!" role="button"
                                                        ><i class="fab fa-instagram fa-lg"/></a>
                                                    </MDBModalFooter>
                                                </MDBCardBody>
                                            </form>

                                        </MDBCard>
                                    </MDBAnimation>
                                </MDBCol>
                            </MDBRow>

                        </MDBContainer>

                    </MDBView>
                </div>

                {/*/***/}
                {/**Registeration Modal*/}
                {/**/}

                <MDBContainer>
                    <MDBModal className="card rainy-ashville-gradient color-block-5 mb-3 mx-auto z-depth-1-half"
                              isOpen={this.state.modal2} toggle={this.toggle3}>

                        <MDBCard className="card" style={{backgroundColor: '#CCFF90'}}
                                 toggle={this.toggle3}
                        >
                            <MDBCardBody className="mx-2 ">
                                <div className="text-center">
                                    <h2 className="loginh3 mb-1">
                                        <strong className="loginh3 ">REGISTER</strong>
                                    </h2>
                                </div>

                                <form className="needs-validation" onSubmit={this.addUser} noValidate>
                                    <MDBRow>

                                        <label htmlFor="firstnameid" className="grey-text">First name</label>
                                        <input value={this.state.firstname} name="firstname"
                                               onChange={this.onChangeFirstname} type="text" id="firstnameid"
                                               className="form-control" placeholder="First name" required/>
                                        <div className="invalid-feedback">Please provide the first name.</div>

                                        <label htmlFor="lastnameid" className="grey-text">Last name</label>
                                        <input value={this.state.lastname} name="lastname"
                                               onChange={this.onChangeLastname} type="text" id="lastnameid"
                                               className="form-control" placeholder="Last name" required/>
                                        <div className="invalid-feedback">Please provide the last name.</div>

                                        <label htmlFor="emailid" className="grey-text">Email</label>
                                        <input value={this.state.email} onChange={this.onChangeEmail} type="email"
                                               id="emailid" className="form-control" name="email"
                                               placeholder="Your Email address"/>
                                        <div className="invalid-feedback">Please provide an email.</div>


                                    </MDBRow>
                                    <MDBRow>

                                        <label htmlFor="phoneid" className="grey-text">Contact number</label>
                                        <input onChange={this.onChangePhone} type="text" value={this.state.phone}
                                               id="phoneid" className="form-control" name="phone"
                                               placeholder="Contact number" required/>
                                        <div className="invalid-feedback">Please provide the contact number</div>


                                        <label htmlFor="genderid" className="grey-text">Gender</label>
                                        <input value={this.state.gender} onChange={this.onChangeGender} type="text"
                                               id="genderid" className="form-control" name="gender" placeholder="Gender"
                                               required/>

                                        <div className="invalid-feedback">Please provide your gender.</div>


                                        <label htmlFor="passwordid" className="grey-text">Password</label>
                                        <input onChange={this.onChangePassword} type="password"
                                               value={this.state.password} id="passwordid" className="form-control"
                                               name="password" placeholder="Password" required/>
                                        <div className="invalid-feedback">Please provide the password</div>

                                        <label htmlFor="conpasswordid" className="grey-text">Confirm Password</label>
                                        <input onChange={this.onChangeConfirmPassword} type="password"
                                               value={this.state.confirmpass} id="conpasswordid"
                                               className="form-control" name="confirmpass"
                                               placeholder="Confirm Password" required/>
                                        <div className="invalid-feedback">Please provide the confirm password</div>
                                        {
                                            this.state.password != this.state.confirmpass ? <MDBAlert color="danger">
                                                password and confirm password does not match
                                            </MDBAlert> : ''
                                        }


                                    </MDBRow>
                                    <br></br>
                                    <MDBBtn gradient="orange" rounded className="btn-block z-depth-1a" type="submit">
                                        REGISTER
                                    </MDBBtn>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                                           </MDBModal>
                </MDBContainer>
            </div>

        );
    }
}

export default withRouter(Login);