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
                <img src={require("../images/" + this.state.item.images[0])} alt={this.state.item.name} className="mini-item-image" />
                <p className="mini-item-name">{this.state.item.name}</p>
                <p className="mini-item-brand">{this.state.item.brand}</p>
            </div>
        );
    }
}

export default Item;