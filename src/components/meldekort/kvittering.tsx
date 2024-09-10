import { Alert, BodyLong, Button, Heading, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { Sprak } from '../../types/sprak';

export interface Props {
    sprak: Sprak;
    erUtmeldt: boolean;
    harFlereBekreftelser: boolean;
    onClick(): void;
}

const TEKSTER = {
    nb: {
        alertHeading: 'Vi har registrert svaret ditt',
        alertBody: 'Du har bekreftet status som arbeidssøker hos NAV.',
        alertHeadingUtmeldt: 'Du er ikke lenger registrert som arbeidssøker',
        alertBodyUtmeldt: 'Hvis du ønsker å endre dette må du registrere deg på nytt',
        linkText: 'Gå tilbake til min side',
        buttonText: 'Bekreft neste periode',
    },
};

const Kvittering = (props: Props) => {
    const { sprak, erUtmeldt, harFlereBekreftelser, onClick } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <>
            {erUtmeldt ? (
                <Alert variant={'info'} className={'mb-4'}>
                    <Heading size={'xsmall'}>{tekst('alertHeadingUtmeldt')}</Heading>
                    <BodyLong>{tekst('alertBodyUtmeldt')}</BodyLong>
                </Alert>
            ) : (
                <Alert variant={'success'} className={'mb-4'}>
                    <Heading size={'xsmall'}>{tekst('alertHeading')}</Heading>
                    <BodyLong>{tekst('alertBody')}</BodyLong>
                </Alert>
            )}
            {harFlereBekreftelser ? (
                <Button variant={'secondary'} onClick={onClick}>
                    {tekst('buttonText')}
                </Button>
            ) : (
                <Link href={`${location.origin}/minside`}>{tekst('linkText')}</Link>
            )}
        </>
    );
};

export { Kvittering };
