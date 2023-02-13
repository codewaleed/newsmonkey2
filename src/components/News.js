import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const componentUpdate = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    //this.setState({ loading: true });
    props.setProgress(50);
    let data = await fetch(url);
    let parsedData = await data.json();

    props.setProgress(80);

    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);

    props.setProgress(100);
  };

  useEffect(() => {
    componentUpdate();
  }, []);

  const fetchData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();

    // this.setState({
    //   articles: this.state.articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //   //loading: false,
    // });

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center">Welcome to Taza Khabar</h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container my-4 ">
          <div className="row">
            {articles.map((element) => {
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
    </div>
  );
};
