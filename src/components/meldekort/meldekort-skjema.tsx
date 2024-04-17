import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { Alert, BodyLong, Button, Checkbox, Heading, Radio, RadioGroup } from '@navikt/ds-react';
import InfoTekst from './info-tekst';
import {Sprak} from '../../types/sprak';

export interface Props {
    visIkkeSvartAdvarsel?: 'warning' | 'error';
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        beenWorking: 'Har du vært i arbeid i perioden ',
        yes: 'Ja',
        no: 'Nei',
        wantToBeRegistered: 'Jeg vil fortsatt være registrert som arbeidssøker',
        submit: 'Send inn',
        noReply: 'Du har ikke svart',
        alertText1: 'Hvis du ikke svarer i løpet av ',
        alertText2: ', vil du ikke lenger være registrert som arbeidssøker fra ',
    },
};

const MeldekortSkjema = (props: Props) => {
    const { visIkkeSvartAdvarsel, sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <>
            {visIkkeSvartAdvarsel && (
                <Alert variant={visIkkeSvartAdvarsel} className={'mb-4'}>
                    <Heading size={'xsmall'}>{tekst('noReply')}</Heading>
                    <BodyLong>
                        {tekst('alertText1')} 20. april{tekst('alertText2')} 20. april
                    </BodyLong>
                </Alert>
            )}

            <InfoTekst sprak={sprak} />
            <RadioGroup legend={`${tekst('beenWorking')} 21.mars - 6. april?`} onChange={(e) => console.log(e)}>
                <Radio value="ja">{tekst('yes')}</Radio>
                <Radio value="nei">{tekst('no')}</Radio>
            </RadioGroup>

            <Checkbox value="bekreft">{tekst('wantToBeRegistered')}</Checkbox>
            <Button variant="primary" className={'mt-4'}>
                {tekst('submit')}
            </Button>
        </>
    );
};

export { MeldekortSkjema };
