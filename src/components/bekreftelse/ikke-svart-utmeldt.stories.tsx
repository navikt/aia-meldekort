import type { Meta, StoryObj } from '@storybook/react';
import { IkkeSvartUtmeldt } from './ikke-svart-utmeldt';

const meta = {
    title: 'Komponenter/IkkeSvartUtmeldt',
    component: IkkeSvartUtmeldt,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof IkkeSvartUtmeldt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IkkeSvartUtmeldtStory: Story = {
    args: {
        sprak: 'nb',
        dato: '6. april',
    },
};
