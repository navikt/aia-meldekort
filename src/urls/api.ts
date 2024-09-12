import { aiaBackendUrl } from './index';

export const AIA_BACKEND = aiaBackendUrl,
    BEKREFTELSE_URL = `${AIA_BACKEND}/bekreftelse`,
    TILGJENGELIGE_BEKREFTELSER = `${AIA_BACKEND}/tilgjengelige-bekreftelser`,
    SISTE_INNSENDTE_BEKREFTELSE = `${AIA_BACKEND}/siste-innsendte-bekreftelse`,
    ARBEIDSOKERPERIODER_URL = `${AIA_BACKEND}/arbeidssokerregisteret/v1/arbeidssoekerperioder`;
