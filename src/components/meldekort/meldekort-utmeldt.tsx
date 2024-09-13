import { Sprak } from '../../types/sprak';
import { Button, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { registrerArbeidssokerUrl } from '../../urls';

interface Props {
    sprak: Sprak;
}
const TEKSTER = {
    nb: {
        heading: 'Du er ikke registert som aktiv arbeidssøker',
        buttonText: 'Jeg ønsker å registrere meg på nytt',
    },
};
const MeldekortUtmeldt = (props: Props) => {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const onClick = () => {
        // TODO: amplitude logging
        window.location.href = registrerArbeidssokerUrl;
    };

    return (
        <div className={'py-4'}>
            <Heading level="1" size="medium" className={'mb-6'}>
                {tekst('heading')}
            </Heading>
            <Button variant={'secondary'} onClick={onClick}>
                {tekst('buttonText')}
            </Button>
        </div>
    );
};

export { MeldekortUtmeldt };
