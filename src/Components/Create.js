import React from "react";
import firebase from "./firebaseConfig";

export default class Create extends React.Component{
    constructor(){
        super();
        this.state = {
            fname: "",
            sname: "",
            email: "",
            error: ""
        }
    }

    savePersonalDetails(event){
        var username = localStorage.getItem("username");
        var date = new Date();
        var fname = this.state.fname;
        var sname = this.state.sname;
        var email = this.state.email;
        localStorage.setItem("email",email);
        var session_id = localStorage.getItem("session_id");

        if(username & sname.length != 0 || fname.length != 0 || email.length != 0){
            firebase.database().ref("dt_users/"+username).update({
                fname: fname,
                sname: sname,
                email: email,
                user_session: session_id,
                updateDate: date,
            }).then(()=>{
                window.location.href = "/create2";
            });
        }else if(!username){
            window.location.href = "/";
        }else{
            this.setState({error: "Please fill in both fields..."});
        }
    }

    render(){
        return(
            <div className="app">
            <nav className="header">
                <h1 className="logotext">devtemple</h1>
            </nav>
            <br/>
            <div className="sell">
                <center>
                    <h2>Create Profile</h2>
                    <p className="sellcopy">
                        Finally! Create your DevTemple Profile.
                    </p>
                </center>
            </div>
            <div className="personal">
                <center>
            <h3>Personal Details</h3>
                <input type="text" onChange={(event)=>{this.setState({fname: event.target.value})}} placeholder="First Name" className="password"/><br/><br/>
                <input type="text" onChange={(event)=>{this.setState({sname: event.target.value})}} placeholder="Surname" className="password"/><br/><br/>
                <small>We only need this to send you relevant alerts and<br/>for account security purposes.</small><br/><br/>
                <input type="email" onChange={(event)=>{this.setState({email: event.target.value})}} placeholder="Email Address" className="password"/><br/><br/>

                <button className="createaccount" onClick={(event)=>{this.savePersonalDetails(event)}}>Dev Stack > </button>
                <br/><br/>
                <br/>
                <small className="errortext">{this.state.error}</small><br/>
                
                <small><b>1</b> of 3</small>
                
                </center>
            </div>

            </div>
        );
    }

}
