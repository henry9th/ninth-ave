import React from 'react';

class EditItemPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item,
            sellerId: this.props.sellerId
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
             

             
            </div>
        );
    }
}

export default EditItemPage;