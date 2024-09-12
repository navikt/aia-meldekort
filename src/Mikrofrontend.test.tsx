import { render, screen } from '@testing-library/react';
import Mikrofrontend from './Mikrofrontend';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { ARBEIDSOKERPERIODER_URL, SISTE_INNSENDTE_BEKREFTELSE, TILGJENGELIGE_BEKREFTELSER } from './urls/api';

const defaultHandlers = [
    http.get(ARBEIDSOKERPERIODER_URL, () => new HttpResponse(null, { status: 204 })),
    http.get(TILGJENGELIGE_BEKREFTELSER, () => HttpResponse.json([])),
    http.get(SISTE_INNSENDTE_BEKREFTELSE, () => new HttpResponse(null, { status: 204 })),
];

describe('Mikrofrontend', () => {
    const server = setupServer();
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => {
        server.resetHandlers();
    });

    test('rendrer Mikrofrontend', async () => {
        server.use(...defaultHandlers);

        render(<Mikrofrontend />);

        await expect(
            await screen.findByText('Bekreft at du fortsatt ønsker å være registrert som arbeidssøker'),
        ).toBeInTheDocument();
    });
});
