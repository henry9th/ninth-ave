import React from 'react';
import "./webMagPage.css";

class WebMagPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }


    render() {
        return (
            <div>
                <h2 className="message-placeholder"> Coming Soon </h2>
            </div>
        );
    }
}

export default WebMagPage;