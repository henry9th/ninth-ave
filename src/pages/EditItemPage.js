import React from 'react';
import ImageUploader from 'react-images-upload';
import "./editItemPage.css";


class EditItemPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemId: this.props.location.state.item.id,
            name: this.props.location.state.item.name,
            sellerName: this.props.location.state.item.sellerName,
            description: this.props.location.state.item.description,
            sellerId: this.props.location.state.sellerId,
            images: this.props.location.state.item.images,
            errorMessage: ""
        }

    }


    removeImage = (imageIndex) => { 
        if (this.state.images.length === 1) { 
            this.setState({images: []});

        } else { 
            this.setState({images: this.state.images.splice(imageIndex, 1)});
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


    render() {
        return (
            <div>

                <div className="item-information">

                    <input type="text" className="item-name-input" value={this.state.name} onChange={(e)=>this.setState({name: e.target.value, errorMessage: ""})} />

                    <p className="item-sellerName" > {this.state.sellerName} </p>

                    <textarea type="text" className="item-description-input" value={this.state.description} onChange={(e)=>this.setState({description: e.target.value, errorMessage: ""})} /> 

                    <div className="form-section"> 
                        <label>
                            Availability: <br/>
                        </label><br/>
                        <ul>XXS <input className="size-input" type="number" /> </ul>
                        <ul>XS &nbsp;<input className="size-input" type="number" /> </ul>
                        <ul>S &nbsp;&nbsp;<input className="size-input" type="number" /> </ul>
                        <ul>M &nbsp;&nbsp;<input className="size-input" type="number" /> </ul>
                        <ul>L &nbsp;&nbsp;<input className="size-input" type="number" /> </ul>
                        <ul>XL &nbsp;<input className="size-input" type="number" /> </ul>
                        <ul>XXL <input className="size-input" type="number" /> </ul>
                    </div>

                </div>


                <div className="item-images-section"> 

                    {this.state.images.map((image, index) => {
                        return <img key={index} alt={image} onClick={()=>this.removeImage(index)} src={"/images/" + image} className="item-image" />
                    })}

                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.png']}
                        maxFileSize={5242880}
                        withPreview={true}
                    />


                </div>


                <input type="button" value="Save" className="main-button"  /><br/>
            </div>
        );
    }
}

export default EditItemPage;