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
          <ul>
            {this.state.rooms.map((room, i) => (
              <a key={i} onClick={() => this.props.setActiveRoom(room)}>
              <li>{room.name}</li></a>
            ))}
          </ul>
        </div>
        <div className="form">
            <form
              onSubmit={e => {
                e.preventDefault();
                this.createRooms(this.state.newRoomName);
              }}>
            <label htmlFor="roomName">Create New Room</label>
            <input
              type="text"
              id="roomName"
              value={this.state.newRoomName}
              onChange={e => this.handleChange(e)}/>

              <div className="wrapOne">
                <input type="submit" id="submitButton"/>
              </div>
          </form>
        </div>

     </React.Fragment>
    )
   }
  }


export default RoomList;
