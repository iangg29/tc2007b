/**
 * @format
 * @jest-environment jsdom
 */

import "react-native";
import React from "react";
import App from "../App";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

describe("Initial testing", () => {
  it("Renders correctly", () => {
    const app = renderer.create(<App />);
    app.unmount();
  });
});
