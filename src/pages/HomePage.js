import React from 'react';
import Item from '../components/Item';
import { Carousel } from 'react-responsive-carousel';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                {
                    name: "Sample shirt", 
                    sellerName: "Sample Brand",
                    sellerId: "5d67f8a68491154fd0614a8e",
                    images: ["Sample_Brand/sampleshirt.jpg","Sample_Brand/sampleshirt.jpg","Sample_Brand/sampleshirt.jpg"],
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed neque erat. Fusce id quam justo. Suspendisse pharetra dui sem, id sollicitudin lorem gravida nec. Proin nisl dolor, rhoncus interdum ultrices sit amet, vestibulum sit amet lacus. Nullam quis nibh sit amet odio imperdiet hendrerit. Sed finibus, elit sed porttitor tincidunt, risus velit fermentum dui, nec tristique turpis ligula id nunc. Curabitur eleifend purus iaculis ligula pulvinar, id congue massa pharetra. Aliquam vel dui ullamcorper, mattis metus eu, maximus massa. Curabitur ex turpis, vehicula ultricies quam et, tristique luctus urna. Nulla dapibus, nunc et fermentum rutrum, libero dolor rhoncus ante, sit amet rutrum justo turpis in sem. Sed sed ultricies leo. Mauris in sollicitudin dui. Mauris sapien nulla, sollicitudin sed nibh vitae, ultrices mattis nunc. Suspendisse auctor quam et quam faucibus, at laoreet elit gravida. Praesent venenatis molestie tellus, ac molestie ante placerat vitae.",
                    availability: {
                        "S": 1,
                        "M": 3,
                        "L": 5, 
                        "XL": 6
                    }
                },
                {
                    name: "Sample shirt 2", 
                    sellerName: "Sample brand",
                    sellerId: "5d67f8a68491154fd0614a8e",
                    images: ["Sample_Brand/sampleshirt.jpg","Sample_Brand/sampleshirt.jpg","Sample_Brand/sampleshirt.jpg"],
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed neque erat. Fusce id quam justo. Suspendisse pharetra dui sem, id sollicitudin lorem gravida nec. Proin nisl dolor, rhoncus interdum ultrices sit amet, vestibulum sit amet lacus. Nullam quis nibh sit amet odio imperdiet hendrerit. Sed finibus, elit sed porttitor tincidunt, risus velit fermentum dui, nec tristique turpis ligula id nunc. Curabitur eleifend purus iaculis ligula pulvinar, id congue massa pharetra. Aliquam vel dui ullamcorper, mattis metus eu, maximus massa. Curabitur ex turpis, vehicula ultricies quam et, tristique luctus urna. Nulla dapibus, nunc et fermentum rutrum, libero dolor rhoncus ante, sit amet rutrum justo turpis in sem. Sed sed ultricies leo. Mauris in sollicitudin dui. Mauris sapien nulla, sollicitudin sed nibh vitae, ultrices mattis nunc. Suspendisse auctor quam et quam faucibus, at laoreet elit gravida. Praesent venenatis molestie tellus, ac molestie ante placerat vitae.",
                    availability: {
                        "S": 1,
                        "M": 3,
                        "L": 5, 
                        "XL": 6
                    }
                },
                {
                    name: "Sample shirt 3", 
                    sellerName: "Sample brand",
                    sellerId: "5d67f8a68491154fd0614a8e",
                    images: ["Sample_Brand/sampleshirt.jpg","Sample_Brand/sampleshirt.jpg","Sample_Brand/sampleshirt.jpg"],
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed neque erat. Fusce id quam justo. Suspendisse pharetra dui sem, id sollicitudin lorem gravida nec. Proin nisl dolor, rhoncus interdum ultrices sit amet, vestibulum sit amet lacus. Nullam quis nibh sit amet odio imperdiet hendrerit. Sed finibus, elit sed porttitor tincidunt, risus velit fermentum dui, nec tristique turpis ligula id nunc. Curabitur eleifend purus iaculis ligula pulvinar, id congue massa pharetra. Aliquam vel dui ullamcorper, mattis metus eu, maximus massa. Curabitur ex turpis, vehicula ultricies quam et, tristique luctus urna. Nulla dapibus, nunc et fermentum rutrum, libero dolor rhoncus ante, sit amet rutrum justo turpis in sem. Sed sed ultricies leo. Mauris in sollicitudin dui. Mauris sapien nulla, sollicitudin sed nibh vitae, ultrices mattis nunc. Suspendisse auctor quam et quam faucibus, at laoreet elit gravida. Praesent venenatis molestie tellus, ac molestie ante placerat vitae.",
                    availability: {
                        "S": 1,
                        "M": 3,
                        "L": 5, 
                        "XL": 6
                    }
                }
            ]
        }
    }

    componentDidMount() { 
        // fetch items
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
                    
                </div>

                <div className="items-display">
                    {this.state.items != null && this.state.items.length > 0 ?
                        this.state.items.map((item) =>
                            <Item item={item} onClick={this.handleClick} />
                        )
                        :
                        <p>Oops. Looks like there's no items currently.</p>
                    }
                </div>
            </div>
        );
    }
}

export default HomePage;