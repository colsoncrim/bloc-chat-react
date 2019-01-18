import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js'
import * as firebase from 'firebase';
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB4T4KiegibwZNifRfA6EBCrIw7BX8wu_8",
    authDomain: "bloc-chat-react-adbd3.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-adbd3.firebaseio.com",
    projectId: "bloc-chat-react-adbd3",
    storageBucket: "bloc-chat-react-adbd3.appspot.com",
    messagingSenderId: "371243056464"
  };
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <section className="roomList">
            <div className="sideNav">
              <ul>
                <li><a href="#">Room 1</a></li>
                <li><a href="#">Room 2</a></li>
                <li><a href="#">Room 3</a></li>
              </ul>
           </div>
         </section>
        </header>
        <RoomList firebase = {firebase} />
      </div>






    );
  }

}

export default App;
