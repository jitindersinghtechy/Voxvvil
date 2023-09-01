export default async function requestHandler(url,requestDetail = {method:"GET",headers: { "Content-Type": "application/json" }}){
    try {
        const response = await fetch(url, requestDetail);
        const jsonRes = await response.json();
        if (!response.ok) {
            const error = {
                status: response.status,
                statusText: response.statusText,
                message: jsonRes.message || 'Request failed'
            };
            throw error;
        }
        return jsonRes;
    } catch (error) {
        const defaultError = {
            status: 500,
            statusText: 'Internal Server Error',
            message: 'An error occurred'
        };
        const combinedError = { ...defaultError, ...error };
        throw combinedError;
    }
}