import { useState, useEffect } from "react";

const useFetch = (url, token) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, {
            signal: abortCont.signal,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error("Error fetching the data");
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                if (err.name === "AbortError") {
                    console.log("fetch aborted");
                }
                setIsPending(false);
                setError(err.message);
            });
        return () => abortCont.abort();
    }, [url, token]);

    return { data, isPending, error };
};

export default useFetch;
