import { useState, useCallback, useEffect } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Request failed!')
    }
    return resData;
}

export default function useHttp(url, config, initialData) {
    console.log('params received for useHttp', url, config);
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const sendRequest = useCallback(
        async function sendRequest(data) {
            console.log('sending request from useCallback', url, config);
            setIsLoading(true);
            try {
                const resData = await sendHttpRequest(url, { ...config, body: JSON.stringify(data) });
                setData(resData);
            } catch (error) {
            setError(error.message || 'Something went wrong!');
            }
            setIsLoading(false);
        }, [url, config]
    );

    useEffect(() => {
        // only for GET requests by default
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest
    };
}





