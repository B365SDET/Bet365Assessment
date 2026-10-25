# Notes

All tests pass on Chromium and Firefox (`npm run test`), run repeatedly to check for flakiness.

## Shared change
`baseURL` is set to `https://automationexercise.com` in `playwright.config.ts`, so tests use relative paths (`/api/productsList`, `/`) instead of repeating the full URL.

## 1.1 — Why was the test failing?
The test asserted that **every** product's category is `"Saree"`. The first product (`Blue Top`) is in `"Tops"`, so it failed straight away. The requirement is that the list **contains** the categories `Tops, Tshirts, Dress, Tops & Shirts, Jeans, Saree`.

**Fix:** collect the unique categories (`Set`) and compare them, sorted, against the expected list. I removed the hard-coded `products.length === 34` check: it isn't part of the requirement and would break whenever the product data changes. I also renamed the test ("Status Code 200" didn't describe what it checked) and added a `Product` type instead of `any`.

## 1.2 — Improvements
- **One test per endpoint.** Previously the three checks were in one test, so the first failure hid the other two and the report didn't say which endpoint broke. The endpoints are now a list that generates a named test for each.
- **No duplication.** The repeated "parse body, check responseCode" logic is a single helper, `expectSuccess`.
- **Check the HTTP status too.** The API always replies with HTTP 200 and reports the real result in the body's `responseCode` (e.g. `GET /api/verifyLogin` returns HTTP 200 with `responseCode: 405`), so the helper asserts both `response.ok()` and `responseCode === 200`.
- Clearer names (no `responseCode1`/`responseCode2`, no reused `let response`) and relative URLs via `baseURL`.

## 1.3 — Root cause and fix
1. **The Men accordion was never opened.** `page.locator(po.collapse).all()` only queries elements; it doesn't click anything. The categories stayed collapsed and hidden.
2. **Wrong expected text.** The DOM text is `Tshirts` / `Jeans`; the uppercase display comes from CSS. `textContent()` returns the DOM text, so `"TSHIRTS"` never matched.
3. **Wrong assertion.** `toBe` compares arrays by reference, so two separate arrays are never equal. Comparing contents needs `toEqual`.
4. **Not stable.** Values were read once with `.all()` / `textContent()` (no auto-waiting), so timing could make the test fail at random.

**Fix:** click the Men toggle, wait for the panel to be visible, then use the web-first assertion `toHaveText(["TShirts", "Jeans"], { ignoreCase: true })`. It retries until the page catches up and also checks the count and order. Selectors moved into the page object as `Locator`s with reusable actions.

**Further stability:** the site serves Google ads (including full-page "vignette" ads) that can cover elements and intercept clicks, so ad requests are blocked in `beforeEach`.

## 1.4 — New E2E test
"A user can successfully add an item to their cart":
1. Open the home page and click **Add to cart** on `Blue Top`.
2. Assert the "Added!" modal shows "Your product has been added to cart."
3. Click **View Cart** and assert the URL is `/view_cart`.
4. Assert the cart has exactly one row, for `Blue Top`, with price `Rs. 500` and quantity `1`.

Each test gets a fresh browser context, so the cart starts empty and the one-row check is reliable. `CartPage` was added to the page objects.

## Extra — negative API tests
Not required, but a good test suite also checks that the API returns the right error when a request is wrong:
- `POST /api/productsList` (only GET is supported) → `responseCode: 405`.
- `GET /api/getUserDetailByEmail` with an unknown email → `responseCode: 404`. The email is unique on every run, so no real account can match it.

## Verification
Besides the normal runs, I deliberately broke each test (missing or extra category, an endpoint returning 404, an endpoint returning `responseCode: 405`, no menu click, extra or reordered men's categories, no add-to-cart, wrong price, wrong quantity, wrong expected codes in the negative tests) and confirmed that every one of them fails for the expected reason.

## With more time
- Schema validation of the API responses.
- Custom fixtures for the page objects and the ad blocking instead of `beforeEach` and `new PageObject(page)` in every test.
- More cart scenarios: several products, quantity changes, removing an item.
- Don't hard-code product data (name, price) in the E2E test; take it from the API or from test data.
