import { Box, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { MeldekortSkjema } from './meldekort-skjema';
import { Sprak } from '../../types/sprak';
import { useState } from 'react';
import { MeldekortBesvart } from './meldekort-besvart';

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
        heading: 'Vil du fortsatt være arbeidssøker?',
    },
};

function Meldekort(props: Props) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const [harSendtInnBesvarelse, settHarSendtInnBesvarelse] = useState<boolean>(false);

    const [mockBesvarelseBackend, settMockBesvarelseBackend] = useState<any>(props.besvarelse);
    const [endreBesvarelse, settEndreBesvarelse] = useState<boolean>(false);

    const onSubmitSkjema = (besvarelse: any) => {
        settMockBesvarelseBackend(besvarelse);
        settHarSendtInnBesvarelse(true);
        settEndreBesvarelse(false);
    };

    const onCancel = () => {
        settHarSendtInnBesvarelse(false);
        settEndreBesvarelse(false);
    };

    const harBesvarelse = Boolean(mockBesvarelseBackend);

    return (
        <Box
            background="surface-default"
            borderRadius={'xlarge'}
            borderColor={'border-subtle'}
            borderWidth={'1'}
            className={'divide-y divide-gray-300 mb-4'}
        >
            <div className={'pt-4 pb-3 px-5'}>
                <Heading level="3" size="small">
                    {tekst('heading')}
                </Heading>
            </div>
            <div className={'py-4 px-6'}>
                {harBesvarelse && !endreBesvarelse && (
                    <MeldekortBesvart
                        periode={'21.mars - 6. april'}
                        innsendtDato={'06.03'}
                        nesteDato={'20.04'}
                        besvarelse={mockBesvarelseBackend}
                        visBekreftelse={harSendtInnBesvarelse}
                        onEndreSvar={() => settEndreBesvarelse(true)}
                        sprak={sprak}
                    />
                )}
                {(!harBesvarelse || endreBesvarelse) && (
                    <MeldekortSkjema
                        sprak={sprak}
                        fristDato={'20. april'}
                        periode={'21.mars - 6. april'}
                        besvarelse={mockBesvarelseBackend}
                        onSubmit={onSubmitSkjema}
                        onCancel={onCancel}
                    />
                )}
            </div>
        </Box>
    );
}

export { Meldekort };
