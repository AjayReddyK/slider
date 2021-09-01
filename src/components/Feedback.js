import React from 'react';
import axios from 'axios';
import ContactImg from '../assets/img/undraw-contact.svg'

class Feedback extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    }
  }

  handleSubmit(e){
    e.preventDefault();
    axios({
      method: "POST",
      url:"http://localhost:8000/feedback/",
      data:  this.state,
      headers:{'Authorization': `JWT ${localStorage.getItem('access')}`}
    }).then((response)=>{
      if (response.data) {
        alert("Message Sent.");
        this.resetForm()
      } 
      else{
        alert("Message failed to send.")
      }
    })
  }

  resetForm(){
    this.setState({name: '', email: '', message: ''})
  }

  render() {
    return(
        <>
        <div class="content">    
            {/* <h4 className="p-2 mr-3 tt text-center">Feedback</h4> */}
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-10">          
                        <div class="row justify-content-center">
                            <div class="col-md-6">              
                                <h3 class="heading mb-4">
                                    Help Us Improve
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas debitis, fugit natus?
                                </p>
                                <p>
                                    <img src={ContactImg} alt="Image" class="img-fluid"/>
                                </p>
                            </div>
                            <div class="col-md-6">              
                                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                                    {/* <div class="row">
                                        <div class="col-md-12 form-group">
                                            <input type="text" class="form-control" name="name" id="name" placeholder="Your Name" value={this.state.name} onChange={this.onNameChange.bind(this)}/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 form-group">
                                            <input type="email" class="form-control" name="email" placeholder="Your Email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)}/>
                                        </div>
                                    </div> */}
                                            
                                    <div class="row">
                                        <div class="col-md-12 form-group">
                                            <textarea class="form-control" name="message" id="Message" cols="30" rows="7" placeholder="Write your message" value={this.state.message} onChange={this.onMessageChange.bind(this)}/>
                                        </div>
                                    </div>  
                                    <div class="row">
                                        <div class="col-12">
                                            <button type="submit" className="btn btn-light">Submit</button>
                                        </div>
                                    </div>
                                </form>              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    //       {/* <div className="App">
    //     <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
    //       <div className="form-group">
    //           <label htmlFor="name">Name</label>
    //           <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
    //       </div>
    //       <div className="form-group">
    //           <label htmlFor="exampleInputEmail1">Email address</label>
    //           <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
    //       </div>
    //       <div className="form-group">
    //           <label htmlFor="message">Message</label>
    //           <textarea className="form-control" rows="5" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
    //       </div>
    //       <button type="submit" className="btn btn-primary">Submit</button>
    //     </form>
    //   </div> */}
    );
  } 
  onNameChange(event) {
	  this.setState({name: event.target.value})
  }

  onEmailChange(event) {
	  this.setState({email: event.target.value})
  }

  onMessageChange(event) {
	  this.setState({message: event.target.value})
  }
}

export default Feedback;