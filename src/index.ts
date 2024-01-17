/// <reference path="./index.d.ts" />

/**
 * Represents the Konnect class for handling payment-related operations.
 */
class Konnect {
    /**
     * The API endpoint for making requests.
     */
    private endpoint: string;

    /**
     * The access token for authenticating API requests.
     */
    private accessToken: string;

    /**
     * The wallet ID of the receiver.
     */
    private receiverWalletId: string;

    /**
     * Creates an instance of Konnect.
     * @param {string} accessToken - The access token for authentication.
     * @param {string} receiverWalletId - The wallet ID of the receiver.
     * @param {Config} [config={}] - Additional configuration options.
     * @param {boolean} [config.development=false] - Set to true for using the pre-production API endpoint.
     */
    constructor(
        accessToken: string,
        receiverWalletId: string,
        config: Config = {}
    ) {
        this.accessToken = accessToken;
        this.receiverWalletId = receiverWalletId;
        this.endpoint = config.development
            ? "https://api.preprod.konnect.network/api/v2"
            : "https://api.konnect.network/api/v2";
    }

    /**
     * Handles common error scenarios and throws appropriate errors.
     * @param {Response} response - The HTTP response object.
     * @throws {Error} Throws an error with a descriptive message based on the HTTP status code.
     */
    private handleErrors(response: Response): void {
        switch (response.status) {
            case 401:
                throw new Error("Unauthorized: The provided access token is invalid or expired.");
            case 403:
                throw new Error("Forbidden: You do not have permission to access this resource.");
            case 404:
                throw new Error("Not Found: The requested resource could not be found.");
            case 422:
                throw new Error("Unprocessable Entity: The request parameters are invalid.");
            case 502:
                throw new Error("Bad Gateway: The server received an invalid response from an upstream server.");
        }
    }

    /**
     * Initiates a new payment and returns a payment link.
     * @param {initPaymentParams} params - Parameters for initiating the payment.
     * @returns {Promise<initResponse>} A promise that resolves to the initiation response.
     * @throws {Error} Throws an error with a descriptive message if the API request fails.
     */
    async initializePayment(params: initPaymentParams): Promise<initResponse> {
        const data = {
            receiverWalletId: this.receiverWalletId,
            ...params,
        };

        const headers = new Headers({
            "Accept": "*/*",
            "Content-Type": "application/json",
            "x-api-key": this.accessToken,
        });

        const response = await fetch(this.endpoint + "/payments/init-payment", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });

        this.handleErrors(response);

        if (!response.ok) {
            throw new Error("Failed to initialize payment."); // Add a meaningful error message
        }

        const json = await response.json();
        return json;
    }

    /**
     * Retrieves payment details for a specific transaction.
     * @param {string} paymentId - The ID of the transaction for which payment details are requested.
     * @returns {Promise<PaymentDetails>} A promise that resolves to the payment details.
     * @throws {Error} Throws an error with a descriptive message if the API request fails.
     */
    async getPaymentDetails(paymentId: string): Promise<Payment> {
        const response = await fetch(this.endpoint + "/payments/" + paymentId);

        this.handleErrors(response);

        if (!response.ok) {
            throw new Error("Failed to get payment details."); // Add a meaningful error message
        }

        const json = await response.json();
        return json.payment;
    }
}