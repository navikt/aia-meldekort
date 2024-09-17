import { aiaBackendUrl, bekreftelseApiUrl } from './index';

export const AIA_BACKEND = aiaBackendUrl,
    BEKREFTELSE_URL = `${bekreftelseApiUrl}/api/v1/bekreftelse`,
    TILGJENGELIGE_BEKREFTELSER = `${bekreftelseApiUrl}/api/v1/tilgjengelige-bekreftelser`,
    SISTE_INNSENDTE_BEKREFTELSE = `${AIA_BACKEND}/siste-innsendte-bekreftelse`,
    ARBEIDSOKERPERIODER_URL = `${AIA_BACKEND}/arbeidssokerregisteret/v1/arbeidssoekerperioder`;
