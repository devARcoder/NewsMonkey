import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0a9584b34eab4cb3929218488e65af44&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  handlePreClick = async () => {
    console.log("Previvous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0a9584b34eab4cb3929218488e65af44&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    });
  };
  handleNextClick = async () => {
    console.log("Next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0a9584b34eab4cb3929218488e65af44&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };
  render() {
    return (
      <div>
        <h1 className="text-2xl text-gray-800 font-bold text-center my-4">
          NewsMonkey - Top Headlines
        </h1>
        <div className="text-center flex justify-center items-center">
          {this.state.loading && <Spinner/>}
        </div>
        <div className="grid grid-cols-1 gap-2 justify-center justify-items-center md:grid md:grid-cols-3 md:gap-5 md:justify-center md:justify-items-center">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="" key={element.url}>
                <NewsItems
                  name={element.source.name}
                  title={element.title ? element.title.slice(0, 40) : ""}
                  desc={
                    element.description ? element.description.slice(0, 120) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  published={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        <div className="buttons flex justify-between items-center mx-8 my-2">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default News;
