import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, publishAt, source } =
      this.props;
    return (
      <div>
        <div className="card">
          <img
            src={
              !imageUrl
                ? "data:image/jpeg;base64,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"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div style={{
              position: "absolute",
              zIndex: "1",
              right: 0,
              display: "flex",
              justifyContent: "flex-end",
            }}>
          <span
            className=" badge rounded-pill bg-danger"
          >
            {source}
          </span>
          </div>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-primary"
            >
              Read More
            </a>
            <p className="card-text mt-2">
              <small className="text-muted">
                Written by {author} at {new Date(publishAt).toGMTString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
