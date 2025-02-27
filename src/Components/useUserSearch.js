import { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";

const useUserSearch = (query, pageNumber) => {
  useEffect(async () => {
    const octokit = new Octokit({ auth: "" });
    const response = await octokit.request("GET /search/users", {
      q: query,
      per_page: 30,
      page: pageNumber,
    });
    const arrOfNameImageObjects = [];
    await Promise.all(
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
    console.log("resukt", arrOfNameImageObjects);
    // this.setState({results:arrOfNameImageObjects})
  }, [query, pageNumber]);
  return null;
};

export default useUserSearch;
