import { Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { MeldekortSkjema } from './meldekort-skjema';
import { Sprak } from '../../types/sprak';
import { useState } from 'react';
import { MeldekortBesvart } from './meldekort-besvart';
import { Kvittering } from './kvittering';

export interface Props {
    sprak: Sprak;
    besvarelse?: {
        dato: string;
        harVaertIArbeid: boolean;
        oenskerAaVaereRegistrert: boolean;
    };
}

const TEKSTER = {
    nb: {
        heading: 'Bekreft at du fortsatt ønsker å være registrert som arbeidssøker',
    },
};

function Meldekort(props: Props) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const [visKvittering, settVisKvittering] = useState<boolean>(false);
    const [mockBesvarelseBackend, settMockBesvarelseBackend] = useState<any>(props.besvarelse);
    // const [endreBesvarelse, settEndreBesvarelse] = useState<boolean>(false);

    const onSubmitSkjema = (besvarelse: any) => {
        settMockBesvarelseBackend(besvarelse);
        settVisKvittering(true);
        // settEndreBesvarelse(false);
    };

    const onCancel = () => {
        // settHarSendtInnBesvarelse(false);
        // settEndreBesvarelse(false);
    };

    const harBesvarelse = Boolean(props.besvarelse);

    return (
        <div className={'py-4'}>
            <Heading level="1" size="medium" className={'mb-6'}>
                {tekst('heading')}
            </Heading>
            {harBesvarelse && !visKvittering && (
                <MeldekortBesvart
                    periode={'21.mars - 6. april'}
                    innsendtDato={'06.03'}
                    nesteDato={'20.04'}
                    besvarelse={mockBesvarelseBackend}
                    sprak={sprak}
                />
            )}
            {!harBesvarelse && !visKvittering && (
                <MeldekortSkjema
                    sprak={sprak}
                    fristDato={'20. april'}
                    periode={'21.mars - 6. april'}
                    besvarelse={mockBesvarelseBackend}
                    onSubmit={onSubmitSkjema}
                    onCancel={onCancel}
                />
            )}
            {visKvittering && <Kvittering sprak={sprak} erUtmeldt={!mockBesvarelseBackend.oenskerAaVaereRegistrert} />}
        </div>
    );
}

export { Meldekort };
