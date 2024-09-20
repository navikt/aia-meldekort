import { Alert } from '@navikt/ds-react';
import { FallbackProps } from 'react-error-boundary';
import { useEffect } from 'react';
import { loggVisning } from '../../lib/amplitude';

export const ErrorBoundaryFeil = (props: FallbackProps) => {
    const { error } = props;

    useEffect(() => {
        loggVisning({ viser: 'ErrorBoundaryFeil', error: error?.message });
    }, []);

    return <Alert variant={'error'}>Noe gikk dessverre galt</Alert>;
};
