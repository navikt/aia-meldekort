import { Alert, Button, Heading } from '@navikt/ds-react';
import { Sprak } from '../../types/sprak';
import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    onSubmit(): void;
    onCancel(): void;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        heading: 'Du har svart at du ikke lenger ønsker å være registrert som arbeidssøker',
        confirm: 'Bekreft svar',
        cancel: 'Avbryt og gå tilbake',
    },
};

const BekreftAvsluttPeriode = (props: Props) => {
    const { sprak, onSubmit, onCancel } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <Alert variant={'warning'}>
            <Heading size={'small'} className={'mb-4'}>
                {tekst('heading')}
            </Heading>
            <div className={'my-4'}>
                <Button variant={'secondary-neutral'} onClick={onSubmit} className={'w-full'}>
                    {tekst('confirm')}
                </Button>
            </div>
            <Button variant={'tertiary-neutral'} onClick={onCancel} className={'w-full'}>
                {tekst('cancel')}
            </Button>
        </Alert>
    );
};

export { BekreftAvsluttPeriode };
