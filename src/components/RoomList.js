import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [Room 1, Room 2, Room 3],
    };
  }

   render() {
     return (
       <section className="roomList">
          <div className="sideNav">
            <a href="#">Room 1</a>
            <a href="#">Room 2</a>
            <a href="#">Room 3</a>
         </div>
       </section>
     )
    }
  }


export default RoomList;
