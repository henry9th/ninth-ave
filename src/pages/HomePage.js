import React from 'react';
import Item from '../components/Item';
import { Carousel } from 'react-responsive-carousel';
import "./homePage.css"

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/item')
            .then(response => {
                return response.json();
            })
            .then(itemResult => {
                if (!itemResult.error) {
                    console.log(JSON.stringify(itemResult));
                    this.setState({ items: itemResult })
                } else {
                    console.log(JSON.stringify(itemResult));
                }
            });
    }

    handleClick = (item) => { 
        this.props.history.push({
            pathname: "/i/" + item.sellerName + "/" + item.name, 
            state: { item: item }
        });
    }

    render() {
        return (
            <div>
                <div className="main-display">
                    <Carousel
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop={true}
                        autoPlay={true}
                    >
                        <div>
                            <img className="carouselImage" alt="" src="/images/web_images/background.jpg" />
                        </div>
                        <div>
                        <img className="carouselImage" alt="" src="/images/web_images/background.jpg" />
                        </div>
                        <div>
                        <img className="carouselImage" alt="" src="/images/web_images/background.jpg" />
                        </div>
                    </Carousel>
                </div>

                <div className="items-display">
                    <h1 className="item-display-title">Featured Items</h1>

                    {this.state.items != null && this.state.items.length > 0 ?
                        this.state.items.map((item, index) =>
                            <Item key={index} item={item} onClick={this.handleClick} />
                        )
                        :
                        <p>Oops. Looks like there are no items currently.</p>
                    }
                </div>
            </div>
        );
    }
}

export default HomePage;