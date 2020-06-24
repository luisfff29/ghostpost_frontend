import React from "react";
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
              <div className="ui card">
                <div className="content">
                  <div className="header">Steve Sanders</div>
                  <div className="meta">Friends of Elliot</div>
                  <div className="description">
                    Steve wants to add you to the group
                    <strong>best friends</strong>
                  </div>
                </div>
                <div className="extra content">
                  <div className="ui two buttons">
                    <button className="ui green basic button">Approve</button>
                    <button className="ui red basic button">Decline</button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    );
  }
}

export default App;
