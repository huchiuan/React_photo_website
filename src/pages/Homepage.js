import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  const [input, setInput] = useState(""); //state
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");
  const auth = "563492ad6f91700001000001d2578d8c9eb44e859b0b18d70fd734ae";
  const intialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

  // fetch data from pexels api
  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parsedData = await dataFetch.json();
    setData(parsedData.photos);
  };

  // load more picture
  const morepicture = async () => {
    let newURL;
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    setPage(page + 1);
    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parsedData = await dataFetch.json();
    setData(data.concat(parsedData.photos));
  };

  // fetch data when the page loads up
  useEffect(() => {
    search(intialURL);
  }, []);

  useEffect(() => {
    if (currentSearch === "") {
      search(intialURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch]); //如果currentSearch改變了(就是使用搜尋功能) 就做事

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {  //search 跟 setinput 當作prop丟進去給Search用
          // JS Closure
          setCurrentSearch(input);//當元件Search的搜尋觸發 
          //就會更動input，所以就會用此homepage的setCurrentSearch把input設定到currentSearch
          //所以就會改變currentSearch，所以useEffect會偵測改動
          //所以就會觸發search(searchURL) 改變底下的圖片
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>

      <div className="morePicture">
        <button onClick={morepicture}>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
