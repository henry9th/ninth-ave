import React from 'react';
import './item.css';

class Item extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item,
        }
    }

    render() {
        return (
            <div className="item-div" onClick={() => this.props.onClick(this.state.item)}>
                <img src={"/images/" + encodeURI(this.state.item.images[0])} alt={this.state.item.name} className="mini-item-image" />
                <p className="mini-item-name">{this.state.item.name}</p>
                <p className="mini-item-sellerName">{this.state.item.sellerName}</p>
                <p className="mini-item-price">{this.state.item.price} USD</p>
            </div>
        );
    }
}     

export default Item;    