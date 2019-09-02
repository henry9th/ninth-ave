import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./sellerPage.css";
import { Button } from 'react-bootstrap';

class SellerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sellerName: "",
            sellerBio: "",
            sellerBrandImage: "",
            pageState: 0,
            items: []
        }

        // page state: 
        // 0: collection
        // 1: lookbook 
        // 2: shipping and returns
        // 3: Contact 
    }

    componentDidMount() {
        fetch('http://52.191.191.165:3001/seller/id/' + this.props.location.state.sellerId)
            .then(response => {
                return response.json();
            })
            .then(sellerResult => {
                if (!sellerResult.error) {
                    console.log(JSON.stringify(sellerResult));
                    
                    fetch('http://52.191.191.165:3001/item/id/' + this.props.location.state.sellerId)
                        .then(response => {
                            return response.json();
                        }).then(itemResult => {
                            if (!itemResult.error) { 
                                this.setState({ sellerName: sellerResult.name, sellerBio: sellerResult.bio, items: itemResult })
                                console.log(JSON.stringify(itemResult));
                            } else { 
                                console.log(JSON.stringify(itemResult));
                            }
                        })

                } else {
                    console.log(JSON.stringify(sellerResult));
                }
            });
    }

    render() {

        return (
            <div>
                <div className="sidebar"> 
                    <Button className="sidebar-button" onClick={() => this.setState({ pageState: 0 })}> Collection </Button>
                    <Button className="sidebar-button" onClick={() => this.setState({ pageState: 1 })}> Lookbook </Button>
                    <Button className="sidebar-button" onClick={() => this.setState({ pageState: 2 })}> Shipping and Returns </Button>
                    <Button className="sidebar-button" onClick={() => this.setState({ pageState: 3 })}> Contact </Button>
                </div>

                <div className="seller-main">
                    {this.state.sellerName != "" ?
                        <img src={require("../images/" + this.state.sellerName.replace(/ /g,"_") + "/logo.jpg")} className="seller-brand-image" />
                        :
                        null
                    }

                    {this.state.pageState == 0 ?
                        <div className="collection-view"> <p className="seller-name"> {this.state.sellerName} </p> <br/>
                        <p className="seller-bio"> {this.state.sellerBio} </p> </div>
                        : null
                    }
                    
                </div>
            </div>
        );
    }
}

export default SellerPage;