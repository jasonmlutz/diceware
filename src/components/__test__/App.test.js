import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

test("renders app path", () => {
  render(<App />);
  const linkElement = screen.getByText(/src\/app\.js/i);
  expect(linkElement).toBeInTheDocument();
});
