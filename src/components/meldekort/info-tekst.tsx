import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyLong } from '@navikt/ds-react';

const TEKSTER = {
    nb: {
        infoText1: 'Hvis du ønsker å være registrert som arbeidssøker hos NAV må du besvare disse spørsmålene. ',
        infoText2: 'Informasjonen brukes i arbeidsmarkedsstatistikken.',
    },
};

const InfoTekst = (props: { sprak: Sprak }) => {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);
    return (
        <BodyLong spacing>
            {tekst('infoText1')}
            <br />
            {tekst('infoText2')}
        </BodyLong>
    );
};

export default InfoTekst;
