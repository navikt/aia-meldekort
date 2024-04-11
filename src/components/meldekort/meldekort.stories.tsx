import type {Meta, StoryObj} from "@storybook/react";
import Meldekort from "./meldekort-skjema";

const meta = {
    title: 'Komponenter/Meldekort',
    component: Meldekort,
    tags: ['autodocs'],
    args: { },
} satisfies Meta<typeof Meldekort>;

export default meta;
type Story = StoryObj<typeof meta>;


export const MeldekortStory: Story = {
    args: { },
};
