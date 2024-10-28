import Page from "@/app/Assignment/AutoDeleteTodoList/page";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { sleep } from "../utils/userEvent";

const meta = {
  title: "Pages/AutoDeleteTodoList",
  component: Page,

  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    fetchMock: {
      mocks: [
        {
          matcher: {
            name: "AutoDeleteData",
            url: "static/json/AutoDeleteData.json",
          },
          response: [
            {
              name: "Cucumber",
              type: "Vegetable",
            },
            {
              name: "Apple",
              type: "Fruit",
            },
            {
              name: "Carrot",
              type: "Vegetable",
            },
          ],
        },
      ],
    },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClickApple: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    let buttonEl = await canvas.findByText("Apple", { exact: true });

    const containerMainEl = document.querySelector(".container-main") as HTMLDivElement;
    await expect(containerMainEl).toBeInTheDocument();

    const containerFruitEl = document.querySelector(".container-Fruit") as HTMLDivElement;
    await expect(containerFruitEl).toBeInTheDocument();

    const containerVegetableEl = document.querySelector(".container-Vegetable") as HTMLDivElement;
    await expect(containerVegetableEl).toBeInTheDocument();

    await userEvent.click(buttonEl);
    buttonEl = await canvas.findByText("Apple", { exact: true });
    await expect(containerFruitEl).toContainElement(buttonEl);

    await sleep(5000);
    buttonEl = await canvas.findByText("Apple", { exact: true });
    await expect(containerMainEl).toContainElement(buttonEl);
  },
};
