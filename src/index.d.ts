type PaymentMethods = ("wallet" | "bank_card" | "e-DINAR" | "flouci")[];
type theme = ("light" | "dark")[];
interface initPaymentParams {
	// The currency of the payment.
	// When token is different from TND, we will handle conversion ourlselves so the receiver gets paid in TND.
	token?: "TND" | "EUR" | "USD";
	// The amount to be paid (in Millimes for TND / Centimes for EUR and USD).
	amount: number;
	// The type decides if the payment could be paid partially (partial) or should be paid all at once (immediate).
	type?: "immediate" | "partial";
	// Default: ["wallet","bank_card","e-DINAR"]
	// Items Enum: "wallet" "bank_card" "e-DINAR" "flouci"
	// An array containing the payment methods you wish to get paid with
	acceptedPaymentMethods?: PaymentMethods;
	// Duration before the payment expires, in minutes.
	lifespan?: number;
	// Duration before the payment expires, in minutes.
	checkoutForm?: boolean;
	// Ask the client to pay an extra amount to cover Konnect fees. This will slightly raise the amount of the payment from the payer side.
	addPaymentFeesToAmount?: boolean;
	// The first name of the payer
	firstName?: string;
	// The last name of the payer
	lastName?: string;
	// The phone number of the payer
	phoneNumber?: string;
	// The email of the payer
	email?: string;
	// An identifier that you can give to this order.
	orderId?: string;
	// When the payment is done, Konnect system will send a request to your system on
	// GET WEBHOOK/payments?payment_ref=paymentId
	webhook?: string;
	// A URL to redirect the user to when the payment succeeds.
	// This will be ignored if the webook is activated and not set to silent.
	successUrl?: string;
	// A URL to redirect the user to when the payment fails.
	// This will be ignored if the webook is activated and not set to silent.
	failUrl?: string;
	// Default: "light"
	// Enum: "dark" "light"
	// Theme for the payment gateway
	theme?: string;
}

type PaymentMethods = ("wallet" | "bank_card" | "e-DINAR" | "flouci")[];
type theme = ("light" | "dark")[];
interface initResponse {
	payUrl: string;
	paymentRef: string;
}

interface Config {
	development?: boolean;
}

interface Payment {
	id: string;
	receiverWallet: ReceiverWallet;
	transactions: Transaction[];
	amountDue: number;
	reachedAmount: number;
	amount: number;
	token: string;
	convertedAmount: number;
	exchangeRate: number;
	expirationDate: string;
	shortId: string;
	link: string;
	webhook: string;
	successUrl: string;
	failUrl: string;
	orderId: string;
	type: string;
	status: string;
	details: string;
	acceptedPaymentMethods: string[];
}

interface ReceiverWallet {
	id: string;
	owner: Owner;
	participants: string[];
	type: string;
	name: string;
	phoneNumber: string;
}

interface Owner {
	name: string;
	phoneNumber: string;
	email: string;
	imageURL: string;
	owner: Owner2;
}

interface Owner2 {
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
}

interface Transaction {
	_id: string;
	receiverWallet: ReceiverWallet2;
	senderWallet: SenderWallet;
	token: string;
	amount: number;
	type: string;
	status: string;
	payment: string;
	method: string;
	extSenderInfo: ExtSenderInfo;
}

interface ReceiverWallet2 {
	id: string;
	participants: string[];
	type: string;
	name: string;
	phoneNumber: string;
}

interface SenderWallet {
	id: string;
	participants: any[];
	type: string;
	name: string;
	phoneNumber: string;
}

interface ExtSenderInfo {}
