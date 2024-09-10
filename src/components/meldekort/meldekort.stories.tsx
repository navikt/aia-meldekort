import type { Meta, StoryObj } from '@storybook/react';
import { Meldekort } from './meldekort';

const meta = {
    title: 'Meldekort',
    component: Meldekort,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof Meldekort>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MeldekortStory: Story = {
    args: {
        sprak: 'nb',
        erAktivArbeidssoker: true,
        sistInnsendteBekreftelse: undefined,
        tilgjengeligeBekreftelser: [
            {
                gjelderFra: '2024-08-01',
                gjelderTil: '2024-08-15',
                bekreftelsesId: '42',
            },
            {
                gjelderFra: '2024-07-15',
                gjelderTil: '2024-07-31',
                bekreftelsesId: '41',
            },
        ],
    },
};
