import { Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { MeldekortSkjema } from './meldekort-skjema';
import { Sprak } from '../../types/sprak';
import { useEffect, useState } from 'react';
import { MeldekortBesvart } from './meldekort-besvart';
import { Kvittering } from './kvittering';
import { sorterEtterEldsteFoerst } from '../../lib/sorter-etter-eldste-foerst';
import { Bekreftelse, SistInnsendteBekreftelse, TilgjengeligeBekreftelser } from '../../types/bekreftelse';
import { MeldekortUtmeldt } from './meldekort-utmeldt';
import { loggAktivitet, loggVisning } from '../../lib/amplitude';

export interface MeldekortProps {
    sprak: Sprak;
    sistInnsendteBekreftelse?: SistInnsendteBekreftelse;
    tilgjengeligeBekreftelser?: TilgjengeligeBekreftelser;
    erAktivArbeidssoker: boolean;
    onSubmit(data: Bekreftelse): Promise<void>;
}

const TEKSTER = {
    nb: {
        heading: 'Bekreft at du fortsatt ønsker å være registrert som arbeidssøker',
    },
};

function Meldekort(props: MeldekortProps) {
    const { sprak, onSubmit, erAktivArbeidssoker } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const [visKvittering, settVisKvittering] = useState<boolean>(false);
    const [sisteBekreftlse, settSisteBekreftlse] = useState<Bekreftelse>();
    const [tilgjengeligeBekreftelser, settTilgjengeligeBekreftelser] = useState(
        sorterEtterEldsteFoerst(props.tilgjengeligeBekreftelser),
    );

    const harTilgjengeligeBekreftelser = tilgjengeligeBekreftelser.length > 0;
    const gjeldendeBekreftelse = tilgjengeligeBekreftelser[0];

    const onSubmitSkjema = async (bekreftelse: Bekreftelse) => {
        await onSubmit(bekreftelse);
        settSisteBekreftlse(bekreftelse);
        settVisKvittering(true);
        if (!bekreftelse.vilFortsetteSomArbeidssoeker) {
            settTilgjengeligeBekreftelser([]);
        } else {
            settTilgjengeligeBekreftelser((tilgjengeligeBekreftelser) => tilgjengeligeBekreftelser.slice(1));
        }
        loggAktivitet({
            aktivitet: 'Sender inn bekreftelse',
            vilFortsetteSomArbeidssoeker: bekreftelse.vilFortsetteSomArbeidssoeker,
        });
    };

    const onCancel = () => {
        // TODO: hva gjør vi her?
    };

    useEffect(() => {
        loggVisning({
            viser: 'Bekreftelse',
            antallTilgjengeligeBekreftelser: tilgjengeligeBekreftelser?.length,
            erAktivArbeidssoker: erAktivArbeidssoker,
        });
    }, []);

    if (!erAktivArbeidssoker) {
        return <MeldekortUtmeldt sprak={sprak} />;
    }

    return (
        <div className={'py-4'}>
            <Heading level="1" size="medium" className={'mb-6'}>
                {tekst('heading')}
            </Heading>
            {props.sistInnsendteBekreftelse && !harTilgjengeligeBekreftelser && !visKvittering && (
                <MeldekortBesvart
                    periode={'21.mars - 6. april'}
                    innsendtDato={'06.03'}
                    nesteDato={'20.04'}
                    besvarelse={props.sistInnsendteBekreftelse}
                    sprak={sprak}
                />
            )}
            {harTilgjengeligeBekreftelser && !visKvittering && (
                <MeldekortSkjema
                    sprak={sprak}
                    fristDato={'2024-09-01'}
                    gjelderFra={gjeldendeBekreftelse!.gjelderFra}
                    gjelderTil={gjeldendeBekreftelse!.gjelderTil}
                    onSubmit={onSubmitSkjema}
                    onCancel={onCancel}
                />
            )}
            {visKvittering && (
                <Kvittering
                    sprak={sprak}
                    erUtmeldt={!sisteBekreftlse?.vilFortsetteSomArbeidssoeker}
                    harFlereBekreftelser={tilgjengeligeBekreftelser.length > 0}
                    onClick={() => {
                        settVisKvittering(false);
                        loggAktivitet({ aktivitet: 'Trykker på "Bekreft neste periode"' });
                    }}
                />
            )}
        </div>
    );
}

export { Meldekort };
