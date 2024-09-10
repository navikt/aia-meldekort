import { sorterEtterEldsteFoerst } from './sorter-etter-eldste-foerst';

describe('Sorter tilgjengelige bekreftelser etter eldste først', () => {
    test('gir tom array tilbake for tom input', () => {
        expect(sorterEtterEldsteFoerst(undefined)).toEqual([]);
    });

    test('sorterer etter eldste først', () => {
        expect(
            sorterEtterEldsteFoerst([
                { gjelderFra: '2024-09-01', gjelderTil: '2024-09-09', bekreftelsesId: '1' },
                { gjelderFra: '2023-09-01', gjelderTil: '2023-09-09', bekreftelsesId: '0' },
            ]),
        ).toEqual([
            { gjelderFra: '2023-09-01', gjelderTil: '2023-09-09', bekreftelsesId: '0' },
            { gjelderFra: '2024-09-01', gjelderTil: '2024-09-09', bekreftelsesId: '1' },
        ]);
    });
});
