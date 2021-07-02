import React from "react";
import firebase from "./firebaseConfig";

export default class Create2 extends React.Component{
    constructor(){
        super();
        this.state = {
            fname: "",
            sname: "",
            error: "",
            frameworks: 1,
            stack: []
        }
    }

    saveStack(event){
        var inputs = document.getElementsByTagName("input");
        var selects = document.getElementsByTagName("select");
        var stack = new Array();
        for(var i = 0; i < inputs.length; i++){
            var input = inputs[i];
            var select = selects[i];
            if(input.value == "" || select.selectedIndex == 0){
                //do nothing
            }else{
                var entry = {
                    lang: input.value,
                    matrix: select.value
                }
                stack.push(entry);
                this.setState({stack: stack}, ()=>{this.updateStack();});
                
            }
        }
    }

    updateStack(){
        var username = localStorage.getItem("username");
        if(username){
            console.log(this.state.stack)
            firebase.database().ref("dt_users/"+username).update({stack: this.state.stack}).then(()=>{
                window.location.href = "/create3";
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
        clone.getElementsByTagName("select")[0].selectedIndex = 0;
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
            <h3>Stack</h3>
            <div className="fieldsparent">
                <div className="inputbunch" id="ib">
                <input type="text" onChange={(event)=>{this.setState({fname: event.target.value})}} placeholder="Language / Framework" className="password"/><br/><br/>
                <select type="text" className="skillsmatrix">
                    <option value="">Skill Matrix</option>
                    <option value="0 - 20%">0 - 20%</option>
                    <option value="20 - 40%">20 - 40%</option>
                    <option value="40 - 60%">40 - 60%</option>
                    <option value="60 - 80%">60 - 80%</option>
                    <option value="80 - 100%">80 - 100%</option>
                </select><br/><br/>
                </div>
                </div>
                <br/>
                <button className="createaccount" onClick={(event)=>{this.saveStack(event)}}>Dev Links > </button>
                <br/><br/>
                <br/>
                <small className="errortext">{this.state.error}</small><br/>
                
                <small><b>2</b> of 3</small>
                </center>
            </div>
                <button className="add" onClick={()=>{this.addFields()}}>+</button>
                <button className="remove" onClick={()=>{this.delFields()}}>-</button>
            </div>
        );
    }

}
