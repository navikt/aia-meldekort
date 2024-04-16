import { Alert, BodyLong, Box, Button, Checkbox, Heading, Radio, RadioGroup } from '@navikt/ds-react';

interface Props {
    visIkkeSvartAdvarsel: false | 'warning' | 'error';
}

const MeldekortSkjema = (props: Props) => {
    const { visIkkeSvartAdvarsel } = props;

    return (
        <Box
            background="surface-default"
            borderRadius={'xlarge'}
            borderColor={'border-subtle'}
            borderWidth={'1'}
            className={'divide-y divide-gray-300'}
        >
            <div className={'pt-3 pb-4 px-5'}>
                <Heading level="3" size="small">
                    Vil du fortsatt være arbeidssøker?
                </Heading>
            </div>
            <div className={'py-4 px-6'}>
                {visIkkeSvartAdvarsel && (
                    <Alert variant={visIkkeSvartAdvarsel} className={'mb-4'}>
                        <Heading size={'xsmall'}>Du har ikke svart</Heading>
                        <BodyLong>
                            Hvis du ikke svarer i løpet av 20. april vil du ikke lenger være registrert som arbeidssøker
                            fra 20. april
                        </BodyLong>
                    </Alert>
                )}
                <BodyLong spacing>
                    Hvis du ønsker å være registrert som arbeidssøker hos NAV må du besvare disse spørsmålene.
                    Informasjonen brukes i arbeidsmarkedsstatistikken.
                </BodyLong>

                <RadioGroup
                    legend="Har du vært i arbeid i perioden 21.mars - 6. april?"
                    onChange={(e) => console.log(e)}
                >
                    <Radio value="ja">Ja</Radio>
                    <Radio value="nei">Nei</Radio>
                </RadioGroup>

                <Checkbox value="bekreft">Jeg vil fortsatt være registrert som arbeidssøker</Checkbox>
                <Button variant="primary" className={'mt-4'}>
                    Send inn
                </Button>
            </div>
        </Box>
    );
};

export default MeldekortSkjema;
