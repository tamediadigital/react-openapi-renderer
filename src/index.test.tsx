import React from "react";
import OpenApiRenderer from "../src/index";
import { render } from "@testing-library/react";

import mocks from "../__mocks__/index";

test("OpenApiRenderer - ApiWithExamples", async () => {
  render(<OpenApiRenderer specification={mocks.ApiWithExamples} />);
});

test("OpenApiRenderer - CallBackExample", async () => {
  render(<OpenApiRenderer specification={mocks.CallBackExample} />);
});

test("OpenApiRenderer - LinkExample", async () => {
  render(<OpenApiRenderer specification={mocks.LinkExample} />);
});

test("OpenApiRenderer - PetStoreExpandedExample", async () => {
  render(<OpenApiRenderer specification={mocks.PetStoreExpandedExample} />);
});

test("OpenApiRenderer - PetStoreExample", async () => {
  render(<OpenApiRenderer specification={mocks.PetStoreExample} />);
});

test("OpenApiRenderer - UsptoExample", async () => {
  render(<OpenApiRenderer specification={mocks.UsptoExample} />);
});
