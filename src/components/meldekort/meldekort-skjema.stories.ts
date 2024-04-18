import type { Meta, StoryObj } from '@storybook/react';
import { MeldekortSkjema } from './meldekort-skjema';

const meta = {
    title: 'Komponenter/Meldekort skjema',
    component: MeldekortSkjema,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof MeldekortSkjema>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MeldekortSkjemaStory: Story = {
    args: {
        sprak: 'nb',
        fristDato: '20. april',
        periode: '21.mars - 6. april'
    },
};
