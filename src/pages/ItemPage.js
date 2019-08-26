import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./itemPage.css";
import { Dropdown } from 'react-bootstrap';

class ItemPage extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props.item);

        this.state = {
            item: this.props.location.state.item
        }
    }

    componentDidMount() {
        // fetch items
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

                        {this.state.item.images.map(function(image, index) {
                            return <img src={require("../images/" + image)} className="item-image" />   
                        })}
                    </Carousel>

                </div>
                <div className="item-information">
                    <p className="item-name"> {this.state.item.name} </p>
                    <p className="item-brand"> {this.state.item.brand} </p>
                    <p className="item-description"> {this.state.item.description} </p>

                    <Dropdown className="item-size">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Select a Size
                        </Dropdown.Toggle>

                        <Dropdown.Menu>

                        {/* {this.state.item.availability.map(function(size, index) {
                            return <Dropdown.Item> {size} </Dropdown.Item>
                        })} */}

                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

export default ItemPage;