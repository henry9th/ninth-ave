import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./sellerPage.css";
import { Button } from 'react-bootstrap';
import Item from '../components/Item';

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
        fetch('http://localhost:3001/seller/id/' + this.props.location.state.sellerId)
            .then(response => {
                return response.json();
            })
            .then(sellerResult => {
                if (!sellerResult.error) {
                    fetch('http://localhost:3001/item/seller/' + this.props.location.state.sellerId)
                        .then(response => {
                            return response.json();
                        }).then(itemResult => {
                            if (!itemResult.error) {
                                this.setState({ sellerName: sellerResult.name, sellerBio: sellerResult.bio, items: itemResult })
                            } else {
                                console.log(JSON.stringify(itemResult));
                            }
                        })
                } else {
                    console.log(sellerResult.error);
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
                    {this.state.sellerName !== "" ?
                        <div>
                            <img className="seller-logo-image" alt={this.state.sellerName + " logo"} src={"/images/" + this.state.sellerName.replace(" ", "_") + "/logo.jpg"} />
                            <p className="seller-name"> {this.state.sellerName} </p> </div>
                        :
                        null
                    }

                    {this.state.pageState === 0 ?
                        <div className="collection-view">
                            <p className="seller-bio"> {this.state.sellerBio} </p>
                            {this.state.items != null && this.state.items.length > 0 ?
                                this.state.items.map((item, index) =>
                                    <Item key={index} item={item} onClick={this.handleClick} />
                                )
                                :
                                <p>Oops. Looks like there's no items currently.</p>
                            }
                        </div>
                        : null
                    }

                </div>
            </div>
        );
    }
}

export default SellerPage;