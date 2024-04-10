import { BodyLong, Box } from "@navikt/ds-react";

const Meldekort = () => {
    return (
        <Box background="surface-default" padding="6">
            <BodyLong spacing>
                Hvis du er helt eller delvis arbeidsledig eller permittert, kan du ha
                rett til pengestøtte fra NAV.
            </BodyLong>
            <BodyLong spacing>
                NAV kan også gi deg råd og veiledning i situasjonen din.
            </BodyLong>
            <BodyLong spacing>
                Hvis du ikke får dagpenger kan du ha rett til tiltakspenger. Dette er en
                dagsats du får de dagene du deltar på et arbeidsmarkedstiltak. Et
                arbeidsmarkedstiltak kan for eksempel være kurs, jobbklubb eller
                arbeidstrening.
            </BodyLong>
        </Box>
    );
};

export default Meldekort