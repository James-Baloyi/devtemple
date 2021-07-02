import React from "react";
import firebase from "./firebaseConfig";

export default class Projects extends React.Component{
    constructor(){
        super();
        this.state = {
            fname: "",
            sname: "",
            error: "",
            frameworks: 1,
            links: []
        }
    }

    saveLinks(event){
        var links = document.getElementsByClassName("password");
        var titles = document.getElementsByClassName("password1");
        var linkArray = new Array();
        for(var i = 0; i < links.length; i++){
            console.log(links);
            if(links[0].value.length == 0 || titles[0].value.length == 0){
                alert("Fill in all fields...");
                break;
            }else{
                var thisEntry = {
                    link: links[i].value,
                    title: titles[i].value
                }
                linkArray.push(thisEntry);
                this.setState({links: linkArray}, ()=>{this.updateLinks();});
                
            }
        }
    }

    updateLinks(){
        var username = localStorage.getItem("username");
        if(username){
            firebase.database().ref("dt_users/"+username).update({projects: this.state.links}).then(()=>{
                window.location.href = "/u?"+username;
            });
        }else{
            window.location.href = "/";
        }
    }

    delFields(){
      var fields = document.getElementsByClassName("inputbunch").length;
      if(fields == 1){
          //do nothing
      }else if(fields > 1){
        var last = document.getElementsByClassName("inputbunch")[fields - 1];
        last.setAttribute("hidden","true");
        var lastParent = last.parentElement;
        lastParent.removeChild(last);
      }
    }

    addFields(){
        var currentFrameworks = this.state.frameworks;
        this.setState({frameworks: currentFrameworks + 1});
        var fields = document.getElementById("ib");
        var clone = fields.cloneNode(true);
        clone.getElementsByTagName("input")[0].value = "";
        clone.getElementsByTagName("input")[1].value = "";
        document.getElementsByClassName("fieldsparent")[0].appendChild(clone);

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
                </center>
            </div>
            <div className="personal">
                <center>
            <h3>Links to your Projects</h3>
            <div className="fieldsparent">
                <div className="inputbunch" id="ib">
                <input type="url" onChange={(event)=>{this.setState({fname: event.target.value})}} placeholder="Link (projectstore.com)" className="password"/><br/><br/>
                <input type="text" onChange={(event)=>{this.setState({fname: event.target.value})}} placeholder="Link Title (Online Store)" className="password1"/><br/><br/>
                </div>
                </div>
                <br/>
                <button className="createaccount" onClick={(event)=>{this.saveLinks(event)}}>View Profile > </button>
                <br/><br/>
                <br/>
                <small className="errortext">{this.state.error}</small><br/>
                
                <small><b>4</b> of 4</small>
                </center>
            </div>
                <button className="add" onClick={()=>{this.addFields()}}>+</button>
                <button className="remove" onClick={()=>{this.delFields()}}>-</button>
            </div>
        );
    }

}
