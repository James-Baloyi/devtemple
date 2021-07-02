import React from "react";
import firebase from "./firebaseConfig.js";
import "../App.css";


export default class Home extends React.Component{
    constructor(){
        super();

        this.state = {
            username: "",
            error: ""
        }
    }

    componentDidMount(){
        var thisUrl = window.location.href;
        if(thisUrl.split("?")[1]){
            this.setState({username: thisUrl.split("?")[1]});
        }
        var loggedIn = localStorage.getItem("loggedIn");
        if(loggedIn){
            window.location.href = "/create";
        }
    }

    createAccount(event){
        event.target.setAttribute("disabled", "true");
        document.getElementsByClassName("username")[0].setAttribute("disabled", "true");
        var username = this.state.username;
            if(username.length > 3){
                console.log(username);
                firebase.database().ref("dt_users/"+username).once("value", data => {
                    var result = data.val();
                    if(result !== null){
                        
                        this.setState({error: username + " is already in use..."});
                        event.target.removeAttribute("disabled");
                        document.getElementsByClassName("username")[0].removeAttribute("disabled");
                        setTimeout(()=>{this.setState({error: ""})}, 4500);
                    }else{
                        localStorage.setItem("username",username);
                        var date = new Date();
                        firebase.database().ref("dt_users/"+username).push({
                            username: username,
                            date: date
                        }).then(()=>{
                            window.location.href = "/finish"
                        });
                    }
            });
           }else{
            this.setState({error: "Username is too short. Minimum 3 chars."});
            setTimeout(()=>{this.setState({error: ""})}, 4500);
            event.target.removeAttribute("disabled");
            document.getElementsByClassName("username")[0].removeAttribute("disabled");
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
                    <h2>The Ultimate Dev<br/>Profile</h2>
                    <p className="sellcopy">
                        Create your one developer profile and share it absolutely everywhere.
                        No more having to fiddle around hastily putting together a CV or a portfolio.
                    </p>
                </center>
            </div>
                <br/>
            <div className="reserveusername">

                <center>
                <h2>Create Your Profile</h2>
                <div className="usernameparent">
                    <p className="sellcopy">
                        Simply enter your unique <u><b>?</b>username</u> to get started.
                        </p>
                        <br/>
                    <button className="qmark">?</button>
                    <input type="text" className="username" onFocus={()=>{this.setState({error: ""})}} value={this.state.username} placeholder="username" onChange={(event)=>{this.setState({username: event.target.value})}} id="username"/>
                    <br/>
                    <br/>
                    <button className="createaccount" onClick={(event)=>{this.createAccount(event)}}>Create Profile</button>
                </div><br/>
                <small className="errortext">{this.state.error}</small>
                </center>
            </div>
            <br/>
            <center>
                <small><br/>
                    By creating an account, you agree to our <a href="">terms of use</a> and <a href="">privacy policy</a>
                </small>
            </center>
            </div>
        );
    }
}
