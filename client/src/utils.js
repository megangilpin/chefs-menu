// src: https://davidwalsh.name/cancel-fetch
// docs: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
const abortableFetch = (request, opts) => {
    const controller = new AbortController();
    const signal = controller.signal;

    return {
        abort: () => controller.abort(),
        ready: fetch(request, { ...opts, signal }),
    };
};

// If we know it's been canceled! do nothing
const consoleErrorNonAbortErrors = (e) =>
    e.name !== "AbortError" && console.error(e);

export { abortableFetch, consoleErrorNonAbortErrors };
