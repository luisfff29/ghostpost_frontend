import React from "react";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
import Posts from "./Posts.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], magic: "" };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/posts/")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          posts: data,
        })
      );
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

  createPost = (event) => {
    var data = {
      boast_or_roast: event.target.boastOrRoast.value,
      text: event.target.textArea.value,
    };
    fetch("http://localhost:8000/api/posts/", {
      method: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert(
          "If you want to delete your post, save this magic code: " + data.magic
        );
        window.location.href = "http://localhost:3000";
      });
  };

  deletePost = (magic) => {
    if (magic === this.state.magic) {
      fetch("http://localhost:8000/api/posts/magic/" + magic, {
        method: "DELETE",
      });
      console.log("Deleting...");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  };

  magicString = (event) => {
    this.setState({ magic: event.target.value });
  };

  render() {
    return (
      <div style={{ margin: "2em" }}>
        <NavLink exact to="/">
          <button className="ui animated button">
            <div className="visible content">All Posts</div>
            <div className="hidden content">
              <i aria-hidden="true" className="arrow right icon"></i>
            </div>
          </button>
        </NavLink>
        <NavLink to="/boasts">
          <button className="ui animated button">
            <div className="visible content">Filter by Boasts</div>
            <div className="hidden content">
              <i aria-hidden="true" className="arrow right icon"></i>
            </div>
          </button>
        </NavLink>
        <NavLink to="/roasts">
          <button className="ui animated button">
            <div className="visible content">Filter by Roasts</div>
            <div className="hidden content">
              <i aria-hidden="true" className="arrow right icon"></i>
            </div>
          </button>
        </NavLink>
        <NavLink to="/popular">
          <button className="ui animated button">
            <div className="visible content">Most Popular</div>
            <div className="hidden content">
              <i aria-hidden="true" className="arrow right icon"></i>
            </div>
          </button>
        </NavLink>
        <NavLink to="/create-post">
          <button className="ui animated button">
            <div className="visible content">Create Post</div>
            <div className="hidden content">
              <i aria-hidden="true" className="arrow right icon"></i>
            </div>
          </button>
        </NavLink>

        <Route exact path="/">
          <Posts
            posts={this.state.posts}
            upVote={this.upVote}
            downVote={this.downVote}
            deletePost={this.deletePost}
            magicString={this.magicString}
          />
        </Route>
        <Route path="/boasts">
          <Posts
            posts={this.state.posts.filter(
              (post) => post.boast_or_roast === "B"
            )}
            upVote={this.upVote}
            downVote={this.downVote}
            deletePost={this.deletePost}
            magicString={this.magicString}
          />
        </Route>
        <Route path="/roasts">
          <Posts
            posts={this.state.posts.filter(
              (post) => post.boast_or_roast === "R"
            )}
            upVote={this.upVote}
            downVote={this.downVote}
            deletePost={this.deletePost}
            magicString={this.magicString}
          />
        </Route>
        <Route path="/popular">
          <Posts
            posts={this.state.posts
              .concat()
              .sort((a, b) => b.total_votes - a.total_votes)}
            upVote={this.upVote}
            downVote={this.downVote}
            deletePost={this.deletePost}
            magicString={this.magicString}
          />
        </Route>
        <Route path="/create-post">
          <form className="ui form" onSubmit={this.createPost}>
            <div style={{ padding: "1em" }}>
              <div className="grouped fields">
                <label>This is a ...</label>
                <div className="field">
                  <label>
                    <input type="radio" name="boastOrRoast" value="B" />
                    Boast
                  </label>
                </div>
                <div className="field">
                  <label>
                    <input
                      type="radio"
                      name="boastOrRoast"
                      value="R"
                      required
                    />
                    Roast
                  </label>
                </div>
              </div>
              <div className="field">
                <label>Text</label>
                <textarea
                  placeholder="Start typing here..."
                  rows="3"
                  name="textArea"
                  required
                ></textarea>
              </div>
              <div className="field">
                <button className="ui button" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Route>
      </div>
    );
  }
}

export default App;
