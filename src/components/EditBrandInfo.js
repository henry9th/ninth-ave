import React from 'react';
import ImageUploader from 'react-images-upload';
import { FaEdit } from 'react-icons/fa';


class EditBrandInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sellerId: this.props.sellerId,
            seller: null,
            newSellerLogo: [],
            newSellerBio: "",
            image: null,
            errorMessage: "",
            pageState: 0 // 0 for no editing, 1 for bio editing, 2 for logo editing
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/seller/id/' + this.state.sellerId)
            .then(response => {
                return response.json();
            })
            .then(sellerResult => {
                if (!sellerResult.error) {
                    console.log(JSON.stringify(sellerResult));
                    this.setState({ seller: sellerResult, newSellerBio: sellerResult.bio })
                } else {
                    console.log(JSON.stringify(sellerResult));
                }
            });
    }

    onDrop = (image) => { 
        if (image.length !== 1) { 
            this.setState({errorMessage: "Please upload one image"});
            return;
        }

        this.setState({
            image: image[0],
        });
    }

    updateBrandImage = async () => { 
        const data = new FormData();

        var imageData = new File([this.state.image], this.state.seller.name, { type: this.state.image.type });

        data.append("file", imageData);
        data.append("sellerName", this.state.seller.name);

        await fetch('http://localhost:3001/updateBrandImage', { 
            method: "POST",
            body: data
        })
        .then(response => {
            return response.json();
        })
        .then(result => {
            if (!result.error) {
                // successfuly logged in 
                console.log(result);
                this.setState({pageState: 0});
            } else {
                // display error message
                //this.setState({ errorMessage: result.error });
            }
        });
    }


    updateBio = async () => {

        var data = {
            bio: this.state.newSellerBio,
            sellerId: this.state.sellerId
        }
        
        await fetch('http://localhost:3001/updateBio', { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json();
        })
        .then(result => {
            if (!result.error) {
                console.log(result);
                this.setState({seller: result, pageState: 0});
            } else {
                // display error message
                //this.setState({ errorMessage: result.error });
            }
        });
    }

    render() {
        return (
            
            <div id = "edit-brand-main"> 
                { this.state.seller !== null ? 


                <div>
                    <h3> Edit Brand Information </h3>
                    <label>
                        Name: 
                    </label> {this.state.seller.name} <br/> <br/>
                    
                    <label>
                        Bio: 
                    </label>

                    {this.state.pageState === 1 ? 
                    <div className="edit-bio">
                        <br/>
                        <textarea cols={50} rows={8} value={this.state.newSellerBio} onChange={(e)=>this.setState({newSellerBio: e.target.value})}className="bio-textarea" type="textarea" />
                        <br/>
                        <input type="button" value="Update" className="mini-submit" onClick={this.updateBio} /><br/> <br/>
                    </div> 
                    : 

                    <div className="bio-display">
                        <FaEdit className="edit-icon" onClick={()=>this.setState({ pageState: 1, newSellerBio: this.state.seller.bio})}/> <br/> 

                        <p> {this.state.seller.bio} </p> 
                        <br/>
                    </div>  
                    } 
                        
                
                    <label>
                        Logo: 
                    </label> <FaEdit className="edit-icon" onClick={()=>this.setState({ pageState: 2})}/> <br/> 

                    {this.state.pageState ===2 ? 
                        <div className="edit-image">
                            <ImageUploader
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.png']}
                                maxFileSize={5242880}
                                withPreview={true}
                            />
                            <input type="button" value="Update" className="mini-submit" onClick={this.updateBrandImage} /><br/> <br/>
                        </div>
                        : 

                        <img className="seller-logo-image" alt={this.state.seller.name + " logo"} src={"/images/" + this.state.seller.name.replace(" ", "_") + "/logo.jpg"} />

                    }

                    <p className="error-message"> {this.state.errorMessage} </p>

                </div>

                : 

                 <p> No seller information to show </p> }

            </div>

        );
    }
}     

export default EditBrandInfo;    