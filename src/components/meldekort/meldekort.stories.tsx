import type { Meta, StoryObj } from '@storybook/react';
import { Meldekort } from './meldekort';
import { Bekreftelse } from '../../types/bekreftelse';

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
                bekreftelseId: '42',
            },
            {
                gjelderFra: '2024-07-15',
                gjelderTil: '2024-07-31',
                bekreftelseId: '41',
            },
        ],
        onSubmit(data: Bekreftelse): Promise<void> {
            console.log('onSubmit', data);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        },
    },
};
