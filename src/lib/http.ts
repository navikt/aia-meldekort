type Opts = {
    method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
    headers?: Record<string, string>;
    body?: string;
};

type Fetch<T> = (url: string, opts?: Opts) => Promise<T>;

interface ApiError extends Error {
    data?: any;
    status: number;
}

const fetcher: Fetch<any> = async (url, opts = {}) => {
    const response = await fetch(url, {
        method: opts?.method ?? 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            ...(opts?.headers ?? {}),
        },
        body: opts.body ?? null,
    });
    const isJsonResponse = /application\/json/.test(response.headers.get('Content-Type') ?? '');

    if (response.ok) {
        if (response.status === 204 || !isJsonResponse) {
            return null;
        }
        return response.json();
    } else {
        const error = new Error(response.statusText) as ApiError;
        error.status = response.status;
        error.data = isJsonResponse ? await response.json() : undefined;
        throw error;
    }
};

export default fetcher;
