import DisplayUserList from "@/components/DisplayUserList";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

const meta = {
  title: "Components/DisplayUserHover",
  component: DisplayUserList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    user: { control: { type: "object" }, description: "UserResponse object" },
    onClick: fn(),
  },
  args: {
    user: { firstName: "Beatriz", lastName: "Charles", company: { department: "Engineering" } } as never,
    onClick: (user) => {
      document.querySelector("#user")!.textContent = JSON.stringify(user);
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: "3em" }}>
        <Story />
        <div id="user"></div>
      </div>
    ),
  ],
} satisfies Meta<typeof DisplayUserList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClickName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonEl = canvas.getByRole("button");
    await expect(buttonEl).toBeInTheDocument();
    await userEvent.click(buttonEl, {
      delay: 100,
    });

    const userDetailEl = document.querySelector(".user-detail");
    await expect(userDetailEl).toBeInTheDocument();
  },
};

export const ClickSearchIcon: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonEl = canvas.getByLabelText("search-icon");
    await expect(buttonEl).toBeInTheDocument();
    await userEvent.click(buttonEl, {
      delay: 100,
    });

    const userDetailEl = canvas.getByText('"Beatriz Charles"');
    await expect(userDetailEl).toBeInTheDocument();
  },
};
