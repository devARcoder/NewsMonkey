import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "sports",

  }
  static protoTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }
  async updateNews() {
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0a9584b34eab4cb3929218488e65af44&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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
  async componentDidMount() {
    this.updateNews();
  }
  handlePreClick = async () => {
    this.setState({page: this.state.page - 1})
    this.updateNews()
  };
  handleNextClick = async () => {
    this.setState({page: this.state.page + 1})
    this.updateNews()
  };
  render() {
    return (
      <div>
        <h1 className="text-2xl text-gray-800 font-bold text-center my-4">
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
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
                  author={element.author}
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
