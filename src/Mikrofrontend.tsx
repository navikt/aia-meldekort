import { Meldekort } from './components/meldekort/meldekort';
import './index.css';

function Mikrofrontend() {
    return (
        <Meldekort
            sprak={'nb'}
            sistInnsendteBekreftelse={undefined}
            tilgjengeligeBekreftelser={undefined}
            erAktivArbeidssoker={true}
        />
    );
}

export default Mikrofrontend;
