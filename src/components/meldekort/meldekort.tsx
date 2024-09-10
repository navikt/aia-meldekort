import { Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { MeldekortSkjema } from './meldekort-skjema';
import { Sprak } from '../../types/sprak';
import { useState } from 'react';
import { MeldekortBesvart } from './meldekort-besvart';
import { Kvittering } from './kvittering';
import { sorterEtterEldsteFoerst } from '../../lib/sorter-etter-eldste-foerst';

export interface MeldekortProps {
    sprak: Sprak;
    sistInnsendteBekreftelse?: {
        dato: string;
        harVaertIArbeid: boolean;
        oenskerAaVaereRegistrert: boolean;
    };
    tilgjengeligeBekreftelser?: {
        gjelderFra: string;
        gjelderTil: string;
        bekreftelsesId: string;
    }[];
    erAktivArbeidssoker: boolean;
}

const TEKSTER = {
    nb: {
        heading: 'Bekreft at du fortsatt ønsker å være registrert som arbeidssøker',
    },
};

function Meldekort(props: MeldekortProps) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const [visKvittering, settVisKvittering] = useState<boolean>(false);
    const [sisteBesvarelse, settSisteBesvarelse] = useState<any>();
    const [tilgjengeligeBekreftelser, settTilgjengeligeBekreftelser] = useState(
        sorterEtterEldsteFoerst(props.tilgjengeligeBekreftelser),
    );

    const harTilgjengeligeBekreftelser = tilgjengeligeBekreftelser.length > 0;
    const gjeldendeBekreftelse = tilgjengeligeBekreftelser[0];

    const onSubmitSkjema = (besvarelse: any) => {
        settSisteBesvarelse(besvarelse);
        settVisKvittering(true);
        // TODO: POST til API
        if (!besvarelse.oenskerAaVaereRegistrert) {
            settTilgjengeligeBekreftelser([]);
        } else {
            settTilgjengeligeBekreftelser((tilgjengeligeBekreftelser) => tilgjengeligeBekreftelser.slice(1));
        }
    };

    const onCancel = () => {
        // TODO: hva gjør vi her?
    };

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
                    erUtmeldt={!sisteBesvarelse.oenskerAaVaereRegistrert}
                    harFlereBekreftelser={tilgjengeligeBekreftelser.length > 0}
                    onClick={() => settVisKvittering(false)}
                />
            )}
        </div>
    );
}

export { Meldekort };
