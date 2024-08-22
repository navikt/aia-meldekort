import { Alert, BodyLong, Heading, Link } from '@navikt/ds-react';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { Sprak } from '../../types/sprak';

export interface Props {
    sprak: Sprak;
    erUtmeldt: boolean;
}

const TEKSTER = {
    nb: {
        alertHeading: 'Vi har registrert svaret ditt',
        alertBody: 'Du har status som arbeidssøker hos NAV frem til (dato).',
        alertHeadingUtmeldt: 'Du er ikke lenger registrert som arbeidssøker',
        alertBodyUtmeldt: 'Hvis du ønsker å endre dette må du registrere deg på nytt',
        linkText: 'Gå tilbake til min side',
    },
};

const Kvittering = (props: Props) => {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <>
            {props.erUtmeldt ? (
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
            <Link href={`${location.origin}/minside`}>{tekst('linkText')}</Link>
        </>
    );
};

export { Kvittering };
