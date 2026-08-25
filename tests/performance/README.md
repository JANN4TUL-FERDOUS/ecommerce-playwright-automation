# k6 Performance Testing

This project includes k6 performance tests for the ecommerce website.

## Test Scenario

The test simulates users browsing the main ecommerce flow:

1. Shop page
2. Product page
3. Cart page
4. Checkout page

The test uses staged virtual users (VUs) to gradually increase load.

## Performance Thresholds

The following thresholds are configured:

- 95th percentile response time must be below 2 seconds
- HTTP request failure rate must remain below 1%

## Load Tests

Several load levels were tested:

| Virtual Users | Result |
|---:|---|
| 5 | Passed |
| 10 | Passed |
| 12 | Passed |
| 15 | Failure rate exceeded threshold |
| 20 | Failure rate exceeded threshold |

## Best Stable Result

At 12 VUs:

- HTTP requests: 530
- HTTP request failure rate: 0.00%
- p95 response time: 1.45 seconds
- Shop page: Passed
- Product page: Passed
- Cart page: Passed
- Checkout page: Passed

## Observations

The application remained stable during the 12 VU test.

At higher loads, intermittent connection failures were observed:

- 15 VUs: 1.98% request failure rate
- 20 VUs: 4.11% request failure rate

This indicates that the tested environment begins showing instability as concurrent load increases.

## Tool

Performance testing was performed using k6.