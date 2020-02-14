import React from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sellers: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/seller')
            .then(response => {
                return response.json();
            })
            .then(sellerResult => {
                if (!sellerResult.error) {
                    console.log(JSON.stringify(sellerResult));
                    this.setState({ sellers: sellerResult })
                } else {
                    console.log(JSON.stringify(sellerResult.error));
                }
            });
    }

    handleSellerClick = (seller) => {
        this.props.history.push({
            pathname: "/s/" + seller.name,
            state: { sellerId: seller._id }
        });
    }

    render() {
        return (
            <Navbar bg="gray" expand="lg">
                <Navbar.Brand href="/">Beta Website</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Collection" id="basic-nav-dropdown">
                            {this.state.sellers.map((seller, index) => {
                                    return <NavDropdown.Item key={index} onClick={()=>this.handleSellerClick(seller)}>{seller.name}</NavDropdown.Item>
                                }
                            )}
                        </NavDropdown>
                                
                        <Nav.Link href="/webmag"> Web Mag </Nav.Link>
                        <Nav.Link href="/owners"> Owners </Nav.Link>
                        <Nav.Link href="/cart"> Cart </Nav.Link>

                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;