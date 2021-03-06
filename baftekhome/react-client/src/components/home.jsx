import React from "react";
import HomeDetail from "./HomeDetails.jsx";
import HomeList from "./homeList.jsx";
import PostHome from "./PostHome.jsx";
import axios from "axios";
import LogIn from "./login.jsx";
import SignUp from "./signUp.jsx";
import UserPostedHome from "./UserPostedHome.jsx";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      images: [],
      homeDetails: []
    };
    this.fetchHomes = this.fetchHomes.bind(this);
    this.updateHome = this.updateHome.bind(this);
    this.deleteHome = this.deleteHome.bind(this);
    this.getAllHomeImgs = this.getAllHomeImgs.bind(this);
  }

  componentDidMount() {
    this.fetchHomes().then(({ data }) => {
      this.setState({
        homes: data
      });
    });
  }

  fetchHomes() {
    return axios.get("/api/homes");
  }

  updateHome(id, location, category, desc, price, x, y, z) {
    let config = {
      headers: {
        Authorization: "Client-ID 7349a849d56fa90"
      }
    };
    const img1 = new FormData();
    const img2 = new FormData();
    const img3 = new FormData();
    img1.append("image", x);
    img2.append("image", y);
    img3.append("image", z);
    Promise.all([
      axios.post(
        `https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/upload`,
        img1,
        config
      ),
      axios.post(
        `https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/upload`,
        img2,
        config
      ),
      axios.post(
        `https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/upload`,
        img3,
        config
      )
    ]).then((res) => {
      var image1 = res[0].data.data.link;
      var image2 = res[1].data.data.link;
      var image3 = res[2].data.data.link;
      var obj = {
        location: location,
        category: category,
        description: desc,
        price: parseInt(price),
        image: image1
      };
      var obj1 = {
        image1: image1,
        image2: image2,
        image3: image3
      };
      Promise.all([
        axios.put(`/updateHome/${id}`, obj),
        axios.put(`/updateImg/${id}`, obj1)
      ]).then(() => {
        this.fetchHomes().then(({ data }) => {
          this.props.getUserHomes();
          this.setState({
            homes: data
          });
          this.props.changeView("home");
        });
      });
    });
  }

  deleteHome(id) {
    axios.delete(`/api/homes/${id}`).then((res) => {
      this.fetchHomes().then(({ data }) => {
        this.setState({
          homes: data
        });
      });
      this.props.getUserHomes();
    });
  }

  getAllHomeImgs(id) {
    axios.get(`/api/images/${id}`).then(({ data }) => {
      this.setState({
        images: data
      });
      axios.get(`/api/homes/${id}`).then(({ data }) => {
        this.setState({
          homeDetails: data
        });
        this.props.changeView("homedetails");
      });
    });
  }

  render() {
    
    if (this.props.view === "home") {
      return (
        <div>
          {this.state.homes.map((home, index) => (
            <HomeList
              home={home}
              key={index}
              getImages={this.getAllHomeImgs}
              deleteHome={this.deleteHome}
            />
          ))}
        </div>
      );
    } else if (this.props.view === "homedetails") {
      return (
        <div>
          <HomeDetail
            images={this.state.images}
            home={this.state.homeDetails}
          />
        </div>
      );
    } else if (this.props.view === "post") {
      return (
        <div>
          <PostHome
            user={this.props.user}
            fetchHomes={this.fetchHomes}
            getAllHomeImgs={this.getAllHomeImgs}
            changeView={this.props.changeView}
          />
        </div>
      );
    } else if (this.props.view === "login") {
      return (
        <div>
          <LogIn
            changeView={this.props.changeView}
            getUser={this.props.getUser}
            getUserHomes={this.props.getUserHomes}
          />
        </div>
      );
    } else if (this.props.view === "signup") {
      return (
        <div>
          <SignUp changeView={this.props.changeView} />
        </div>
      );
    } else if (this.props.view === "myposts") {
      return (
        <div>
          {this.props.userHomes.map((home, index) => (
            <UserPostedHome
              changeView={this.props.changeView}
              home={home}
              key={index}
              updateHome={this.updateHome}
              deleteHome={this.deleteHome}
            />
          ))}
        </div>
      );
    }
  }
}
export default Home;
