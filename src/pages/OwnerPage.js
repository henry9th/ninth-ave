import React from 'react';
import SignInForm from '../components/SignInForm';
import ls from 'local-storage';
import NewListing from '../components/NewListing';
import EditBrandInfo from '../components/EditBrandInfo';
import ManageListings from '../components/ManageListings';

import "./ownerPage.css";

class OwnerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ls.get("username"),
            sellerId: ls.get("sellerId"),
            pageState: 0 // 0 for manage listings, 1 for create new listing, 2 for edit brand information 
        }
    }

    signinSeller = (sellerId, username) => { 
        this.setState({ sellerId: sellerId, username: username });
        ls.set("sellerId", sellerId);
        ls.set("username", username);
    }


    render() {

        let pageElement;

        if (this.state.pageState === 0) { 
            pageElement = <ManageListings history={this.props.history} sellerId={this.state.sellerId} />

        } else if (this.state.pageState === 1) { 
            pageElement = <NewListing sellerId={this.state.sellerId}/>

        } else { 
            pageElement = <EditBrandInfo sellerId={this.state.sellerId} /> 

        }

        return (
            <div className="main">
                  {this.state.sellerId !== "" && this.state.sellerId !== null && this.state.sellerId !== undefined ? 
                        
                        <div id="owner-portal"> 
                            
                            <p id="welcome-message"> Welcome {this.state.username} </p> 

                            <button className="menu-button" onClick={()=>this.setState({pageState: 0})}> Manage listings </button>
                            
                            <button className="menu-button" onClick={()=>this.setState({pageState: 1})}> Create new listing </button>

                            <button className="menu-button" onClick={()=>this.setState({pageState: 2})}> Edit brand information </button>

                            <div className="page-component"> { pageElement } </div>

                        </div>   



                        : <SignInForm signinSeller={this.signinSeller}/>
                    }
            </div>
        );
    }
}

export default OwnerPage;