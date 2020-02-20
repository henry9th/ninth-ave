import React from 'react';
import Item from '../components/Item';
//import { Carousel } from 'react-responsive-carousel';

class ManageListings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sellerId: this.props.sellerId,
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/item/seller/' + this.state.sellerId)
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
            pathname: "/o/i/" + item._id, 
            state: { item: item, sellerId: this.state.sellerId }
        });
    }

    render() {
        return (
            <div>
                <div className="main-display">
                    
                </div>

                <div className="items-display">
                    {this.state.items != null && this.state.items.length > 0 ?
                        this.state.items.map((item, index) =>
                            <Item key={index} item={item} onClick={this.handleClick} />
                        )
                        :
                        <p>Looks like you have no items currently.</p>
                    }
                </div>
            </div>
        );
    }
}

export default ManageListings;