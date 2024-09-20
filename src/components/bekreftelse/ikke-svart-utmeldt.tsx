import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { Sprak } from '../../types/sprak';
import { BodyLong, Button } from '@navikt/ds-react';

interface Props {
    sprak: Sprak;
    dato: string;
}

const TEKSTER = {
    nb: {
        fra: 'Fra',
        text1: 'er du ikke lenger registert som arbeidssøker.',
        text2: 'Årsaken er du ikke har bekreftet at du fortsatt ønsker å være arbeidssøker.',
        buttonText: 'Jeg ønsker å registrere meg på nytt',
    },
};

const IkkeSvartUtmeldt = (props: Props) => {
    const { sprak, dato } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <>
            <BodyLong>
                {tekst('fra')} {dato} {tekst('text1')}
                <br />
                {tekst('text2')}
            </BodyLong>
            <Button variant={'tertiary'} onClick={() => console.log('ønsker å registrere seg på nytt')}>
                {tekst('buttonText')}
            </Button>
        </>
    );
};

export { IkkeSvartUtmeldt };
