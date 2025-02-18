import React, { useEffect, useState, useCallback } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const updateNews = useCallback(async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }, [props, page]);

  useEffect(() => {
    updateNews();
  }, [updateNews]);

  const fetchMoreData = async () => {
    const newPage = page + 1;
    setPage(newPage);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${newPage}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-bold text-center my-4">
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      <div className="text-center flex justify-center items-center">
        {loading && <Spinner />}
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={
          <div className="text-center flex justify-center items-center">
            {loading && <Spinner />}
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-2 justify-center justify-items-center md:grid md:grid-cols-3 md:gap-5 md:justify-center md:justify-items-center">
          {articles.map((element) => (
            <div key={element.url}>
              <NewsItems
                name={element.source.name}
                title={element.title ? element.title.slice(0, 40) : ""}
                desc={
                  element.description
                    ? element.description.slice(0, 120)
                    : "Data will be removed by devARcoder"
                }
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                published={element.publishedAt}
                author={element.author}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 6,
  category: "sports",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired,
};

export default News;
