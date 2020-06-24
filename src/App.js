import React from "react";
import logo from "./logo.svg";
import "./App.css";

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
  render() {
    return (
      <div style={{ margin: "2em" }}>
        {this.state.posts.map((post) => {
          return (
            <>
              <h1>{post.boast_or_roast}</h1>
              <ul>
                <li>{post.url}</li>
                <li>{post.text}</li>
                <li>{post.up_vote}</li>
                <li>{post.down_vote}</li>
                <li>{post.date}</li>
                <li>{post.total_votes}</li>
              </ul>
            </>
          );
        })}
      </div>
    );
  }
}

export default App;
