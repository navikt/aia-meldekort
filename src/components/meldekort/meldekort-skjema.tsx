import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { Alert, BodyLong, Button, Checkbox, Heading, Radio, RadioGroup } from '@navikt/ds-react';
import InfoTekst from './info-tekst';
import { Sprak } from '../../types/sprak';
import { useEffect, useState } from 'react';

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
    const { visIkkeSvartAdvarsel, sprak, fristDato, periode, besvarelse, onSubmit, onCancel } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const [skjemaState, settSkjemaState] = useState<Skjema>({
        harVaertIArbeid: besvarelse?.harVaertIArbeid,
        oenskerAaVaereRegistrert: Boolean(besvarelse?.oenskerAaVaereRegistrert),
    });
    const [harGyldigSkjema, settHarGyldigSkjema] = useState<boolean>(false);

    useEffect(() => {
        settHarGyldigSkjema(
            Object.values(skjemaState).filter((v) => typeof v !== 'undefined').length ===
                Object.keys(skjemaState).length,
        );
    }, [skjemaState]);

    const visAvbrytKnapp = Boolean(besvarelse);

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
                value={getRadioGroupValue(skjemaState, Boolean(besvarelse))}
                onChange={(e) => settSkjemaState((state) => ({ ...state, harVaertIArbeid: e === 'ja' }))}
            >
                <Radio value="ja">{tekst('yes')}</Radio>
                <Radio value="nei">{tekst('no')}</Radio>
            </RadioGroup>

            <Checkbox
                value="bekreft"
                checked={skjemaState.oenskerAaVaereRegistrert}
                onChange={(e) => settSkjemaState((state) => ({ ...state, oenskerAaVaereRegistrert: e.target.checked }))}
            >
                {tekst('wantToBeRegistered')}
            </Checkbox>
            <Button
                variant="primary"
                className={'mt-4'}
                disabled={!harGyldigSkjema}
                onClick={() => onSubmit(skjemaState as any)}
            >
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
