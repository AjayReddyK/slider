import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './home.css'
import Group from '../assets/img/Group.png'
import PostsApp from './PostsApp';
import { connect } from 'react-redux'; 

const Home = ({isAuthenticated}) => {

    const [redirect,setRedirect] = useState(false);

    const log_in = () => {
        setRedirect(true);
        console.log(redirect);
    }
    const guestLink = () => (
        <>
            <Link to="/postsapp" className="btn btn-dark mb-3 radius">Get Started</Link>        
        </>
    );

    const authLink = () => (
        <>
            <Link to="/login" className="btn btn-dark mb-3 radius" onClick={log_in}>Get Started</Link>        
        </>
    );
    return(
        <div className="container-fluid home">
            <div>
                    <h1 className="white text-left">Want to have great Slides for your projects</h1>
            </div>
                
            <div className="row">
                <div className="col-sm text-center">
                    <div className="box white">
                        <h5>We Deliver Great Slide Designs with Better content</h5>
                    </div>
                    <div class="btn-group-vertical box">
                        {isAuthenticated ? guestLink() : authLink()}
                        <Link to="/upload" className="btn btn-light radius">Upload Slides</Link>
                    </div>
                </div>
                <div className="col-sm person">
                    <img src={Group}/>
                </div>
            </div>
            {redirect ? <Redirect to='/login' /> : <> </>}
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);