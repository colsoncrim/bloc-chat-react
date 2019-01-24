import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js'
import MessageList from './components/MessageList.js'
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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "null",
      activeRoomId: ""
    };
  }

    setActiveRoom = (selectedRoom) => {
      console.log(selectedRoom.name)
      console.log(selectedRoom.key)
      this.setState({ activeRoom: selectedRoom.name });
      this.setState({ activeRoomId: selectedRoom.key });
      
    }

  render() {
    return (
      <div className="App">
        <div className="listOfRooms">Rooms</div>

        <div className="roomList">
          <RoomList
            setActiveRoom={this.setActiveRoom.bind(this)}
            firebase = {firebase} />
        </div>

        <div className="messageList">
          <MessageList
            activeRoom={this.state.activeRoom}
            activeRoomId={this.state.activeRoomId}
            firebase={firebase} />
        </div>
      </div>
    );
  }
}

export default App;
