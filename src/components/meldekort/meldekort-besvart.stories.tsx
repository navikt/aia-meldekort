import type { Meta, StoryObj } from '@storybook/react';
import { MeldekortBesvart } from './meldekort-besvart';

const meta = {
    title: 'Komponenter/Meldekort besvart',
    component: MeldekortBesvart,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof MeldekortBesvart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MeldekortBesvartStory: Story = {
    args: {
        periode: '21. mars - 6. april',
        innsendtDato: '06.03',
        nesteDato: '20.04',
        besvarelse: {
            harVaertIArbeid: true,
            oenskerAaVaereRegistrert: true,
            dato: '',
        },
        visBekreftelse: true,
        sprak: 'nb',
        onEndreSvar() {
            console.log('onEndreSvar');
        },
    },
};
