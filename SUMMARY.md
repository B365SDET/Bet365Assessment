# Summary

Answers to the questions in [ASSESSMENT.md](./ASSESSMENT.md). The full suite passes on Chromium and Firefox, repeated 5 times per test.

## Structure
- `tests/fixtures.ts` extends Playwright's `test` with `api`, `homePage` and `cartPage` fixtures. It also overrides `context` to block third-party requests (see 1.3).
- `tests/pageObjects/HomePage.ts` and `CartPage.ts` expose Locators and actions. They replace `PageObject.ts`, which only held selector strings.
- `tests/apiClients/AutomationExerciseApi.ts` holds the endpoint paths and a `Product` type.
- `baseURL` is set once in `playwright.config.ts`.

## 1.1 Why was the test failing?
The loop asserted that every product's category was `"Saree"`. The first product is `"Tops"`, so it failed immediately. The test also never checked what requirement 1.1 asks for.

Fix: collect each product's category and assert that the list contains the six required categories with `expect.arrayContaining`. A failure now names the missing category. I also removed `products.length === 34`: the requirement doesn't ask for it, and it breaks whenever the site adds a product.

## 1.2 Improvements
- One test per endpoint, generated from a table. A failure names the endpoint, one failure doesn't hide the others, and the tests run in parallel.
- Check both the HTTP status (`toBeOK()`) and the body's `responseCode`. This API always returns HTTP 200; the real status is only in the body. For example, an unknown email returns `responseCode: 404`. Checking the HTTP status first means an outage fails with a clear message, not a JSON parse error.
- `toMatchObject({ responseCode: 200 })` prints the response body on failure.
- The email is passed via `params`, so it gets URL-encoded, instead of being hand-built into the URL.
- `baseURL` and the API client remove the repeated URLs, the reused `let response` and the `responseCode1/2` names.

Known risk: `test@test.com` is an account on a public site that we don't own. If it's deleted, that test fails even though the API works. Creating and deleting our own account would be more robust, but the requirement names this email.

## 1.3 Root cause and fix
Four problems were stacked on top of each other:
1. `toBe` compares arrays by reference, so `toBe([...])` can never pass. `toEqual` compares contents.
2. The page text is `Tshirts`. The uppercase "TSHIRTS" on screen comes from CSS `text-transform`.
3. The Men sub-categories are in a collapsed accordion. They exist in the page but are hidden, so `toBeVisible()` failed. `page.locator(...).all()` only builds a list of locators; it never clicked the panel open.
4. After the fix to click the "Men" toggle, the click still failed every time. Google ads opened a full-screen pop-up (the URL changed to `#google_vignette`) that swallowed the click. The `context` fixture now blocks all third-party requests.

For stability, `.all()` plus `textContent()` (no waiting, no retries) became Playwright assertions that retry until they pass: `toHaveText(['TShirts', 'Jeans'], { ignoreCase: true })` on `filter({ visible: true })`. That one assertion covers "these categories" and "viewable", and it uses the requirement's literal values despite the casing difference.

## 1.4 Adding a product to the cart
1. Open the cart and assert "Cart is empty!", which makes the starting state explicit. Each test gets a fresh browser context, so the cart should always start empty.
2. Add a named product ("Blue Top") from the Features Items section. The same product also appears in the hidden "recommended items" carousel.
3. Wait for the "added to cart" confirmation before clicking View Cart.
4. Assert exactly one cart row with the expected price, quantity `1` and total.

## Further ideas
- `test.step` blocks named Given/When/Then, so the report mirrors REQUIREMENTS.md.
- Read the expected price from the product card instead of hardcoding it.
- Add a test for removing a product from the cart.
- `extraHTTPHeaders: { Accept: 'application/json' }` in the config also applies to browser page loads. It belongs on API requests only.
