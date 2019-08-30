import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Dropdown } from 'react-bootstrap';

class SellerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seller: null
        }
    }

    componentWillMount() { 
        fetch('http://localhost:3001/seller/id/' + this.props.location.state.sellerId)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            if (!result.error) { 
                this.setState({ seller: result })
            } else {
                console.log(JSON.stringify(result));
            }
        });
    }

    componentDidMount() {
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

                        {/* {this.state.item.images.map(function(image, index) {
                            return <img src={require("../images/" + image)} className="item-image" />   
                        })} */}
                    </Carousel>

                </div>
                <div className="seller-information">
                   {this.state.seller}
                </div>
            </div>
        );
    }
}

export default SellerPage;