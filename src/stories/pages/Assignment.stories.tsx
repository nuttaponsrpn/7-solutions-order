import Page from "@/app/Assignment/page";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/Assignment",
  component: Page,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  decorators: [
    (Story) => (
      <div id="testtest" style={{ width: "100%" }}>
        <Story />
        <div id="user"></div>
      </div>
    ),
  ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClickName: Story = {};
