# Konnect Payment Library

The Konnect Payment Library is a JavaScript library for handling payment-related operations using the Konnect API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use the Konnect Payment Library in your project, you can include it via a script tag or install it using a package manager:

### Script Tag

```html
<script src="path/to/konnect-sdk.js"></script>
```

## Usage

```js
// Import the Konnect class
const Konnect = require('konnect-sdk');

// Create an instance of Konnect
const konnect = new Konnect(
    "your-access-token",
    "your-receiver-wallet-id",
    { development: true } // Set to true for using the pre-production API endpoint
);

// Initialize a payment
konnect.initializePayment({ amount: 500 })
    .then(response => console.log(response))
    .catch(error => console.error(error));

// Get payment details
konnect.getPaymentDetails("your-payment-id")
    .then(paymentDetails => console.log(paymentDetails))
    .catch(error => console.error(error));
```

## API Reference

### `Konnect`

#### `constructor(accessToken: string, receiverWalletId: string, config: Config = {})`

Creates an instance of the Konnect class.

- `accessToken` (string): The access token for authentication.
- `receiverWalletId` (string): The wallet ID of the receiver.
- `config` (object): Additional configuration options.
  - `development` (boolean, default: `false`): Set to `true` for using the pre-production API endpoint.

#### `initializePayment(params: initPaymentParams): Promise<initResponse>`

Initiates a new payment and returns a payment link.

- `params` (object): Parameters for initiating the payment.
- Returns a Promise that resolves to the initiation response.

#### `getPaymentDetails(paymentId: string): Promise<PaymentDetails>`

Retrieves payment details for a specific transaction.

- `paymentId` (string): The ID of the transaction for which payment details are requested.
- Returns a Promise that resolves to the payment details.


## Error Handling

The library throws `Error` instances with descriptive messages for various error scenarios:

- **Unauthorized (401):**
  - Message: "Unauthorized: The provided access token is invalid or expired."

- **Forbidden (403):**
  - Message: "Forbidden: You do not have permission to access this resource."

- **Not Found (404):**
  - Message: "Not Found: The requested resource could not be found."

- **Unprocessable Entity (422):**
  - Message: "Unprocessable Entity: The request parameters are invalid."

- **Bad Gateway (502):**
  - Message: "Bad Gateway: The server received an invalid response from an upstream server."

For all other HTTP status codes, the library will throw an `Error` with a default message: "Failed to perform the operation." Adjust the error messages as needed in your specific context.
