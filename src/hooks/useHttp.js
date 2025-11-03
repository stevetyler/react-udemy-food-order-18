import { useState, useCallback, useEffect } from "react";
import { send } from "vite";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Request failed!')
    }
}

export default function useHttp(url, config) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const sendRequest = useCallback(async function sendRequest(url, config) {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, config);
            setData(resData);
        } catch (error) {
           setError(error.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        if (config && config.method === 'GET') {
            sendRequest();
        }
    }, [sendRequest]);

    return {
        data,
        isLoading,
        error,
        sendRequest
    };
}





