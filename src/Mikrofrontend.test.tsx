import { render, screen } from "@testing-library/react";
import Mikrofrontend from "./Mikrofrontend";

describe('Mikrofrontend', () => {
  test("rendrer AiA som microfrontend", async () => {
    render(<Mikrofrontend />);

    await expect(
        await screen.findByText("Vil du fortsatt være arbeidssøker?"),
    ).toBeInTheDocument();
  });
});
