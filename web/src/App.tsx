import React from "react";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { AppQuery, AppQuery$data } from "./__generated__/AppQuery.graphql";

function App(): JSX.Element {
  const data: AppQuery$data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        ping
      }
    `,
    {},
  );

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
