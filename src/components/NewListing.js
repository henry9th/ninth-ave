import React from 'react';
import ImageUploader from 'react-images-upload';

class NewListing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            errorMessage: "",
            images: []
        }
    }


    onDrop = (image) => { 

        this.setState({
            images: this.state.images.concat(image),
        });

    }

    render() {
        return (
            <div id = "new-listing-main"> 

                <form>
                    <h3> Create new listing </h3>
                    <div className="form-section"> 
                        <label>
                            Item name*: <br/>
                            <input type="text" name="item-name" value={this.state.name} onChange={(e)=>this.setState({name: e.target.value, errorMessage: ""})} />
                        </label> <br/>
                    </div>

                    <div className="form-section"> 
                        <label>
                            Item description*: <br/>
                            <input type="text" name="item-description" value={this.state.description} onChange={(e)=> this.setState({description: e.target.value, errorMessage: ""})}/>
                        </label><br/>
                    </div>
                
                    <div className="form-section"> 
                        <label>
                            Price (USD)*: <br/>
                            <input type="number" name="item-price" value={this.state.description} onChange={(e)=> this.setState({description: e.target.value, errorMessage: ""})}/>
                        </label><br/>
                    </div>
                

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

                    <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.png']}
                            maxFileSize={5242880}
                            withPreview={true}
                    />


                    <input type="button" value="Submit" className="main-button" onClick={this.submitSignin} /><br/>
                </form>

            </div>

        );
    }
}     

export default NewListing;    