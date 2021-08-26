import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { logout } from '../actions/auth';
import axios from 'axios';

// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';

import $ from 'jquery';
import Popper from 'popper.js';
import { Dropdown } from 'react-bootstrap';
// import './navbar.css';


const Navbar = ({logout, isAuthenticated}) => {
    const [redirect,setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    }

    const guestLinks = () => (
        
        <>
            <Link to="/login" class="btn btn-light mr-2">Login</Link>          
            <Link to="/signup" class="btn btn-light mr-2">Sign Up</Link>
        </>
    );

    const authLinks = () => (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn btn-light mr-2">
                    My Account
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href='/profile'>My Profile</Dropdown.Item>
                    <Dropdown.Item href="/myuploads">My Uploads</Dropdown.Item>
                    <Dropdown.Item href="#">My Downloads</Dropdown.Item>
                    <Dropdown.Item href='/feedback'>Feedback</Dropdown.Item>
                    <Dropdown.Item href='#'>FAQs</Dropdown.Item>
                    <Dropdown.Item href='/contact'>Contact Us</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href='/' onClick={logout_user}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {/* <div class="btn-group">
  <button type="button" className="btn btn-light mr-2 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    My Account
  </button>
  <div className="dropdown-menu">
    <Link to="/profile" className="dropdown-item" >My Profile</Link>
    <Link className="dropdown-item" to="/uploads">My Uploads</Link>
    <a className="dropdown-item" href="#">My Downloads</a>
    <Link className="dropdown-item" to='/feedback'>Feedback</Link>
    <a className="dropdown-item" href="#">FAQs</a>
    <Link className="dropdown-item" to='/contact'>Contact Us</Link>
    <div className="dropdown-divider"></div>
    <a className="dropdown-item" onClick={logout_user} href='/'>Log Out</a>
  </div>
</div> */}
            <a href='/' class="btn btn-light mr-2" onClick={logout_user}>Logout</a>
        </>
    );

     

    if(redirect){
        window.alert("logout successful");
    }

    return(
        <>
            <div className="color">
                <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <a href="/"><h5>SlideR</h5></a>
                        <form className="d-flex">
                            <input className="form-control me-2 mr-1" type="search" placeholder="Search" aria-label="Search" size="70"/>
                            <button type="button" class="btn btn-dark">Search</button>
                        </form>
                        <div className="d-flex">
                        <Link to="/" class="btn btn-light mr-2">Home</Link>
                        {isAuthenticated ? authLinks() : guestLinks()}
                        </div>
                    </div>
                </nav>
                {redirect ? <Redirect to='/' /> : <> </>}
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout}) (Navbar);