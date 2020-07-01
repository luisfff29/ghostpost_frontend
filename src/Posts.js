import React from "react";

function Posts(props) {
  return (
    <div>
      {props.posts.map((post) => (
        <div key={post.url} style={{ padding: "1em" }}>
          <div className="ui card" style={{ width: "60%" }}>
            <div className="content">
              <div className="ui left action input" style={{ float: "right" }}>
                <button
                  className="ui red icon button"
                  onClick={() => props.deletePost(post.magic)}
                >
                  <i className="close icon"></i>
                </button>
                <input
                  type="text"
                  placeholder="Ex. AbCd12"
                  onChange={(e) => props.magicString(e)}
                />
              </div>
              <div className="header">
                {post.boast_or_roast === "B" ? "Boast" : "Roast"}
              </div>
              <div className="meta">{new Date(post.date).toLocaleString()}</div>
              <div className="description">{post.text}</div>
            </div>
            <div className="extra content">Total votes: {post.total_votes}</div>
            <div className="extra content">
              <div className="ui two buttons">
                <button
                  className="ui green basic button"
                  onClick={() => props.upVote(post.url)}
                >
                  <i className="arrow alternate circle up icon"></i>Up vote
                  <div className="ui label">{post.up_vote}</div>
                </button>
                <button
                  className="ui red basic button"
                  onClick={() => props.downVote(post.url)}
                >
                  <i className="arrow alternate circle down icon"></i>Down vote
                  <div className="ui label">{post.down_vote}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
