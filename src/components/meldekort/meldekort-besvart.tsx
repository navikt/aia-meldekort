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
        heading: 'Har du vært i arbeid i perioden',
        svarteDu: 'svarte du at',
        vaertIArbeid: 'du har vært i arbeid foregående 14 dager',
        ikkeVaertIArbeid: 'du ikke har vært i arbeid foregående 14 dager',
        onskerAaVaereRegistrert: 'at du ønsker å være registrert som arbeidssøker',
        onskerIkkeAaVaereRegistrert: 'at du ønsker ikke å være registrert som arbeidssøker',
        buttonText: 'Jeg ønsker å endre svarene mine',
        nesteGang: 'Neste gang du må svare på meldeplikt er ',
    },
};

export const MeldekortBesvart = (props: Props) => {
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
            <Heading size={'xsmall'}>
                {tekst('heading')} {periode}
            </Heading>
            <div className={'px-6 py-4'}>
                <BodyShort>
                    {innsendtDato} {tekst('svarteDu')}
                </BodyShort>
                <List size={'small'}>
                    <List.Item>{tekst(besvarelse.harVaertIArbeid ? 'vaertIArbeid' : 'ikkeVaertIArbeid')}</List.Item>
                    <List.Item>
                        {tekst(
                            besvarelse.oenskerAaVaereRegistrert
                                ? 'onskerAaVaereRegistrert'
                                : 'onskerIkkeAaVaereRegistrert',
                        )}
                    </List.Item>
                </List>
                <Button variant={'tertiary'} onClick={onEndreSvar}>
                    {tekst('buttonText')}
                </Button>
                <Heading size={'xsmall'}>
                    {tekst('nesteGang')} {nesteDato}
                </Heading>
            </div>
        </>
    );
};
