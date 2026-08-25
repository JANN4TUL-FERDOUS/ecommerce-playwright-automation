import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 1 },
        { duration: '20s', target: 12 },
        { duration: '20s', target: 12 },
        { duration: '10s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const shopResponse = http.get('https://ovcharski.com/shop/');

    check(shopResponse, {
        'shop page returns 200': (response) => response.status === 200,
    });

    const productResponse = http.get(
        'https://ovcharski.com/shop/product/jenkins-actor/'
    );

    check(productResponse, {
        'product page returns 200': (response) => response.status === 200,
    });

    const cartResponse = http.get(
        'https://ovcharski.com/shop/cart/'
    );

    check(cartResponse, {
        'cart page returns 200': (response) => response.status === 200,
    });

    const checkoutResponse = http.get(
        'https://ovcharski.com/shop/checkout/'
    );

    check(checkoutResponse, {
        'checkout page returns 200': (response) => response.status === 200,
    });

    sleep(1);
}