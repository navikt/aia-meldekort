import {BodyLong, Button, Heading} from '@navikt/ds-react';
import {Sprak} from '../../types/sprak';
import {lagHentTekstForSprak} from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    onSubmit(): void;
    onCancel(): void;
    sprak: Sprak
}

const TEKSTER = {
  nb: {
    heading: 'Avslutt arbeidssøkerperiode',
    body1: 'Du vil ikke lenger bli bedt om å bekrefte arbeidssøkerstatus. ',
    body2: 'Dersom du ønsker å fortsatt være arbeidssøker må du registrere deg på nytt.',
    confirm: 'Ja, avslutt',
    cancel: 'Nei, avbryt'
  }
}

const BekreftAvsluttPeriode = (props: Props) => {
  const {sprak, onSubmit, onCancel} = props;
  const tekst = lagHentTekstForSprak(TEKSTER, sprak);
  return <>
    <Heading size={'xsmall'}>{tekst('heading')}</Heading>
    <BodyLong className={'my-4'}>
      {tekst('body1')}
      <br/>
      {tekst('body2')}
    </BodyLong>
    <Button variant={'primary'} onClick={onSubmit}>{tekst('confirm')}</Button>
    <Button variant={'tertiary'} className={'ml-4'} onClick={onCancel}>{tekst('cancel')}</Button>
  </>
};

export default BekreftAvsluttPeriode;
