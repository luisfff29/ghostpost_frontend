import React from "react";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
import Posts from "./Posts.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/posts/")
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }));
  }

  upVote = (url) => {
    fetch(url + "up_vote/", {
      method: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
    window.location.reload();
  };

  downVote = (url) => {
    fetch(url + "down_vote/", {
      method: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
    window.location.reload();
  };

  render() {
    return (
      <div style={{ margin: "2em" }}>
        <NavLink exact to="/">
          <button class="ui animated button">
            <div class="visible content">All Posts</div>
            <div class="hidden content">
              <i aria-hidden="true" class="arrow right icon"></i>
            </div>
          </button>
        </NavLink>
        <NavLink to="/boasts">
          <button class="ui animated button">
            <div class="visible content">Filter by Boasts</div>
            <div class="hidden content">
              <i aria-hidden="true" class="arrow right icon"></i>
            </div>
          </button>
        </NavLink>
        <NavLink to="/roasts">
          <button class="ui animated button">
            <div class="visible content">Filter by Roasts</div>
            <div class="hidden content">
              <i aria-hidden="true" class="arrow right icon"></i>
            </div>
          </button>
        </NavLink>
        <Route exact path="/">
          <Posts
            posts={this.state.posts}
            upVote={this.upVote}
            downVote={this.downVote}
          />
        </Route>
        <Route path="/boasts">
          <Posts
            posts={this.state.posts.filter(
              (post) => post.boast_or_roast === "B"
            )}
            upVote={this.upVote}
            downVote={this.downVote}
          />
        </Route>
        <Route path="/roasts">
          <Posts
            posts={this.state.posts.filter(
              (post) => post.boast_or_roast === "R"
            )}
            upVote={this.upVote}
            downVote={this.downVote}
          />
        </Route>
      </div>
    );
  }
}

export default App;
