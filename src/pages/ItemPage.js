import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./itemPage.css";
import { Dropdown, Button } from 'react-bootstrap';

class ItemPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.location.state.item,
            selectedSize: "Select a Size"
        }
    }

    componentDidMount() {
        // fetch items
    }

    handleSellerClick = () => {
        this.props.history.push({
            pathname: "/s/" + this.state.item.sellerName,
            state: { sellerId: this.state.item.sellerId }
        });
    }

    render() {
        return (
            <div>
                <div className="image-carousel">
                    <Carousel
                        className="carousel"
                        showStatus={false}
                        useKeyboardArrows={true}
                        showIndicators={false}>

                        {this.state.item.images.map(function (image, index) {
                            return <img src={require("../images/" + image)} className="item-image" />
                        })}
                    </Carousel>

                </div>
                <div className="item-information">
                    <p className="item-name"> {this.state.item.name} </p>
                    <p className="item-sellerName" onClick={this.handleSellerClick}> {this.state.item.sellerName} </p>
                    <p className="item-description"> {this.state.item.description} </p>

                    <Dropdown className="item-size-dropdown">
                        <Dropdown.Toggle variant="success" className="item-size-dropdown-toggle">
                            {this.state.selectedSize}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="item-size-dropdown-menu">

                            {Object.keys(this.state.item.availability).map((key, index) => {
                                if (this.state.item.availability[key] > 0) {
                                    return <Dropdown.Item onClick={()=> this.setState({ selectedSize: key })}> {key} </Dropdown.Item>
                                } else {
                                    return <Dropdown.Item disabled={true}> {key} </Dropdown.Item>
                                }
                            })
                            }
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button className="buy-button"> Buy </Button> 
                </div>
            </div>
        );
    }
}

export default ItemPage;