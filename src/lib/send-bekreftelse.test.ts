import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BEKREFTELSE_URL } from '../urls/api';
import { sendBekreftelse } from './send-bekreftelse';

describe('sendBekreftelse', () => {
    const server = setupServer();
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => {
        server.resetHandlers();
    });

    test('POSTer til API', async () => {
        const spy = vi.fn();
        server.use(
            http.post(BEKREFTELSE_URL, async ({ request }) => {
                spy(await request.json());
                return HttpResponse.json({ test: 'ok' });
            }),
        );

        const payload = {
            harVaertIArbeid: true,
            oenskerAaVaereRegistrert: true,
            bekreftelseId: '42',
        };

        const result = await sendBekreftelse(payload);
        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith(payload);
        expect(result).toEqual({ test: 'ok' });
    });
});
