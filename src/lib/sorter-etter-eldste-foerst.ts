import { MeldekortProps } from '../components/meldekort/meldekort';

export function sorterEtterEldsteFoerst(tilgjengeligeBekreftelser: MeldekortProps['tilgjengeligeBekreftelser']) {
    if (!tilgjengeligeBekreftelser || tilgjengeligeBekreftelser.length === 0) {
        return [];
    }

    return tilgjengeligeBekreftelser.sort((a, b) => {
        return new Date(a.gjelderFra).getTime() - new Date(b.gjelderFra).getTime();
    });
}
