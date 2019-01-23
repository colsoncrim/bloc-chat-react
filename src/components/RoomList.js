import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);


    this.state = {
      rooms: [],
    };

    this.roomsRef = this.props.firebase.database().ref('rooms')
  }


    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) })
     });
   }

    createRooms(newRoomName) {
      this.roomsRef.push({
        name: newRoomName
      });
    }

    handleChange(e) {
      this.setState({newRoomName: e.target.value});
    }


   render() {
     return (
      <React.Fragment>

        <div className="listOfRooms">
          {this.state.rooms.map((room, i) => (
            <a key={i} onClick={() => this.props.setActiveRoom(room)}>
            Room Name: {room.name}</a>
          ))}

        </div>

        <div className="form">
          <h2>Create New Room</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.createRooms(this.state.newRoomName);
              }}>
            <label for="roomName">Enter a room name</label>
            <input
              type="text"
              id="roomName"
              value={this.state.newRoomName}
              onChange={e => this.handleChange(e)}/>

            <input type="submit"/>
          </form>
        </div>

       <div className="App">
         <ul>
           {this.state.rooms.map((room, index) =>
           <li className="room" key= {index}> {room.name}
           </li>)
           }
         </ul>
       </div>
     </React.Fragment>
    )
   }
  }


export default RoomList;
