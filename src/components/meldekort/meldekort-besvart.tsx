import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { Alert, BodyLong, BodyShort, Button, Heading, List } from '@navikt/ds-react';
import InfoTekst from './info-tekst';
import { Sprak } from '../../types/sprak';

export interface Props {
    periode: string;
    innsendtDato: string;
    nesteDato: string;
    besvarelse: {
        dato: string;
        harVaertIArbeid: boolean;
        oenskerAaVaereRegistrert: boolean;
    };
    visBekreftelse: boolean;
    onEndreSvar(): void;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        alertHeading: 'Vi har registrert svaret ditt',
        alertBody: 'Hvis du ønsker å endre noe kan du sende inn svaret på nytt.',
        alertHeadingUtmeldt: 'Du er ikke lenger registrert som arbeidssøker',
        alertBodyUtmeldt: 'Hvis du ønsker å endre dette må du registrere deg på nytt',
        heading: 'Har du vært i arbeid i perioden',
        svarteDu: 'svarte du at:',
        vaertIArbeid: 'du har vært i arbeid foregående 14 dager',
        ikkeVaertIArbeid: 'du ikke har vært i arbeid foregående 14 dager',
        onskerAaVaereRegistrert: 'at du ønsker å være registrert som arbeidssøker',
        onskerIkkeAaVaereRegistrert: 'at du ønsker ikke å være registrert som arbeidssøker',
        buttonText: 'Jeg ønsker å endre svarene mine',
        buttonTextUtmeldt: 'Jeg ønsker å registrere meg på nytt',
        nesteGang: 'Neste gang du må svare på meldeplikt er ',
    },
};

const BesvarelseInfo = (props: { sprak: Sprak; besvarelse: Props['besvarelse']; innsendtDato: string }) => {
    const { sprak, besvarelse, innsendtDato } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <>
            <BodyShort>
                {innsendtDato} {tekst('svarteDu')}
            </BodyShort>
            <List size={'small'}>
                <List.Item>{tekst(besvarelse.harVaertIArbeid ? 'vaertIArbeid' : 'ikkeVaertIArbeid')}</List.Item>
                <List.Item>
                    {tekst(
                        besvarelse.oenskerAaVaereRegistrert ? 'onskerAaVaereRegistrert' : 'onskerIkkeAaVaereRegistrert',
                    )}
                </List.Item>
            </List>
        </>
    );
};

const OenskerAaVaereRegistrert = (props: Props) => {
    const { sprak, visBekreftelse, periode, innsendtDato, nesteDato, besvarelse, onEndreSvar } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <>
            {visBekreftelse && (
                <Alert variant={'success'} className={'mb-4'}>
                    <Heading size={'xsmall'}>{tekst('alertHeading')}</Heading>
                    <BodyLong>{tekst('alertBody')}</BodyLong>
                </Alert>
            )}
            <InfoTekst sprak={sprak} />
            <Heading size={'xsmall'} className={'mb-4'}>
                {tekst('heading')} <span className={'text-nowrap'}>{periode}?</span>
            </Heading>
            <div className={'px-4'}>
                <BesvarelseInfo sprak={sprak} besvarelse={besvarelse} innsendtDato={innsendtDato} />
            </div>
            <Button variant={'secondary'} onClick={onEndreSvar}>
                {tekst('buttonText')}
            </Button>
            <Heading size={'xsmall'} className={'mt-4'}>
                {tekst('nesteGang')} {nesteDato}
            </Heading>
        </>
    );
};

const OenskerIkkeAaVaereRegistrert = (props: Props) => {
    const { sprak, visBekreftelse, periode, innsendtDato, besvarelse } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <>
            {visBekreftelse && (
                <Alert variant={'success'} className={'mb-4'}>
                    <Heading size={'xsmall'}>{tekst('alertHeadingUtmeldt')}</Heading>
                    <BodyLong>{tekst('alertBodyUtmeldt')}</BodyLong>
                </Alert>
            )}
            {!visBekreftelse && <InfoTekst sprak={sprak} />}
            <Heading size={'xsmall'} className={'mb-4'}>
                {tekst('heading')} <span className={'text-nowrap'}>{periode}</span>?
            </Heading>
            <div className={'px-4'}>
                <BesvarelseInfo sprak={sprak} besvarelse={besvarelse} innsendtDato={innsendtDato} />
            </div>
            <Button variant={'secondary'} onClick={() => console.log('Jeg ønsker å registrere meg på nytt')}>
                {tekst('buttonTextUtmeldt')}
            </Button>
        </>
    );
};

export const MeldekortBesvart = (props: Props) => {
    const { besvarelse } = props;

    return besvarelse.oenskerAaVaereRegistrert ? (
        <OenskerAaVaereRegistrert {...props} />
    ) : (
        <OenskerIkkeAaVaereRegistrert {...props} />
    );
};
