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
        fristDato: '2024-09-09',
        gjelderFra: '2024-08-24',
        gjelderTil: '2024-09-03',
        onCancel() {
            console.log('onCancel');
        },
        onSubmit(data) {
            console.log('onSubmit', data);
            return Promise.resolve();
        },
    },
};
