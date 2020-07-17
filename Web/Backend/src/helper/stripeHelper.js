/**
 * Stripe helper file
 *
 * @package   backend/src/helper
 * @author    Taras <streaming9663@gmail.com>
 * @copyright 2020 Say Digital Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly/
 */

const dotenv = require('dotenv')
dotenv.config()

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const stripeHelper = {
    createCustomer: createCustomer,
    createCustomerSource: createCustomerSource,
    createCharge: createCharge,
    sendStripeEmail: sendStripeEmail
}

function createCustomer(email) {
    return new Promise((resolve, reject) => {
        stripe.customers.create({
            email: email
        }).then((customer) => {
            resolve(customer)
        }).catch((err) => {
            console.log('createCustomer error == ', err)
            reject(err)
        });
    });
}

function createCustomerSource(stripeCustomerId, cardToken){
    return new Promise(async (resolve, reject) => {
        try {
            const source = await stripe.customers.createSource(stripeCustomerId,
                {
                    source: cardToken
                }
            );
            resolve(source);
        } catch (error) {
            reject(error);
        }
    });
}

function createCharge(amount, stripeCustomerId, description, currency = 'usd') {
    return new Promise(async (resolve, reject) => {
        try {
            const chargeResponse = await stripe.charges.create({
                amount,
                currency,
                customer: stripeCustomerId,
                description
            });
            resolve(chargeResponse);
        } catch (error) {
            reject(error);
        }
    });
}

function sendStripeEmail(amount, receipt_email, currency = 'usd') {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(' in send stripe email')
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: currency,
                payment_method_types: ['card'],
                receipt_email: receipt_email
            });

            resolve(paymentIntent);
        } catch (error) {
            reject(error);
        }
    });
}