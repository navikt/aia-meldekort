import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { Alert, BodyLong, Button, Checkbox, Heading, Radio, RadioGroup } from '@navikt/ds-react';
import InfoTekst from './info-tekst';
import { Sprak } from '../../types/sprak';
import { useEffect, useState } from 'react';
import BekreftAvsluttPeriode from './bekreft-avslutt-periode';

export interface Props {
    visIkkeSvartAdvarsel?: 'warning' | 'error';
    sprak: Sprak;
    besvarelse?: {
        dato: string;
        harVaertIArbeid: boolean;
        oenskerAaVaereRegistrert: boolean;
    };
    fristDato: string;
    periode: string;
    onSubmit(data: { harVaertIArbeid: boolean; oenskerAaVaereRegistrert: boolean }): void;
    onCancel(): void;
}

const TEKSTER = {
    nb: {
        beenWorking: 'Har du vært i arbeid i perioden ',
        yes: 'Ja',
        no: 'Nei',
        wantToBeRegistered: 'Jeg vil fortsatt være registrert som arbeidssøker',
        submit: 'Send inn',
        cancel: 'Avbryt',
        noReply: 'Du har ikke svart',
        alertText1: 'Hvis du ikke svarer i løpet av ',
        alertText2: ', vil du ikke lenger være registrert som arbeidssøker fra ',
    },
};

interface Skjema {
    harVaertIArbeid?: boolean;
    oenskerAaVaereRegistrert: boolean;
}

const getRadioGroupValue = (skjema: Skjema, harBesvarelse: boolean) => {
    if (!harBesvarelse) {
        return;
    }

    return skjema.harVaertIArbeid ? 'ja' : 'nei';
};

const MeldekortSkjema = (props: Props) => {
    const { visIkkeSvartAdvarsel, sprak, fristDato, periode, besvarelse, onCancel } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const [skjemaState, settSkjemaState] = useState<Skjema>({
        harVaertIArbeid: besvarelse?.harVaertIArbeid,
        oenskerAaVaereRegistrert: Boolean(besvarelse?.oenskerAaVaereRegistrert),
    });

    const [harGyldigSkjema, settHarGyldigSkjema] = useState<boolean>(false);
    const [visBekreftAvsluttPeriode, settVisBekreftAvsluttPeriode] = useState<boolean>(false);
    const [harAvbruttUtmelding, settHarAvbruttUtmelding] = useState<boolean>(false);
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

    const visAvbrytKnapp = Boolean(besvarelse);

    if (visBekreftAvsluttPeriode) {
        return (
            <BekreftAvsluttPeriode
                onSubmit={() => props.onSubmit(skjemaState as any)}
                onCancel={() => {
                    settVisBekreftAvsluttPeriode(false);
                    settHarAvbruttUtmelding(true);
                }}
                sprak={sprak}
            />
        );
    }

    return (
        <>
            {visIkkeSvartAdvarsel && (
                <Alert variant={visIkkeSvartAdvarsel} className={'mb-4'}>
                    <Heading size={'xsmall'}>{tekst('noReply')}</Heading>
                    <BodyLong>
                        {tekst('alertText1')} {fristDato}
                        {tekst('alertText2')} {fristDato}
                    </BodyLong>
                </Alert>
            )}

            <InfoTekst sprak={sprak} />
            <RadioGroup
                legend={`${tekst('beenWorking')} ${periode}?`}
                value={getRadioGroupValue(skjemaState, Boolean(besvarelse) || harAvbruttUtmelding)}
                onChange={(e) => settSkjemaState((state) => ({ ...state, harVaertIArbeid: e === 'ja' }))}
            >
                <Radio value="ja" checked={skjemaState.harVaertIArbeid === true}>{tekst('yes')}</Radio>
                <Radio value="nei" checked={skjemaState.harVaertIArbeid === false}>{tekst('no')}</Radio>
            </RadioGroup>

            <Checkbox
                checked={skjemaState.oenskerAaVaereRegistrert}
                onChange={(e) => settSkjemaState((state) => ({ ...state, oenskerAaVaereRegistrert: e.target.checked }))}
            >
                {tekst('wantToBeRegistered')}
            </Checkbox>
            <Button variant="primary" className={'mt-4'} disabled={!harGyldigSkjema} onClick={onSubmit}>
                {tekst('submit')}
            </Button>
            {visAvbrytKnapp && (
                <Button className={'ml-4'} variant={'tertiary'} onClick={onCancel}>
                    {tekst('cancel')}
                </Button>
            )}
        </>
    );
};

export { MeldekortSkjema };
