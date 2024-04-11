import {BodyLong, Box, Button, Checkbox, Heading, Radio, RadioGroup} from '@navikt/ds-react';

const Meldekort = () => {
  return (
        <Box background="surface-default" borderRadius={'xlarge'} borderColor={'border-subtle'} borderWidth={'1'} className={'divide-y divide-gray-300'}>
            <div className={'py-4 px-6'}>
                <Heading level="3" size="medium">
                    Vil du fortsatt være arbeidssøker?
                    </Heading>
            </div>
          <div className={'py-4 px-6'}>
            <BodyLong spacing>
                Hvis du ønsker å være registrert som arbeidssøker hos NAV må du besvare disse spørsmålene. Informasjonen brukes i arbeidsmarkedsstatistikken.
            </BodyLong>

            <RadioGroup legend="Har du vært i arbeid i perioden 21.mars - 6. april?" onChange={e => console.log(e)}>
                <Radio value="ja">Ja</Radio>
                <Radio value="nei">Nei</Radio>
            </RadioGroup>

            <Checkbox value="bekreft">Jeg vil fortsatt være registrert som arbeidssøker</Checkbox>
            <Button variant="primary">Send inn</Button>
          </div>
        </Box>
    );
};

export default Meldekort
