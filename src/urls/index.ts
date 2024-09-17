const isProduction = window.location.href.includes('www.nav.no');
const isDevelopment = window.location.href.includes('.dev.nav.no');

export const getEnvironment = () => {
    if (isProduction) {
        return 'production';
    }

    if (isDevelopment) {
        return 'development';
    }

    return 'local';
};

const AIA_BACKEND_URL = {
    local: 'http://localhost:3000/aia-backend',
    development: 'https://www.intern.dev.nav.no/aia-backend',
    production: 'https://www.nav.no/aia-backend',
};

const REGISTRER_ARBEIDSSOKER_URL = {
    local: 'https://arbeid.intern.dev.nav.no/arbeid/registrering',
    development: 'https://arbeid.intern.dev.nav.no/arbeid/registrering',
    production: 'https://www.nav.no/arbeid/registrering',
};

const BEKREFTELSE_API_URL = {
    local: 'http://localhost:3000/bekreftelse',
    development: 'https://bekreftelse-arbeidssoekerregisteret.intern.dev.nav.no',
    production: 'https://bekreftelse-arbeidssoekerregisteret.intern.nav.no',
};

export const aiaBackendUrl = AIA_BACKEND_URL[getEnvironment()];
export const registrerArbeidssokerUrl = REGISTRER_ARBEIDSSOKER_URL[getEnvironment()];
export const bekreftelseApiUrl = BEKREFTELSE_API_URL[getEnvironment()];
