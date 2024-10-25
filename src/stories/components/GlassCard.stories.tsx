import GlassCard from "@/components/GlassCard";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { sleep } from "../utils/userEvent";

const meta = {
  title: "Components/GlassCard",
  component: GlassCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    display: { control: "boolean" },
    children: { control: "object" },
  },
  args: {
    display: true,
    children: <div>Hello</div>,
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ margin: "3em", border: "1px solid grey" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof GlassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await sleep(800);
    await expect(canvas.getByText("Hello")).toBeVisible();
  },
};

export const Hide: Story = {
  args: { display: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await sleep(800);
    await expect(canvas.getByText("Hello")).not.toBeVisible();
  },
};
