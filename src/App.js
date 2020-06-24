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
          var title;
          if (post.boast_or_roast === "B") {
            title = "Boast";
          } else if (post.boast_or_roast === "R") {
            title = "Roast";
          } else {
            title = "None";
          }

          var t = new Date(post.date);

          return (
            <>
              <div className="ui card" style={{ width: "40%" }}>
                <div className="content">
                  <div className="header">{title}</div>
                  <div className="meta">{t.toLocaleString()}</div>
                  <div className="description">{post.text}</div>
                </div>
                <div className="extra content">
                  Total votes: {post.total_votes}
                </div>
                <div className="extra content">
                  <div className="ui two buttons">
                    <button className="ui green basic button">
                      <i className="arrow alternate circle up icon"></i>Up vote
                      <div className="ui label">{post.up_vote}</div>
                    </button>
                    <button className="ui red basic button">
                      <i className="arrow alternate circle down icon"></i>Down
                      vote
                      <div className="ui label">{post.down_vote}</div>
                    </button>
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
