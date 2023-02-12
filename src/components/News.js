import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalResults: 0,
    };
  }

  async componentUpdate() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //this.setState({ loading: true });
    this.props.setProgress(50);
    let data = await fetch(url);

   

    let parsedData = await data.json();

    this.props.setProgress(80);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  componentDidMount = async () => {
    this.componentUpdate();
  };
  // handlePre = async () => {

  //   this.setState({ page: this.state.page - 1 });

  //   this.componentUpdate();
  //   console.log(this.state.articles);
  //   console.log(this.state.totalResults);
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   this.props.country
  //   // }&category=${
  //   //   this.props.category
  //   // }&apiKey=5caa54c9641d4f24befa8c2b731a96f7&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true });

  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   articles: parsedData.articles,
  //   //   page: this.state.page - 1,
  //   //   loading: false,
  //   // });
  // };
  // handleNex = async () => {

  //   this.setState({ page: this.state.page + 1 });
  //   this.componentUpdate();
  //   console.log(this.state.articles);
  //   console.log(this.state.totalResults)
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   this.props.country
  //   // }&category=${
  //   //   this.props.category
  //   // }&apiKey=5caa54c9641d4f24befa8c2b731a96f7&page=${
  //   //   this.state.page + 1
  //   // }&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true });

  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   articles: parsedData.articles,
  //   //   page: this.state.page + 1,
  //   //   loading: false,
  //   // });
  // };
  fetchData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      //loading: false,
    });
  };
  render() {
    return (
      <div className="container my-3">
        <>
          <h1 className="text-center">Welcome to taza Khabar</h1>
          {this.state.loading && <Spinner />}

          <InfiniteScroll
            dataLength={this.state.articles.length} //This is important field to render the next data
            next={this.fetchData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container my-4 ">
              <div className="row">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4 my-3" key={element.url}>
                      <Newsitem
                        title={element.title ? element.title.slice(0, 88) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 99)
                            : ""
                        }
                        newsUrl={element.url ? element.url : ""}
                        imageUrl={element.urlToImage ? element.urlToImage : ""}
                        author={!element.author ? "Unknown" : element.author}
                        publishAt={
                          !element.publishedAt ? "Unknown" : element.publishedAt
                        }
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>

          {/* <div className="container">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePre}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-dark mx-3"
            onClick={this.handleNex}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next
          </button>
        </div> */}
        </>
      </div>
    );
  }
}
