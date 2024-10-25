import Page from "@/app/Assignment/ConvertData/page";
import type { Meta, StoryObj } from "@storybook/react";

const mockupUserResponse = {
  users: [
    {
      id: 1,
      firstName: "Emily",
      lastName: "Johnson",
      age: 28,
      gender: "female",
      hair: {
        color: "Brown",
        type: "Curly",
      },
      address: {
        address: "626 Main Street",
      },
      company: {
        department: "Engineering",
      },
      role: "admin",
    },
  ],
};

const meta = {
  title: "Pages/ConvertData",
  component: Page,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MockBaseData: Story = {
  parameters: {
    fetchMock: {
      mocks: [
        {
          matcher: {
            name: "users",
            url: "https://dummyjson.com/users",
          },
          response: {
            status: 200,
            body: mockupUserResponse,
          },
        },
      ],
    },
  },
};
