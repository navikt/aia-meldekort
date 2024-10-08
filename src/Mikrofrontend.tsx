import { Bekreftelse } from './components/bekreftelse/bekreftelse';
import './index.css';
import { Suspense, useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';
import { ARBEIDSOKERPERIODER_URL, TILGJENGELIGE_BEKREFTELSER } from './urls/api';
import fetcher from './lib/http';
import { hentSisteArbeidssokerPeriode } from '@navikt/arbeidssokerregisteret-utils';
import { sendBekreftelse } from './lib/send-bekreftelse';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBoundaryFeil } from './components/feil/error-boundary-feil';
import { initAmplitude } from './lib/amplitude';

function DataLoaderWrapper() {
    // const [fetchSisteInnsendte, settFetchSisteInnsendte] = useState<boolean>(false);
    const { data: perioder /*isLoading: lasterPerioder*/ } = useSWRImmutable(ARBEIDSOKERPERIODER_URL, fetcher, {
        suspense: true,
    });
    const { data: tilgjengeligeBekreftelser /* isLoading: lasterBekreftelser*/ } = useSWRImmutable(
        TILGJENGELIGE_BEKREFTELSER,
        fetcher,
        {
            suspense: true,
        },
    );
    // const { data: sisteInnsendteBekreftelse } = useSWRImmutable(
    //     fetchSisteInnsendte ? SISTE_INNSENDTE_BEKREFTELSE : null,
    //     fetcher,
    //     {
    //         suspense: true,
    //     },
    // );

    const erAktivArbeidssoker = !Boolean(hentSisteArbeidssokerPeriode(perioder ?? [])?.avsluttet);
    // const isLoading = lasterPerioder || lasterBekreftelser;

    // useEffect(() => {
    //     if (isLoading) {
    //         return;
    //     }
    //
    //     if (erAktivArbeidssoker && (!tilgjengeligeBekreftelser || tilgjengeligeBekreftelser.length === 0)) {
    //         settFetchSisteInnsendte(true);
    //     }
    // }, [isLoading, tilgjengeligeBekreftelser, erAktivArbeidssoker]);

    return (
        <Bekreftelse
            sprak={'nb'}
            sistInnsendteBekreftelse={undefined}
            tilgjengeligeBekreftelser={tilgjengeligeBekreftelser}
            erAktivArbeidssoker={erAktivArbeidssoker}
            onSubmit={sendBekreftelse}
        />
    );
}

function Mikrofrontend() {
    useEffect(() => {
        initAmplitude();
    }, []);

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFeil}>
            <Suspense>
                <DataLoaderWrapper />
            </Suspense>
        </ErrorBoundary>
    );
}

export default Mikrofrontend;
