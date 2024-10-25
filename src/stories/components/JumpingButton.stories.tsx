import JumpingButton from "@/components/JumpingButton";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { sleep } from "../utils/userEvent";

const meta = {
  title: "Components/JumpingButton",
  component: JumpingButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    autoJump: { control: { type: "boolean" }, description: "true will emit event onJumping when delay is 0" },
    delay: { control: { type: "number" }, description: "delay is seconds that countdown for emit onJumping event" },
    item: { control: { type: "object" }, description: "AutoDelete object use for display button name" },
    onClick: fn(),
    onJumping: fn(),
  },
  args: {
    autoJump: true,
    delay: 5,
    item: { index: 0, name: "Watermelon", type: "Fruit" },
    onClick: () => {
      const value = document.querySelector("#onclick")!.textContent;
      document.querySelector("#onclick")!.textContent = `${+value! + 1}`;
    },
    onJumping: () => {
      document.querySelector("#jumping")!.textContent = "Complete";
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: "3em" }}>
        <div>
          <span>Jumping state: </span>
          <span id="jumping">Waiting</span>
        </div>
        <div>
          <span>Clicking count: </span>
          <span id="onclick" test-id="onclick">
            0
          </span>
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof JumpingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClickWatermelonButton: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonEl = canvas.getByRole("button", { name: "Watermelon" });
    await expect(buttonEl).toBeInTheDocument();

    await userEvent.click(buttonEl);
    await expect(canvas.getByText("1")).toBeInTheDocument();

    await userEvent.click(buttonEl);
    await expect(canvas.getByText("2")).toBeInTheDocument();

    await userEvent.click(buttonEl);
    await expect(canvas.getByText("3")).toBeInTheDocument();
  },
};

export const AutoJumpingTrue: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await sleep(5500);
    await expect(canvas.getByText("Complete")).toBeInTheDocument();
  },
};

export const AutoJumpingFalse: Story = {
  args: {
    autoJump: false,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await sleep(5500);
    await expect(canvas.getByText("Waiting")).toBeInTheDocument();
  },
};
