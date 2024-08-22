import type { Meta, StoryObj } from '@storybook/react';
import { Kvittering } from './kvittering';

const meta = {
    title: 'Komponenter/Kvittering',
    component: Kvittering,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof Kvittering>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KvitteringStory: Story = {
    args: {
        sprak: 'nb',
        erUtmeldt: false,
    },
};
