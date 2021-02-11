import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MDBAlert, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBInput, MDBRow,MDBFormInline,MDBIcon,
    MDBTable,MDBTableBody,MDBTableHead} from "mdbreact";

import constants from "../Constants/Constant";
import axios from "axios";
import AddVegetables from "../View/AddVegetables";
import View from "../View/View.css";
import {Redirect} from 'react-router-dom';

class OrganicHome extends Component {

    constructor(props) {
        super(props);


        this.state = {
            vegetables: [],
            referrer: null

        }

        this.getAllvegetables = this.getAllvegetables.bind(this);
        this.getAllvegetables();

    }

    // componentDidMount(){
    //     if(localStorage.getItem("UserLogged")!=="UserLogged"){
    //         this.props.history.push('/');
    //     }
    // }


    clickHandle = () => {
        console.log('Button is clicked');
        this.setState({referrer: '/AddVegetables'});
    }

    getAllvegetables() {
        axios.get(constants.backend_url + 'api/vegetable/getAllVegetables').then(response => {
            this.setState({vegetables: response.data});
            console.log("vegetable")
            console.log(response.data)
            console.log("vegetable")
        }).catch(function (error) {
            console.log(error);
        })
        console.log(this.state.vegetables);

    }


    render() {

        const availableVegetables  = this.state.vegetables;
        const {referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />;

        return (

            <div >

            <div>
                <div className="card Bimage" >
                    <img

                        // src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                        className="card-img-top"
                        // alt="..."
                    />
                    <div className="card-body">
                        <br/><br/><br/>
                        <h5 className="card-title display-4" style={{color:'#FFEA00'}}>ORGANIC FOOD IS BEST FOR YOU</h5>
                        <br/><br/>
                        <div>
                            <button type="button" className="btn btn-outline-warning" data-mdb-ripple-color="dark"  onClick={this.clickHandle}>
                                <b>ADD VEGETABLES</b>
                            </button>
                        </div><br/><br/>

                    </div>
                </div>
</div>
                <MDBRow>
                    <div>
                <MDBContainer>
                    <div>
                        <div align="center">
                            <MDBCol size="8"><br/>
                                <MDBCard style={{marginTop: 20, marginBottom: 50,backgroundColor:'#CCFF90'}}>
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
                                                availableVegetables.length === 0 ?
                                                    <tr >
                                                        <td colSpan="12" style={{textAlign : "center", fontWeight: "bold"}}>
                                                            <MDBAlert color="danger" >
                                                                No any Vegetables
                                                            </MDBAlert>
                                                        </td>
                                                    </tr> :
                                                    availableVegetables.map(veg => {

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
                </MDBContainer></div>
<br/><br/><br/><br/>
                <div style={{marginTop: 20, marginBottom: 50, marginLeft:50,marginRight:80}}>
                <div className="card Bimagee " style={{width: '10rem'}}>

                    <div className="card-body">
                        <p className="card-text" style={{fontColor:'#FFEA00'}}><b>
                            Spinach - One cup(30 grams) of raw spinach provide 56% of your vitamin A.
                            Carrots - Carrots are packed with vitamin A.
                            Broccoli - A cup(91 grams) of raw broccoli provides 116% of your daily vitamin K.</b>
                        </p>
                    </div>
                </div><br/>
                </div>
                    <div style={{marginTop: 20, marginBottom: 50,}}>
                    <div className="card Bimagee " style={{width: '10rem'}}>

                        <div className="card-body">
                            <p className="card-text"><b>
                                Green Peas - One cup(160 grams of cooked green peas contain 9 grams of fiber.
                                Ginger - Ginger root is used as a spice in everything from vegetable dishes to desserts.</b>
                            </p>
                        </div>
                    </div>
                    </div>
                </MDBRow>
            </div>

        );
    }
}

OrganicHome.propTypes = {};

export default OrganicHome;