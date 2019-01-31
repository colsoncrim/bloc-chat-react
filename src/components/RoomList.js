import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);


    this.state = {
      rooms: [],
      newRoomName: ''
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
        <h2>Bloc Chat</h2>
          <ul>
            {this.state.rooms.map((room, i) => (
              <a key={i} onClick={() => this.props.setActiveRoom(room)}>
              <li>{room.name}</li></a>
            ))}
          </ul>

        </div>

        <div className="form">
          <h4>Create New Room</h4>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.createRooms(this.state.newRoomName);
              }}>
            <label htmlFor="roomName">Enter a room name</label>
            <input
              type="text"
              id="roomName"
              value={this.state.newRoomName}
              onChange={e => this.handleChange(e)}/>

            <input type="submit"/>
          </form>
        </div>

     </React.Fragment>
    )
   }
  }


export default RoomList;
