/** @jsxImportSource @emotion/react */
import React from "react";
import UsersByCountries from "./ui/UsersByCountries";
import data from "./chart-data/data.json";
import overflowedData from "./chart-data/overflowedData.json";
import Column from "./ui/Column";

function App() {
  return (
    <Column className="App">
      <UsersByCountries<{
        country: string;
        count: number;
      }>
        heading="How it should be"
        data={data.data}
        id="1"
      />
      <UsersByCountries<{
        country: string;
        count: number;
      }>
        heading="Ovrflowed data"
        data={overflowedData.data}
        id="2"
      />
    </Column>
  );
}

export default App;
