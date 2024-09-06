import React from "react";
import SearchBar from "@theme-original/SearchBar";
import AskCookbook from "@cookbookdev/docsbot/react";

/** It's a public API key, so it's safe to expose it here */
const COOKBOOK_PUBLIC_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjM1Y2E1YWM2Mjk0YzAyN2Q2YTg2YjQiLCJpYXQiOjE3MTQ4MDEyNDIsImV4cCI6MjAzMDM3NzI0Mn0.fwWPTo4cxmT4Pray8QlR7NTVGCaqzY92bXsaQfYIjBQ"

export default function SearchBarWrapper(props) {
  return (
    <>
      <SearchBar {...props} />
      <AskCookbook apiKey={COOKBOOK_PUBLIC_API_KEY} />
    </>
  );
}
