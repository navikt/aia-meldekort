import { Sprak } from '../../types/sprak';
import { Button, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { registrerArbeidssokerUrl } from '../../urls';
import { useEffect } from 'react';
import { loggAktivitet, loggVisning } from '../../lib/amplitude';

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
        loggAktivitet({ aktivitet: 'Trykker på "Jeg ønsker å registrere meg på nytt"' });
        window.location.href = registrerArbeidssokerUrl;
    };

    useEffect(() => {
        loggVisning({ viser: 'IkkeAktivArbeidssøker' });
    }, []);

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
