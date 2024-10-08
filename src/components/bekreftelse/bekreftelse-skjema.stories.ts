import type { Meta, StoryObj } from '@storybook/react';
import { BekreftelseSkjema } from './bekreftelse-skjema';

const meta = {
    title: 'Komponenter/Bekreftelse skjema',
    component: BekreftelseSkjema,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof BekreftelseSkjema>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BekreftelseSkjemaStory: Story = {
    args: {
        sprak: 'nb',
        fristDato: '2024-09-09',
        bekreftelse: {
            bekreftelseId: '42',
            gjelderFra: '2024-08-24',
            gjelderTil: '2024-09-03',
            periodeId: '24',
        },
        onCancel() {
            console.log('onCancel');
        },
        onSubmit(data) {
            console.log('onSubmit', data);
            return Promise.resolve();
        },
    },
};
