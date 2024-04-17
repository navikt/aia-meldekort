import { Alert, BodyLong, Box, Button, Checkbox, Heading, Radio, RadioGroup } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    visIkkeSvartAdvarsel: false | 'warning' | 'error';
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        heading: 'Vil du fortsatt være arbeidssøker?',
        infoText: 'Hvis du ønsker å være registrert som arbeidssøker hos NAV må du besvare disse spørsmålene.\n' +
            'Informasjonen brukes i arbeidsmarkedsstatistikken.',
        beenWorking: 'Har du vært i arbeid i perioden ',
        yes: 'Ja',
        no: 'Nei',
        wantToBeRegistered: 'Jeg vil fortsatt være registrert som arbeidssøker',
        submit: 'Send inn',
        noReply: 'Du har ikke svart',
        alertText1: 'Hvis du ikke svarer i løpet av ',
        alertText2: ', vil du ikke lenger være registrert som arbeidssøker fra '
    },
};

const MeldekortSkjema = (props: Props) => {
    const { visIkkeSvartAdvarsel, sprak } = props;
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
                {visIkkeSvartAdvarsel && (
                    <Alert variant={visIkkeSvartAdvarsel} className={'mb-4'}>
                        <Heading size={'xsmall'}>{tekst('noReply')}</Heading>
                        <BodyLong>
                            {tekst('alertText1')} 20. april{tekst('alertText2')} 20. april
                        </BodyLong>
                    </Alert>
                )}
                <BodyLong spacing>{tekst('infoText')}</BodyLong>
                <RadioGroup
                    legend={`${tekst('beenWorking')} 21.mars - 6. april?`}
                    onChange={(e) => console.log(e)}
                >
                    <Radio value="ja">{tekst('yes')}</Radio>
                    <Radio value="nei">{tekst('no')}</Radio>
                </RadioGroup>

                <Checkbox value="bekreft">{tekst('wantToBeRegistered')}</Checkbox>
                <Button variant="primary" className={'mt-4'}>{tekst('submit')}</Button>
            </div>
        </Box>
    );
};

export default MeldekortSkjema;
