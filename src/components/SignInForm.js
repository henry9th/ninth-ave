import React from 'react';
var bcrypt = require('bcryptjs');

class SignInForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            accessCode: "",
            formState: 0 // 0 for signin and 1 for signup
        }
    }

    handleFormChange = () => { 
        if (this.state.formState === 0) {
            this.setState({username: "", password: "", confirmPassword: "", formState: 1});
        } else { 
            this.setState({username: "", password: "", confirmPassword: "", formState: 0});
        }
    }

    submitSignin = async () => {

        if (this.state.username.length < 4 || this.state.password === "") { 
            // display error message 
            return; 
        }

        var data = {
            username: this.state.username,
            password: this.state.password
        }
        
        await fetch('http://localhost:3001/signin', { 
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
                // successfuly logged in 
                this.props.signinSeller(result.sellerId, result.username);

            } else {
                // display error message
                this.setState({ errorMessage: result.error });
            }
        });
    }

    submitInitAccount = async () => { 

        if (this.state.password === "" || this.state.password !== this.state.confirmPassword || this.state.accessCode === "" || this.state.username.length < 4) { 
            // display error message 
            return; 
        }

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(this.state.password, salt);
        
        var data = {
            username: this.state.username,
            accessCode: this.state.accessCode,
            password: hash,
            errorMessage: "" 
        }
        
        await fetch('http://localhost:3001/register', { 
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
                // successfuly logged in 
                this.props.signinSeller(result.sellerId, result.username);

            } else {
                // display error message
                this.setState({ errorMessage: result.error });
            }
        });
    }

    render() {
        return (
            <div id = "auth-main"> 

            <div id="auth-form">
                
                {this.state.formState === 0 ? 
                    <form>
                        <h3> Sign In </h3>
                        <label>
                            Username: <br/>
                            <input type="text" name="username" value={this.state.username} onChange={(e)=>this.setState({username: e.target.value, errorMessage: ""})} />
                        </label> <br/>
                        <label>
                            Password: <br/>
                            <input type="password" name="password" value={this.state.password} onChange={(e)=> this.setState({password: e.target.value, errorMessage: ""})}/>
                        </label><br/>
                    
                        <input type="button" value="Submit" className="main-button" onClick={this.submitSignin} /><br/>
                        <input type="button" value="Initialize an account" className="alt-button" onClick={this.handleFormChange} />

                    </form>

                    : 

                    <form>
                        <h3> Init Account </h3>
                        <label>
                            Username: <br/>
                            <input type="text" name="username" value={this.state.username} onChange={(e)=>this.setState({username: e.target.value, errorMessage: ""})}/>
                        </label> <br/>
                        <label>
                            Password: <br/>
                            <input type="password" name="password" value={this.state.password} onChange={(e)=>this.setState({password: e.target.value, errorMessage: ""})}/>
                        </label> <br/>
                        <label>
                            Confirm Password: <br/>
                            <input type="password" name="confirm password" value={this.state.confirmPassword} onChange={(e)=>this.setState({confirmPassword: e.target.value, errorMessage: ""})}/>
                        </label> <br/>
                        <label>
                            Access Code: <br/>
                            <input type="text" name="access code" value={this.state.accessCode} onChange={(e)=>this.setState({accessCode: e.target.value, errorMessage: ""})} />
                        </label> <br/>

                        <input type="button" value="Submit" className="main-button" onClick={this.submitInitAccount} /> <br/>
                        <input type="button" value="Sign In" className="alt-button" onClick={this.handleFormChange} />

                    </form>
                }

                <p> { this.state.errorMessage } </p>

            </div>

                <div id="background-image" />

            </div>
        );
    }
}     

export default SignInForm;    