import { Box, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { MeldekortSkjema } from './meldekort-skjema';
import { MeldekortBesvart } from './meldekort-besvart';
import { Sprak } from '../../types/sprak';

export interface Props {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        heading: 'Vil du fortsatt være arbeidssøker?',
    },
};

interface Besvarelse {
    harJobbet?: boolean;
    onskerAaVaereRegistrert?: boolean;
    dato: string;
}

function Meldekort(props: Props) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <Box
            background="surface-default"
            borderRadius={'xlarge'}
            borderColor={'border-subtle'}
            borderWidth={'1'}
            className={'divide-y divide-gray-300'}
        >
            <div className={'pt-4 pb-3 px-5'}>
                <Heading level="3" size="small">
                    {tekst('heading')}
                </Heading>
            </div>
            <div className={'py-4 px-6'}>
                {/*<MeldekortBesvart*/}
                {/*    periode={'21.mars - 6. april'}*/}
                {/*    innsendtDato={'06.03'}*/}
                {/*    nesteDato={'20.04'}*/}
                {/*    vaertIArbeid={true}*/}
                {/*    onskerAaVaereRegistrert={true}*/}
                {/*    visAlertBoks={false}*/}
                {/*    onEndreSvar={() => console.log('endre')}*/}
                {/*    sprak={sprak}*/}
                {/*/>*/}
                <MeldekortSkjema sprak={sprak} />
            </div>
        </Box>
    );
}

export { Meldekort };
