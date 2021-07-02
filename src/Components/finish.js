import React from "react";
import firebase from "./firebaseConfig.js";

export default class Finish extends React.Component{
    constructor(){
        super();
        this.state = {
            password: "",
            username: "",
            error: ""
        }
    }

    componentDidMount(){
        var username = localStorage.getItem("username");
        if(username){
            this.setState({username: username});
        }
    }

    saveAccount(event){
        event.target.setAttribute("disabled", "true");
        document.getElementsByClassName("password")[0].setAttribute("disabled", "true");
        var username = this.state.username;
        var password = this.state.password;
        if(password.length > 5){
            firebase.database().ref("dt_users/"+username).update({password: password}).then(()=>{
                this.createAuthAccount(username, password);
            });
        }else{
            event.target.removeAttribute("disabled");
            document.getElementsByClassName("password")[0].removeAttribute("disabled");
            this.setState({error: "Password must be at least 6 chars long..."});
            setTimeout(()=>{this.setState({error: ""})}, 4500)
        }
    }

    createAuthAccount(username, password){
        var email = username+"@devtempleusers.tech";
        localStorage.setItem("loggedIn","true");
        firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
            window.location.href = "/create";
        });   
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
                    <h2>Almost There!<br/><u><b>?</b>{this.state.username}</u></h2>
                    <p className="sellcopy">
                        Secure your username with a password.<br/>
                        <br/>This is the final step in the registration process.
                    </p>

                    <br/>
                    <h2>Create Password</h2>
                    <small>Minimum six (6) characters</small>
                    <br/><br/>
                    <input type="password" id="password" onFocus={()=>{this.setState({error: ""})}} className="password" onChange={(event)=>{this.setState({password: event.target.value})}} placeholder="Password"/>
                    <br/>
                    <button className="createaccount" onClick={(event)=>{this.saveAccount(event)}}>Finish</button>

                    <br/><br/>
                    <small className="errortext">{this.state.error}</small>
                </center>
            </div>
        </div>

    );
    }
}
