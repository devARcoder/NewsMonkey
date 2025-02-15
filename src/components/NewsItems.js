import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    let {name, title, desc, imageUrl, newsUrl, published} = this.props;
    return (
      <div>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          
            <h1 className="mb-1 text-xl font-medium text-black dark:text-white text-center bg-gray-100 p-2">{name}</h1>
          <div className="flex flex-col items-center p-4">
            <img
              className="w-32 h-32 mb-3 rounded-full shadow-md"
              src={!imageUrl?"https://news.sap.com/wp-content/blogs.dir/1/files/2025/02/13/292949_GettyImages-1349338192_medium_uncropped_F.jpg":imageUrl}
              alt="error"
            />
            <h5 className="mb-1 text-xl font-medium text-black dark:text-white">
              {title}...
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-500">{desc}...</span>
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
                Save Page
              </a>
            </div>
          </div>
          <p className="text-sm font-medium text-black dark:text-white text-center bg-gray-100 p-2">{published}</p>
        </div>
      </div>
    );
  }
}

export default NewsItems;
