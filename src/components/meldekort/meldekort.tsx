import {BodyLong, Box, Button, Checkbox, Heading, Radio, RadioGroup} from "@navikt/ds-react";

const Meldekort = () => {
    const handleChange = e => console.log(e);
    return (
        <Box background="surface-default" padding="6">
            <div>
                <Heading level="3" size="medium">
                    Vil du fortsatt være arbeidssøker?
                    </Heading>
            </div>
            <BodyLong spacing>
                Hvis du ønsker å være registrert som arbeidssøker hos NAV må du besvare disse spørsmålene. Informasjonen brukes i arbeidsmarkedsstatistikken.
            </BodyLong>

            <RadioGroup legend="Har du vært i arbeid i perioden ...." onChange={handleChange}>
                <Radio value="ja">Ja</Radio>
                <Radio value="nei">Nei</Radio>
            </RadioGroup>

            <Checkbox value="bekreft">Jeg vil fortsatt være registrert som arbeidssøker</Checkbox>
            <Button variant="primary">Send inn</Button>
        </Box>
    );
};

export default Meldekort