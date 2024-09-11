import { Bekreftelse } from '../types/bekreftelse';
import { BEKREFTELSE_URL } from '../urls/api';
import fetcher from './http';

export async function sendBekreftelse(data: Bekreftelse) {
    return fetcher(BEKREFTELSE_URL, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
