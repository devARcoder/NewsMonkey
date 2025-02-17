import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    let {name, title, desc, imageUrl, newsUrl, published, author} = this.props;
    return (
      <div>
        <div className="w-full max-w-sm bg-white border-2 border-gray-500 rounded-lg shadow-sm my-1">
          
            <h1 className="mb-1 text-xl font-medium text-white dark:text-white text-center bg-gray-800 p-2">{name}</h1>
          <div className="flex flex-col items-center p-4">
            <img
              className="mb-3 rounded-md shadow-md w-96 h-48 object-cover"
              src={!imageUrl?"https://ambcrypto.com/wp-content/uploads/2025/02/Samyukhtha-45-1000x600.webp":imageUrl}
              alt="error"
            />
            <h5 className="mb-1 text-xl font-medium text-black dark:text-white text-center">
              {title}...
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-500 text-center">{desc}...</span>
            <div className="flex mt-4 md:mt-6">
              <a
                href={newsUrl} rel="noreferrer"  
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 " target="_blank"
              >
                Read More
              </a>
              <a
                href="/" rel="noreferrer"
                className="py-2 px-4 ms-2 text-sm font-medium text-white bg-green-500 border border-black rounded-lg hover:bg-green-700"
              >
                Save News
              </a>
            </div>
          </div>
          <p className="text-sm font-medium text-black dark:text-white text-center bg-gray-100 p-2">By {!author?"Unknown":author} on {new Date(published).toGMTString()}</p>
        </div>
      </div>
    );
  }
}

export default NewsItems;
