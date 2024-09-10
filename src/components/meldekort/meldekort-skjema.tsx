import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { Alert, BodyLong, Button, Heading, Radio, RadioGroup } from '@navikt/ds-react';
import InfoTekst from './info-tekst';
import { Sprak } from '../../types/sprak';
import { useEffect, useState } from 'react';
import { BekreftAvsluttPeriode } from './bekreft-avslutt-periode';
import prettyPrintDato from '../../lib/pretty-print-dato';

export interface Props {
    visIkkeSvartAdvarsel?: 'warning' | 'error';
    sprak: Sprak;
    fristDato: string;
    gjelderFra: string;
    gjelderTil: string;
    onSubmit(data: { harVaertIArbeid: boolean; oenskerAaVaereRegistrert: boolean }): void;
    onCancel(): void;
}

const TEKSTER = {
    nb: {
        beenWorking: 'Har du vært i arbeid i perioden ',
        yes: 'Ja',
        no: 'Nei',
        wantToBeRegistered: 'Vil du fortsatt være registrert som arbeidssøker?',
        submit: 'Send inn',
        cancel: 'Avbryt',
        noReply: 'Du har ikke svart',
        alertText1: 'Hvis du ikke svarer i løpet av ',
        alertText2: ', vil du ikke lenger være registrert som arbeidssøker fra ',
    },
};

interface Skjema {
    harVaertIArbeid?: boolean;
    oenskerAaVaereRegistrert?: boolean;
}

const getRadioGroupValue = (skjemaVerdi: boolean | undefined) => {
    if (typeof skjemaVerdi === 'undefined') {
        return;
    }

    return skjemaVerdi ? 'ja' : 'nei';
};

const MeldekortSkjema = (props: Props) => {
    const { visIkkeSvartAdvarsel, sprak, fristDato, gjelderFra, gjelderTil, onCancel } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const [skjemaState, settSkjemaState] = useState<Skjema>({
        harVaertIArbeid: undefined,
        oenskerAaVaereRegistrert: undefined,
    });

    const [harGyldigSkjema, settHarGyldigSkjema] = useState<boolean>(false);
    const [visBekreftAvsluttPeriode, settVisBekreftAvsluttPeriode] = useState<boolean>(false);

    useEffect(() => {
        settHarGyldigSkjema(
            Object.values(skjemaState).filter((v) => typeof v !== 'undefined').length ===
                Object.keys(skjemaState).length,
        );
    }, [skjemaState]);

    const onSubmit = () => {
        if (!skjemaState.oenskerAaVaereRegistrert) {
            settVisBekreftAvsluttPeriode(true);
            return;
        }

        props.onSubmit(skjemaState as any);
    };

    if (visBekreftAvsluttPeriode) {
        return (
            <BekreftAvsluttPeriode
                onSubmit={() => props.onSubmit(skjemaState as any)}
                onCancel={() => {
                    settVisBekreftAvsluttPeriode(false);
                }}
                sprak={sprak}
            />
        );
    }

    const periode = `${prettyPrintDato(gjelderFra)} - ${prettyPrintDato(gjelderTil)}`;

    return (
        <>
            {visIkkeSvartAdvarsel && (
                <Alert variant={visIkkeSvartAdvarsel} className={'mb-4'}>
                    <Heading size={'xsmall'}>{tekst('noReply')}</Heading>
                    <BodyLong>
                        {tekst('alertText1')} {prettyPrintDato(fristDato)}
                        {tekst('alertText2')} {prettyPrintDato(fristDato)}
                    </BodyLong>
                </Alert>
            )}

            <InfoTekst sprak={sprak} />
            <RadioGroup
                legend={`${tekst('beenWorking')} ${periode}?`}
                value={getRadioGroupValue(skjemaState.harVaertIArbeid)}
                onChange={(e) => settSkjemaState((state) => ({ ...state, harVaertIArbeid: e === 'ja' }))}
                className={'mb-4'}
            >
                <Radio value="ja" checked={skjemaState.harVaertIArbeid === true}>
                    {tekst('yes')}
                </Radio>
                <Radio value="nei" checked={skjemaState.harVaertIArbeid === false}>
                    {tekst('no')}
                </Radio>
            </RadioGroup>
            <RadioGroup
                legend={`${tekst('wantToBeRegistered')}`}
                value={getRadioGroupValue(skjemaState.oenskerAaVaereRegistrert)}
                onChange={(e) => settSkjemaState((state) => ({ ...state, oenskerAaVaereRegistrert: e === 'ja' }))}
                className={'mb-4'}
            >
                <Radio value="ja">{tekst('yes')}</Radio>
                <Radio value="nei">{tekst('no')}</Radio>
            </RadioGroup>
            <Button variant="primary" disabled={!harGyldigSkjema} onClick={onSubmit}>
                {tekst('submit')}
            </Button>
            <Button className={'ml-4'} variant={'tertiary'} onClick={onCancel}>
                {tekst('cancel')}
            </Button>
        </>
    );
};

export { MeldekortSkjema };
