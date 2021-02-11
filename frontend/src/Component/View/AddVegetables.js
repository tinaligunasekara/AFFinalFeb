import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    MDBAlert,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBModalBody,
    MDBInput,
    MDBModal,
    MDBRow, MDBTable, MDBTableHead, MDBTableBody
} from "mdbreact";
import axios from "axios";
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import constants from "../Constants/Constant";


class AddVegetables extends Component {

    constructor(props) {
        super(props);


        this.state = {
            collapse: false,
            isWideEnough: false,
            modal: false,
            model2: false,
            sellerName: '',
            phoneNumber: '',
            location: '',
            vegetableName: '',
            amount: '',
            startDate: '',
            endDate: '',
            searchVeg: '',
            vegList: [],
            vegListStatus: false

        };
        this.onClick = this.onClick.bind(this);
        this.onChangeSellerName = this.onChangeSellerName.bind(this);
        this.onChangephoneNumber = this.onChangephoneNumber.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeVegetableName = this.onChangeVegetableName.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.addVegetable = this.addVegetable.bind(this);
        this.getDetailsbyvegetableName = this.getDetailsbyvegetableName.bind(this);
        // this.getDetailsbyvegetableName();
        this.onChangeSearch = this.onChangeSearch.bind(this);


    }

    componentDidMount(){
        if(localStorage.getItem("CustomerLogged")!=="CustomerLogged"){
            this.props.history.push('/');
        }
    }


    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    onChangeSellerName(event) {
        this.setState({
            sellerName: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangephoneNumber(event) {
        this.setState({
            phoneNumber: event.target.value,
            [event.target.name]: event.target.value
        })
    }


    onChangeLocation(event) {
        this.setState({
            location: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangeVegetableName(event) {
        this.setState({
            vegetableName: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangeAmount(event) {
        this.setState({
            amount: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangeEndDate(event) {
        this.setState({
            endDate: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangeStartDate(event) {
        this.setState({
            startDate: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangeSearch(event) {
        this.setState({
            searchVeg: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    getDetailsbyvegetableName(event){
        event.preventDefault();
        axios.get(constants.backend_url + 'api/vegetable/getDetailsbyvegetableName/' + this.state.searchVeg).then(response => {
            if(response.data.message!=="not found"){
                console.log(response.data)
                this.setState({
                    vegList:response.data
                })
            }
        }).catch(function (error) {
            console.log(error);
        })
    }


    addVegetable(event) {
        event.preventDefault();
        event.target.className += " was-validated";
        if (this.state.sellerName != '') {
            if (this.state.phoneNumber != '') {
                if (this.state.location != '') {
                    if (this.state.vegetableName != '') {
                        if (this.state.amount != 0) {
                            if (this.state.startDate != '') {
                                if (this.state.endDate != '') {
                                    console.log("Validation complete");
                                    const veg = {
                                        sellerName: this.state.sellerName,
                                        phoneNumber: this.state.phoneNumber,
                                        location: this.state.location,
                                        vegetableName: this.state.vegetableName,
                                        amount: this.state.amount,
                                        startDate: this.state.startDate,
                                        endDate: this.state.endDate

                                    }
                                    console.log("Before...");
                                    console.log("uuu" + veg);
                                    axios.post(constants.backend_url + 'api/vegetable/add', veg)
                                        .then(res => {
                                                console.log(res)
                                                console.log(veg);
                                                if (res.data.veg === 'successful') {
                                                    Swal.fire(
                                                        '',

                                                        'Vegetable Details not added !',
                                                        'error'
                                                    );
                                                    this.setState({
                                                        sellerName: '',
                                                        phoneNumber: '',
                                                        location: '',
                                                        vegetableName: '',
                                                        amount: '',
                                                        startDate: '',
                                                        endDate: ''
                                                    })
                                                } else {
                                                    Swal.fire(
                                                        '',
                                                        'Vegetable Details added successfully !.',
                                                        'success'
                                                    )
                                                }
                                            }
                                        );

                                } else {
                                    console.log(" End date empty");
                                }
                            } else {
                                console.log("Start date empty");
                            }
                        } else {
                            console.log("Amount empty");
                        }
                    } else {
                        console.log("Vegetable Name empty");
                    }
                } else {
                    console.log("Location empty");
                }
            } else {
                console.log("Phone Number empty");
            }
        } else {
            console.log("Seller name empty");
        }
    };


    render() {


        return (


            <div>
                <div>
                    <div className="card Bimage">
                        <div className="card-body">
                            <br/><br/><br/>
                            <h5 className="card-title display-4" style={{color: '#FFEA00'}}>ORGANIC FOOD IS BEST FOR
                                YOU</h5>
                            <br/><br/>
                            <div align="center">
                                <div className="input-group">

                                    <input type="search" className="form-control " placeholder="Search"
                                           aria-label="Search"
                                           value={this.state.searchVeg} onChange={this.onChangeSearch}/>
                                    <form onSubmit={this.getDetailsbyvegetableName}>
                                        <button type="submit" className="btn btn-outline-warning"
                                                data-mdb-ripple-color="dark"><b><b>Search</b></b></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/><br/>
                <MDBRow>
                    <MDBCol>
                        <MDBContainer>
                            <div>
                                <MDBCard className="card mx-auto" style={{
                                    height: '20%',
                                    width: '60%',
                                    backgroundColor: '#CCFF90',
                                    paddingTop: '10'
                                }}>
                                    <MDBCardBody className="mx-2">
                                        <div className="text-center">
                                            <h2 className="loginh3 mb-1">
                                                <strong className="loginh3 ">Add Vegetables</strong>
                                            </h2>
                                        </div>

                                        <form className="needs-validation" onSubmit={this.addVegetable} noValidate>
                                            <MDBRow>

                                                <label htmlFor="sellertnameid" className="grey-text">Seller's
                                                    Name</label>
                                                <input value={this.state.sellerName} name="firstname"
                                                       onChange={this.onChangeSellerName} type="text" id="sellernameid"
                                                       className="form-control" placeholder="Seller's name" required/>
                                                <div className="invalid-feedback">Please provide the Seller's name.</div>

                                                <label htmlFor="phoneid" className="grey-text">Phone Number</label>
                                                <input value={this.state.phoneNumber} name="phonenumber"
                                                       onChange={this.onChangephoneNumber} type="text" id="lastnameid"
                                                       className="form-control" placeholder="Phone Number" required/>
                                                <div className="invalid-feedback">Please provide the phone number.</div>

                                                <label htmlFor="locationid" className="grey-text">Location</label>
                                                <input value={this.state.location} onChange={this.onChangeLocation}
                                                       type="text" id="emailid" className="form-control" name="location"
                                                       placeholder="Location"/>
                                                <div className="invalid-feedback">Please provide Location.</div>


                                            </MDBRow>
                                            <MDBRow>

                                                <label htmlFor="vegenameid" className="grey-text">Vegetable Name</label>
                                                <input onChange={this.onChangeVegetableName} type="text"
                                                       value={this.state.vegetableName} id="vegenameid"
                                                       className="form-control" name="vegename"
                                                       placeholder="Vegetable Name" required/>
                                                <div className="invalid-feedback">Please provide the Vegetable Name
                                                </div>


                                                <label htmlFor="amountid" className="grey-text">Amount</label>
                                                <input value={this.state.amount} onChange={this.onChangeAmount}
                                                       type="text" id="amountid" className="form-control" name="amount"
                                                       placeholder="Amount" required/>

                                                <div className="invalid-feedback">Please provide amount of vegetable in
                                                    g/Kg s.
                                                </div>


                                                <label htmlFor="startdateid" className="grey-text">Start Date</label>
                                                <input onChange={this.onChangeStartDate} type="date"
                                                       value={this.state.startDate} id="startdateid"
                                                       className="form-control" name="startdate"
                                                       placeholder="Start Date" required/>
                                                <div className="invalid-feedback">Please provide the Starting Date</div>

                                                <label htmlFor="enddateid" className="grey-text">End Date</label>
                                                <input onChange={this.onChangeEndDate} type="date"
                                                       value={this.state.endDate} id="enddateid"
                                                       className="form-control" name="enddate" placeholder="End Date"
                                                       required/>
                                                <div className="invalid-feedback">Please provide the Ending Date</div>


                                            </MDBRow>
                                            <br></br>
                                            <MDBBtn gradient="blue" rounded className="btn-block z-depth-1a"
                                                    type="submit">
                                                REGISTER
                                            </MDBBtn>
                                        </form>
                                    </MDBCardBody>
                                </MDBCard>
                            </div>

                        </MDBContainer>
                    </MDBCol>

                    <MDBCol>
                        <div>
                            <MDBContainer>
                                <div>
                                    <div>
                                        <MDBCol size="15"><br/>
                                            <MDBCard className="card mx-auto" style={{backgroundColor: '#CCFF90'}}>
                                                <MDBCardBody>

                                                    <MDBTable responsive>
                                                        <MDBTableHead color="white darken-3" textBlack>
                                                            <tr>
                                                                <th>Seller' Name</th>
                                                                <th>Phone</th>
                                                                <th>Location</th>
                                                                <th>Vegetable Name</th>
                                                                <th>Amount</th>
                                                                <th>Start Date</th>
                                                                <th>End Date</th>

                                                            </tr>

                                                        </MDBTableHead>
                                                        {
                                                            this.state.vegList.length === 0 ?
                                                                <tr >
                                                                    <td colSpan="12" style={{textAlign : "center", fontWeight: "bold"}}>
                                                                        <MDBAlert color="danger" >
                                                                            No Vegetables
                                                                        </MDBAlert>
                                                                    </td>
                                                                </tr> :
                                                                this.state.vegList.map(veg => {
                                                                    return(
                                                                        <MDBTableBody>
                                                                            <tr>
                                                                                <td>{veg.sellerName} </td>
                                                                                <td>{veg.phoneNumber}</td>
                                                                                <td> {veg.location}</td>
                                                                                <td> {veg.vegetableName}</td>
                                                                                <td>{veg.amount}</td>
                                                                                <td>{veg.startDate}</td>
                                                                                <td>{veg.endDate}</td>

                                                                            </tr>
                                                                        </MDBTableBody>
                                                                    )
                                                                })}
                                                    </MDBTable>

                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    </div>
                                </div>
                            </MDBContainer>
                        </div>
                    </MDBCol>
                </MDBRow>

            </div>
        );
    }
}

AddVegetables.propTypes = {};

export default AddVegetables;