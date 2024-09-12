import type { Meta, StoryObj } from '@storybook/react';
import Mikrofrontend from './Mikrofrontend';
import { http, HttpResponse } from 'msw';
import {
    ARBEIDSOKERPERIODER_URL,
    BEKREFTELSE_URL,
    SISTE_INNSENDTE_BEKREFTELSE,
    TILGJENGELIGE_BEKREFTELSER,
} from './urls/api';

const forceReloadDecorator = (storyFn: any, context: any) => {
    if (context.globals.shouldReload) {
        context.globals.shouldReload = false;
        window.location.reload();
    }
    context.globals.shouldReload = true;
    return storyFn();
};

const meta = {
    title: 'Med Mock datalasting / Mikrofrontend',
    component: Mikrofrontend,
    args: {},
    decorators: [forceReloadDecorator],
} satisfies Meta<typeof Mikrofrontend>;

export default meta;
type Story = StoryObj<typeof meta>;

const arbeidssokerResponse = [
    {
        periodeId: 'eb39f0ee-ddba-42a1-8ed3-590285b2e279',
        startet: {
            tidspunkt: '2024-03-14T12:29:10.926Z',
            utfoertAv: {
                type: 'VEILEDER',
            },
            kilde: 'paw-arbeidssoekerregisteret-inngang',
            aarsak: 'Er over 18 år, er bosatt i Norge etter Folkeregisterloven',
        },
        avsluttet: null,
    },
];

export const HarTilgjengeligeBekreftelser: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(ARBEIDSOKERPERIODER_URL, () => HttpResponse.json(arbeidssokerResponse)),
                http.get(TILGJENGELIGE_BEKREFTELSER, () =>
                    HttpResponse.json([
                        {
                            gjelderFra: '2024-09-01',
                            gjelderTil: '2024-09-15',
                            bekreftelseId: '42',
                        },
                    ]),
                ),
                http.get(SISTE_INNSENDTE_BEKREFTELSE, () => new HttpResponse(null, { status: 204 })),
                http.post(BEKREFTELSE_URL, () => new HttpResponse(null, { status: 204 })),
            ],
        },
    },
};

export const IngenTilgjengeligeBekreftelser: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(ARBEIDSOKERPERIODER_URL, () => HttpResponse.json(arbeidssokerResponse)),
                http.get(TILGJENGELIGE_BEKREFTELSER, () => HttpResponse.json([])),
                http.get(SISTE_INNSENDTE_BEKREFTELSE, () =>
                    HttpResponse.json({
                        dato: '2024-09-12',
                        harVaertIArbeid: false,
                        oenskerAaVaereRegistrert: true,
                    }),
                ),
            ],
        },
    },
};

export const IkkeArbeidssokerStory: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(ARBEIDSOKERPERIODER_URL, () =>
                    HttpResponse.json([
                        {
                            periodeId: 'eb39f0ee-ddba-42a1-8ed3-590285b2e279',
                            startet: {
                                tidspunkt: '2024-03-14T12:29:10.926Z',
                                utfoertAv: {
                                    type: 'VEILEDER',
                                },
                                kilde: 'paw-arbeidssoekerregisteret-inngang',
                                aarsak: 'Er over 18 år, er bosatt i Norge etter Folkeregisterloven',
                            },
                            avsluttet: {
                                tidspunkt: '2024-09-14T12:29:10.926Z',
                            },
                        },
                    ]),
                ),
                http.get(TILGJENGELIGE_BEKREFTELSER, () => HttpResponse.json([])),
                http.get(SISTE_INNSENDTE_BEKREFTELSE, () => new HttpResponse(null, { status: 204 })),
            ],
        },
    },
};

export const FeilVedAPIKall: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(ARBEIDSOKERPERIODER_URL, () => HttpResponse.json(arbeidssokerResponse)),
                http.get(TILGJENGELIGE_BEKREFTELSER, () => new HttpResponse(null, { status: 500 })),
            ],
        },
    },
};
