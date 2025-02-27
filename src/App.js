import "./App.css";
import React from "react";
import { Octokit } from "@octokit/core";

import SearchBar from "./Components/search/SearchBar.jsx";
import Cards from "./Components/Cards/Cards.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      results: [],
      activeSuggestions: "",
      filteredSuggestions: [],
      showSuggestions: false,
      error: null,
    };
  }

  debounce = (func, delay) => {
    console.log("g", delay);
    let timer;
    return function () {
      let context = this;
      let args = arguments;
      const later = function () {
        timer = null;
        func.apply(context, args);
      };
      clearTimeout(timer);
      timer = setTimeout(later, delay);
    };
  };

  search = this.debounce(async (query) => {
    try {
      const octokit = new Octokit({
        auth: "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",
      });
      const response = await octokit.request("GET /search/users", {
        q: query,
      });
      const arrOfNameImageObjects = [];
      return await Promise.all(
        response.data.items.map(async (item) => {
          let newData = await octokit.request(item.url);
          if (newData) {
            let objNameImage = {};
            objNameImage["name"] = newData.data.name;
            objNameImage["avatar_url"] = newData.data.avatar_url;
            objNameImage["id"] = newData.data.id;
            arrOfNameImageObjects.push(objNameImage);
          }
        })
      );
      this.setState({ results: arrOfNameImageObjects });
    } catch (err) {
      this.setState({ error: `No results` });
      console.log(`Unable to fetch result ${err.message}`);
    }
  }, 300);

  handleChange = (e) => {
    this.setState(
      {
        searchQuery: e.target.value,
      },
      () => {
        this.state.searchQuery && this.search(this.state.searchQuery);
      }
    );
  };

  render() {
    const suggestionData = this.state.results;
    return (
      <div className="app">
        <SearchBar
          value={this.state.searchQuery}
          onChange={this.handleChange}
        />
        {this.state.error ? (
          <p>{this.state.error}</p>
        ) : (
          <Cards results={suggestionData} />
        )}
        <input type="text" />
        <ul>
          <li>Home</li>
          <li>Rooms</li>
          <li>bedroom</li>
        </ul>
      </div>
    );
  }
}

export default App;
