import React from "react";
import axios from "axios";
class UserPostedHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userHomes: []
    }
    this.getUserHomes = this.getUserHomes.bind(this);
  }

  componentDidMount(){
    this.getUserHomes();
  }

  getUserHomes() {  
    console.log(this.props.user)
    axios.get(`/api/userHomes/${this.props.user[0].firstName}`).then(({ data }) => {
      this.setState({
        userHomes: data
      });
     console.log(this.state.userHomes)
      this.props.changeView("myposts");
    });  
  }

  deleteHome(event) {
    var index = event.target.id;
    axios
      .delete(`/api/homes/${this.state.homes[index]._id}`)
      .then(({ data }) => {
        this.state.homes.splice(index, 1);
        let newHomes = this.state.homes;
        this.setState({
          homes: newHomes
        });
      });
  }

  render() {
    return(
      <div>
        {this.state.userHomes.map((home,index)=>
        <div key={index}>
        <img src={home.image} />
        <h2>Apartment for Sale at {home.location}</h2>
        <h2>Categroy: {home.category}</h2>
        <h4>Description: {home.description}</h4>
        <h4>Price: {home.price}$</h4>
        <h4>Contact Information: {home.contactInformation}</h4>
        <br></br>
        <button type="submit">Delete</button>
        <br></br>
        <button type="submit">Update</button>
        </div>
        )}
      </div>
    )
  }
}

  // }else if(props.state.v === "update"){
  //   return (
  //     <div>
  //     <label>Image:</label>
  //     <br></br>
  //     <input placeholder="image" id="image" />
  //     <br></br>
  //     <labe>Description:</labe>
  //     <br></br>
  //     <input placeholder="description" id="description" />
  //     <br></br>
  //     <labe>Location:</labe>
  //     <br></br>
  //     <input placeholder="location" id="location" />
  //     <br></br>
  //     <labe>Categroy:</labe>
  //     <br></br>
  //     <input placeholder="category" id="category" />
  //     <br></br>
  //     <labe>Contact Information:</labe>
  //     <br></br>
  //     <input placeholder="contactInformation" id="contactInformation" />
  //     <br></br>
  //     <labe>Price:</labe>
  //     <br></br>
  //     <input placeholder="price" id="price" />
  //     <br></br>
  //     <button type="submit">Delete</button>
  //     <br></br>
  //     <button type="submit">Update</button>
  //     </div>
  //   )
  // }


export default UserPostedHome;