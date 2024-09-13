import { Alert } from '@navikt/ds-react';
import { FallbackProps } from 'react-error-boundary';
import { useEffect } from 'react';

export const ErrorBoundaryFeil = (props: FallbackProps) => {
    const { error } = props;

    useEffect(() => {
        // TODO: loggVisning({ viser: 'ErrorBoundaryFeil', error: error?.message });
        console.error('ErrorBoundaryFeil', error);
    }, []);

    return <Alert variant={'error'}>Noe gikk dessverre galt</Alert>;
};
