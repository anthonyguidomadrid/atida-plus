# Changelog

Notable changes to this project will be documented in this file.
The format is based on [keep a changelog](http://keepachangelog.com/en/1.0.0/) principles
and adheres to [semantic versioning](http://semver.org/spec/v2.0.0.html).

Issues should be sorted in ascending numerical order per release based on their JIRA ticket reference.

## [1.71.1]

- [PLUS-8084](https://olp.atlassian.net/browse/PLUS-8084) Change 'node:16.18.1-bullseye-slim' to 'node:16.18.1-bullseye'

## [1.71.0]

- [PLUS-5452](https://olp.atlassian.net/browse/PLUS-5452) Use next/image for all Contentful and product images
- [PLUS-6111](https://olp.atlassian.net/browse/PLUS-6111) Implement date of birth field in create account form for atida de
- [PLUS-6112](https://olp.atlassian.net/browse/PLUS-6112) Implement date of birth field on update customer details form
- [PLUS-6113](https://olp.atlassian.net/browse/PLUS-6113) Show date of birth on account details page
- [PLUS-6613](https://olp.atlassian.net/browse/PLUS-6613) Store the channel and sku on the customer session when coming from an available channel
- [PLUS-6618](https://olp.atlassian.net/browse/PLUS-6618) Include channel info for product added to cart
- [PLUS-6619](https://olp.atlassian.net/browse/PLUS-6619) Add the channel info from the cart when there is no channel on the current session
- [PLUS-6620](https://olp.atlassian.net/browse/PLUS-6620) Hide the voucher form if a product has been added where it’s price has derived from a channel
- [PLUS-6675](https://olp.atlassian.net/browse/PLUS-6675) Add new event in segment to report when the basket icon is clicked
- [PLUS-7394](https://olp.atlassian.net/browse/PLUS-7394) Updated design for adyen_card payment method
- [PLUS-7720](https://olp.atlassian.net/browse/PLUS-7720) Improve the style of the subdivision selector on the create account and guest checkout forms
- [PLUS-7721](https://olp.atlassian.net/browse/PLUS-7721) Fixing Next.js pages that don't work with their translated routes for Germany
- [PLUS-7760](https://olp.atlassian.net/browse/PLUS-7760) Added 'social' properties to order_competed & payment_info_entered events
- [PLUS-7763](https://olp.atlassian.net/browse/PLUS-7763) Reduce the store size on the BOP
- [PLUS-7786](https://olp.atlassian.net/browse/PLUS-7786) Creating tests for redirection logic
- [PLUS-7804](https://olp.atlassian.net/browse/PLUS-7804) New PDP Important Information Component
- [PLUS-7815](https://olp.atlassian.net/browse/PLUS-7815) Refactor design of the basket availability text on the product tile and the position of the coupon notification
- [PLUS-7818](https://olp.atlassian.net/browse/PLUS-7818) Eprescription landing page built
- [PLUS-7820](https://olp.atlassian.net/browse/PLUS-7820) Update glue endpoints to new prod.atida.com DNS
- [PLUS-7857](https://olp.atlassian.net/browse/PLUS-7857) Installed barcode scan library and created a component
- [PLUS-7858](https://olp.atlassian.net/browse/PLUS-7858) Called the prescription-token Spryker endpoint
- [PLUS-7859](https://olp.atlassian.net/browse/PLUS-7859) Integrate the qr code scanner into the project and the uploading feature
- [PLUS-7863](https://olp.atlassian.net/browse/PLUS-7863) Handled uploader result
- [PLUS-7888](https://olp.atlassian.net/browse/PLUS-7888) Remove region field in create account, address book and guest checkout form for atida DE
- [PLUS-7889](https://olp.atlassian.net/browse/PLUS-7889) Remove region field valdiation on create account, address book and guest checkout forms
- [PLUS-7979](https://olp.atlassian.net/browse/PLUS-7979) Creating the PDP Layout and MetaData components, and refactoring the YotpoRatings logic into a hook
- [PLUS-7987](https://olp.atlassian.net/browse/PLUS-7987) Loyalty message create account design change
- [PLUS-7996](https://olp.atlassian.net/browse/PLUS-7996) Disabled coupon component when only prescription items are added
- [PLUS-8003](https://olp.atlassian.net/browse/PLUS-8003) Increase test coverage percentage for the files with low coverage
- [PLUS-8004](https://olp.atlassian.net/browse/PLUS-8004) Fix project lint warnings
- [PLUS-8034](https://olp.atlassian.net/browse/PLUS-8034) Remove unique constraint from Marketing Teaser Slug
- [PLUS-8040](https://olp.atlassian.net/browse/PLUS-8040) Creating the new PDP page and implementing a feature flag for it
- [PLUS-8045](https://olp.atlassian.net/browse/PLUS-8045) Fix long labels on grid view
- [PLUS-8068](https://olp.atlassian.net/browse/PLUS-8068) Eprescription landing page improved
- [PLUS-8070](https://olp.atlassian.net/browse/PLUS-8070) Create ProductHeader component
- [PLUS-8072](https://olp.atlassian.net/browse/PLUS-8072) Updated Configmaps for Atida.de domain
- [PLUS-8076](https://olp.atlassian.net/browse/PLUS-8076) Create PDPGallery component
- [PLUS-8077](https://olp.atlassian.net/browse/PLUS-8077) Creating the ProductSidebar component
- [PLUS-8078](https://olp.atlassian.net/browse/PLUS-8078) Create PDPDetails component
- [PLUS-8079](https://olp.atlassian.net/browse/PLUS-8079) Creating the ProductRecommendations component
- [PLUS-8080](https://olp.atlassian.net/browse/PLUS-8080) Creating the ProductBasketNotification component
- [PLUS-8084](https://olp.atlassian.net/browse/PLUS-8084) Fixing the container running as root, security vulnerability
- [PLUS-8086](https://olp.atlassian.net/browse/PLUS-8086) Refresh the customer business information when updated
- [PLUS-8112](https://olp.atlassian.net/browse/PLUS-8112) Fixed the design remarks related to PLUS-7394
- [PLUS-8163](https://olp.atlassian.net/browse/PLUS-8163) Fixed the error notification scroll for stored cards, quick click on new card makes the component disappear bug and if the user enters a valid card and then switches the forms for stored cards, the entered card should be valid
- [PLUS-8196](https://olp.atlassian.net/browse/PLUS-8196) Fixed the design remarks related to PLUS-7863
- [PLUS-8207](https://olp.atlassian.net/browse/PLUS-8207) Fixed when a valid card is entered and then atida cash is added, the user should be able to pay directly
- [PLUS-8225](https://olp.atlassian.net/browse/PLUS-8225) Replace mocked data with real data in PDP Important Information component
- [PLUS-8228](https://olp.atlassian.net/browse/PLUS-8228) Fix user allowed to proceed to step two of create account even with invalid fields
- [PLUS-8259](https://olp.atlassian.net/browse/PLUS-8259) Fixed issue when after you apply atida cash the Mondial relay address you selected is cleared
- [PLUS-8272](https://olp.atlassian.net/browse/PLUS-8272) Tests and Storybook added for the ScannerUploader component
- [PLUS-8281](https://olp.atlassian.net/browse/PLUS-8281) Update product sitemap for PT store
- [PLUS-8302](https://olp.atlassian.net/browse/PLUS-8302) Enable showing the discount label
- [PLUS-8324](https://olp.atlassian.net/browse/PLUS-8324) Fixed issue where social login users cannot go to payment

## [1.70.3]

- [PLUS-7451](https://olp.atlassian.net/browse/PLUS-7451) Removed FF checkout.payment.updated-redirection
- [PLUS-8126](https://olp.atlassian.net/browse/PLUS-8126) Update product sitemap for ES store
- [PLUS-8146](https://olp.atlassian.net/browse/PLUS-8146) Go-to-payment button disabled if house number is missing
- [PLUS-8159](https://olp.atlassian.net/browse/PLUS-8159) Fix price filter title
- [PLUS-8194](https://olp.atlassian.net/browse/PLUS-8194) Fixed issue when Mondial Relay is selected and Atida Cash is used to pay users are getting stuck on checkout

## [1.70.2]

- [PLUS-8017](https://olp.atlassian.net/browse/PLUS-8017) Fixing labels that are too long in the basket.
- [PLUS-8019](https://olp.atlassian.net/browse/PLUS-8019) Fix BF pencil banner label on screens with width below 375px.
- [PLUS-8036](https://olp.atlassian.net/browse/PLUS-8036) Fix addition field in Mondial Relay.
- [PLUS-8066](https://olp.atlassian.net/browse/PLUS-8066) Navigate user in checkout to top of page after each step.

## [1.70.1]

- [PLUS-7962](https://olp.atlassian.net/browse/PLUS-7962) Create_multiple_payments endpoint is called twice when completing a payment
- [PLUS-7985](https://olp.atlassian.net/browse/PLUS-7985) Mondial Relay PROD credentials updated

## [1.70.0]

- [PLUS-6814](https://olp.atlassian.net/browse/PLUS-6814) Replace New Relic custom implementation with the official New Relic Next package
- [PLUS-7173](https://olp.atlassian.net/browse/PLUS-7173) Hide 'fake' categories from category filter
- [PLUS-7398](https://olp.atlassian.net/browse/PLUS-7398) Displayed stored cards
- [PLUS-7561](https://olp.atlassian.net/browse/PLUS-7561) Add new parameter to default object called store for the featureFlagClient service
- [PLUS-7593](https://olp.atlassian.net/browse/PLUS-7593) Implement Consent Mode Script
- [PLUS-7716](https://olp.atlassian.net/browse/PLUS-7716) Create migration for increasing the content blocks limit a page can have to 25.
- [PLUS-7771](https://olp.atlassian.net/browse/PLUS-7771) Update payload when completing the checkout to send the proper order total price
- [PLUS-7773](https://olp.atlassian.net/browse/PLUS-7773) Refactor create multiple payments redirect url for the german store
- [PLUS-7839](https://olp.atlassian.net/browse/PLUS-7839) Keep the campaign filter accordion open on mobile
- [PLUS-7873](https://olp.atlassian.net/browse/PLUS-7873) Fix overlapping labels on ProductTile of favourites page
- [PLUS-7879](https://olp.atlassian.net/browse/PLUS-7879) Fixed Wrong delivery method is displayed when User is from tax exempt regions
- [PLUS-7883](https://olp.atlassian.net/browse/PLUS-7883) Fix ProductTile images on mobile
- [PLUS-7897](https://olp.atlassian.net/browse/PLUS-7897) Fix labels in Promo Detail Pages banner
- [PLUS-7898](https://olp.atlassian.net/browse/PLUS-7898) Add noindex to on-demand products
- [PLUS-7909](https://olp.atlassian.net/browse/PLUS-7909) Fix discount label width on mobile list view
- [PLUS-7936](https://olp.atlassian.net/browse/PLUS-7936) Fixed Guest checkout deliveryMethod is not send to set-data call

## [1.69.0]

- [PLUS-5520](https://olp.atlassian.net/browse/PLUS-5520) Contentful Sync Multi Space
- [PLUS-6717](https://olp.atlassian.net/browse/PLUS-6717) Remove unique payment button feature flag
- [PLUS-6928](https://olp.atlassian.net/browse/PLUS-6928) Created a new delivery method Mondial Relay and updated delivery step design + StickyCTA
- [PLUS-7131](https://olp.atlassian.net/browse/PLUS-7131) Adding files for Deep-link app
- [PLUS-7271](https://olp.atlassian.net/browse/PLUS-7271) Fix white space when using filters on desktop
- [PLUS-7303](https://olp.atlassian.net/browse/PLUS-7303) Change Sort button design on tablet and desktop view
- [PLUS-7345](https://olp.atlassian.net/browse/PLUS-7345) Display welcomeCashDiscount in order totals when the feature flag is on
- [PLUS-7368](https://olp.atlassian.net/browse/PLUS-7368) Updating the robots.txt file
- [PLUS-7389](https://olp.atlassian.net/browse/PLUS-7389) Dynamic delivery times are shown on PDP
- [PLUS-7453](https://olp.atlassian.net/browse/PLUS-7453) Customize 'Our Recommendations' block on PDP for Black Friday campaign
- [PLUS-7502](https://olp.atlassian.net/browse/PLUS-7502) Update sitemaps
- [PLUS-7526](https://olp.atlassian.net/browse/PLUS-7526) Add new Campaign Filter, Tag Campaign Filter and DynamicWidget from algolia to order filters in Mobile
- [PLUS-7542](https://olp.atlassian.net/browse/PLUS-7542) Using generated list of valid Contentful Slugs
- [PLUS-7583](https://olp.atlassian.net/browse/PLUS-7583) Fix Redirection homepage 500 issue
- [PLUS-7588](https://olp.atlassian.net/browse/PLUS-7588) Create Black Friday pencil banner with Countdown component.
- [PLUS-7647](https://olp.atlassian.net/browse/PLUS-7647) Fixed Mondial Relay Widget design
- [PLUS-7666](https://olp.atlassian.net/browse/PLUS-7666) Displayed the itemTotal as a subtotal on the confirmation page
- [PLUS-7670](https://olp.atlassian.net/browse/PLUS-7670) Implement inline validation experiment
- [PLUS-7689](https://olp.atlassian.net/browse/PLUS-7689) Add Zip Code format validation for Germany
- [PLUS-7714](https://olp.atlassian.net/browse/PLUS-7714) Refactor the logic of the copy of loyalty advantages of creating an account
- [PLUS-7739](https://olp.atlassian.net/browse/PLUS-7739) Displayed delivery time notification if on-demand products are present
- [PLUS-7740](https://olp.atlassian.net/browse/PLUS-7740) Sort basket list based on the demand and add hardcoded text about the days of delivery
- [PLUS-7764](https://olp.atlassian.net/browse/PLUS-7764) Fix broken labels in Firefox
- [PLUS-7767](https://olp.atlassian.net/browse/PLUS-7767) Fixed the issue that the Mondial Relay widget does not load every time
- [PLUS-7768](https://olp.atlassian.net/browse/PLUS-7768) Enable Google Pay on German store
- [PLUS-7775](https://olp.atlassian.net/browse/PLUS-7775) Fixed The Payment button in Checkout>Delivery page doesn't work
- [PLUS-7779](https://olp.atlassian.net/browse/PLUS-7779) Handled the case where the call to adyen-payment-details returns an error
- [PLUS-7781](https://olp.atlassian.net/browse/PLUS-7781) Users unblocked from creating new customers on DE store
- [PLUS-7782](https://olp.atlassian.net/browse/PLUS-7782) Created a FF for the Sticky CTA button and design updates on delivery step
- [PLUS-7791](https://olp.atlassian.net/browse/PLUS-7791) Guest checkout unblocked on German site
- [PLUS-7792](https://olp.atlassian.net/browse/PLUS-7792) Fixed design for Select different pick-up point on checkout-delivery
- [PLUS-7816](https://olp.atlassian.net/browse/PLUS-7816) Fixing webhook files reading issues
- [PLUS-7823](https://olp.atlassian.net/browse/PLUS-7823) Fixing page slug webhook returning 404
- [PLUS-7631](https://olp.atlassian.net/browse/PLUS-7631) Calling the set-data every time a new picking station is selected
- [PLUS-7834](https://olp.atlassian.net/browse/PLUS-7834) Fixed issues: 1. Edit button was not displayed 2. Change address does not work 3. Cannot continue to Payment step because button is disabled 4. On refresh delivery method is not selected by default 5. Mondial address was not cleared on Change
- [PLUS-7836](https://olp.atlassian.net/browse/PLUS-7836) Setting the campaign filter after an FF
- [PLUS-7853](https://olp.atlassian.net/browse/PLUS-7853) Fix filters width
- [PLUS-7868](https://olp.atlassian.net/browse/PLUS-7868) Fixed The sticky button "To Payment" is not disabled when the mondial relay station is not selected

## [1.68.2]

- [PLUS-7583](https://olp.atlassian.net/browse/PLUS-7583) Fix Redirection homepage 500 issue

## [1.68.1]

- [PLUS-7665](https://olp.atlassian.net/browse/PLUS-7665) Hotfix for PROD K8s Plan condition

## [1.68.0]

- [PLUS-7165](https://olp.atlassian.net/browse/PLUS-7165) Add Slug field to Referenced entries (Contentful)
- [PLUS-7267](https://olp.atlassian.net/browse/PLUS-7267) Update payment base url for german and spain/portugal stores
- [PLUS-7399](https://olp.atlassian.net/browse/PLUS-7399) Handled 3DS2 payment flow
- [PLUS-7494](https://olp.atlassian.net/browse/PLUS-7494) Update kubernetes configmap for atida_de and sparmed_de
- [PLUS-7522](https://olp.atlassian.net/browse/PLUS-7522) Create transactions request with mocked data
- [PLUS-7541](https://olp.atlassian.net/browse/PLUS-7541) Improve Webhooks memory usage
- [PLUS-7549](https://olp.atlassian.net/browse/PLUS-7549) Prevent Exponea blocks from reserving space when there are no products.
- [PLUS-7559](https://olp.atlassian.net/browse/PLUS-7559) Add #id to add to basket controls which to be used as selector in Optimizely experiment
- [PLUS-7578](https://olp.atlassian.net/browse/PLUS-7578) Additional CIF format validation
- [PLUS-7583](https://olp.atlassian.net/browse/PLUS-7583) Fixing redirections in the Next.js app between ES/PT and DE
- [PLUS-7603](https://olp.atlassian.net/browse/PLUS-7603) Add countdown fields to contenttype staticRecommendationBlock and improve our product normalizer to reduce the size of redux
- [PLUS-7604](https://olp.atlassian.net/browse/PLUS-7604) Adding the countdown to the Static Recommendation Block FE component
- [PLUS-7608](https://olp.atlassian.net/browse/PLUS-7608) Updated diff-between-envs.js script to create migration, updated README to reflect these changes
- [PLUS-7613](https://olp.atlassian.net/browse/PLUS-7613) Add transation history to the breadcrumbs
- [PLUS-7663](https://olp.atlassian.net/browse/PLUS-7663) Update no transaction history copy
- [PLUS-7665](https://olp.atlassian.net/browse/PLUS-7665) Disabling PROD deployments for anything other than frontend (ES & PT) and amending deployment pipeline naming format
- [PLUS-7667](https://olp.atlassian.net/browse/PLUS-7667) Improve Timeout K8s probe to 3 seconds

## [1.67.2]

- MISC Fixing ingress for atida-de

## [1.67.1]

- [PLUS-7057](https://olp.atlassian.net/browse/PLUS-7057) Re-deployment of redirect expedite release

## Expedite Release 2022/10/04

- MISC Fixing too many redirect from [PLUS-7057](https://olp.atlassian.net/browse/PLUS-7057)

## [1.67.0]

- [PLUS-1110](https://olp.atlassian.net/browse/PLUS-1110) Made the script work without specifying contenttype, making it loop over all contentTypes. Also made it export results to a text file whose name can be specified. Added eslint-plugin-react-hooks@latest to package.json and .lock since it is needed to run npm run lint-fix
- [PLUS-6929](https://olp.atlassian.net/browse/PLUS-6929) Integrated the Mondial Relay widget into a popup
- [PLUS-7057](https://olp.atlassian.net/browse/PLUS-7057) Set-up Atida.de and Sparmed.de Redirections with locale
- [PLUS-7234](https://olp.atlassian.net/browse/PLUS-7234) Register the GraphQL query size and cost
- [PLUS-7266](https://olp.atlassian.net/browse/PLUS-7266) Fixed the customer is redirected back to the Delivery checkout step when tries to pay with Atida Cash but doesn't have an address for the store in his address book
- [PLUS-7304](https://olp.atlassian.net/browse/PLUS-7304) In POP/SOP don't show empty filters in mobile
- [PLUS-7314](https://olp.atlassian.net/browse/PLUS-7314) Added an additional property for braintree and logged the payload to New Relic
- [PLUS-7470](https://olp.atlassian.net/browse/PLUS-7470) Fixed order summary alignment
- [PLUS-7513](https://olp.atlassian.net/browse/PLUS-7513) Fixed users are redirected to the unsuccessful page from the confirmation page
- [PLUS-7520](https://olp.atlassian.net/browse/PLUS-7520) Create a loyalty transaction page in account section
- [PLUS-7521](https://olp.atlassian.net/browse/PLUS-7521) Create transaction page balance component
- [PLUS-7523](https://olp.atlassian.net/browse/PLUS-7523) Create new Atida cash transactions list component grouped by date
- [PLUS-7528](https://olp.atlassian.net/browse/PLUS-7528) PLUS-7528 Fix PDPs for DE shop
- [PLUS-7557](https://olp.atlassian.net/browse/PLUS-7557) Fix rewards loading state flicker on my atida cash page
- [PLUS-7558](https://olp.atlassian.net/browse/PLUS-7558) Fix error produced by FetchExpertSignature when the signature is not found in Contentful
- [PLUS-7570](https://olp.atlassian.net/browse/PLUS-7570) Selected standard delivery method for Spain
- [PLUS-7580](https://olp.atlassian.net/browse/PLUS-7580) Add and handle the loyalty-cash-processed state of the orders
- [PLUS-7582](https://olp.atlassian.net/browse/PLUS-7582) Fixing translations for the German locale/store
- [PLUS-7585](https://olp.atlassian.net/browse/PLUS-7585) Check and Fix Expite Pipeline (+ update doc)
- [PLUS-7599](https://olp.atlassian.net/browse/PLUS-7599) Create transactions history empty state
- [PLUS-7601](https://olp.atlassian.net/browse/PLUS-7601) Update log level in DEV and level used for messages

## [1.66.0]

- [PLUS-6978](https://olp.atlassian.net/browse/PLUS-6978) Move 301 Page Redirects logic to Webhooks
- [PLUS-7059](https://olp.atlassian.net/browse/PLUS-7059) Update K8s Spryker endpoints and enable Sparmed CI
- [PLUS-7210](https://olp.atlassian.net/browse/PLUS-7210) Number of set-data calls reduced on the checkout page
- [PLUS-7342](https://olp.atlassian.net/browse/PLUS-7342) Refactoring product labels and Tooltip for fixing the ordering in PDP
- [PLUS-7351](https://olp.atlassian.net/browse/PLUS-7351) Update @adyen/adyen-web package to the latest stable version
- [PLUS-7396](https://olp.atlassian.net/browse/PLUS-7396) Updated payload for the Adyen payments endpoint
- [PLUS-7458](https://olp.atlassian.net/browse/PLUS-7458) Update the subtotal variable for basket and checkout for itemTotal
- [PLUS-7496](https://olp.atlassian.net/browse/PLUS-7496) Payload and error details logged for basket client-side API calls errors
- [PLUS-7498](https://olp.atlassian.net/browse/PLUS-7498) Fix guest user can't finish order on DEV env
- [PLUS-7506](https://olp.atlassian.net/browse/PLUS-7506) Exclude canceled orders when handling the states of the Welcome Gift rewards
- [PLUS-7512](https://olp.atlassian.net/browse/PLUS-7512) Updated validation and inner text for the unique payment button
- [PLUS-7515](https://olp.atlassian.net/browse/PLUS-7515) Fix flickering on page reload

## Expedite Release 2022/09/21 & 2022/09/22

- [PLUS-7496](https://olp.atlassian.net/browse/PLUS-7496) Payload and error details logged for basket client-side API calls errors

## [1.65.0]

- [PLUS-7001](https://olp.atlassian.net/browse/PLUS-7001) Fix continue button on create account form
- [PLUS-7015](https://olp.atlassian.net/browse/PLUS-7015) Put Gpay below bizum
- [PLUS-7132](https://olp.atlassian.net/browse/PLUS-7132) Fixed put Apple Pay under Credit Card in ES/PT
- [PLUS-7228](https://olp.atlassian.net/browse/PLUS-7228) Account created attempted event fire on first step account creation complete
- [PLUS-7391](https://olp.atlassian.net/browse/PLUS-7391) Added a new payment method called adyen_card
- [PLUS-7393](https://olp.atlassian.net/browse/PLUS-7393) Updated configuration and design for adyen card
- [PLUS-7395](https://olp.atlassian.net/browse/PLUS-7395) Fix swiping to last slide on loyalty onboarding modal
- [PLUS-7400](https://olp.atlassian.net/browse/PLUS-7400) Added limitation for Atida cash so a value below 0.01 cannot be entered
- [PLUS-7401](https://olp.atlassian.net/browse/PLUS-7401) Passed the shopperReference to the /adyen-payment-methods endpoint
- [PLUS-7410](https://olp.atlassian.net/browse/PLUS-7410) Fixed Successful orders cancelled in Spryker
- [PLUS-7411](https://olp.atlassian.net/browse/PLUS-7411) Add Page Loaded event (My atida cash) for loyalty onboarding Page
- [PLUS-7418](https://olp.atlassian.net/browse/PLUS-7418) Add check for accordion content block type on my atida cash page
- [PLUS-7423](https://olp.atlassian.net/browse/PLUS-7423) Fix flickering of Optimizely experiments
- [PLUS-7430](https://olp.atlassian.net/browse/PLUS-7430) Use SEO data from contentful on Loyalty Page
- [PLUS-7435](https://olp.atlassian.net/browse/PLUS-7435) Remove notification for different tax regions when customer has no addresses
- [PLUS-7448](https://olp.atlassian.net/browse/PLUS-7448) Show loyalty message when redirected to create account from landing page

## Expedite Release 2022/09/15

- [PLUS-7434](https://olp.atlassian.net/browse/PLUS-7434) Multibanco payment information added above the order details accordion on the confirmation page

## [1.64.0]

- [PLUS-6812](https://olp.atlassian.net/browse/PLUS-6812) Add newsletter sign-up for guest checkout
- [PLUS-7169](https://olp.atlassian.net/browse/PLUS-7169) Take the last promo for generating the label
- [PLUS-7224](https://olp.atlassian.net/browse/PLUS-7224) Send invoice required when creating account
- [PLUS-7253](https://olp.atlassian.net/browse/PLUS-7253) Updated K8s configuration for multi-shop
- [PLUS-7326](https://olp.atlassian.net/browse/PLUS-7326) Optimizely snippet integration
- [PLUS-7327](https://olp.atlassian.net/browse/PLUS-7327) Initiate the experiments only if the user accepts the cookie policy
- [PLUS-7328](https://olp.atlassian.net/browse/PLUS-7328) Fix Optimizely Snippet integration
- [PLUS-7339](https://olp.atlassian.net/browse/PLUS-7339) Fix broken layout of tax reference modal when copy is not long enough
- [PLUS-7358](https://olp.atlassian.net/browse/PLUS-7358) Remove condition which makes MyAtida(Atida Cash) link green
- [PLUS-7373](https://olp.atlassian.net/browse/PLUS-7373) Remove unique ID from PageFooter
- [PLUS-7412](https://olp.atlassian.net/browse/PLUS-7412) Close button and design of the welcome cash notification fixed on the basket page
- [PLUS-7413](https://olp.atlassian.net/browse/PLUS-7413) Avoid flickering if the user has performance cookies

## Expedite Release 2022/09/08

- [PLUS-7341](https://olp.atlassian.net/browse/PLUS-7341) Fix error message received for all social user checkout
- [PLUS-7350](https://olp.atlassian.net/browse/PLUS-7350) Removed Apple Pay from desktop
- [PLUS-7374](https://olp.atlassian.net/browse/PLUS-7374) Enabled Apple pay for mobile devices

## [1.63.0]

- [PLUS-6015](https://olp.atlassian.net/browse/PLUS-6015) Create Expert Signature Block
- [PLUS-6057](https://olp.atlassian.net/browse/PLUS-6057) Move menu fetch normalization logic from Next.js to webhook
- [PLUS-6148](https://olp.atlassian.net/browse/PLUS-6148) Separated free atida cash as extra discount line
- [PLUS-6692](https://olp.atlassian.net/browse/PLUS-6692) Tracked Social checkouts
- [PLUS-7112](https://olp.atlassian.net/browse/PLUS-7112) Update design on order details page, showing atida cash spent and atida cash earned
- [PLUS-7144](https://olp.atlassian.net/browse/PLUS-7144) Show order canceled state when payment fails
- [PLUS-7241](https://olp.atlassian.net/browse/PLUS-7241) Fixed inconsistencies between adyenPaymentSetError() and createMultiplePaymentsSetError()
- [PLUS-7277](https://olp.atlassian.net/browse/PLUS-7277) Fix loyalty cash not included with Paypal payment
- [PLUS-7281](https://olp.atlassian.net/browse/PLUS-7281) Dont show atida discount infomation when the percentage is 0.
- [PLUS-7282](https://olp.atlassian.net/browse/PLUS-7282) Fix filters ans sort design findings
- [PLUS-7291](https://olp.atlassian.net/browse/PLUS-7291) Refactor login CTA for guest users

## Expedite Release 2022/09/05

- [PLUS-7299](https://olp.atlassian.net/browse/PLUS-7299) Fix user cant checkout when salutation is missing

## [1.62.0]

- [PLUS-3040](https://olp.atlassian.net/browse/PLUS-3040) Show tax reference modal when toggle invoice required
- [PLUS-6073](https://olp.atlassian.net/browse/PLUS-6073) Remove feature flags checkout.payment.braintree.separate-visa-master-and-paypal and checkout.payment.braintree
- [PLUS-6486](https://olp.atlassian.net/browse/PLUS-6486) Rename the payment methods constants
- [PLUS-6517](https://olp.atlassian.net/browse/PLUS-6517) [Performance] Disabling application level compression to see how CloudFront behaves
- [PLUS-7011](https://olp.atlassian.net/browse/PLUS-7011) Fitlers improvements
- [PLUS-7036](https://olp.atlassian.net/browse/PLUS-7036) Fixing image size issue that changes when switching between grid and list views on POPs
- [PLUS-7091](https://olp.atlassian.net/browse/PLUS-7091) Added animation to unique checkout pay now button sticky CTA
- [PLUS-7135](https://olp.atlassian.net/browse/PLUS-7135) Improved Contenful & Launchdarkly keys for the voucher
- [PLUS-7149](https://olp.atlassian.net/browse/PLUS-7149) Show tax reference field based on zip code on registering and editing address
- [PLUS-7156](https://olp.atlassian.net/browse/PLUS-7156) Fixed issue where selected payment method is unselected on Atida cash change
- [PLUS-7159](https://olp.atlassian.net/browse/PLUS-7159) Show Phone missing notification on checkout when ACCOUNT_PHONE_TO_CUSTOMER_LEVEL FF is on and customer is missing his phone
- [PLUS-7164](https://olp.atlassian.net/browse/PLUS-7164) Refactor Content types to reduce graphql query
- [PLUS-7176](https://olp.atlassian.net/browse/PLUS-7176) Added line of copy for Atida cash in order confirmation page
- [PLUS-7199](https://olp.atlassian.net/browse/PLUS-7199) Fixed incorrect amounts of loyalty cash being sent
- [PLUS-7201](https://olp.atlassian.net/browse/PLUS-7201) Add variable in contentful for the loyaltyAtidaCash and add logo to the LoyaltyLoginCTA
- [PLUS-7204](https://olp.atlassian.net/browse/PLUS-7204) Replace logo on loyalty page
- [PLUS-7213](https://olp.atlassian.net/browse/PLUS-7213) Create a initial prototype that handles all the different Welocome gift states
- [PLUS-7214](https://olp.atlassian.net/browse/PLUS-7214) Update the welcome gift prototype with the real designs and update logic
- [PLUS-7220](https://olp.atlassian.net/browse/PLUS-7220) [Performance] Improved LCP calculation on ContentBlocksLayout
- [PLUS-7221](https://olp.atlassian.net/browse/PLUS-7221) Fixed The line of copy on the confirmation page is not placed on the right place for SM devices + remove popup line in spending part
- [PLUS-7223](https://olp.atlassian.net/browse/PLUS-7223) Fix title and description on tax reference modal and add horizontal line for mobile
- [PLUS-7225](https://olp.atlassian.net/browse/PLUS-7225) Add store attribute to context object
- [PLUS-7227](https://olp.atlassian.net/browse/PLUS-7227) Show the Welcome Gift reward card when there are no others rewards
- [PLUS-7239](https://olp.atlassian.net/browse/PLUS-7239) Fixed margin between unique pay now button in the order summary and the text about excluding VAT for tax exempt regions
- [PLUS-7247](https://olp.atlassian.net/browse/PLUS-7247) Fixed on the confirmation page the "Order Completed" and "Product Ordered" events are not fired for the payment methods which do not redirect and 'orderPaymentsData' cookie is not cleared
- [PLUS-7255](https://olp.atlassian.net/browse/PLUS-7255) Fix PDP does not load if product is clicked from via basket
- [PLUS-7265](https://olp.atlassian.net/browse/PLUS-7265) Fix footer focus when going to loyalty page from homepage banner

## Expedite Release 2022/09/01

- [PLUS-7255](https://olp.atlassian.net/browse/PLUS-7255) PDP doesn't load if product is clicked from via basket
- [PLUS-7247](https://olp.atlassian.net/browse/PLUS-7247) Fix checkout events on the confirmation page

## [1.61.0]

- [PLUS-280](https://olp.atlassian.net/browse/PLUS-280) [Performance] Moving the common saga trigger and i18n Store to the Next.js App getInitialProps function in order to persist the menu and footer data and translations all across the site
- [PLUS-1548](https://olp.atlassian.net/browse/PLUS-1548) Improve Contentful Sync Script
- [PLUS-3039](https://olp.atlassian.net/browse/PLUS-3039) Send require invoice value to Spryker customer
- [PLUS-6192](https://olp.atlassian.net/browse/PLUS-6192) Removed seo.override-canonical-link-from-contentful feature flag
- [PLUS-6264](https://olp.atlassian.net/browse/PLUS-6264) Upgraded React to version 18 and fixed resulting errors.
- [PLUS-6529](https://olp.atlassian.net/browse/PLUS-6529) Configuration and design updated for adyen mbway payment method
- [PLUS-6531](https://olp.atlassian.net/browse/PLUS-6531) Adyen payment details response handled for adyen mbway
- [PLUS-6543](https://olp.atlassian.net/browse/PLUS-6543) Provided multiple payments to payment-service
- [PLUS-6553](https://olp.atlassian.net/browse/PLUS-6553) Add adyen multibanco method component into the checkout page
- [PLUS-6554](https://olp.atlassian.net/browse/PLUS-6554) Add multibanco to the adyen checkout configuration
- [PLUS-6556](https://olp.atlassian.net/browse/PLUS-6556) Add redirection to confirmation page when paying with adyen multibanco
- [PLUS-6657](https://olp.atlassian.net/browse/PLUS-6657) Stop firing the Missing Details Page viewed event when signing in from basket
- [PLUS-6756](https://olp.atlassian.net/browse/PLUS-6756) Triggering a Hotjar event when a user sees a product description for enabling surveys on PDPs
- [PLUS-7046](https://olp.atlassian.net/browse/PLUS-7046) Create validation functions for tax regions
- [PLUS-7047](https://olp.atlassian.net/browse/PLUS-7047) Add extra tax regions validation during normal checkout
- [PLUS-7048](https://olp.atlassian.net/browse/PLUS-7048) Add extra tax regions validation during guest checkout when a different billing address is included
- [PLUS-7049](https://olp.atlassian.net/browse/PLUS-7049) Add notification for mismatching regions on account creation form
- [PLUS-7080](https://olp.atlassian.net/browse/PLUS-7080) displayed spent loyalty info in order confirmation page
- [PLUS-7082](https://olp.atlassian.net/browse/PLUS-7082) Fix missing customer details when refreshing order history page
- [PLUS-7090](https://olp.atlassian.net/browse/PLUS-7090) Fixed first slide not rendering in CategorySlider.
- [PLUS-7092](https://olp.atlassian.net/browse/PLUS-7092) Selected MBway by default for PT
- [PLUS-7094](https://olp.atlassian.net/browse/PLUS-7094) Show notification in address book when there is an issue with mismatching tax regions
- [PLUS-7107](https://olp.atlassian.net/browse/PLUS-7107) Added new filter attributes
- [PLUS-7110](https://olp.atlassian.net/browse/PLUS-7110) Send invoice required with create order endpoint
- [PLUS-7114](https://olp.atlassian.net/browse/PLUS-7114) Show Atida welcome cash message when redirected from basket banner
- [PLUS-7124](https://olp.atlassian.net/browse/PLUS-7124) Fixed issue where maximum amount of available Atida cash is incorrect. Removed atida cash from order confirmation when you are logged out
- [PLUS-7128](https://olp.atlassian.net/browse/PLUS-7128) Fix safari infinite loop after logout, fix infinite loop when refresh token is invalid/expired
- [PLUS-7130](https://olp.atlassian.net/browse/PLUS-7130) Hide the CTA button on basket and checkout page on mobile when coupon/atida cash field is focused
- [PLUS-7133](https://olp.atlassian.net/browse/PLUS-7133) Make title tappable on the voucher component
- [PLUS-7138](https://olp.atlassian.net/browse/PLUS-7138) Fixed issue where the atida cash amount was changed on mouse scroll
- [PLUS-7141](https://olp.atlassian.net/browse/PLUS-7141) Fix login page refresh when submiting wrong credentials
- [PLUS-7150](https://olp.atlassian.net/browse/PLUS-7150) Rename iconReference and colorReference in Contentful to save GraphQL space
- [PLUS-7151](https://olp.atlassian.net/browse/PLUS-7151) Remove/clean-up unused Content-types
- [PLUS-7154](https://olp.atlassian.net/browse/PLUS-7154) [Bugfix] Fixed: PDPs with misformatted description HTML were returning a 500.
- [PLUS-7158](https://olp.atlassian.net/browse/PLUS-7158) [Bugfix] After account creation modal is closed, the page will be scrollable.
- [PLUS-7168](https://olp.atlassian.net/browse/PLUS-7168) Fix loyalty info in PDP when the object is empty
- [PLUS-7170](https://olp.atlassian.net/browse/PLUS-7170) Remove get-content-page-data-props which makes unnecessary Algolia request for Content pages
- [PLUS-7174](https://olp.atlassian.net/browse/PLUS-7174) Fixing the duplicated Redux state in app.tsx
- [PLUS-7179](https://olp.atlassian.net/browse/PLUS-7179) Fixed unique Payment CTA disappears on mobile when users add new paypal account
- [PLUS-7181](https://olp.atlassian.net/browse/PLUS-7181) Fix AdyenPaymentMethod type bug.
- [PLUS-7183](https://olp.atlassian.net/browse/PLUS-7183) [Bugfix] Fixed infinite fetch-all recommendations on PDP
- [PLUS-7215](https://olp.atlassian.net/browse/PLUS-7215) Adyen MBWay form design improved

## [1.60.0]

- [PLUS-2871](https://olp.atlassian.net/browse/PLUS-2871) Refactor Media-asset usage in Contentful
- [PLUS-3038](https://olp.atlassian.net/browse/PLUS-3038) Turn on and disable request invoice toggle when business account or ES special region
- [PLUS-3287](https://olp.atlassian.net/browse/PLUS-3287) Add account_type property to Account Created Failed, Account created, Account Created Attempted events
- [PLUS-3697](https://olp.atlassian.net/browse/PLUS-3697) [Performance] Reduced app.js bundle size.
- [PLUS-6368](https://olp.atlassian.net/browse/PLUS-6368) Created the unique checkout pay now button component
- [PLUS-6369](https://olp.atlassian.net/browse/PLUS-6369) Displayed the unique checkout pay now button in a sticky CTA on mobile
- [PLUS-6528](https://olp.atlassian.net/browse/PLUS-6528) New payment method called Adyen MBWay added
- [PLUS-6808](https://olp.atlassian.net/browse/PLUS-6808) Limited Atida cash for all payment methods + restricting the atida cash for guest users
- [PLUS-6938](https://olp.atlassian.net/browse/PLUS-6938) Add tests for refresh token
- [PLUS-6979](https://olp.atlassian.net/browse/PLUS-6979) Remove ssr:false from dynamic imports.
- [PLUS-7017](https://olp.atlassian.net/browse/PLUS-7017) Create link that redirects from the loyalty cta button to the account creation
- [PLUS-7021](https://olp.atlassian.net/browse/PLUS-7021) Fixed firefox voucher bug
- [PLUS-7033](https://olp.atlassian.net/browse/PLUS-7033) Remove reset password event on social login verification
- [PLUS-7075](https://olp.atlassian.net/browse/PLUS-7075) Fix breadcrumbs margin on favourites page
- [PLUS-7081](https://olp.atlassian.net/browse/PLUS-7081) Updated Atida cash component
- [PLUS-7084](https://olp.atlassian.net/browse/PLUS-7084) [Bugfix] On the promotion detail page, use a 307 redirect when the promotion is invalid or expired
- [PLUS-7087](https://olp.atlassian.net/browse/PLUS-7087) Adjust logic for phone against customer
- [PLUS-7109](https://olp.atlassian.net/browse/PLUS-7109) Updated MBway icon

## [1.59.0]

- [PLUS-3036](https://olp.atlassian.net/browse/PLUS-3036) Create feature flag that control requesting invoices
- [PLUS-3037](https://olp.atlassian.net/browse/PLUS-3037) Implement request invoice toggle
- [PLUS-4582](https://olp.atlassian.net/browse/PLUS-4582) Save phone number against the customer
- [PLUS-4932](https://olp.atlassian.net/browse/PLUS-4932) Remove feature flag basket-checkout.total-rrp-discount from the code
- [PLUS-5808](https://olp.atlassian.net/browse/PLUS-5808) SEO show Copy and Copy expandable to Brands and Promotions pages
- [PLUS-5810](https://olp.atlassian.net/browse/PLUS-5810) Allow parseHtml function to display unordered and ordered lists for SEO content
- [PLUS-5811](https://olp.atlassian.net/browse/PLUS-5811) Remove FF: back-to-top-button
- [PLUS-5818](https://olp.atlassian.net/browse/PLUS-5818) Remove FF navigation.show-products-from-previous-pages
- [PLUS-6125](https://olp.atlassian.net/browse/PLUS-6125) Add new component loyalty login cta basket into the project
- [PLUS-6126](https://olp.atlassian.net/browse/PLUS-6126) Implemented Atida cash spending UI component + Provide atida points to spend in the place order request
- [PLUS-6178](https://olp.atlassian.net/browse/PLUS-6178) Remove basket.coupon.update-style feature flag from the code
- [PLUS-6306](https://olp.atlassian.net/browse/PLUS-6306) Implement new vouchers design , created new migration script for vouchers to use rich text for the title
- [PLUS-6309](https://olp.atlassian.net/browse/PLUS-6309) Refactor contentWidthImage to be able to use it as the new loyalty component
- [PLUS-6434](https://olp.atlassian.net/browse/PLUS-6434) Added marketing teaser images alt text,fixed empty buttons,fixed empty links, close account menu with escape for accessibility.
- [PLUS-6658](https://olp.atlassian.net/browse/PLUS-6658) Creating the Category Slider
- [PLUS-6660](https://olp.atlassian.net/browse/PLUS-6660) Fixing the alignment of the Favourite button and labels on list view of POP
- [PLUS-6712](https://olp.atlassian.net/browse/PLUS-6712) [Bugfix] On the PDP accordion, don't show a "0" when the certificate list is an empty array.
- [PLUS-6713](https://olp.atlassian.net/browse/PLUS-6713) Refactored all type imports into "inport type ...".
- [PLUS-6749](https://olp.atlassian.net/browse/PLUS-6749) Removed Apple Pay supported countries code
- [PLUS-6757](https://olp.atlassian.net/browse/PLUS-6757) Fix blinking state of favourites page
- [PLUS-6776](https://olp.atlassian.net/browse/PLUS-6776) Fix missing spaces in search suggestions and suggested categories
- [PLUS-6784](https://olp.atlassian.net/browse/PLUS-6784) [Monitoring] Added NR instrumentation to App.js's getInitialProps
- [PLUS-6787](https://olp.atlassian.net/browse/PLUS-6787) Implement feature flag to prevent additional request to Algolia caused by fetching all filters.
- [PLUS-6791](https://olp.atlassian.net/browse/PLUS-6791) Fix design issues on Loyalty page
- [PLUS-6827](https://olp.atlassian.net/browse/PLUS-6827) Implement store attribute in segment tracking middleware
- [PLUS-6872](https://olp.atlassian.net/browse/PLUS-6872) Breadcrumbs - fix design review findings
- [PLUS-6892](https://olp.atlassian.net/browse/PLUS-6892) Category Slider design fixes
- [PLUS-6893](https://olp.atlassian.net/browse/PLUS-6893) Adjust spacings in OrderHistoryItem
- [PLUS-6908](https://olp.atlassian.net/browse/PLUS-6908) Upload new apple developer merchantid file for the apple pay integration
- [PLUS-6920](https://olp.atlassian.net/browse/PLUS-6920) Checked margins and padding, image and H4 size
- [PLUS-6926](https://olp.atlassian.net/browse/PLUS-6926) [Bugfix] Fixed logout issue caused by NR instrumentation
- [PLUS-6934](https://olp.atlassian.net/browse/PLUS-6934) Put "get cash balance" request in account overview and my atida cash pages behind feature flag
- [PLUS-6936](https://olp.atlassian.net/browse/PLUS-6936) Disabling the Rich Text Title from Hero Banner
- [PLUS-6942](https://olp.atlassian.net/browse/PLUS-6942) Fix adding and removing of guest favourites
- [PLUS-6946](https://olp.atlassian.net/browse/PLUS-6946) Avoid Product tile images are broken on Safari
- [PLUS-6958](https://olp.atlassian.net/browse/PLUS-6958) Fix hydration bug by changing outer <p> into <div>.
- [PLUS-6959](https://olp.atlassian.net/browse/PLUS-6959) Fix Checkout delivery step not loading without page refresh
- [PLUS-6961](https://olp.atlassian.net/browse/PLUS-6961) Fixing Product and Category Sliders for SSR
- [PLUS-6975](https://olp.atlassian.net/browse/PLUS-6975) Fix breadcrumbs on tablet when there is image in the header
- [PLUS-6976](https://olp.atlassian.net/browse/PLUS-6976) Fix bullet points - header spacing
- [PLUS-6993](https://olp.atlassian.net/browse/PLUS-6993) Redirect logged users to Atida Cash page when accessing Loyalty page
- [PLUS-6995](https://olp.atlassian.net/browse/PLUS-6995) Add Page Loaded event for My Atida cash page
- [PLUS-7004](https://olp.atlassian.net/browse/PLUS-7004) Fix Bizum payment method redirection
- [PLUS-7019](https://olp.atlassian.net/browse/PLUS-7019) Fix margin between voucers and hero banner
- [PLUS-7020](https://olp.atlassian.net/browse/PLUS-7020) Fixed voucher coupon on mobile
- [PLUS-7623](https://olp.atlassian.net/browse/PLUS-7623) Implement solutions to reduce CLS navigation issues.

## [1.58.1]

- [PLUS-6493](https://olp.atlassian.net/browse/PLUS-6493) Gitlab CI for Multi-shop (PT/ES and DE/AT)

## Expedite Release 2022/08/04

- [PLUS-6813](https://olp.atlassian.net/browse/PLUS-6813) PLUS 6813 Fix guest session tokens when expired

## [1.58.0]

- [PLUS-5177](https://olp.atlassian.net/browse/PLUS-5177) Remove feature flag basket.third-rank.add-on from the code
- [PLUS-5538](https://olp.atlassian.net/browse/PLUS-5538) Remove search-page.hide-filters-when-few-products-found feature flag
- [PLUS-6168](https://olp.atlassian.net/browse/PLUS-6168) Redirect traffic from France to atida.fr
- [PLUS-6311](https://olp.atlassian.net/browse/PLUS-6311) Show Atida Cash earnings on PDP
- [PLUS-6367](https://olp.atlassian.net/browse/PLUS-6367) Updated payment method components
- [PLUS-6541](https://olp.atlassian.net/browse/PLUS-6541) Fixed filters spf and color are not shown
- [PLUS-6552](https://olp.atlassian.net/browse/PLUS-6552) Improve front end validation for email addresses on forms
- [PLUS-6592](https://olp.atlassian.net/browse/PLUS-6592) Show navigation breadcrumbs on POP and COP
- [PLUS-6593](https://olp.atlassian.net/browse/PLUS-6593) Restyle navigation breadcrumbs
- [PLUS-6656](https://olp.atlassian.net/browse/PLUS-6656) Fix is_logged_in in segment context object
- [PLUS-6721](https://olp.atlassian.net/browse/PLUS-6721) [Performance] On the PDP, fetch only the product's brand's URL
- [PLUS-6732](https://olp.atlassian.net/browse/PLUS-6732) Open automatically the address modal after redirecting to the addres book page when house number is missing during checkout
- [PLUS-6734](https://olp.atlassian.net/browse/PLUS-6734) Remove the txt extension from the apple developer merchantid Fiel
- [PLUS-6735](https://olp.atlassian.net/browse/PLUS-6735) Add attribute to Fiel formik component to not autocomplete the input with previous values
- [PLUS-6741](https://olp.atlassian.net/browse/PLUS-6741) Create modal with introduction to atida cash

## [1.57.1]

- [PLUS-6718](https://olp.atlassian.net/browse/PLUS-6718) Fix not refreshing token when it expires
- [PLUS-6741](https://olp.atlassian.net/browse/PLUS-6741) Contentful Migration 102 for new Icon Reference
- [PLUS-6788](https://olp.atlassian.net/browse/PLUS-6788) Trigger email_subscribed event with Social Account Creation
- [PLUS-6796](https://olp.atlassian.net/browse/PLUS-6796) PLUS 6796 Capture and handle selectRecommendations exceptions so PDPs are not affected

## [1.57.0]

- [INFRA-311](https://olp.atlassian.net/browse/INFRA-311) Integrate Aquasec scanning in build pipeline. The scan results will be available in Out folder
- [PLUS-2872](https://olp.atlassian.net/browse/PLUS-2872) [Contentful] Adding unique-title keys to Contentful content types and creating a script for calculating the GraphQL query cost
- [PLUS-4586](https://olp.atlassian.net/browse/PLUS-4586) Make phone number field in account details to be always visible
- [PLUS-4797](https://olp.atlassian.net/browse/PLUS-4797) Remove guest checkout feature flag from the code
- [PLUS-4975](https://olp.atlassian.net/browse/PLUS-4975) Remove checkout.confirmation.webloyalty feature flag and it's related code
- [PLUS-5416](https://olp.atlassian.net/browse/PLUS-5416) Optimise product filters
- [PLUS-5777](https://olp.atlassian.net/browse/PLUS-5777) Fixed failed payment error is presented in Basket page on next order
- [PLUS-5821](https://olp.atlassian.net/browse/PLUS-5821) Removed algolia query suggestions feature flag
- [PLUS-5921](https://olp.atlassian.net/browse/PLUS-5921) Added additional optional properties to the configuration object for apple pay
- [PLUS-6006](https://olp.atlassian.net/browse/PLUS-6006) Refactor get payment methods helper to short code extension in the checkout page
- [PLUS-6095](https://olp.atlassian.net/browse/PLUS-6095) Removed the white background for payment icons in basket and checkout page
- [PLUS-6123](https://olp.atlassian.net/browse/PLUS-6123) Added atida cash earned line to order summary and basket
- [PLUS-6129](https://olp.atlassian.net/browse/PLUS-6129) Create new Product Block Component in Contentful
- [PLUS-6212](https://olp.atlassian.net/browse/PLUS-6212) Add an additional step during social login flow to ask user to confirm or reset their password
- [PLUS-6215](https://olp.atlassian.net/browse/PLUS-6215) Add segment events for tracking Social Login Verification
- [PLUS-6359](https://olp.atlassian.net/browse/PLUS-6359) Increasing the quantity of voucher codes that can be set in a group in Contentful
- [PLUS-6374](https://olp.atlassian.net/browse/PLUS-6374) Add breadcrumbs structured data
- [PLUS-6398](https://olp.atlassian.net/browse/PLUS-6398) Create hero header component for loyalty landing page
- [PLUS-6399](https://olp.atlassian.net/browse/PLUS-6399) Create USPs for loyalty page
- [PLUS-6400](https://olp.atlassian.net/browse/PLUS-6400) Implemen slider on loyalty onboarding page
- [PLUS-6439](https://olp.atlassian.net/browse/PLUS-6439) [Performance] Add a 3 second cache to cache-control headers
- [PLUS-6443](https://olp.atlassian.net/browse/PLUS-6443) Refactoring the Tooltip component and fixing some styling issues
- [PLUS-6452](https://olp.atlassian.net/browse/PLUS-6452) [UX] Fixed some incorrect font weights across the site
- [PLUS-6462](https://olp.atlassian.net/browse/PLUS-6462) [UX] Small UI tweak to the scarcity message
- [PLUS-6463](https://olp.atlassian.net/browse/PLUS-6463) Renamed SIBS Feature Flags
- [PLUS-6485](https://olp.atlassian.net/browse/PLUS-6485) Add Random offset to Redis Cache expiration
- [PLUS-6487](https://olp.atlassian.net/browse/PLUS-6487) Avoid that the qty products remains the same when navigating between PDPs
- [PLUS-6492](https://olp.atlassian.net/browse/PLUS-6492) [Cleanup] Deleted USP feature flags and experiment code
- [PLUS-6527](https://olp.atlassian.net/browse/PLUS-6527) Fixed to scroll to error message when getting an error related to payments and order creation on payment page
- [PLUS-6561](https://olp.atlassian.net/browse/PLUS-6561) Reducing CLS in mobile caused by header
- [PLUS-6562](https://olp.atlassian.net/browse/PLUS-6562) Fixing label truncating text
- [PLUS-6563](https://olp.atlassian.net/browse/PLUS-6563) Refactor StaticContentBlock and GroupOfStaticContentBlock to be more reusable
- [PLUS-6585](https://olp.atlassian.net/browse/PLUS-6585) Add href to the link in Cash Balance component, which points to loyalty
  onboarding page
- [PLUS-6598](https://olp.atlassian.net/browse/PLUS-6598) Fix design issues with atida cash component in My Atida Cash page
- [PLUS-6599](https://olp.atlassian.net/browse/PLUS-6599) Fix design on how atida cash works block on overview page
- [PLUS-6600](https://olp.atlassian.net/browse/PLUS-6600) Adjust design "Ways to earn even more" section in My Atida Cash page
- [PLUS-6601](https://olp.atlassian.net/browse/PLUS-6601) Add hover effects to rewards buttons and fix margin
- [PLUS-6632](https://olp.atlassian.net/browse/PLUS-6632) Refactoring handling functions across components
- [PLUS-6648](https://olp.atlassian.net/browse/PLUS-6648) Adjust spacing between elements in OrderHistoryItem
- [PLUS-6649](https://olp.atlassian.net/browse/PLUS-6649) Fix margins on order history page
- [PLUS-6650](https://olp.atlassian.net/browse/PLUS-6650) Add disabled pagination arrows when only one page or no pages before or after
- [PLUS-6651](https://olp.atlassian.net/browse/PLUS-6651) Change ChevronRight icon in order history item
- [PLUS-6652](https://olp.atlassian.net/browse/PLUS-6652) Fix title spacing in order history list page
- [PLUS-6653](https://olp.atlassian.net/browse/PLUS-6653) Adjust font weight in order history item and order history details
- [PLUS-6655](https://olp.atlassian.net/browse/PLUS-6655) Implement new design of order tracking modal
- [PLUS-6686](https://olp.atlassian.net/browse/PLUS-6686) Update Facebook social credentials
- [PLUS-6693](https://olp.atlassian.net/browse/PLUS-6693) Load the Reskyt script when the `customapp` parameter is present, regardless of value.
- [PLUS-6729](https://olp.atlassian.net/browse/PLUS-6729) Fix fetch customer infinite loop when firstname is missing
- [PLUS-6754](https://olp.atlassian.net/browse/PLUS-6574) Add social properties to 'Account Created attempted' segment tracking event
- [PLUS-6736](https://olp.atlassian.net/browse/PLUS-6736) Wrap basket cash reward with a feature flag
- [PLUS-6750](https://olp.atlassian.net/browse/PLUS-6750) Wrap loyalty cash atida code under the account.loyalty.atida-cash feature flag

## [1.56.0]

- [PLUS-6031](https://olp.atlassian.net/browse/PLUS-6031) B&C - Updated NewRelic credentials for new account and migrate charts/alerts
- [PLUS-6170](https://olp.atlassian.net/browse/PLUS-6170) Fixed is_first_order boolean sent in "Order Completed" event
- [PLUS-6304](https://olp.atlassian.net/browse/PLUS-6304) Ensure that when an access token expires that the refresh token is used to generate a new access token
- [PLUS-6318](https://olp.atlassian.net/browse/PLUS-6318) Added recommendation row to improve the no search results page
- [PLUS-6375](https://olp.atlassian.net/browse/PLUS-6375) Make input fields rounded instead of rectangle
- [PLUS-6389](https://olp.atlassian.net/browse/PLUS-6389) [Bugfix] Fixing the sticky Add to basket controls issue that the component is being rendered during page load
- [PLUS-6394](https://olp.atlassian.net/browse/PLUS-6394) [Experiment] Show saving percentage on PDP
- [PLUS-6397](https://olp.atlassian.net/browse/PLUS-6397) Create loyalty onboarding page
- [PLUS-6401](https://olp.atlassian.net/browse/PLUS-6401) Add FAQ block to loyalty onboarding page
- [PLUS-6441](https://olp.atlassian.net/browse/PLUS-6441) Add 'Account Created Attempted' event to social login
- [PLUS-6444](https://olp.atlassian.net/browse/PLUS-6444) Change desing of order history and order details
- [PLUS-6453](https://olp.atlassian.net/browse/PLUS-6453) Show GuestCheckoutForm when user is missing required field in his/her address
- [PLUS-6533](https://olp.atlassian.net/browse/PLUS-6533) orderPaymentsData cookie and "Order Completed", "Checkout Step Completed" and "Report Order Completed" events only fired and set when payment is Authorised
- [PLUS-6534](https://olp.atlassian.net/browse/PLUS-6534) Fix displaying firstname in the header after removed from JWT token
- [PLUS-6549](https://olp.atlassian.net/browse/PLUS-6549) [Bugfix] Fixed header image on COP/POP pages
- [PLUS-6565](https://olp.atlassian.net/browse/PLUS-6565) Fix bugged guest checkout form
- [PLUS-6573](https://olp.atlassian.net/browse/PLUS-6573) Adyen live client key updated
- [PLUS-6576](https://olp.atlassian.net/browse/PLUS-6576) Fix displaying items on account related pages where address is present
- [PLUS-6581](https://olp.atlassian.net/browse/PLUS-6581) Fix refreshing access token when FF is off
- [PLUS-6626](https://olp.atlassian.net/browse/PLUS-6626) If FF account.access-token.refresh is OFF user is able to go to Overview page
- [PLUS-6641](https://olp.atlassian.net/browse/PLUS-6641) Fix user checkout after AuthGuard component change
- [PLUS-6654](https://olp.atlassian.net/browse/PLUS-6654) Fix social media users can not access to step 2 of checkout
- [PLUS-6665](https://olp.atlassian.net/browse/PLUS-6665) Adyen PROD client key updated
- [PLUS-6685](https://olp.atlassian.net/browse/PLUS-6685) Empty summary fixed at the 1st step of checkout for social logged users

## [1.55.0]

- [PLUS-5247](https://olp.atlassian.net/browse/PLUS-5247) Remove the feature flag checkout.terms-and-conditions from the code
- [PLUS-5382](https://olp.atlassian.net/browse/PLUS-5382) Adjusted navigation in checkout
- [PLUS-5518](https://olp.atlassian.net/browse/PLUS-5518) Enabled 3rd rank products for tax exempt users
- [PLUS-5727](https://olp.atlassian.net/browse/PLUS-5727) Added add to favourites functionallity in the basket
- [PLUS-5807](https://olp.atlassian.net/browse/PLUS-5807) Facilitate 301 redirects to be managed through Page Redirect contentful content type
- [PLUS-5913](https://olp.atlassian.net/browse/PLUS-5913) Fix basket notification position after an item is added or removed
- [PLUS-5982](https://olp.atlassian.net/browse/PLUS-5982) Fixed loading spinner on the checkout when orderPaymentsData is not cleared from the cookies
- [PLUS-6002](https://olp.atlassian.net/browse/PLUS-6002) Passed additional parameters to /create-adyen-payment endpoint for Klarna
- [PLUS-6095](https://olp.atlassian.net/browse/PLUS-6095) Removed the white background for payment icons in basket and checkout page
- [PLUS-6194](https://olp.atlassian.net/browse/PLUS-6194) Refactor Locale based Config
- [PLUS-6313](https://olp.atlassian.net/browse/PLUS-6313) Updated the default theme HEX value of personal care light
- [PLUS-6373](https://olp.atlassian.net/browse/PLUS-6373) [Segment] Fix for segment when open in an inactive Chrome tab
- [PLUS-6382](https://olp.atlassian.net/browse/PLUS-6382) Adding a minimum width to the product slider
- [PLUS-6408](https://olp.atlassian.net/browse/PLUS-6408) Add notification for unexpected errors on basket under the FF of basket.error-notification
- [PLUS-6411](https://olp.atlassian.net/browse/PLUS-6411) [Bugfix] Removed old Safari fix so images don't load broken on page load/slow connections
- [PLUS-6412](https://olp.atlassian.net/browse/PLUS-6412) [Bugfix] Fixed small visual glitch with navigation menu (caused by Tailwind upgrade)
- [PLUS-6425](https://olp.atlassian.net/browse/PLUS-6425) Fixing price alignment in the slider product cards
- [PLUS-6426](https://olp.atlassian.net/browse/PLUS-6426) Implement download invoice button
- [PLUS-6436](https://olp.atlassian.net/browse/PLUS-6436) Added new filter attributes
- [PLUS-6442](https://olp.atlassian.net/browse/PLUS-6442) Added Reskyt script to page to help with app debugging
- [PLUS-6461](https://olp.atlassian.net/browse/PLUS-6461) Add is_social and social_platform properties for usual login an account creation
- [PLUS-6466](https://olp.atlassian.net/browse/PLUS-6466) Show unique products count in order details summary box
- [PLUS-6472](https://olp.atlassian.net/browse/PLUS-6472) Fixed the delete button in grid view in recommendation Slider
- [PLUS-6484](https://olp.atlassian.net/browse/PLUS-6484) Fix filters on mobile
- [PLUS-6508](https://olp.atlassian.net/browse/PLUS-6508) Fix 504 error of 301 redirect

## [1.54.0]

- [PLUS-2829](https://olp.atlassian.net/browse/PLUS-2829) Create react-select component and use it in Address form for province/district selector
- [PLUS-3394](https://olp.atlassian.net/browse/PLUS-3394) Improve accessibility of Autocomplete search results
- [PLUS-4653](https://olp.atlassian.net/browse/PLUS-4653) Remove the feature flag basket.order.sticky-cta from the code
- [PLUS-4662](https://olp.atlassian.net/browse/PLUS-4662) Upgrade tailwind to version 3. Fixed some deprecation warnings from storybook and upgraded to latest version.
- [PLUS-5301](https://olp.atlassian.net/browse/PLUS-5301) Updated Free deelivery tile
- [PLUS-5427](https://olp.atlassian.net/browse/PLUS-5427) [Performance] Deleted feature flag code:
- [PLUS-5453](https://olp.atlassian.net/browse/PLUS-5453) make navigation icons fit one line
- [PLUS-5521](https://olp.atlassian.net/browse/PLUS-5521) Multi-country configuration (initial refactor)
- [PLUS-5712](https://olp.atlassian.net/browse/PLUS-5712) [UX] On the PDP, display a message when a product is low in stock
- [PLUS-5919](https://olp.atlassian.net/browse/PLUS-5919) Add Contentful driven Canonical link override
- [PLUS-5952](https://olp.atlassian.net/browse/PLUS-5952) Display SAMPLE at the left of the sample title on successful and unsuccessful emails
- [PLUS-6071](https://olp.atlassian.net/browse/PLUS-6071) Fixed the apple payment method not to be visible on chrome when toggle the device toolbar and simulate iPhone
- [PLUS-6116](https://olp.atlassian.net/browse/PLUS-6116) issues with buttons hover behaviour
- [PLUS-6158](https://olp.atlassian.net/browse/PLUS-6158) Removed the top margin for Paypal payment method
- [PLUS-6165](https://olp.atlassian.net/browse/PLUS-6165) update icons to the last version
- [PLUS-6166](https://olp.atlassian.net/browse/PLUS-6166) Changed logo for Google Pay to the GPay logo
- [PLUS-6226](https://olp.atlassian.net/browse/PLUS-6226) Add ErpShipping info on order history and order detail responses
- [PLUS-6227](https://olp.atlassian.net/browse/PLUS-6227) Implement order history new design
- [PLUS-6229](https://olp.atlassian.net/browse/PLUS-6229) Implement order tracking modal
- [PLUS-6237](https://olp.atlassian.net/browse/PLUS-6237) Add state parameter to the oauth calls
- [PLUS-6262](https://olp.atlassian.net/browse/PLUS-6262) Upgrade TypeScript to latest version (v4.7.4) and fix error thrown by tsc.
- [PLUS-6269](https://olp.atlassian.net/browse/PLUS-6269) Scroll user to first field with error on account create form
- [PLUS-6278](https://olp.atlassian.net/browse/PLUS-6278) [Bugfix] Marketing teaser titles had lost their styling
- [PLUS-6279](https://olp.atlassian.net/browse/PLUS-6279) [UX] More UX changes to the new USP layout (PDP)
- [PLUS-6292](https://olp.atlassian.net/browse/PLUS-6292) product list filtered event fired multiple times
- [PLUS-6302](https://olp.atlassian.net/browse/PLUS-6302) Ensure the FE still works without the email & family name properties inside the JWT
- [PLUS-6312](https://olp.atlassian.net/browse/PLUS-6312) Implement the new design of order details page
- [PLUS-6320](https://olp.atlassian.net/browse/PLUS-6320) [Bugfix] Load locale settings from runtime config
- [PLUS-6324](https://olp.atlassian.net/browse/PLUS-6324) Use endpoint data in order tracking modal
- [PLUS-6343](https://olp.atlassian.net/browse/PLUS-6343) Add feature flag check for order statuses in order details page
- [PLUS-6348](https://olp.atlassian.net/browse/PLUS-6348) Fixed incorrect usage of safelist in tailwind.config.js
- [PLUS-6354](https://olp.atlassian.net/browse/PLUS-6354) Fixed visual glitches that where introduced with the tailwind upgrade.
- [PLUS-6355](https://olp.atlassian.net/browse/PLUS-6355) Fix order status disappearing
- [PLUS-6357](https://olp.atlassian.net/browse/PLUS-6357) Convert social platform values to lowercase on segment events
- [PLUS-6370](https://olp.atlassian.net/browse/PLUS-6370) Property recommendationId should be recommendation_id
- [PLUS-6377](https://olp.atlassian.net/browse/PLUS-6377) Update account overview page menu
- [PLUS-6378](https://olp.atlassian.net/browse/PLUS-6378) Replace mocked shipment status && adjust logic for getting order status
- [PLUS-6388](https://olp.atlassian.net/browse/PLUS-6388) [Bugfix] Improved header badge number alignment
- [PLUS-6393](https://olp.atlassian.net/browse/PLUS-6393) [UX] On the PDP's USP UI, make the divider line lighter (design feedback)

## Expedite Release 2022/07/07

- [PLUS-6484](https://olp.atlassian.net/browse/PLUS-6484) Fix filters on mobile

## [1.53.0]

- [PLUS-4663](https://olp.atlassian.net/browse/PLUS-4663) Changed the node version in package.json engines to be the latest LTS and upgraded our package manager to the latest version.
- [PLUS-4843](https://olp.atlassian.net/browse/PLUS-4843) Prevented adding to cart fires additional product viewed event
- [PLUS-4945](https://olp.atlassian.net/browse/PLUS-4945) Added track call for Guest Details page viewed
- [PLUS-5101](https://olp.atlassian.net/browse/PLUS-5101) Payment info entered event improvements in the checkout
- [PLUS-5108](https://olp.atlassian.net/browse/PLUS-5108) Removed checkout.guest-checkout.v2-single-use.FE FF
- [PLUS-5145](https://olp.atlassian.net/browse/PLUS-5145) Changed Add Voucher interaction box
- [PLUS-5299](https://olp.atlassian.net/browse/PLUS-5299) Adjusted out of stock item visualization
- [PLUS-5566](https://olp.atlassian.net/browse/PLUS-5566) Removed checkout-unsuccessful-reorder FF
- [PLUS-5695](https://olp.atlassian.net/browse/PLUS-5695) Add script to implement Consent Mode via CookiePro
- [PLUS-5728](https://olp.atlassian.net/browse/PLUS-5728) Copy Middleware properties to Context Object for All Events
- [PLUS-5751](https://olp.atlassian.net/browse/PLUS-5751) Set Progressive enhancement fallbacks for Autocomplete and POP List view product images
- [PLUS-5798](https://olp.atlassian.net/browse/PLUS-5798) Track mobile filter and sort opened event for Segment
- [PLUS-5839](https://olp.atlassian.net/browse/PLUS-5839) Add 'Missing Address Checkout Page Viewed' Track call
- [PLUS-5860](https://olp.atlassian.net/browse/PLUS-5860) [Performance] Improved image size calculation on `<Image/>`
- [PLUS-5953](https://olp.atlassian.net/browse/PLUS-5953) Refactored add to basket service + handle basket notification messaging for samples
- [PLUS-5981](https://olp.atlassian.net/browse/PLUS-5981) Make buttons & qty selector design consistent
- [PLUS-6010](https://olp.atlassian.net/browse/PLUS-6010) [UX] Tweak the font styles of the hero banner
- [PLUS-6045](https://olp.atlassian.net/browse/PLUS-6045) Integrated Adyen Klarna UI component on the payment selection page with pay over time option
- [PLUS-6053](https://olp.atlassian.net/browse/PLUS-6053) Improve Webhooks Performances
- [PLUS-6056](https://olp.atlassian.net/browse/PLUS-6056) Store specific Adyen credentials set for Dev & UAT
- [PLUS-6086](https://olp.atlassian.net/browse/PLUS-6086) Create Atida Cash balance component
- [PLUS-6087](https://olp.atlassian.net/browse/PLUS-6087) Create Atida overview page and make it accessible
- [PLUS-6090](https://olp.atlassian.net/browse/PLUS-6090) Create FAQ accordion component and add it to the page
- [PLUS-6091](https://olp.atlassian.net/browse/PLUS-6091) Adapt the DeliverSteps component to use it as Atida Cash steps
- [PLUS-6092](https://olp.atlassian.net/browse/PLUS-6092) Add loyalty message on top of the account creation form when coming from the checkout
- [PLUS-6093](https://olp.atlassian.net/browse/PLUS-6093) Adyen client key updated
- [PLUS-6098](https://olp.atlassian.net/browse/PLUS-6098) [Security] Updated NextJS config's security header source regex
- [PLUS-6101](https://olp.atlassian.net/browse/PLUS-6101) Add social_platform property to 'Social Login Attempted' segment call
- [PLUS-6140](https://olp.atlassian.net/browse/PLUS-6140) Change "button name" values of "Button clicked" event to snake case, also implement "to_access" value on account main button
- [PLUS-6154](https://olp.atlassian.net/browse/PLUS-6154) Add My Atida Cash path to breadcrumbs in Account Page
- [PLUS-6155](https://olp.atlassian.net/browse/PLUS-6155) [Bugfix] Fixed: Safari freezing on <ProductCard/> link click by removing the `<picture/>` styles
- [PLUS-6156](https://olp.atlassian.net/browse/PLUS-6156) Fix logout issue for Safari, clear all customer related data from Redux on logout
- [PLUS-6157](https://olp.atlassian.net/browse/PLUS-6157) Fix business account not requiring company name and tax number
- [PLUS-6159](https://olp.atlassian.net/browse/PLUS-6159) [UX] Include 500 weight version of the Sonhe font
- [PLUS-6162](https://olp.atlassian.net/browse/PLUS-6162) [UX] Keep page layout stable when navigating client side
- [PLUS-6167](https://olp.atlassian.net/browse/PLUS-6167) Prevent safari from downloading product images twice
- [PLUS-6174](https://olp.atlassian.net/browse/PLUS-6174) CompletePayment Apple Pay Adyen event logged
- [PLUS-6176](https://olp.atlassian.net/browse/PLUS-6176) Separate create account form validation schemas and constants into separate files
- [PLUS-6180](https://olp.atlassian.net/browse/PLUS-6180) [Optimisation] Added Google Optimize script
- [PLUS-6183](https://olp.atlassian.net/browse/PLUS-6183) [Bugfix] Fix sticky header after changes in PLUS-6162
- [PLUS-6185](https://olp.atlassian.net/browse/PLUS-6185) Used selectIsProductUnavailable instead of filtering the basket items on the checkout page to check if the use has any unavailable items in the cart
- [PLUS-6186](https://olp.atlassian.net/browse/PLUS-6186) Refining styles of the quantity selector from PLUS-5981
- [PLUS-6188](https://olp.atlassian.net/browse/PLUS-6188) Duplicated set-data calls fixed
- [PLUS-6189](https://olp.atlassian.net/browse/PLUS-6189) [Bugfix] Allow sticky header to appear below the footer as well
- [PLUS-6190](https://olp.atlassian.net/browse/PLUS-6190) Create Reward component and add it to the page
- [PLUS-6201](https://olp.atlassian.net/browse/PLUS-6201) [Bugfix] Expanded ProductCard link click area to avoid misclicks
- [PLUS-6236](https://olp.atlassian.net/browse/PLUS-6236) [Bugfix] Incorrect sohne-kraftig font name was causing the font to not be loaded.
- [PLUS-6284](https://olp.atlassian.net/browse/PLUS-6284) [Bugfix] Promotion teaser titles were being cut off
- [PLUS-6315](https://olp.atlassian.net/browse/PLUS-6315) Replaced merchantIdentifier to be dynamic from the adyenPaymentMethods response instead of 'merchant.com.atida.dev'
- [PLUS-6326](https://olp.atlassian.net/browse/PLUS-6326) Stop triggering Missing Details Page Viewed event when is Guest Details Page Viewed
- [PLUS-6387](https://olp.atlassian.net/browse/PLUS-6387) Apple Pay onSubmit event logged

## [1.52.1]

- [PLUS-6260](https://olp.atlassian.net/browse/PLUS-6260) Fixed Basket page is broken when user is on the checkout, the product in the basket is unavailable and the user tries to pay
- [PLUS-6263](https://olp.atlassian.net/browse/PLUS-6263) Set-data API call handling fixed
- [PLUS-6281](https://olp.atlassian.net/browse/PLUS-6281) Unknown errors handling fixed for /translations/{namespace} API

## [1.52.0]

- [PLUS-5140](https://olp.atlassian.net/browse/PLUS-5140) Separated CC and Paypal in the dropin and make individual dropins
- [PLUS-5384](https://olp.atlassian.net/browse/PLUS-5384) [Segment] Send the product's SKU as `product_id` for `Product Clicked` events
- [PLUS-5550](https://olp.atlassian.net/browse/PLUS-5550) Moved WebloyaltyScript and GooglePayScript to their respective page
- [PLUS-5715](https://olp.atlassian.net/browse/PLUS-5715) Implement theming
- [PLUS-5716](https://olp.atlassian.net/browse/PLUS-5716) Added logo to theme
- [PLUS-5814](https://olp.atlassian.net/browse/PLUS-5814) Removed search page category filters feature flag
- [PLUS-5815](https://olp.atlassian.net/browse/PLUS-5815) Removed 3rd party script preconnect feature flag
- [PLUS-5838](https://olp.atlassian.net/browse/PLUS-5838) Enable 3-step checkout flow for users without addresses
- [PLUS-5850](https://olp.atlassian.net/browse/PLUS-5850) Improve test coverage for account related components
- [PLUS-5863](https://olp.atlassian.net/browse/PLUS-5863) Add recommendation id in product clicked and product list viewed events
- [PLUS-5869](https://olp.atlassian.net/browse/PLUS-5869) Implement Social Login Attempted segment track call
- [PLUS-5905](https://olp.atlassian.net/browse/PLUS-5905) Fixing the CLS in product list pages
- [PLUS-5912](https://olp.atlassian.net/browse/PLUS-5912) Fix basket add animation when a product is added to the basket
- [PLUS-5999](https://olp.atlassian.net/browse/PLUS-5999) Exclude draft voucher codes
- [PLUS-6001](https://olp.atlassian.net/browse/PLUS-6001) Update sitemaps and robots.txt
- [PLUS-6005](https://olp.atlassian.net/browse/PLUS-6005) Added customer Ref and cart Id to "basket Product Tile Availability" log
- [PLUS-6008](https://olp.atlassian.net/browse/PLUS-6008) Styling updated for Google Pay
- [PLUS-6011](https://olp.atlassian.net/browse/PLUS-6011) Fixed Apple Pay to be visible on iPhone
- [PLUS-6012](https://olp.atlassian.net/browse/PLUS-6012) [UX] New USP UI variant
- [PLUS-6013](https://olp.atlassian.net/browse/PLUS-6013) [SEO] PDP show the expanded description by default
- [PLUS-6017](https://olp.atlassian.net/browse/PLUS-6017) Update robots.txt file with disallow parameters and filters
- [PLUS-6018](https://olp.atlassian.net/browse/PLUS-6018) Fixed the style of the apple pay button to be similar to google pay button
- [PLUS-6020](https://olp.atlassian.net/browse/PLUS-6020) [Performance] use priority hints for image preloading
- [PLUS-6025](https://olp.atlassian.net/browse/PLUS-6025) The last used payment method is selected when you go to the payment step
- [PLUS-6029](https://olp.atlassian.net/browse/PLUS-6029) Removed View Basket button when basket is empty
- [PLUS-6034](https://olp.atlassian.net/browse/PLUS-6034) Align price for similar product components
- [PLUS-6039](https://olp.atlassian.net/browse/PLUS-6039) Added "paymentMethodsResponse" and "locale" properties to the AdyenCheckoutConfiguration object
- [PLUS-6040](https://olp.atlassian.net/browse/PLUS-6040) Removed the styles added in the adyen.css for apple pay
- [PLUS-6041](https://olp.atlassian.net/browse/PLUS-6041) Adjust styles of "add to basket", quantity selector and "remove from favourites" button on favourites list view
- [PLUS-6099](https://olp.atlassian.net/browse/PLUS-6099) Fix Account Creation Step 1 Completed track fired when error is shown
- [PLUS-6134](https://olp.atlassian.net/browse/PLUS-6134) Prevented users to checkout with out-of-stock items in their cart

## [1.51.1]

- [PLUS-6054](https://olp.atlassian.net/browse/PLUS-6054) Restore Password Strength indicator

## [1.51.0]

- [PLUS-4982](https://olp.atlassian.net/browse/PLUS-4982) Handle different scenarious for basket notification + UI improvements
- [PLUS-5002](https://olp.atlassian.net/browse/PLUS-5002) Remove Feature Flag checkout.logging.log-all-issues-api.fe to log all issues related to the checkout flow
- [PLUS-5402](https://olp.atlassian.net/browse/PLUS-5402) Fixed when selecting filter the page jumps to top
- [PLUS-5430](https://olp.atlassian.net/browse/PLUS-5430) Redirections handled for Adyen payments
- [PLUS-5463](https://olp.atlassian.net/browse/PLUS-5463) SEO improvements for the simple to change hardcoded elements
- [PLUS-5502](https://olp.atlassian.net/browse/PLUS-5502) Add the sample label to those product which are not sellable type
- [PLUS-5549](https://olp.atlassian.net/browse/PLUS-5549) Display the 0 price for fully discounted and promotional items
- [PLUS-5582](https://olp.atlassian.net/browse/PLUS-5582) Add tracking event for account creation step completion
- [PLUS-5600](https://olp.atlassian.net/browse/PLUS-5600) Added label to the 3rd Rank promo items
- [PLUS-5610](https://olp.atlassian.net/browse/PLUS-5610) Integrate Pencil banner with Exponea
- [PLUS-5694](https://olp.atlassian.net/browse/PLUS-5694) Add Reset events after Signed Out events
- [PLUS-5703](https://olp.atlassian.net/browse/PLUS-5703) Add Tooltip in Extra discount label
- [PLUS-5704](https://olp.atlassian.net/browse/PLUS-5704) Implementing the sticky 'add to cart' on Tablet and Desktop devices
- [PLUS-5797](https://olp.atlassian.net/browse/PLUS-5797) Add no_index and no_follow SEO fields to SEO content type in Contentful
- [PLUS-5832](https://olp.atlassian.net/browse/PLUS-5832) UI improvements for basket notification
- [PLUS-5834](https://olp.atlassian.net/browse/PLUS-5834) Add Social Login buttons to Account Menu
- [PLUS-5840](https://olp.atlassian.net/browse/PLUS-5840) Add event tracking to navigation items for 'Sign In' and 'Create Account'
- [PLUS-5845](https://olp.atlassian.net/browse/PLUS-5845) Send account created segment events with social
- [PLUS-5846](https://olp.atlassian.net/browse/PLUS-5846) Fixing the size of the Gallery image on the PDP, and aligning the component according design
- [PLUS-5858](https://olp.atlassian.net/browse/PLUS-5858) [Performance] Improved "Cache-Control" headers: Move max-age to FF and disable in UAT/DEV
- [PLUS-5859](https://olp.atlassian.net/browse/PLUS-5859) Hide email field on guest checkout form when customer is logged in
- [PLUS-5861](https://olp.atlassian.net/browse/PLUS-5861) checkout/adyen-status page tracked
- [PLUS-5862](https://olp.atlassian.net/browse/PLUS-5862) Created a new component for Apple Pay
- [PLUS-5893](https://olp.atlassian.net/browse/PLUS-5893) Fixing the pixelated zoom of the product gallery image
- [PLUS-5900](https://olp.atlassian.net/browse/PLUS-5900) 3DS enabled for Google Pay
- [PLUS-5901](https://olp.atlassian.net/browse/PLUS-5901) [Performance] Lazy load marketing teaser and category grid images. Use decoding="async" for lazy images.
- [PLUS-5906](https://olp.atlassian.net/browse/PLUS-5906) Refactored New Relic payment request and response logs
- [PLUS-5909](https://olp.atlassian.net/browse/PLUS-5909) [Contentful] Fetch brands using CDA to avoid release caching issues
- [PLUS-5925](https://olp.atlassian.net/browse/PLUS-5925) Favourties page styles fix
- [PLUS-5943](https://olp.atlassian.net/browse/PLUS-5943) Decrease the loading bar in the add to basket pop up notification
- [PLUS-5959](https://olp.atlassian.net/browse/PLUS-5959) Use the generic warning notification for availability warning in basket
- [PLUS-5963](https://olp.atlassian.net/browse/PLUS-5963) Fixed close icon overlapping with text. Also fixed margin between rating stars and in stock info on favourites list view
- [PLUS-5964](https://olp.atlassian.net/browse/PLUS-5964) [QA] Common test-id for product card & tile title components to help with automated testing

## [1.50.0]

- [PLUS-1475](https://olp.atlassian.net/browse/PLUS-1475) Report event product list filtered for Segment
- [PLUS-5110](https://olp.atlassian.net/browse/PLUS-5110) Removed checkout.payment.braintree.unvault-cards Feature Flag
- [PLUS-5300](https://olp.atlassian.net/browse/PLUS-5300) Reduce password requirements to 8 characters only
- [PLUS-5345](https://olp.atlassian.net/browse/PLUS-5345) Fix product position prop in Product clicked event triggered from search bar
- [PLUS-5378](https://olp.atlassian.net/browse/PLUS-5378) Tracked "buy now" button on basket
- [PLUS-5468](https://olp.atlassian.net/browse/PLUS-5468) Add type_brandpage to the contextRules sent to Algolia
- [PLUS-5480](https://olp.atlassian.net/browse/PLUS-5480) Remove unnecessary personal info on user interaction events
- [PLUS-5492](https://olp.atlassian.net/browse/PLUS-5492) [Segment] Add "product_id" to analytics.page calls on the PDP
- [PLUS-5575](https://olp.atlassian.net/browse/PLUS-5575) Create Interactive pencil banner component, create Inline Notification component
- [PLUS-5642](https://olp.atlassian.net/browse/PLUS-5642) Fix bottom margin issue on Password Forgotten page for mobiles equal or lower resolution of 360px
- [PLUS-5691](https://olp.atlassian.net/browse/PLUS-5691) Adyen payment handleSubmit responses logged in New Relic
- [PLUS-5732](https://olp.atlassian.net/browse/PLUS-5732) Grid style review in PDP
- [PLUS-5745](https://olp.atlassian.net/browse/PLUS-5745) Fix design review findings on favourites page
- [PLUS-5801](https://olp.atlassian.net/browse/PLUS-5801) [Performance] Dynamically import content blocks
- [PLUS-5804](https://olp.atlassian.net/browse/PLUS-5804) [Segment] Changed pageType on COP page tracking, from "promotion_list_page" to "pop"
- [PLUS-5805](https://olp.atlassian.net/browse/PLUS-5805) Fix setting previous page name and page type values in Segment Tracking
- [PLUS-5827](https://olp.atlassian.net/browse/PLUS-5827) [PDP] In the "Frequently bought together" UI, when none of the products selected, we'll now show a disabled button and zero price.
- [PLUS-5833](https://olp.atlassian.net/browse/PLUS-5833) Add welcome message after account created via social
- [PLUS-5848](https://olp.atlassian.net/browse/PLUS-5848) Add id to the component basketItems
- [PLUS-5854](https://olp.atlassian.net/browse/PLUS-5854) Fix login failed event always firing
- [PLUS-5855](https://olp.atlassian.net/browse/PLUS-5855) Changed the code in the braintree component to use logger.error in the handleSubmitThreeDSecure function
- [PLUS-5867](https://olp.atlassian.net/browse/PLUS-5867) Stop firing Password forgotten event on page load
- [PLUS-5873](https://olp.atlassian.net/browse/PLUS-5873) [Bugfix] Check image source URL validity before preconnecting to CDN
- [PLUS-5874](https://olp.atlassian.net/browse/PLUS-5874) Remove quotes from UserToken reported to Algolia
- [PLUS-5109](https://olp.atlassian.net/browse/PLUS-5109) Remove feature flag checkout.payment.braintree.opt-in-vault-card for the option to vault a card for visa master cards
- [PLUS-5903](https://olp.atlassian.net/browse/PLUS-5903) Removed the vaultCard property in the braintree component dropin

## [1.49.0]

- [PLUS-1109](https://olp.atlassian.net/browse/PLUS-1109) Diff Content Types between environments
- [PLUS-3483](https://olp.atlassian.net/browse/PLUS-3483) Fix multiple get customer calls in the Exponea block
- [PLUS-4763](https://olp.atlassian.net/browse/PLUS-4763) Improve notifications styling
- [PLUS-4964](https://olp.atlassian.net/browse/PLUS-4964) Address validation on address book edit and add address
- [PLUS-4977](https://olp.atlassian.net/browse/PLUS-4977) Design + animations and functionality for the new Basket Notification + refactor of old code
- [PLUS-5198](https://olp.atlassian.net/browse/PLUS-5198) [Performance] Improving the image loading priority in the Product Card
- [PLUS-5523](https://olp.atlassian.net/browse/PLUS-5523) Payment Info Entered event added for Google Pay
- [PLUS-5539](https://olp.atlassian.net/browse/PLUS-5539) [Performance] Avoid CLS on product list taglists
- [PLUS-5547](https://olp.atlassian.net/browse/PLUS-5547) [Performance] PDP CLS and LCP improvements
- [PLUS-5564](https://olp.atlassian.net/browse/PLUS-5564) [Security] Move secrets to GitLab variables
- [PLUS-5588](https://olp.atlassian.net/browse/PLUS-5588) PaymentData cookie set and checkout complete events added
- [PLUS-5592](https://olp.atlassian.net/browse/PLUS-5592) Implementing the new design for the quantity selector and the add to cart button for the PDPs
- [PLUS-5593](https://olp.atlassian.net/browse/PLUS-5593) Fixing styles for the product (recommendations) sliders
- [PLUS-5613](https://olp.atlassian.net/browse/PLUS-5613) Add 'Account Blocked' segment tracking
- [PLUS-5617](https://olp.atlassian.net/browse/PLUS-5617) Added Brand and Category pages to deployment sync
- [PLUS-5646](https://olp.atlassian.net/browse/PLUS-5646) Fix flashy behaviour when customer is sent from the basket to the checkout
- [PLUS-5672](https://olp.atlassian.net/browse/PLUS-5672) [Bugfix] Fix Segment/CookiePro when using next/script
- [PLUS-5689](https://olp.atlassian.net/browse/PLUS-5689) Fix vertical align, paddings and line clamp
- [PLUS-5693](https://olp.atlassian.net/browse/PLUS-5693) Logged payment request from MBWay, SIBS Multibanco, Stripe Multibanco, Bizum and Paypal in New Relic
- [PLUS-5720](https://olp.atlassian.net/browse/PLUS-5720) Filter out disabled products from favourites list
- [PLUS-5733](https://olp.atlassian.net/browse/PLUS-5733) [Performance] Improve font preloading
- [PLUS-5735](https://olp.atlassian.net/browse/PLUS-5735) Fix scrolling to the footer when visiting the basket page
- [PLUS-5738](https://olp.atlassian.net/browse/PLUS-5738) Fix guest checkout button color on login page
- [PLUS-5739](https://olp.atlassian.net/browse/PLUS-5739) Change create acccount button color on mobile login page
- [PLUS-5740](https://olp.atlassian.net/browse/PLUS-5740) Fix margins between text items on mobile USP text
- [PLUS-5741](https://olp.atlassian.net/browse/PLUS-5741) Fix side margins on login the page
- [PLUS-5742](https://olp.atlassian.net/browse/PLUS-5742) Fix margin of social login component
- [PLUS-5776](https://olp.atlassian.net/browse/PLUS-5776) Fixed “is_guest” property has value “false“ for guest users
- [PLUS-5795](https://olp.atlassian.net/browse/PLUS-5795) Fix infinite loop endpoint call for getting products on Favourites page
- [PLUS-5799](https://olp.atlassian.net/browse/PLUS-5799) [Performance] Improve initial page load by dynamically loading product page
- [PLUS-5803](https://olp.atlassian.net/browse/PLUS-5803) Fix get customer Spryker request on update personal details page
- [PLUS-5872](https://olp.atlassian.net/browse/PLUS-5872) Fixing Quantity Selector buttons background color

## [1.48.0]

- [PLUS-2495](https://olp.atlassian.net/browse/PLUS-2495) Implement favourites grid view with option to switch to list view
- [PLUS-5422](https://olp.atlassian.net/browse/PLUS-5422) Implementing the new design for the product sliders
- [PLUS-5477](https://olp.atlassian.net/browse/PLUS-5477) Align filters on brand page with POP/SOP
- [PLUS-5479](https://olp.atlassian.net/browse/PLUS-5479) Fix for preventing user going logged in again after pressing browser back button on iOS chrome
- [PLUS-5510](https://olp.atlassian.net/browse/PLUS-5510) Fix some styles in the Frequently Bougth Together component
- [PLUS-5512](https://olp.atlassian.net/browse/PLUS-5512) Adapt Webhook Storage folder
- [PLUS-5544](https://olp.atlassian.net/browse/PLUS-5544) Render total saving from backend into the sticky CTA
- [PLUS-5580](https://olp.atlassian.net/browse/PLUS-5580) [PDP] Show the price savings (RRP - Current price)
- [PLUS-5587](https://olp.atlassian.net/browse/PLUS-5587) Create-adyen-payment API call response
- [PLUS-5589](https://olp.atlassian.net/browse/PLUS-5589) Add new logger for each step to log the active or guest step to new relic
- [PLUS-5594](https://olp.atlassian.net/browse/PLUS-5594) Search field adjustments and add FF for autocomplete debug mode
- [PLUS-5596](https://olp.atlassian.net/browse/PLUS-5596) Add tracking for social login
- [PLUS-5611](https://olp.atlassian.net/browse/PLUS-5611) Add Guest Favourites notification to Favourites page
- [PLUS-5638](https://olp.atlassian.net/browse/PLUS-5638) Prevent Popup from displaying 3 different notifications
- [PLUS-5654](https://olp.atlassian.net/browse/PLUS-5654) Fixed the order of the FF's that broke as a consequence of the merge conflict
- [PLUS-5701](https://olp.atlassian.net/browse/PLUS-5701) Add extra validation on socia code endpoint to avoid possible errors
- [PLUS-5721](https://olp.atlassian.net/browse/PLUS-5721) Update algolia_ab_test_id prop format
- [PLUS-5725](https://olp.atlassian.net/browse/PLUS-5725) Added in placeholder text
- [PLUS-5726](https://olp.atlassian.net/browse/PLUS-5726) Keep the main product selected when navigating between products
- [PLUS-5731](https://olp.atlassian.net/browse/PLUS-5731) [Performance] Fixing CLS issue with the Hero Banner Slider
- [PLUS-5736](https://olp.atlassian.net/browse/PLUS-5736) [Bugfix] Show savings in PDP on tablet/desktop devices

## [1.47.1]

- [PLUS-5421](https://olp.atlassian.net/browse/PLUS-5421) When a product is out of stock, we want to offer the user the option to subscribe to a back in stock notification on the PDP. A user can leave their e-mail and request to be notified by e-mail when the item is back in stock by clicking the 'notify me' button.
- [PLUS-5478](https://olp.atlassian.net/browse/PLUS-5478) Display a notification component when an error happened when re ordering
- [PLUS-5481](https://olp.atlassian.net/browse/PLUS-5481) Add new component popup notification in Frequently Bought Together
- [PLUS-5504](https://olp.atlassian.net/browse/PLUS-5504) Add similar product when the product is out stock
- [PLUS-5516](https://olp.atlassian.net/browse/PLUS-5516) Fix X button on login page not visible on Safari
- [PLUS-5643](https://olp.atlassian.net/browse/PLUS-5643) Fixed FF for Back in stock

## [1.47.0]

- [PLUS-2144](https://olp.atlassian.net/browse/PLUS-2144) Hide filters and sorting on less than 2 results on SOP
- [PLUS-3074](https://olp.atlassian.net/browse/PLUS-3074) Send Algolia A/B testing IDs to Segment
- [PLUS-4524](https://olp.atlassian.net/browse/PLUS-4524) Develop the re-order event when a payment had been unsuccessful
- [PLUS-4999](https://olp.atlassian.net/browse/PLUS-4999) Remove config feature flag for 3ds
- [PLUS-5197](https://olp.atlassian.net/browse/PLUS-5197) [Performance] LCP Improvements to the PDP: remove loading animation, preload LCP, loading priority
- [PLUS-5248](https://olp.atlassian.net/browse/PLUS-5248) Implemented voucher codes
- [PLUS-5257](https://olp.atlassian.net/browse/PLUS-5257) Remove CookiePro feature flags
- [PLUS-5294](https://olp.atlassian.net/browse/PLUS-5294) [Performance] Optimise the product card: dynamically load non SEO components
- [PLUS-5341](https://olp.atlassian.net/browse/PLUS-5341) Adyen Payment Method component created and Instance mounted for Google Pay
- [PLUS-5347](https://olp.atlassian.net/browse/PLUS-5347) Onsubmit handled for Google Pay
- [PLUS-5352](https://olp.atlassian.net/browse/PLUS-5352) [Performance] Further improvements to header CLS
- [PLUS-5360](https://olp.atlassian.net/browse/PLUS-5360) Sanitize Looped entries in Menu
- [PLUS-5370](https://olp.atlassian.net/browse/PLUS-5370) Favourites - Add background to Favourites header
- [PLUS-5401](https://olp.atlassian.net/browse/PLUS-5401) Added sub-brand as a new filter to the brand pages, PLP, and SOP
- [PLUS-5410](https://olp.atlassian.net/browse/PLUS-5410) Adapting the 'add to basket' event for being able to accept several products at once, creating a new 'add several to basket' saga
- [PLUS-5429](https://olp.atlassian.net/browse/PLUS-5429) Refactor cancel order to be triggered when the user click the re order button
- [PLUS-5446](https://olp.atlassian.net/browse/PLUS-5446) Handle add/remove favourites for guest favourites on favourites page
- [PLUS-5466](https://olp.atlassian.net/browse/PLUS-5466) Redesign search design review findings
- [PLUS-5473](https://olp.atlassian.net/browse/PLUS-5473) [Bugfix] Review UI was sometimes missing on PDP
- [PLUS-5485](https://olp.atlassian.net/browse/PLUS-5485) Handle and display guest favourites on Product Overview Pages
- [PLUS-5486](https://olp.atlassian.net/browse/PLUS-5486) Handle and Display guest favourites on Product Page
- [PLUS-5487](https://olp.atlassian.net/browse/PLUS-5487) Handle and display guest favourites in Exponea Recommendation block
- [PLUS-5488](https://olp.atlassian.net/browse/PLUS-5488) Remove login favourites notification when guest favs FF is on
- [PLUS-5495](https://olp.atlassian.net/browse/PLUS-5495) Show number of favourites in the header when guest favourites enabled
- [PLUS-5513](https://olp.atlassian.net/browse/PLUS-5513) [Bugfix] Fixed broken srcsets when image URL contains a whitespace
- [PLUS-5551](https://olp.atlassian.net/browse/PLUS-5551) Fix multiple endpoint calls for add favourites on Product Overview Page
- [PLUS-5559](https://olp.atlassian.net/browse/PLUS-5559) [Tracking] Improved reliablity of performance metrics
- [PLUS-5561](https://olp.atlassian.net/browse/PLUS-5561) Destroy guest favourites cookie on logout
- [PLUS-5565](https://olp.atlassian.net/browse/PLUS-5565) Enable redirections to the checkout after social login
- [PLUS-5567](https://olp.atlassian.net/browse/PLUS-5567) Creating migration script for similar products
- [PLUS-5569](https://olp.atlassian.net/browse/PLUS-5569) [Performance] Use next/script for all 3rd party scripts
- [PLUS-5573](https://olp.atlassian.net/browse/PLUS-5573) When Guest Favs FF is off header fav icon change state when trying to add to favourites
- [PLUS-5574](https://olp.atlassian.net/browse/PLUS-5574) [Bugfix] Fixed Feature Flags in PDP
- [PLUS-5576](https://olp.atlassian.net/browse/PLUS-5576) Add additional set-data call for customers without any addresses
- [PLUS-5577](https://olp.atlassian.net/browse/PLUS-5577) Include email scope on Facebook social login url
- [PLUS-5591](https://olp.atlassian.net/browse/PLUS-5591) Fix search icon not opening the search modal

## [1.46.1]

- [PLUS-4999](https://olp.atlassian.net/browse/PLUS-4999) Remove config feature flag for 3ds
- [PLUS-5257](https://olp.atlassian.net/browse/PLUS-5257) Remove CookiePro feature flags
- [PLUS-5294](https://olp.atlassian.net/browse/PLUS-5294) [Performance] Optimise the product card: dynamically load non SEO components
- [PLUS-5341](https://olp.atlassian.net/browse/PLUS-5341) Adyen Payment Method component created and Instance mounted for Google Pay
- [PLUS-5352](https://olp.atlassian.net/browse/PLUS-5352) [Performance] Further improvements to header CLS
- [PLUS-5446](https://olp.atlassian.net/browse/PLUS-5446) Handle add/remove favourites for guest favourites on favourites page
- [PLUS-5473](https://olp.atlassian.net/browse/PLUS-5473) [Bugfix] Review UI was sometimes missing on PDP
- [PLUS-5485](https://olp.atlassian.net/browse/PLUS-5485) Handle and display guest favourites on Product Overview Pages
- [PLUS-5487](https://olp.atlassian.net/browse/PLUS-5487) Handle and display guest favourites in Exponea Recommendation block
- [PLUS-5551](https://olp.atlassian.net/browse/PLUS-5551) Fix multiple endpoint calls for add favourites on Product Overview Page
- [PLUS-5576](https://olp.atlassian.net/browse/PLUS-5576) Add additional set-data call for customers without any addresses

## [1.46.0]

- [PLUS-1108](https://olp.atlassian.net/browse/PLUS-1108) Contentful CSV Importer
- [PLUS-3016](https://olp.atlassian.net/browse/PLUS-3016) Fixed issue with heart icons disappear in the list when adding / remvoing products from favourites
- [PLUS-3211](https://olp.atlassian.net/browse/PLUS-3211) Send performance metrics (core web vitals) to Segment
- [PLUS-4698](https://olp.atlassian.net/browse/PLUS-4698) Redesign search field
- [PLUS-4963](https://olp.atlassian.net/browse/PLUS-4963) Add address validation on guest checkout form
- [PLUS-5105](https://olp.atlassian.net/browse/PLUS-5105) Connect social login buttons to Spryker endpoints
- [PLUS-5192](https://olp.atlassian.net/browse/PLUS-5192) Minified Product Tile and Frequently Bought Together components.
- [PLUS-5199](https://olp.atlassian.net/browse/PLUS-5199) [Performance] Load all Contentful LCPs as priority 'eager' and preload them
- [PLUS-5237](https://olp.atlassian.net/browse/PLUS-5237) Fix old search term as search input placeholder on empty input
- [PLUS-5278](https://olp.atlassian.net/browse/PLUS-5278) Refacoring the Image component and the useImageDimensions hook, creating the new useCompleteImageSrc hook and fixing the product card image overflowing issue
- [PLUS-5338](https://olp.atlassian.net/browse/PLUS-5338) Created a new payment method called Google Pay if received from Adyen
- [PLUS-5364](https://olp.atlassian.net/browse/PLUS-5364) Display error message for the customer when the account is locked out
- [PLUS-5373](https://olp.atlassian.net/browse/PLUS-5373) Fix back to top button showing/hiding
- [PLUS-5411](https://olp.atlassian.net/browse/PLUS-5411) Creating the migration script for Cross selling products
- [PLUS-5414](https://olp.atlassian.net/browse/PLUS-5414) On create account form focus on password requirments
- [PLUS-5439](https://olp.atlassian.net/browse/PLUS-5439) Removed the quantity selector of 3rd rank discounted Items when they are added in the basket
- [PLUS-5442](https://olp.atlassian.net/browse/PLUS-5442) Fix pre fill email address on create account
- [PLUS-5442](https://olp.atlassian.net/browse/PLUS-5442) Fix pre fill email address on create account
- [PLUS-5444](https://olp.atlassian.net/browse/PLUS-5444) Remove auth guard from favourites layout when guest favourites enabled
- [PLUS-5445](https://olp.atlassian.net/browse/PLUS-5445) Store guest favourites in Cookie
- [PLUS-5448](https://olp.atlassian.net/browse/PLUS-5448) Reduce the minimum length for city field validation from 3 to 2 for all account related forms
- [PLUS-5449](https://olp.atlassian.net/browse/PLUS-5449) If the third rank product is unavailable, another contentTrigger on the basket page is dispatched with another random discounted Item
- [PLUS-5469](https://olp.atlassian.net/browse/PLUS-5469) Remove login dependency from the favourites urls and use isGuestFavouritesEnabled FF
- [PLUS-5489](https://olp.atlassian.net/browse/PLUS-5489) Cleared redux state if addOnProduct is unavailable on the basket page

## [1.45.0]

- [PLUS-3436](https://olp.atlassian.net/browse/PLUS-3436) Improve account-domain tests
- [PLUS-3588](https://olp.atlassian.net/browse/PLUS-3588) Added userToken to algolia queries
- [PLUS-4745](https://olp.atlassian.net/browse/PLUS-4745) Refactor Social Login logic
- [PLUS-4775](https://olp.atlassian.net/browse/PLUS-4775) Stored last used payment method in cookie and used it
- [PLUS-5003](https://olp.atlassian.net/browse/PLUS-5003) Hid login notification when error values are empty strings
- [PLUS-5037](https://olp.atlassian.net/browse/PLUS-5037) Add special error notifications on an unauthorised response from social login endpoint
- [PLUS-5152](https://olp.atlassian.net/browse/PLUS-5152) Fix issues with Favourites page not loading
- [PLUS-5215](https://olp.atlassian.net/browse/PLUS-5215) Render Google login form
- [PLUS-5231](https://olp.atlassian.net/browse/PLUS-5231) Show a loader when the the user is redirected to checkout again
- [PLUS-5262](https://olp.atlassian.net/browse/PLUS-5262) Fix account menu not open on tablet
- [PLUS-5287](https://olp.atlassian.net/browse/PLUS-5287) [Bugfix] Avoid loading exponea and yotpo JS files twice
- [PLUS-5291](https://olp.atlassian.net/browse/PLUS-5291) Fix account menu on hover change color to green
- [PLUS-5292](https://olp.atlassian.net/browse/PLUS-5292) Tweak Create Account button spacing on Login page
- [PLUS-5295](https://olp.atlassian.net/browse/PLUS-5295) Fix spacings on password reset pages
- [PLUS-5302](https://olp.atlassian.net/browse/PLUS-5302) Load third party scripts globally
- [PLUS-5307](https://olp.atlassian.net/browse/PLUS-5307) [Performance] Add `assets.atida.com` to CDN urls so that it can be prefetched
- [PLUS-5309](https://olp.atlassian.net/browse/PLUS-5309) Add 'added_from' and 'removed_from' properties to favourites segment tracking
- [PLUS-5315](https://olp.atlassian.net/browse/PLUS-5315) Fix new relic log for out of stock items in basket page
- [PLUS-5331](https://olp.atlassian.net/browse/PLUS-5331) Called /adyen-payment-methods endpoint when the checkout page is loading
- [PLUS-5349](https://olp.atlassian.net/browse/PLUS-5349) Set-data call repetition removed on the checkout page
- [PLUS-5353](https://olp.atlassian.net/browse/PLUS-5353) [Bugfix] Remove font preloading warnings
- [PLUS-5355](https://olp.atlassian.net/browse/PLUS-5355) Fix overlapping menus and buttons
- [PLUS-5357](https://olp.atlassian.net/browse/PLUS-5357) Fixing Product List Viewed event trigger for PDPs
- [PLUS-5371](https://olp.atlassian.net/browse/PLUS-5371) Add a ease out class to the cart basket animation, so it can relate to design
- [PLUS-5383](https://olp.atlassian.net/browse/PLUS-5383) Promotional Items added when quantity is changing
- [PLUS-5385](https://olp.atlassian.net/browse/PLUS-5385) Fix prefill email address through notification on forgot password page
- [PLUS-5386](https://olp.atlassian.net/browse/PLUS-5386) Tweak empty favourites page CTA styling
- [PLUS-5392](https://olp.atlassian.net/browse/PLUS-5392) Redirect to home page instead of the current previous path on empty favourites page for fixing redirecting issues
- [PLUS-5406](https://olp.atlassian.net/browse/PLUS-5406) Send customer IP on Login
- [PLUS-5408](https://olp.atlassian.net/browse/PLUS-5408) Basket modal information handled when we get a promotional item while changing the quantity of any item
- [PLUS-5433](https://olp.atlassian.net/browse/PLUS-5433) Basket fetched when a promotional item is added on quantity change
- [PLUS-5447](https://olp.atlassian.net/browse/PLUS-5447) Basket Modal messaging removed when getting a promotional item on quantity change

## [1.44.1]

- [PLUS-5074](https://olp.atlassian.net/browse/PLUS-5074) Added context params to algolia queries
- [PLUS-5346](https://olp.atlassian.net/browse/PLUS-5346) [Bugfix] Fixed sitemaps returning a `404`
- [PLUS-5351](https://olp.atlassian.net/browse/PLUS-5351) Fixed simple header background on POP
- [PLUS-5366](https://olp.atlassian.net/browse/PLUS-5366) Fix titles in ExponeaRecommendationBlocks
- [PLUS-5369](https://olp.atlassian.net/browse/PLUS-5369) Setting the color of the category for its page header
- [PLUS-5399](https://olp.atlassian.net/browse/PLUS-5399) Fixing the POP header image issue that it was not being rendered
- [PLUS-5412](https://olp.atlassian.net/browse/PLUS-5412) [Bugfix] Product sitemap for es-es had the wrong URL

## [1.44.0]

- [PLUS-2434](https://olp.atlassian.net/browse/PLUS-2434) Fix favourites page loading multiple times
- [PLUS-2499](https://olp.atlassian.net/browse/PLUS-2499) Add error tracking when adding/removing favourites
- [PLUS-3703](https://olp.atlassian.net/browse/PLUS-3703) Load CookiePro as deferred script
- [PLUS-4299](https://olp.atlassian.net/browse/PLUS-4299) Improve favourites empty state
- [PLUS-4467](https://olp.atlassian.net/browse/PLUS-4467) Fixed search no suggestions shown , when no products found
- [PLUS-4549](https://olp.atlassian.net/browse/PLUS-4549) Called cancel order endpoint while getting on the unsuccessful page
- [PLUS-4614](https://olp.atlassian.net/browse/PLUS-4614) Added payment method logos to Basket and Checkout pages
- [PLUS-4681](https://olp.atlassian.net/browse/PLUS-4681) Fix back navigation from sub-category
- [PLUS-4754](https://olp.atlassian.net/browse/PLUS-4754) Upgraded TypeScript to ^4.6.2 and fixed all the type issues. Refactored error handling.
- [PLUS-4808](https://olp.atlassian.net/browse/PLUS-4808) Added "is_existing_customer" in middleware for all track calls
- [PLUS-4996](https://olp.atlassian.net/browse/PLUS-4996) Removed basket-promotional-items-add-to-cart Feature flag
- [PLUS-4997](https://olp.atlassian.net/browse/PLUS-4997) Removed basket-get.api.handle-locale-error FF
- [PLUS-4998](https://olp.atlassian.net/browse/PLUS-4998) Removed basket-get-api-locale-from-query Feature flag
- [PLUS-5000](https://olp.atlassian.net/browse/PLUS-5000) Removed basket-free-shipping-notification Feature flag
- [PLUS-5053](https://olp.atlassian.net/browse/PLUS-5053) Add pulse animation for cart badge in the header, when adding, removing, increase or decrease a product
- [PLUS-5147](https://olp.atlassian.net/browse/PLUS-5147) Set Progressive enhancement fallbacks for order history product images
- [PLUS-5148](https://olp.atlassian.net/browse/PLUS-5148) The HeroHeader component now is also shown on POP/PLP
- [PLUS-5151](https://olp.atlassian.net/browse/PLUS-5151) Refactor unsuccessful order page to show only a button to re order
- [PLUS-5156](https://olp.atlassian.net/browse/PLUS-5156) Fixed an issue where Change address link was clickable if delivery component is disabled
- [PLUS-5167](https://olp.atlassian.net/browse/PLUS-5167) Fix account menu grayed out when reloading page that is not using account layout
- [PLUS-5195](https://olp.atlassian.net/browse/PLUS-5195) Fixing the header loading issue
- [PLUS-5196](https://olp.atlassian.net/browse/PLUS-5196) [Performance] Preconnect to CDNs and preload webfonts
- [PLUS-5210](https://olp.atlassian.net/browse/PLUS-5210) When guest checkout buttons is visible align it with login button
- [PLUS-5211](https://olp.atlassian.net/browse/PLUS-5211) Add payment method attribute to trigger report order completed and refactor same attribute in the saga
- [PLUS-5213](https://olp.atlassian.net/browse/PLUS-5213) Add logger for out of stock items when the basket items are render in the basket page
- [PLUS-5214](https://olp.atlassian.net/browse/PLUS-5214) Updating the Hero Banner title for using a plain text field in Contentful so we can use an specific HTML tag in the FE
- [PLUS-5221](https://olp.atlassian.net/browse/PLUS-5221) Add new title in ExponeaRecommendationBlock for when recommendations are random and not personalised.
- [PLUS-5233](https://olp.atlassian.net/browse/PLUS-5233) Fix filter button z-index
- [PLUS-5234](https://olp.atlassian.net/browse/PLUS-5234) Removed the discounted item from the basket, when the quantity of the original item is changed and there is shipping fee
- [PLUS-5238](https://olp.atlassian.net/browse/PLUS-5238) Fixed title of filter is showing even when there is no filter
- [PLUS-5242](https://olp.atlassian.net/browse/PLUS-5242) Fix disappearing navigation for SM devices
- [PLUS-5261](https://olp.atlassian.net/browse/PLUS-5261) Fixed Invalid once-per-customer voucher is stored in the cart and result in 422 on delivery step
- [PLUS-5264](https://olp.atlassian.net/browse/PLUS-5264) Filtered the 3rd rank discounted items to exclude items that are already in the basket
- [PLUS-5266](https://olp.atlassian.net/browse/PLUS-5266) Fix favourites products counter does not change and no indication when adding favourite to basket
- [PLUS-5271](https://olp.atlassian.net/browse/PLUS-5271) Fix sticky menu overlaps filters close button
- [PLUS-5275](https://olp.atlassian.net/browse/PLUS-5275) [Bug] Fixed main section header ignoring background colour property
- [PLUS-5288](https://olp.atlassian.net/browse/PLUS-5288) Move the number of products per page to a feature flag
- [PLUS-4005](https://olp.atlassian.net/browse/PLUS-4005) Implement back to top button on pages with infinete pagination
- [PLUS-5146](https://olp.atlassian.net/browse/PLUS-5146) Changed Free Delivery Notification on Mobile
- [PLUS-5289](https://olp.atlassian.net/browse/PLUS-5289) Update robots.txt file to allow user-agents "Googlebot" and "Googlebot-image" to crawl our site.

## [1.43.1]

- [PLUS-4681](https://olp.atlassian.net/browse/PLUS-4681) Fix back navigation from sub-category

## [1.43.0]

- [PLUS-2400](https://olp.atlassian.net/browse/PLUS-2400) Change color of title of product if out of stock on favourites page
- [PLUS-2486](https://olp.atlassian.net/browse/PLUS-2486) Add tracking for favourites (add/remove)
- [PLUS-2770](https://olp.atlassian.net/browse/PLUS-2770) Upgrade Next to version 12 and storybook to 6.4.19.
- [PLUS-3631](https://olp.atlassian.net/browse/PLUS-3631) Set Progressive enhancement fallbacks for product images
- [PLUS-4007](https://olp.atlassian.net/browse/PLUS-4007) Make filters and sort button sticky on mobile and tablet
- [PLUS-4227](https://olp.atlassian.net/browse/PLUS-4227) Pino browser logging added to New Relic via logger
- [PLUS-4430](https://olp.atlassian.net/browse/PLUS-4430) Update Header Account Menu to include new style, behind FF
- [PLUS-4488](https://olp.atlassian.net/browse/PLUS-4488) Add a link anchor to the coupon redeem form
- [PLUS-4522](https://olp.atlassian.net/browse/PLUS-4522) Refactor the redirect url to unsuccessful page when stripe multibanco payment fails.
- [PLUS-4523](https://olp.atlassian.net/browse/PLUS-4523) Add redirection from checkout to unsuccessful page instead of empty basket
- [PLUS-4526](https://olp.atlassian.net/browse/PLUS-4526) Email propery in the "Email Subscribed" event is set to lowercase and trimmed to match the hash
- [PLUS-4546](https://olp.atlassian.net/browse/PLUS-4546) Available discounted product added to Redux
- [PLUS-4547](https://olp.atlassian.net/browse/PLUS-4547) Displayed promotional product on the basket page
- [PLUS-4661](https://olp.atlassian.net/browse/PLUS-4661) Removed disabled products from Basket
- [PLUS-4696](https://olp.atlassian.net/browse/PLUS-4696) Fixed search stop working when opening another browser tab
- [PLUS-4709](https://olp.atlassian.net/browse/PLUS-4709) Make it possible to not show promotion labels on the FE with an active Spryker rule
- [PLUS-4801](https://olp.atlassian.net/browse/PLUS-4801) Fixed search suggestions not matching search term
- [PLUS-4867](https://olp.atlassian.net/browse/PLUS-4867) Mobile - Changed Basket CTAs to green
- [PLUS-4890](https://olp.atlassian.net/browse/PLUS-4890) Fixing the issue with the 'undefined' href on the Promotion Teaser
- [PLUS-4910](https://olp.atlassian.net/browse/PLUS-4910) Fixed grid rows , when filter down to 1 product.
- [PLUS-4914](https://olp.atlassian.net/browse/PLUS-4914) Added tax exempt region notification to guest checkout
- [PLUS-4921](https://olp.atlassian.net/browse/PLUS-4921) Implementing React.memo() in several components to increase performance on POP
- [PLUS-4928](https://olp.atlassian.net/browse/PLUS-4928) Triggering 'Product List Viewed' when a recommendations block enters in the viewport
- [PLUS-4942](https://olp.atlassian.net/browse/PLUS-4942) Removed internal Contentful title for unwanted hover behaviour
- [PLUS-4956](https://olp.atlassian.net/browse/PLUS-4956) Enable a second block of recommendations in PDP
- [PLUS-4970](https://olp.atlassian.net/browse/PLUS-4970) Changed the delivery item to only refresh when switching between ranks
- [PLUS-4990](https://olp.atlassian.net/browse/PLUS-4990) Optimise Product Card DOM size
- [PLUS-5006](https://olp.atlassian.net/browse/PLUS-5006) Improving the design of the reviews Yotpo widget
- [PLUS-5017](https://olp.atlassian.net/browse/PLUS-5017) Fix styles for button to remove coupon
- [PLUS-5025](https://olp.atlassian.net/browse/PLUS-5025) Made usps to rotate on mobile
- [PLUS-5032](https://olp.atlassian.net/browse/PLUS-5032) Add social login buttons to Login form controlled by feature flags
- [PLUS-5038](https://olp.atlassian.net/browse/PLUS-5038) Fixed issue where a zero discount from RRP is displayed in Order Totals
- [PLUS-5041](https://olp.atlassian.net/browse/PLUS-5041) Improving performance implementing React.memo() in SimpleHeader, HeroHeader, CategoryList, FilterList and Promotion listing
- [PLUS-5050](https://olp.atlassian.net/browse/PLUS-5050) Clear error from accout create fields when selecting browser suggestions
- [PLUS-5060](https://olp.atlassian.net/browse/PLUS-5060) Add placeholder on the address street field when address suggestion is enabled
- [PLUS-5066](https://olp.atlassian.net/browse/PLUS-5066) Hiding the strikeout price when it's the same as the current price
- [PLUS-5068](https://olp.atlassian.net/browse/PLUS-5068) Fix dropdown appearance for Address Validation
- [PLUS-5069](https://olp.atlassian.net/browse/PLUS-5069) Setting the test ID for the product recommendations slider
- [PLUS-5070](https://olp.atlassian.net/browse/PLUS-5070) Fix province LA Coruna when selected on address suggestion dropdown
- [PLUS-5071](https://olp.atlassian.net/browse/PLUS-5071) Rendering the Google Analytics script only for the Spanish locale
- [PLUS-5081](https://olp.atlassian.net/browse/PLUS-5081) Update Algolia Autocomplete version to 1.5.6
- [PLUS-5084](https://olp.atlassian.net/browse/PLUS-5084) Clear notification favourites on login page
- [PLUS-5098](https://olp.atlassian.net/browse/PLUS-5098) Fixed promo title is missing on search page
- [PLUS-5103](https://olp.atlassian.net/browse/PLUS-5103) Fixing Brand ID validation on Contentful
- [PLUS-5112](https://olp.atlassian.net/browse/PLUS-5112) On account create page clear the error from phone numer field when prefilled
- [PLUS-5120](https://olp.atlassian.net/browse/PLUS-5120) Amend the Address Suggestion behaviour on the Account Creation form
- [PLUS-5122](https://olp.atlassian.net/browse/PLUS-5122) Hide account dropdown menu when unhover it
- [PLUS-5128](https://olp.atlassian.net/browse/PLUS-5128) Fix issue with preselected districts on PT account creation
- [PLUS-5134](https://olp.atlassian.net/browse/PLUS-5134) Fixing filter alignment on mobile
- [PLUS-5136](https://olp.atlassian.net/browse/PLUS-5136) Clear suggested addresses when input query is below minimum threshold
- [PLUS-5149](https://olp.atlassian.net/browse/PLUS-5149) Fix error in Quantity Selector when click in Remove button
- [PLUS-5150](https://olp.atlassian.net/browse/PLUS-5150) Hiding the strikeout price in the searchbar when it's the same as the current price, refatoring the item in the search modal, and creating some tests for it
- [PLUS-5158](https://olp.atlassian.net/browse/PLUS-5158) Fixing Yotpo reviews widget styles
- [PLUS-5165](https://olp.atlassian.net/browse/PLUS-5165) Fix logger configuration for client side and set-data event
- [PLUS-5166](https://olp.atlassian.net/browse/PLUS-5166) Changed 'bizum' payment method name to ‘redsys_bizum’
- [PLUS-5167](https://olp.atlassian.net/browse/PLUS-5167) Fix account menu grayed out when reloading page that is not using account layout
- [PLUS-5178](https://olp.atlassian.net/browse/PLUS-5178) Items property made optional for Product Added event
- [PLUS-5193](https://olp.atlassian.net/browse/PLUS-5193) Fixing low quality images on Marketing Teasers
- [PLUS-5206](https://olp.atlassian.net/browse/PLUS-5206) Fix PromotionListViewed tracking.
- [PLUS-5208](https://olp.atlassian.net/browse/PLUS-5208) Fix selector recommendations for PDP
- [PLUS-5233](https://olp.atlassian.net/browse/PLUS-5233) Fix filter button z-index

## Expedite Release 2022/04/11

- [PLUS-5116](https://olp.atlassian.net/browse/PLUS-5116) Add FF to disable Multiple POST calls being sent to Favourites endpoint

## [1.42.0]

- [PLUS-3401](https://olp.atlassian.net/browse/PLUS-3401) Adjust the validation for Create Account form, also adjust the max length translation
- [PLUS-3875](https://olp.atlassian.net/browse/PLUS-3875) Change Redirect logic of back button in account section based on isLoggedIn
- [PLUS-4258](https://olp.atlassian.net/browse/PLUS-4258) Fix calling logout endpoint on server side
- [PLUS-4280](https://olp.atlassian.net/browse/PLUS-4280) Adjust error message triggers on Address Form
- [PLUS-4340](https://olp.atlassian.net/browse/PLUS-4340) Removed checkout.payment.braintree.3ds.tracking Feature Flag
- [PLUS-4472](https://olp.atlassian.net/browse/PLUS-4472) Remove the feature flag checkout.set-data.prevent-duplicate-call from FE
- [PLUS-4612](https://olp.atlassian.net/browse/PLUS-4612) Displayed rrp total discount and removed total products from basket summary and order summary
- [PLUS-4740](https://olp.atlassian.net/browse/PLUS-4740) Confirmation page - added webloyalty plugin
- [PLUS-4788](https://olp.atlassian.net/browse/PLUS-4788) Add cache control on page level to the getServerSideProps function.
- [PLUS-4841](https://olp.atlassian.net/browse/PLUS-4841) Changed the font size and spacing in the login page to match figma
- [PLUS-4858](https://olp.atlassian.net/browse/PLUS-4858) Change invisible class for hidden class to prevent the page from being initialised empty for one second
- [PLUS-4860](https://olp.atlassian.net/browse/PLUS-4860) Have a correct and optimized H1 in the homepage for ES and PT
- [PLUS-4863](https://olp.atlassian.net/browse/PLUS-4863) Adjust header styles to match design
- [PLUS-4871](https://olp.atlassian.net/browse/PLUS-4871) Removed the flickering warning block when there is no error
- [PLUS-4874](https://olp.atlassian.net/browse/PLUS-4874) Prevent products belonging to uncreated brands from redirecting to the homepage.
- [PLUS-4885](https://olp.atlassian.net/browse/PLUS-4885) Allowing the Full-width Marketing Teaser to use modern image formats for the background
- [PLUS-4903](https://olp.atlassian.net/browse/PLUS-4903) Single-use voucher validation updated for guests on delivery step
- [PLUS-4909](https://olp.atlassian.net/browse/PLUS-4909) Show filters when only product meets filter condition
- [PLUS-4916](https://olp.atlassian.net/browse/PLUS-4916) Fix sticky menu z-index and add animations
- [PLUS-4922](https://olp.atlassian.net/browse/PLUS-4922) Add promotion_id to sponsored content analytics events.
- [PLUS-4925](https://olp.atlassian.net/browse/PLUS-4925) Added is_sponsored_content flag to Promotion Clicked event.
- [PLUS-4927](https://olp.atlassian.net/browse/PLUS-4927) Align the width of cta and quantiy selector size in grid and view
- [PLUS-4937](https://olp.atlassian.net/browse/PLUS-4937) Fix disability of 'Pay now' button for braintree when user change method and choose again the same method
- [PLUS-4943](https://olp.atlassian.net/browse/PLUS-4943) Fixing second vertical scrollbar issue
- [PLUS-4948](https://olp.atlassian.net/browse/PLUS-4948) Lower the threshold for firing the Promotion Viewed event to .75
- [PLUS-4954](https://olp.atlassian.net/browse/PLUS-4954) Add sponsoredContentPosition to HeroBanners in Sliders.
- [PLUS-4960](https://olp.atlassian.net/browse/PLUS-4960) Fix back button position on PDP
- [PLUS-5010](https://olp.atlassian.net/browse/PLUS-5010) Address validation UX Improvements
- [PLUS-5016](https://olp.atlassian.net/browse/PLUS-5016) Making the buttons square on QuantitySelector
- [PLUS-5019](https://olp.atlassian.net/browse/PLUS-5019) Improve validations in guest checkout form when user uses saved browser personal details
- [PLUS-5020](https://olp.atlassian.net/browse/PLUS-5020) Add new attribute to new relic objects when logging braintree response and request dropin
- [PLUS-5022](https://olp.atlassian.net/browse/PLUS-5022) Making the Google Analytics script to be rendered as type="text/javascript"
- [PLUS-5042](https://olp.atlassian.net/browse/PLUS-5042) Add max length validation for specific account related form fields
- [PLUS-5056](https://olp.atlassian.net/browse/PLUS-5056) All cards unvaulted in Braintree
- [PLUS-5049](https://olp.atlassian.net/browse/PLUS-5049) Align titles and buttons on the new Login page
- [PLUS-5072](https://olp.atlassian.net/browse/PLUS-5072) Have a correct and optimized H1 in the homepage for ES and PT
- [PLUS-5114](https://olp.atlassian.net/browse/PLUS-5114) Replaced the check checkoutDataError with (checkoutDataWasSuccess || checkoutDataWasError) when displaying the error notification of the checkout page

## Expedite Release 2022/04/01

- [PLUS-5059](https://olp.atlassian.net/browse/PLUS-5059) SEO fix duplicate links on sub-category level

## Expedite Release 2022/03/31

## [1.41.2]

- [PLUS-4841](https://olp.atlassian.net/browse/PLUS-4841) Changed the font size and spacing in the login page to match figma
- [PLUS-4951](https://olp.atlassian.net/browse/PLUS-4951) Changes to match “Iniciar Sesión / Login" title in the login page to match the figma design. Fixed the mismatch in font size.
- [PLUS-4952](https://olp.atlassian.net/browse/PLUS-4952) Seo add locale to category links
- [PLUS-4991](https://olp.atlassian.net/browse/PLUS-4991) Update checkout-data and checkout API calls
- [PLUS-5045](https://olp.atlassian.net/browse/PLUS-5045) Only include taxReference in /checkout and /checkout-data calls if it exists

## [1.41.1]

- MISC Fix pipelines

## [1.41.0]

- [PLUS-1016](https://olp.atlassian.net/browse/PLUS-1016) Hide show more button in filter search when there are no other options left to show.
- [PLUS-3739](https://olp.atlassian.net/browse/PLUS-3739) Make header menu sticky
- [PLUS-3864](https://olp.atlassian.net/browse/PLUS-3864) Update Date format handling to handle ISO8601 format in the Address list
- [PLUS-4261](https://olp.atlassian.net/browse/PLUS-4261) Remove feature flag checkout.order.payment.order-payments.triggered-from-frontend from FE
- [PLUS-4281](https://olp.atlassian.net/browse/PLUS-4281) Improve error messaging in Account Details Page
- [PLUS-4332](https://olp.atlassian.net/browse/PLUS-4332) Add the quantity selector on the Product Tile and Product Card
- [PLUS-4338](https://olp.atlassian.net/browse/PLUS-4338) Remove feature flag checkout.payment.braintree.reset-token for braintree payment method
- [PLUS-4413](https://olp.atlassian.net/browse/PLUS-4413) Update Password Reset page
- [PLUS-4453](https://olp.atlassian.net/browse/PLUS-4453) Remove feature flag checkout.payment.braintree.pay-btn-disabled-validation from the FE side
- [PLUS-4495](https://olp.atlassian.net/browse/PLUS-4495) Remove feature flags for the preseclted delivery method
- [PLUS-4630](https://olp.atlassian.net/browse/PLUS-4630) Fix Trusted shop badge in footer disappears after login
- [PLUS-4655](https://olp.atlassian.net/browse/PLUS-4655) Load dynamically and lazily Yotpo in the PDP and improving the widget styles
- [PLUS-4802](https://olp.atlassian.net/browse/PLUS-4802) Display warning message in the guest-checkout step when you have an error
- [PLUS-4804](https://olp.atlassian.net/browse/PLUS-4804) Adjust search modal width and add margin to search button
- [PLUS-4806](https://olp.atlassian.net/browse/PLUS-4806) Added Guest Checkout Event
- [PLUS-4836](https://olp.atlassian.net/browse/PLUS-4836) Added the feature flag to every page evaluation export
- [PLUS-4840](https://olp.atlassian.net/browse/PLUS-4840) Added copy to Bizum dropin to prevent users from using Bizum
- [PLUS-4850](https://olp.atlassian.net/browse/PLUS-4850) Adding Google Analytics tracking script to MetaData component
- [PLUS-4864](https://olp.atlassian.net/browse/PLUS-4864) Order history calls removed on checkout page for guests
- [PLUS-4865](https://olp.atlassian.net/browse/PLUS-4865) Kept anonymous: in guest token except while logging in
- [PLUS-4866](https://olp.atlassian.net/browse/PLUS-4866) Remove view order button from confirmation and unsuccessful pages
- [PLUS-4868](https://olp.atlassian.net/browse/PLUS-4868) Voucher removed popup not appearing no more when user logs
- [PLUS-4878](https://olp.atlassian.net/browse/PLUS-4878) Block confirmation page when customers login after purchase as guests
- [PLUS-4882](https://olp.atlassian.net/browse/PLUS-4882) Adjust favourites url in the header based on if the customer is logged in or not
- [PLUS-4892](https://olp.atlassian.net/browse/PLUS-4892) Updated ‘Checkout Step Viewed’ and ‘Checkout Step Completed’ events
- [PLUS-4894](https://olp.atlassian.net/browse/PLUS-4894) Redirect customers to homepage when order id is missing on confirmation and unsuccessful pages
- [PLUS-4907](https://olp.atlassian.net/browse/PLUS-4907) Remove password confirm field on Password reset page
- [PLUS-4912](https://olp.atlassian.net/browse/PLUS-4912) Reset the state of password forgoten page on first render
- [PLUS-4926](https://olp.atlassian.net/browse/PLUS-4926) Set-data error notification conditions updated for guests
- [PLUS-4931](https://olp.atlassian.net/browse/PLUS-4931) Preserve anonymousId when calling set-data endpoint in checkout
- [PLUS-4934](https://olp.atlassian.net/browse/PLUS-4934) Opt-in option added for credit cards
- [PLUS-4940](https://olp.atlassian.net/browse/PLUS-4940) Fix Kibana logs for set-data and create-order API calls
- [PLUS-4941](https://olp.atlassian.net/browse/PLUS-4941) Feature Flag added for Opt-in option to vault card in Braintree
- [PLUS-4946](https://olp.atlassian.net/browse/PLUS-4946) Changing Launch Darkly logging level to error

## [1.40.0]

- [PLUS-4412](https://olp.atlassian.net/browse/PLUS-4412) Split Password reset page into two different steps
- [PLUS-4516](https://olp.atlassian.net/browse/PLUS-4516) Add `href` attribute to top navigation menu
- [PLUS-4558](https://olp.atlassian.net/browse/PLUS-4558) Removal of Multi-step, B2B, Address Book, Address Book Extra Fields flags
- [PLUS-4572](https://olp.atlassian.net/browse/PLUS-4572) Loading dynamically Exponea widgets and lazy loading Exponea recommendation blocks
- [PLUS-4577](https://olp.atlassian.net/browse/PLUS-4577) Enable filter by format on POP , filter by category level 0,1,2 on SOP .
- [PLUS-4600](https://olp.atlassian.net/browse/PLUS-4600) Ref change address link in checkout flow for guest users
- [PLUS-4608](https://olp.atlassian.net/browse/PLUS-4608) Included suggestion in report products searched for Segment.
- [PLUS-4638](https://olp.atlassian.net/browse/PLUS-4638) Stepper modified for guest checkout
- [PLUS-4641](https://olp.atlassian.net/browse/PLUS-4641) Add profiling version of FE build allowing devs to easily perform some in-depth performance analysis
- [PLUS-4651](https://olp.atlassian.net/browse/PLUS-4651) Single-use voucher validated on checkout page
- [PLUS-4666](https://olp.atlassian.net/browse/PLUS-4666) Fix guest checkout button for single-column login page
- [PLUS-4732](https://olp.atlassian.net/browse/PLUS-4732) Removing the horizontal scroll caused by using '100vw'
- [PLUS-4764](https://olp.atlassian.net/browse/PLUS-4764) The teaserSlug on the marketing teaser is now optional
- [PLUS-4768](https://olp.atlassian.net/browse/PLUS-4768) Removed hand cursor when there is no url/link and disabled clicking for all related content types (BannerLink, MarketingTeaser)
- [PLUS-4778](https://olp.atlassian.net/browse/PLUS-4778) Fixing recommendations grid view on desktop
- [PLUS-4780](https://olp.atlassian.net/browse/PLUS-4780) Fix Account Created Attempted event not firing when users open the signup page directly
- [PLUS-4793](https://olp.atlassian.net/browse/PLUS-4793) Add password forgotten event when the create account page is loaded
- [PLUS-4794](https://olp.atlassian.net/browse/PLUS-4794) Fix event tracking for Login page when there is no redirect
- [PLUS-4798](https://olp.atlassian.net/browse/PLUS-4798) Preserve customer datas in guest checkout form
- [PLUS-4799](https://olp.atlassian.net/browse/PLUS-4799) Allowed access to confirmation and unsuccessful pages
- [PLUS-4807](https://olp.atlassian.net/browse/PLUS-4807) Guest Details Page Viewed event added
- [PLUS-4809](https://olp.atlassian.net/browse/PLUS-4809) Added Guest Details Entered event
- [PLUS-4810](https://olp.atlassian.net/browse/PLUS-4810) Add the correct page type and name for pages that we create in contentful and are not the home or any referenced content page.
- [PLUS-4816](https://olp.atlassian.net/browse/PLUS-4816) Checkout Started event updated for guests
- [PLUS-4825](https://olp.atlassian.net/browse/PLUS-4825) Remove USP from basket and checkout pages
- [PLUS-4826](https://olp.atlassian.net/browse/PLUS-4826) Add minimum length validation to the current password field when trying to change password
- [PLUS-4828](https://olp.atlassian.net/browse/PLUS-4828) Add new attribute is-guest to customer object for braintree payment method.
- [PLUS-4829](https://olp.atlassian.net/browse/PLUS-4829) Change cookie duration for guest users to one hour during the checkout flow
- [PLUS-4831](https://olp.atlassian.net/browse/PLUS-4831) Fix Guest Checkout button for Single Column Login page
- [PLUS-4842](https://olp.atlassian.net/browse/PLUS-4842) Reinstate USP (with old layout) in Basket & Checkout pages
- [PLUS-4861](https://olp.atlassian.net/browse/PLUS-4861) Removed "atida-plus-guest" and "atida-plus-guest-jwt" cookies on dev after placing an order
- [PLUS-4862](https://olp.atlassian.net/browse/PLUS-4862) Change name of customer attribute from is-guest to is_guest
- [PLUS-4881](https://olp.atlassian.net/browse/PLUS-4881) GraphQL query fixed for MarketingTeaser
- [PLUS-4898](https://olp.atlassian.net/browse/PLUS-4898) Fix 'Sign In Page Viewed' event when visiting the page first and cookies are not accepted
- [PLUS-4900](https://olp.atlassian.net/browse/PLUS-4900) Fix wrong event being triggered when landing on Password forgotten page

## [1.39.2]

- [PLUS-4492](https://olp.atlassian.net/browse/PLUS-4492) Prod Deployment using Contentful release environment

## [1.39.1]

- [PLUS-4825](https://olp.atlassian.net/browse/PLUS-4825) Remove USP from basket and checkout pages
- [PLUS-4842](https://olp.atlassian.net/browse/PLUS-4842) Reinstate USP (with old layout) in Basket & Checkout pages

## [1.39.0]

- [PLUS-2936](https://olp.atlassian.net/browse/PLUS-2936) Added added_from and removed_from prop for Product Added and Product removed events
- [PLUS-3882](https://olp.atlassian.net/browse/PLUS-3882) Show "Previous products" button if there are previous products to be loaded
- [PLUS-4145](https://olp.atlassian.net/browse/PLUS-4145) Refactor Contentful Scripts
- [PLUS-4153](https://olp.atlassian.net/browse/PLUS-4153) Replace Contentful Call with Webhook retrieve
- [PLUS-4175](https://olp.atlassian.net/browse/PLUS-4175) Update Brand SEO by Brand ID
- [PLUS-4275](https://olp.atlassian.net/browse/PLUS-4275) Removed duplicated call to stripe-multibanco-data API
- [PLUS-4312](https://olp.atlassian.net/browse/PLUS-4312) Added metaname of Pinterest to HEAD
- [PLUS-4496](https://olp.atlassian.net/browse/PLUS-4496) Fixed an infinity loop when increasing/decreasing the quantity when there is few product available
- [PLUS-4501](https://olp.atlassian.net/browse/PLUS-4501) Hide confirm password field on change password page behind a feature flag
- [PLUS-4502](https://olp.atlassian.net/browse/PLUS-4502) Add progress bar to account creation
- [PLUS-4530](https://olp.atlassian.net/browse/PLUS-4530) [Experiment] Improve the layout of the USP across the site
- [PLUS-4542](https://olp.atlassian.net/browse/PLUS-4542) PDP: Move the product description to the top of the product details section, open it by default and add "read more" functionality to it.
- [PLUS-4557](https://olp.atlassian.net/browse/PLUS-4557) Adding an 'items quantity' field to the recommendation block content type
- [PLUS-4570](https://olp.atlassian.net/browse/PLUS-4570) Removed Bizum redirection log from new relic
- [PLUS-4571](https://olp.atlassian.net/browse/PLUS-4571) Added Preconnect tag link to JS sources
- [PLUS-4618](https://olp.atlassian.net/browse/PLUS-4618) Cookies set and clear for guest-checkout
- [PLUS-4623](https://olp.atlassian.net/browse/PLUS-4623) Add customer object to payloads received by backend during the checkout process
- [PLUS-4650](https://olp.atlassian.net/browse/PLUS-4650) Guard conditions updated for checkout page and guests
- [PLUS-4658](https://olp.atlassian.net/browse/PLUS-4658) Basket - Adjusted colouring of "Free delivery item" cross-sell to tertiary colour
- [PLUS-4685](https://olp.atlassian.net/browse/PLUS-4685) Remove empty CTA element when CTA is not set on image content blocks.
- [PLUS-4704](https://olp.atlassian.net/browse/PLUS-4704) Extract login page logic and markup to new component
- [PLUS-4705](https://olp.atlassian.net/browse/PLUS-4705) Create new Login component and feature flag
- [PLUS-4706](https://olp.atlassian.net/browse/PLUS-4706) Adjust 'Forgot password' link on Login Form
- [PLUS-4707](https://olp.atlassian.net/browse/PLUS-4707) Implement new login page USP and CTA block
- [PLUS-4717](https://olp.atlassian.net/browse/PLUS-4717) Added email to Order Completed Event
- [PLUS-4723](https://olp.atlassian.net/browse/PLUS-4723) Checkout flow updated for guests
- [PLUS-4726](https://olp.atlassian.net/browse/PLUS-4726) Implement Guest Checkout button into Single and 2 columns login and signup form
- [PLUS-4728](https://olp.atlassian.net/browse/PLUS-4728) Now showing 3 products at a time for SM screen size in the ProductSlider component
- [PLUS-4729](https://olp.atlassian.net/browse/PLUS-4729) The product slider will not autoplay by default
- [PLUS-4733](https://olp.atlassian.net/browse/PLUS-4733) Move USP to the sidebar in the checkout page
- [PLUS-4734](https://olp.atlassian.net/browse/PLUS-4734) Add atida-plus-guest cookie's domain with a dot in the beginning
- [PLUS-4738](https://olp.atlassian.net/browse/PLUS-4738) Adjust "apply filters" button styling
- [PLUS-4746](https://olp.atlassian.net/browse/PLUS-4746) "Previous products" button styling tweaks
- [PLUS-4756](https://olp.atlassian.net/browse/PLUS-4756) Moving the recommendations block on the PDP under the Reviews (on Desktop)
- [PLUS-4758](https://olp.atlassian.net/browse/PLUS-4758) Product List Page list view improvements
- [PLUS-4760](https://olp.atlassian.net/browse/PLUS-4760) Change colour of Continue to shipment method button
- [PLUS-4761](https://olp.atlassian.net/browse/PLUS-4761) Change copy DNI message key on guest check-out form
- [PLUS-4770](https://olp.atlassian.net/browse/PLUS-4770) Add fallback for guest users when sending customer data to BE
- [PLUS-4779](https://olp.atlassian.net/browse/PLUS-4779) Open the Forgot password page in the same tab when clicked on the login page notification
- [PLUS-4817](https://olp.atlassian.net/browse/PLUS-4817) Change active items colour to caribbean dark in header

## [1.38.0]

- [PLUS-4086](https://olp.atlassian.net/browse/PLUS-4086) Removed the checkout.payment.methods-priority.bizum-low feature flag from the checkout page
- [PLUS-4222](https://olp.atlassian.net/browse/PLUS-4222) Added sticky CTA in basket on mobile
- [PLUS-4252](https://olp.atlassian.net/browse/PLUS-4252) Redesign header navigation
- [PLUS-4319](https://olp.atlassian.net/browse/PLUS-4319) Trimmed the white-spaces at the end and beginning of the voucher
- [PLUS-4333](https://olp.atlassian.net/browse/PLUS-4333) Improve styles in ProductGrid and ProductList
- [PLUS-4613](https://olp.atlassian.net/browse/PLUS-4613) Selected braintreen by default when opening the payment page
- [PLUS-4476](https://olp.atlassian.net/browse/PLUS-4476) Creating the slider FE component for recommendations, for both Contentful pages and PDPs
- [PLUS-4500](https://olp.atlassian.net/browse/PLUS-4500) Add expanded policy changes to Password check
- [PLUS-4531](https://olp.atlassian.net/browse/PLUS-4531) Added a notification in the basket when free delivery has been reached
- [PLUS-4534](https://olp.atlassian.net/browse/PLUS-4534) Add aria-required attribute as true to Create Account form
- [PLUS-4555](https://olp.atlassian.net/browse/PLUS-4555) Now the ProductGrid component is rendering 3 products for each row for SM screen size
- [PLUS-4628](https://olp.atlassian.net/browse/PLUS-4628) UUID replaced by Spryker Guest Token for new purchases
- [PLUS-4636](https://olp.atlassian.net/browse/PLUS-4636) Make "Apply filters" button fixed
- [PLUS-4639](https://olp.atlassian.net/browse/PLUS-4639) Display a form as the first step of the guest checkout
- [PLUS-4659](https://olp.atlassian.net/browse/PLUS-4659) Show notifcation for missing billing in address book
- [PLUS-4686](https://olp.atlassian.net/browse/PLUS-4686) Fix header navigation issues
- [PLUS-4699](https://olp.atlassian.net/browse/PLUS-4699) Fixed Basket free shipping tile flickering when a change on basket is made
- [PLUS-4702](https://olp.atlassian.net/browse/PLUS-4702) Moving DEFAULT_CACHE_TTL_MS into a gitlab variable
- [PLUS-4714](https://olp.atlassian.net/browse/PLUS-4714) Show loading spinner until the new password token is verified
- [PLUS-4718](https://olp.atlassian.net/browse/PLUS-4718) Improvements on POP
- [PLUS-4727](https://olp.atlassian.net/browse/PLUS-4727) Fixing in-between lines in ProductGrid when it's after a promo
- [PLUS-4730](https://olp.atlassian.net/browse/PLUS-4730) Braintree now is pre-selected only on ES store
- [PLUS-4731](https://olp.atlassian.net/browse/PLUS-4731) Fix "apply filters" button width on tablet

## Expedite Release 2022/03/11

- [PLUS-4688](https://olp.atlassian.net/browse/PLUS-4688) Decreasing cache TTL (Contentful) to 1 hour on Prod
- [PLUS-4701](https://olp.atlassian.net/browse/PLUS-4701) Increasing cache TTL (Contentful) to 1 hour 45 mins on Prod

## [1.37.0]

- [PLUS-2094](https://olp.atlassian.net/browse/PLUS-2094) Upgrade to webpack 5.
- [PLUS-4407](https://olp.atlassian.net/browse/PLUS-4407) Change the error message on Login page for invalid username, password combination
- [PLUS-4408](https://olp.atlassian.net/browse/PLUS-4408) Add Mifarma banner to login page with corresponding feature flag
- [PLUS-4444](https://olp.atlassian.net/browse/PLUS-4444) Refactor MainSectionHeader so that it is able to take a HeroBanner or CampaignHeroBanner to display.
- [PLUS-4478](https://olp.atlassian.net/browse/PLUS-4478) Removed duplicated page load segment event trigger
- [PLUS-4489](https://olp.atlassian.net/browse/PLUS-4489) Add account creation flow improvements
- [PLUS-4499](https://olp.atlassian.net/browse/PLUS-4499) Improve password rest link expired user flow experience
- [PLUS-4527](https://olp.atlassian.net/browse/PLUS-4527) Experiment: Move the like (heart) icon into the product image (PDP)
- [PLUS-4554](https://olp.atlassian.net/browse/PLUS-4554) Creating the migration script for the new Recommendations Product Slider
- [PLUS-4607](https://olp.atlassian.net/browse/PLUS-4607) Add the brand page link to PDP underneath the main product title.
- [PLUS-4617](https://olp.atlassian.net/browse/PLUS-4617) Display a guest checkout button on the endpoint /login/checkout only
- [PLUS-4634](https://olp.atlassian.net/browse/PLUS-4634) Fixed the subtitle brand link on the PDP
- [PLUS-4667](https://olp.atlassian.net/browse/PLUS-4667) Fix Mifarma logo used in login banner
- [PLUS-4669](https://olp.atlassian.net/browse/PLUS-4669) Fix set-new-password blank page when token is valid

## [1.36.0]

- [PLUS-3508](https://olp.atlassian.net/browse/PLUS-3508) Add company name to order summary on order history page
- [PLUS-3682](https://olp.atlassian.net/browse/PLUS-3682) Fix pagination component
- [PLUS-3760](https://olp.atlassian.net/browse/PLUS-3760) Fix duplicate search bar on tablet
- [PLUS-3935](https://olp.atlassian.net/browse/PLUS-3935) Scroll to top in the Address Form Modal when closing the form
- [PLUS-3972](https://olp.atlassian.net/browse/PLUS-3972) Refactor Any Questions block to use Rich Text Translations
- [PLUS-4077](https://olp.atlassian.net/browse/PLUS-4077) Selects the delivery method by default when it is only one
- [PLUS-4079](https://olp.atlassian.net/browse/PLUS-4079) Add logos to checkout options visa mastercard and paypal
- [PLUS-4178](https://olp.atlassian.net/browse/PLUS-4178) On the Marketing teaser, external links from contentful will not use the next/link component.
- [PLUS-4220](https://olp.atlassian.net/browse/PLUS-4220) Remove the feature flag for loggin the create-device-data headers
- [PLUS-4242](https://olp.atlassian.net/browse/PLUS-4242) Add Trusted Shops Badge into the Footer section
- [PLUS-4242](https://olp.atlassian.net/browse/PLUS-4242) Fix scores capturing
- [PLUS-4266](https://olp.atlassian.net/browse/PLUS-4266) Improved error messaging for set-checkout-data call
- [PLUS-4337](https://olp.atlassian.net/browse/PLUS-4337) Removed checkout.payment.braintree.3ds.persist-basket-amount Feature Flag
- [PLUS-4401](https://olp.atlassian.net/browse/PLUS-4401) Move phone number to second step (address step) on Create Account form
- [PLUS-4403](https://olp.atlassian.net/browse/PLUS-4403) stringify error response objects in log messages
- [PLUS-4443](https://olp.atlassian.net/browse/PLUS-4443) Create migration for adding heroHeader field to Page content type. Update normalizer.
- [PLUS-4446](https://olp.atlassian.net/browse/PLUS-4446) Refactor handle of set-data errors
- [PLUS-4465](https://olp.atlassian.net/browse/PLUS-4465) Aligning price with the design on the POP (Grid & List View)
- [PLUS-4477](https://olp.atlassian.net/browse/PLUS-4477) Add email type to email field on account creation
- [PLUS-4480](https://olp.atlassian.net/browse/PLUS-4480) Investigate flaky Jest tests on Create Account form
- [PLUS-4484](https://olp.atlassian.net/browse/PLUS-4484) Add morgan and finalhandler to log events in the custom nextjs server
- [PLUS-4486](https://olp.atlassian.net/browse/PLUS-4486) Fix PromotionEvent not firing.
- [PLUS-4504](https://olp.atlassian.net/browse/PLUS-4504) Filters on promotion overview page now uses OR formula instead of AND formula
- [PLUS-4505](https://olp.atlassian.net/browse/PLUS-4505) Bizum payment_method added to "Order Completed" event
- [PLUS-4507](https://olp.atlassian.net/browse/PLUS-4507) Replace Button with Link component in Account related pages
- [PLUS-4517](https://olp.atlassian.net/browse/PLUS-4517) Refactor address validation FF to include threshold and max number of validations
- [PLUS-4520](https://olp.atlassian.net/browse/PLUS-4520) Payment Info Entered event refactored for Braintree cards and paypal accounts
- [PLUS-4529](https://olp.atlassian.net/browse/PLUS-4529) Fixed category links on the COP sidebar
- [PLUS-4599](https://olp.atlassian.net/browse/PLUS-4599) Checkout notification fixed if no addresse(s) and link updated for adding phone number
- [PLUS-4599](https://olp.atlassian.net/browse/PLUS-4599) Checkout notification fixed if no addresse(s) and link updated for adding phone number
- [PLUS-4580](https://olp.atlassian.net/browse/PLUS-4580) Add notification on change account details page for customers without address
- [PLUS-4593](https://olp.atlassian.net/browse/PLUS-4593) Solving the issue that breaks the site when there is a draft content in the Hero Banner Slider
- [PLUS-4619](https://olp.atlassian.net/browse/PLUS-4619) Customers blocked on checkout if they don't have any billing address

## [1.35.0]

- [PLUS-4125](https://olp.atlassian.net/browse/PLUS-4125) Fix 'Create Account' event tracking in Segment
- [PLUS-4137](https://olp.atlassian.net/browse/PLUS-4137) Prevented the duplicate call to set checkout data on delivery step
- [PLUS-4167](https://olp.atlassian.net/browse/PLUS-4167) Removed the checkout.payment.braintree.ip-reported-from-header feature flag
- [PLUS-4284](https://olp.atlassian.net/browse/PLUS-4284) Added PromotionClicked and PromotionViewed tracking events to sponsored content components.
- [PLUS-4330](https://olp.atlassian.net/browse/PLUS-4330) Read product ratings from Algolia and render with own UI component
- [PLUS-4344](https://olp.atlassian.net/browse/PLUS-4344) Align PDP margins with designs
- [PLUS-4355](https://olp.atlassian.net/browse/PLUS-4355) Add new colour, change the colour and shape of some buttons of the website.
- [PLUS-4375](https://olp.atlassian.net/browse/PLUS-4375) Creating the migration script for the new 'Slider' content type and for editing the page content type in order to accept Sliders as content blocks. Also creating the ‘Slider’ GraphQL query and its normalizers and updating the page ones
- [PLUS-4376](https://olp.atlassian.net/browse/PLUS-4376) Creating the FE component for the new 'Slider' content type
- [PLUS-4400](https://olp.atlassian.net/browse/PLUS-4400) Refactor of bizum redirection new relic log
- [PLUS-4411](https://olp.atlassian.net/browse/PLUS-4411) Align product names in grid view
- [PLUS-4414](https://olp.atlassian.net/browse/PLUS-4414) Remove notification auto-clearing timer in account
- [PLUS-4417](https://olp.atlassian.net/browse/PLUS-4417) Add category lvl 0 and lvl 1 filter to brand pages when feature flag is on
- [PLUS-4419](https://olp.atlassian.net/browse/PLUS-4419) Added IpAddress property to create-order and checkout-data API Kibana logs
- [PLUS-4421](https://olp.atlassian.net/browse/PLUS-4421) Removed the link to update address and to update account details when unexpected error is thrown
- [PLUS-4425](https://olp.atlassian.net/browse/PLUS-4425) Prefill email address also if not clicked on button password reset page
- [PLUS-4427](https://olp.atlassian.net/browse/PLUS-4427) Fix promotion images not showing.
- [PLUS-4428](https://olp.atlassian.net/browse/PLUS-4428) Use category titles from contentful for category filter labels
- [PLUS-4433](https://olp.atlassian.net/browse/PLUS-4433) Change the height of ProductCard and ProductTile buttons and fix some issues in disabled buttons.
- [PLUS-4487](https://olp.atlassian.net/browse/PLUS-4487) Fix suggestion link issues.
- [PLUS-4490](https://olp.atlassian.net/browse/PLUS-4490) Hide lvl 1 category filters on brand page until a lvl 0 category filter has been selected.
- [PLUS-4503](https://olp.atlassian.net/browse/PLUS-4503) Fix page overflow during search modal is open

## Expedite Release 2022/02/28

- [PLUS-4481](https://olp.atlassian.net/browse/PLUS-4481) Fix X icon on Menu for iOS

## Expedite Release 2022/02/24

- [PLUS-4426](https://olp.atlassian.net/browse/PLUS-4426) Braintree Card Button disabled if card is not requestable by Braintree
- [PLUS-4457](https://olp.atlassian.net/browse/PLUS-4457) Exponea Experiment - hidden link anchor added to Basket header

## [1.34.0]

- [PLUS-2245](https://olp.atlassian.net/browse/PLUS-2245) Add address trigger lookup when requiered fields are filled
- [PLUS-2663](https://olp.atlassian.net/browse/PLUS-2663) Change the discount color in the summary of Order History
- [PLUS-2921](https://olp.atlassian.net/browse/PLUS-2921) Removed tax exempt FF
- [PLUS-3135](https://olp.atlassian.net/browse/PLUS-3135) Show province/district field on Order item at Order details
- [PLUS-3485](https://olp.atlassian.net/browse/PLUS-3485) Fix error messages on name and surname validation
- [PLUS-3499](https://olp.atlassian.net/browse/PLUS-3499) Change icons on account menu list component
- [PLUS-3797](https://olp.atlassian.net/browse/PLUS-3797) Send a tag to Algolia to differenciate autosuggest from search results
- [PLUS-3874](https://olp.atlassian.net/browse/PLUS-3874) Remove all feature flags belonging to the new content blocks layout component and remove redundant layout variables.
- [PLUS-3979](https://olp.atlassian.net/browse/PLUS-3979) Adds proper redirect for /es => /es-es (instead of relying on unintended side-effects) & fixes issue causing log noise with response headers being sent multiple times
- [PLUS-4031](https://olp.atlassian.net/browse/PLUS-4031) set quantity action or isremoved to false when product quantity increased from modal or pdp
- [PLUS-4074](https://olp.atlassian.net/browse/PLUS-4074) Autofill first and last name when creating a new address
- [PLUS-4192](https://olp.atlassian.net/browse/PLUS-4192) Prevent footer loading when navigating back
- [PLUS-4224](https://olp.atlassian.net/browse/PLUS-4224) Prefill email address on password reset page
- [PLUS-4260](https://olp.atlassian.net/browse/PLUS-4260) Removed the mandatory option to T&C in payment step and put it behind a feature flag
- [PLUS-4263](https://olp.atlassian.net/browse/PLUS-4263) Adjust email validation on Account Create form
- [PLUS-4269](https://olp.atlassian.net/browse/PLUS-4269) Show copy expandable SEO field in mobile view too.
- [PLUS-4272](https://olp.atlassian.net/browse/PLUS-4272) Prevented calling /checkout-data endpoint while creating the order or paying
- [PLUS-4282](https://olp.atlassian.net/browse/PLUS-4282) Removed FF for Equivalent surcharge
- [PLUS-4285](https://olp.atlassian.net/browse/PLUS-4285) Clear login errors on /login page load
- [PLUS-4286](https://olp.atlassian.net/browse/PLUS-4286) Adding the field 'Is Sponsored Content' (in Contentful) for promotion, marketing teaser, content block with image, hero banner and campaign hero banner content types
- [PLUS-4289](https://olp.atlassian.net/browse/PLUS-4289) Add button to checkout in account details notification
- [PLUS-4296](https://olp.atlassian.net/browse/PLUS-4296) Translated the link in Braintree module for adding different card
- [PLUS-4297](https://olp.atlassian.net/browse/PLUS-4297) Add intial value to order items' quantity reducer
- [PLUS-4298](https://olp.atlassian.net/browse/PLUS-4298) Replace favourites icon by heart icon
- [PLUS-4301](https://olp.atlassian.net/browse/PLUS-4301) Add first name on the title of business create account form
- [PLUS-4302](https://olp.atlassian.net/browse/PLUS-4302) Fix position of back button on password change page
- [PLUS-4305](https://olp.atlassian.net/browse/PLUS-4305) Improve clearing of scroll-position-product-id-marker from session storage
- [PLUS-4311](https://olp.atlassian.net/browse/PLUS-4311) Handled 500 and 502 errors from set-data API call
- [PLUS-4314](https://olp.atlassian.net/browse/PLUS-4314) Populate filters and sorting values after returning to PLP
- [PLUS-4317](https://olp.atlassian.net/browse/PLUS-4317) Styling improvements for Account Creation form
- [PLUS-4322](https://olp.atlassian.net/browse/PLUS-4322) Normalise ES province names from HERE
- [PLUS-4331](https://olp.atlassian.net/browse/PLUS-4331) Product grid UI: replaced the brand name with the product's type and size.
- [PLUS-4336](https://olp.atlassian.net/browse/PLUS-4336) Fix notification modal position on checkout for mobile
- [PLUS-4342](https://olp.atlassian.net/browse/PLUS-4342) Add the price to the add to cart button on mobile
- [PLUS-4343](https://olp.atlassian.net/browse/PLUS-4343) Price on PDP and product tile and card: increase size and show currency
- [PLUS-4357](https://olp.atlassian.net/browse/PLUS-4357) The title of the product card can now be shown on 3 lines instead of 2
- [PLUS-4359](https://olp.atlassian.net/browse/PLUS-4359) Add country, province/district to the billing section of the Order Summary on Order History page
- [PLUS-4367](https://olp.atlassian.net/browse/PLUS-4367) Fix Continue button for Create Account Form
- [PLUS-4369](https://olp.atlassian.net/browse/PLUS-4369) Fix the white spaces trimming on the addition field of account creation
- [PLUS-4372](https://olp.atlassian.net/browse/PLUS-4372) Fixing the Campaign Hero Banner CTA that appears in its landing page when it should not be rendered
- [PLUS-4377](https://olp.atlassian.net/browse/PLUS-4377) Fix billing address subdivision on order history page
- [PLUS-4395](https://olp.atlassian.net/browse/PLUS-4395) Fix Price formatter console errors

## [1.33.1]

- [PLUS-4247](https://olp.atlassian.net/browse/PLUS-4247) Include product rating & review count in our own structured data
- [PLUS-4362](https://olp.atlassian.net/browse/PLUS-4362) Strip slash and backslash from addresses we send to braintree
- [PLUS-4371](https://olp.atlassian.net/browse/PLUS-4371) Checkout notification refactored for addresses and account errors
- [PLUS-4353](https://olp.atlassian.net/browse/PLUS-4353) Exclude banned districts from district selector address

## [1.33.0]

- [PLUS-2334](https://olp.atlassian.net/browse/PLUS-2334) Show total items quantity in Order overview in Order History list
- [PLUS-3545](https://olp.atlassian.net/browse/PLUS-3545) Fix favourites page layout
- [PLUS-3733](https://olp.atlassian.net/browse/PLUS-3733) Navigate user from PDP to PLP back to the same product on which he clicked
- [PLUS-3774](https://olp.atlassian.net/browse/PLUS-3774) Update analytics snippet.
- [PLUS-3827](https://olp.atlassian.net/browse/PLUS-3827) Implementation of the new design for suggestions, categories from Algolia in search dropdown.Search by suggestion, category.
- [PLUS-3917](https://olp.atlassian.net/browse/PLUS-3917) On the Contentful promo filtering app, double check existing values before attempting to save
- [PLUS-4003](https://olp.atlassian.net/browse/PLUS-4003) Add filter and sorting parameters to url
- [PLUS-4062](https://olp.atlassian.net/browse/PLUS-4062) Add new relic logs for client Braintree Requests and Responses
- [PLUS-4121](https://olp.atlassian.net/browse/PLUS-4121) FullWidth image with title, button and logo image
- [PLUS-4152](https://olp.atlassian.net/browse/PLUS-4152) Contentful Menu/Footer Include
- [PLUS-4172](https://olp.atlassian.net/browse/PLUS-4172) Removed canonical link from login pages
- [PLUS-4173](https://olp.atlassian.net/browse/PLUS-4173) Structured data: only show organization on home page
- [PLUS-4179](https://olp.atlassian.net/browse/PLUS-4179) Fixed the site on iOS 12 by adding a polyfill for globalThis and updating autocomplete-js
- [PLUS-4206](https://olp.atlassian.net/browse/PLUS-4206) Make phone number field optional in account details
- [PLUS-4207](https://olp.atlassian.net/browse/PLUS-4207) Logged errors from /create-order endpoint in Kibana
- [PLUS-4209](https://olp.atlassian.net/browse/PLUS-4209) Log errors from /set-checkout-data endpoint for Kibana
- [PLUS-4217](https://olp.atlassian.net/browse/PLUS-4217) Align back button for Minimal Header on mobile devices
- [PLUS-4219](https://olp.atlassian.net/browse/PLUS-4219) add logs for bizum redirections on new relic under feature flags
- [PLUS-4241](https://olp.atlassian.net/browse/PLUS-4241) Added a query parameter to basket/get endpoint for country
- [PLUS-4245](https://olp.atlassian.net/browse/PLUS-4245) Fix back button gap issue for Minimal Header
- [PLUS-4250](https://olp.atlassian.net/browse/PLUS-4250) Allow cache time to be configured on each environment (for example, having different expiry between UAT & production)
- [PLUS-4256](https://olp.atlassian.net/browse/PLUS-4256) Refactor Orders List, add mock orders and order list tests
- [PLUS-4278](https://olp.atlassian.net/browse/PLUS-4278) Fix checkout modal position for XS view
- [PLUS-4303](https://olp.atlassian.net/browse/PLUS-4303) Fix title alignment and button positioning
- [PLUS-4315](https://olp.atlassian.net/browse/PLUS-4315) Show the correct amount of products on order detail page
- [PLUS-4349](https://olp.atlassian.net/browse/PLUS-4349) BE phone error missing error handled and notification displayed on the checkout page

## [1.32.1]

- [PLUS-4223](https://olp.atlassian.net/browse/PLUS-4223) Adjust the Notification Modal to be shown at the bottom for "left-mobile" icon position until SM
- [PLUS-4229](https://olp.atlassian.net/browse/PLUS-4229) Changed the header name from CloudFront-Viewer-Address to cloudfront-viewer-address in the create-device-data endpoint and handled the case if it returns an array
- [PLUS-4238](https://olp.atlassian.net/browse/PLUS-4238) Encode email when validating it with customer-check endpoint
- [PLUS-4264](https://olp.atlassian.net/browse/PLUS-4264) Fix notification modal layout width
- [PLUS-4270](https://olp.atlassian.net/browse/PLUS-4270) Remove `category` from product structured data
- [PLUS-4276](https://olp.atlassian.net/browse/PLUS-4276) 502 error handled on FE while creating the order

## [1.32.0]

- [PLUS-2212](https://olp.atlassian.net/browse/PLUS-2212) Braintree token reset if any error is received from Braintree
- [PLUS-2246](https://olp.atlassian.net/browse/PLUS-2246) Create Redux saga for address validation
- [PLUS-2946](https://olp.atlassian.net/browse/PLUS-2946) Updating the behavior of the locale redirection: if the user has as a preferred language in the browser settings that matches with one of our locales, they will be redirected to that locale and we will not show the Country Selector Header (and we set the cookie with that locale). Also updating the time we show the Country Selector Header to 15 seconds intead of 30
- [PLUS-3187](https://olp.atlassian.net/browse/PLUS-3187) Allow spaces in phone number format in the Account Creation Form
- [PLUS-3361](https://olp.atlassian.net/browse/PLUS-3361) Disabled content caching in dev
- [PLUS-3542](https://olp.atlassian.net/browse/PLUS-3542) Show business name, province, district and country data on the overview page of account details
- [PLUS-3632](https://olp.atlassian.net/browse/PLUS-3632) Updating the MainSectionHeader image to use the new Image component, and also lazy loading the ProductCard images that are not in the users viewport at the first moment
- [PLUS-3638](https://olp.atlassian.net/browse/PLUS-3638) Improve performance by rendering the yotpo widget only when needed.
- [PLUS-3656](https://olp.atlassian.net/browse/PLUS-3656) Implement new layout component on home page.
- [PLUS-3658](https://olp.atlassian.net/browse/PLUS-3658) Implement new layout component on delete account page.
- [PLUS-3714](https://olp.atlassian.net/browse/PLUS-3714) Add 'market' property to Segment events' context
- [PLUS-3724](https://olp.atlassian.net/browse/PLUS-3724) Show tax exempt notification for applicable selected addresses in checkout
- [PLUS-3753](https://olp.atlassian.net/browse/PLUS-3753) Sending two event to segment when 'Product Added'
- [PLUS-3791](https://olp.atlassian.net/browse/PLUS-3791) Fix issue with too long names on the overview page braking the ui
- [PLUS-3836](https://olp.atlassian.net/browse/PLUS-3836) Add social icons as links in the footer
- [PLUS-3841](https://olp.atlassian.net/browse/PLUS-3841) Refactored BannerLink into it's own component.
- [PLUS-3842](https://olp.atlassian.net/browse/PLUS-3842) Now if there's no recommendation ID, the ExponeaRecommendationsBlock component returns null
- [PLUS-3850](https://olp.atlassian.net/browse/PLUS-3850) Change Sorting promotions weight in overview page
- [PLUS-3876](https://olp.atlassian.net/browse/PLUS-3876) Adjust the position of the Back button in line with the content on Forgotten Password page
- [PLUS-3881](https://olp.atlassian.net/browse/PLUS-3881) Include a starting point for static translation extraction from the codebase.
- [PLUS-3897](https://olp.atlassian.net/browse/PLUS-3897) Warning message is no longer displayed for vouchers without gifts
- [PLUS-3920](https://olp.atlassian.net/browse/PLUS-3920) Switch initial notification bool to false to prevent persistent errors
- [PLUS-3925](https://olp.atlassian.net/browse/PLUS-3925) Delete everything related to the Exponea's feature flag created for Spain's launch.
- [PLUS-3930](https://olp.atlassian.net/browse/PLUS-3930) Fixing broken images on Promotion and Marketing Teasers, making them full-height again
- [PLUS-3938](https://olp.atlassian.net/browse/PLUS-3938) Fix validation on the address book form subdivision field when updated
- [PLUS-3965](https://olp.atlassian.net/browse/PLUS-3965) Show max # items line when user reaches the max quantity
- [PLUS-3973](https://olp.atlassian.net/browse/PLUS-3973) Truncate first name and last name on account overview page
- [PLUS-3975](https://olp.atlassian.net/browse/PLUS-3975) Fix styling of exponea recommendation block title.
- [PLUS-3976](https://olp.atlassian.net/browse/PLUS-3976) Fixing Campaign Hero Banner styles (adjusting height according to text content)
- [PLUS-3980](https://olp.atlassian.net/browse/PLUS-3980) Support "pack" option for package size attribute
- [PLUS-3982](https://olp.atlassian.net/browse/PLUS-3982) Display correct number of items shown in promotion page pagination
- [PLUS-3983](https://olp.atlassian.net/browse/PLUS-3983) Add missing properties on Account Created Attempted event after redirection from the login page
- [PLUS-3993](https://olp.atlassian.net/browse/PLUS-3993) Improve support for alternative image formats by including image type attribute
- [PLUS-3998](https://olp.atlassian.net/browse/PLUS-3998) Update click detection logic to better match outside clicks, ignore drags
- [PLUS-3999](https://olp.atlassian.net/browse/PLUS-3999) Query Input Field missing in Sitelinks searchbox structured data
- [PLUS-4001](https://olp.atlassian.net/browse/PLUS-4001) Added the organisation address to structured data
- [PLUS-4002](https://olp.atlassian.net/browse/PLUS-4002) Disabled plus button when quantity reach 50 and the maxQuantity is not set.
- [PLUS-4006](https://olp.atlassian.net/browse/PLUS-4006) Remove constraint from ProductGrid to only show ContainerOfContentBlocks type of content blocks (consistent with ProductList).
- [PLUS-4008](https://olp.atlassian.net/browse/PLUS-4008) Update category colors according to the design sheet.
- [PLUS-4012](https://olp.atlassian.net/browse/PLUS-4012) Implementation of the necessary changes to align the FE with the layout for all screen sizes (from margins to icons on the right).
- [PLUS-4027](https://olp.atlassian.net/browse/PLUS-4027) Add email_hash instead of email to segment tracker when login fails
- [PLUS-4039](https://olp.atlassian.net/browse/PLUS-4039) Added loading state to delivery step
- [PLUS-4040](https://olp.atlassian.net/browse/PLUS-4040) Enable SEO copy for all page types
- [PLUS-4041](https://olp.atlassian.net/browse/PLUS-4041) Added polyfill for Intl.PluralRules (currently breaking Safari 12)
- [PLUS-4046](https://olp.atlassian.net/browse/PLUS-4046) Show notification modal after registering account successfully
- [PLUS-4047](https://olp.atlassian.net/browse/PLUS-4047) Add new layout with back button, misc create account UI fixes
- [PLUS-4049](https://olp.atlassian.net/browse/PLUS-4049) Adding Translation Info Label to Filters
- [PLUS-4057](https://olp.atlassian.net/browse/PLUS-4057) Update Contentful SDK version
- [PLUS-4063](https://olp.atlassian.net/browse/PLUS-4063) Making the information container visible again in Mobile for the Campaign Hero Banner
- [PLUS-4065](https://olp.atlassian.net/browse/PLUS-4065) Inverted the order of payment methods
- [PLUS-4066](https://olp.atlassian.net/browse/PLUS-4066) Change setting values for Formik in the Address Form
- [PLUS-4075](https://olp.atlassian.net/browse/PLUS-4075) Fix top margin of Content block with image component.
- [PLUS-4076](https://olp.atlassian.net/browse/PLUS-4076) Use dynamic tax reference regex in address book
- [PLUS-4090](https://olp.atlassian.net/browse/PLUS-4090) Fix empty fields validation when there is a format error on email
- [PLUS-4091](https://olp.atlassian.net/browse/PLUS-4091) Fixed ip for the create-device-data request to be taken from request headers
- [PLUS-4108](https://olp.atlassian.net/browse/PLUS-4108) Removed API calls to order-payment which is trigger by setOrderPaymentsTrigger
- [PLUS-4112](https://olp.atlassian.net/browse/PLUS-4112) Do not wait for favourites products if favourites items is empty
- [PLUS-4116](https://olp.atlassian.net/browse/PLUS-4116) Validate email in first step of Account Creation
- [PLUS-4134](https://olp.atlassian.net/browse/PLUS-4134) Use decimal point for Yotpo prices as it was showing up misformatted in Google Rich Data
- [PLUS-4139](https://olp.atlassian.net/browse/PLUS-4139) Fix issue on address book form checkboxes when no other fields have been changed
- [PLUS-4140](https://olp.atlassian.net/browse/PLUS-4140) Open social links in a new tab
- [PLUS-4154](https://olp.atlassian.net/browse/PLUS-4154) Fixing Country Selector Header rendering when there is a matching locale with the user browser language preferences, and also the 'undefined' locale redirection when there's none
- [PLUS-4165](https://olp.atlassian.net/browse/PLUS-4165) Added GTIN to products to be used in structured data
- [PLUS-4168](https://olp.atlassian.net/browse/PLUS-4168) Fixing Exponea Recommendations Block issue, now it renders when there's an ID in the Redux store
- [PLUS-4187](https://olp.atlassian.net/browse/PLUS-4187) Logged all headers in the api/checkout/create-device-data
- [PLUS-4190](https://olp.atlassian.net/browse/PLUS-4190) Show recommendations again on COP
- [PLUS-4193](https://olp.atlassian.net/browse/PLUS-4193) Fixing some of the scenarios we're showing accidentally the Country Selector Header
- [PLUS-4215](https://olp.atlassian.net/browse/PLUS-4215) Refactor currentFormStep storage and logic in Create Account Form
- [PLUS-4240](https://olp.atlassian.net/browse/PLUS-4240) Move email check logic to onSubmit, fix optional phone number validation
- [PLUS-4248](https://olp.atlassian.net/browse/PLUS-4248) Add pending orders on order history page
- [PLUS-4255](https://olp.atlassian.net/browse/PLUS-4255) Move 'Order Completed' and 'Product Ordered' events out of the /order-payments API call

## Expedite Release 2022/02/09

- [PLUS-4251](https://olp.atlassian.net/browse/PLUS-4251) Pass All property to Segment events set to true

## Expedite Release 2022/02/07

- [PLUS-4156](https://olp.atlassian.net/browse/PLUS-4156) Added New Relic browser agent
- [PLUS-4198](https://olp.atlassian.net/browse/PLUS-4198) Fix request URL in api request/response logs, and add locale (Accept-Language header)
- [PLUS-4213](https://olp.atlassian.net/browse/PLUS-4213) Order payments data cookie removed on unsuccessful page & order payment datas logged

## Expedite Release 2022/02/04

- [PLUS-4182](https://olp.atlassian.net/browse/PLUS-4182) Persist total amount into BraintreePaymentMethod component
- MISC fix pod affinity in prod

## Expedite Release 2022/02/03

- [PLUS-4078](https://olp.atlassian.net/browse/PLUS-4078) Switch over to per-key redis entries for auto-expiration and eviction

## Expedite Release 2022/02/01

- Revert prevent duplicate checkout set data calls in [PLUS-4028](https://olp.atlassian.net/browse/PLUS-4028)

## [1.31.4]

- [PLUS-3456](https://olp.atlassian.net/browse/PLUS-3456) Fix issue on update account details salutation field
- [PLUS-3878](https://olp.atlassian.net/browse/PLUS-3878) Make phone number field in account creation form optional
- [PLUS-3961](https://olp.atlassian.net/browse/PLUS-3961) Control the salutation title on account creation and account details by feature flag
- [PLUS-3978](https://olp.atlassian.net/browse/PLUS-3978) Hide and check marketing option checkbox for ES and PT in create account form
- [PLUS-3988](https://olp.atlassian.net/browse/PLUS-3988) Brand Pages and POP pages should accepting parameters
- [PLUS-4028](https://olp.atlassian.net/browse/PLUS-4028) Prevented the duplicate call to set checkout data on delivery step
- [PLUS-4030](https://olp.atlassian.net/browse/PLUS-4030) Improve error messaging on account creation
- [PLUS-4035](https://olp.atlassian.net/browse/PLUS-4035) Amend the 'Return to checkout' link to button in the Address Book
- [PLUS-4048](https://olp.atlassian.net/browse/PLUS-4048) Accept NIE numbers for personal DNI field

## Expedite Release 2022/01/26

- Increase caching of contentful resources from 5 minutes to 2 hours

## [1.31.3]

- [PLUS-4084](https://olp.atlassian.net/browse/PLUS-4084) Revert new password policy in PLUS-4045

## [1.31.2](never released to PROD due to revert in 1.31.3)

- [PLUS-3613](https://olp.atlassian.net/browse/PLUS-3613) Add UI improvements on PW Policy
- [PLUS-3984](https://olp.atlassian.net/browse/PLUS-3984) Fallback values displayed for minDeliveryDays and maxDeliveryDays
- [PLUS-3987](https://olp.atlassian.net/browse/PLUS-3987) Use the same rule on showing of the RRP price on PDP as we have on POP
- [PLUS-3992](https://olp.atlassian.net/browse/PLUS-3992) Removed the delivery-method.description translation and the description for the DeliveryMethod component on the checkout page
- [PLUS-3996](https://olp.atlassian.net/browse/PLUS-3996) Adding selected customer address as default shipping address for checkout set data call
- [PLUS-4004](https://olp.atlassian.net/browse/PLUS-4004) Fix order history and order details page for itemless orders
- [PLUS-4033](https://olp.atlassian.net/browse/PLUS-4033) Adding payment Braintree 3DS tracking event
- [PLUS-4045](https://olp.atlassian.net/browse/PLUS-4045) Revert password policy to minimum 8 chars validation

## [1.31.1]

- [PLUS-3879](https://olp.atlassian.net/browse/PLUS-3879) Upload sitemap to server
- [PLUS-3889](https://olp.atlassian.net/browse/PLUS-3889) Add sitemap to robots.txt

## [1.31.0]

- [PLUS-3654](https://olp.atlassian.net/browse/PLUS-3654) Implement new layout component on ProductGrid and ProductList components.
- [PLUS-3806](https://olp.atlassian.net/browse/PLUS-3806) Add password reset failed Segment call, add middleware to events
- [PLUS-3873](https://olp.atlassian.net/browse/PLUS-3873) Fix Address Form issues
- [PLUS-3877](https://olp.atlassian.net/browse/PLUS-3877) Fix issue with address summary tile when missing names
- [PLUS-3888](https://olp.atlassian.net/browse/PLUS-3888) Show rrp on the PDP
- [PLUS-3899](https://olp.atlassian.net/browse/PLUS-3899) Check Product availability for Free Shipping Component
- [PLUS-3900](https://olp.atlassian.net/browse/PLUS-3900) Calculate the range taking into account the discount
- [PLUS-3903](https://olp.atlassian.net/browse/PLUS-3903) Move Address details and Business details titles in the account creation second step
- [PLUS-3905](https://olp.atlassian.net/browse/PLUS-3905) Fixed Gift labels design on basket and order details page
- [PLUS-3906](https://olp.atlassian.net/browse/PLUS-3906) Remove link for non-sellable items in order history
- [PLUS-3924](https://olp.atlassian.net/browse/PLUS-3924) Fixed Max quantity is not set right on Basket Modal
- [PLUS-3928](https://olp.atlassian.net/browse/PLUS-3928) Fixing the issue with incorrect Promo Overview Page filters when a user comes from a COP
- [PLUS-3931](https://olp.atlassian.net/browse/PLUS-3931) Add privacy policy text to registration form
- [PLUS-3933](https://olp.atlassian.net/browse/PLUS-3933) Error notification displayed only for add-to-cart
- [PLUS-3946](https://olp.atlassian.net/browse/PLUS-3946) Product state cleared and add-to-cart button disabled while product is loading for free shipping add-on
- [PLUS-3964](https://olp.atlassian.net/browse/PLUS-3964) Move url prop to the event context and remove "/"
- [PLUS-3970](https://olp.atlassian.net/browse/PLUS-3970) Add-on product in basket state updated even if it is undefined

## [1.30.0]

- [PLUS-3383](https://olp.atlassian.net/browse/PLUS-3383) Limit qty input to the max # items
- [PLUS-3396](https://olp.atlassian.net/browse/PLUS-3396) Refactored campaign labels to use the new "Translation Info Label" content type.
- [PLUS-3466](https://olp.atlassian.net/browse/PLUS-3466) Restore page X content when pressing back button
- [PLUS-3633](https://olp.atlassian.net/browse/PLUS-3633) Improving the use of images in order to avoid CLS on the Homepage load
- [PLUS-3636](https://olp.atlassian.net/browse/PLUS-3636) Not allowing the user to interact header navigation links before page is loaded. Applied a navigation link class in the header to avoid duplication of css properties
- [PLUS-3637](https://olp.atlassian.net/browse/PLUS-3637) Optimise Product cards' repetitive elements classes
- [PLUS-3652](https://olp.atlassian.net/browse/PLUS-3652) Created new content blocks layout component. Implemented it on COP.
- [PLUS-3653](https://olp.atlassian.net/browse/PLUS-3653) Finishing touches for implementing the new layout component on COP.
- [PLUS-3681](https://olp.atlassian.net/browse/PLUS-3681) Page filter items will use their item name as the label instead of the translation
- [PLUS-3686](https://olp.atlassian.net/browse/PLUS-3686) When the webapp is in preview mode, completely ignore promotion date validations
- [PLUS-3702](https://olp.atlassian.net/browse/PLUS-3702) Add feature flags for 3rd party code
- [PLUS-3722](https://olp.atlassian.net/browse/PLUS-3722) Add logic to handle address selection and modal closing on checkout
- [PLUS-3754](https://olp.atlassian.net/browse/PLUS-3754) Update productId and add isPromo for all concerned events
- [PLUS-3756](https://olp.atlassian.net/browse/PLUS-3756) Made responsive display of the out of stock notification for mobile and for desktop
- [PLUS-3765](https://olp.atlassian.net/browse/PLUS-3765) Remove logic to apply equivalence surcharge automatically
- [PLUS-3776](https://olp.atlassian.net/browse/PLUS-3776) Fixed out-of-stock notification in basket modal when new items are added to the cart with an available free gift
- [PLUS-3778](https://olp.atlassian.net/browse/PLUS-3778) add customer billing address to api to be validated next to the customer delivery address
- [PLUS-3786](https://olp.atlassian.net/browse/PLUS-3786) Fix smooth scrolling in the Address Book
- [PLUS-3803](https://olp.atlassian.net/browse/PLUS-3803) Fix new address form clearing when selecting subdivison
- [PLUS-3807](https://olp.atlassian.net/browse/PLUS-3807) Add the production keys of Exponea Spain hidden behind a feature flag.
- [PLUS-3808](https://olp.atlassian.net/browse/PLUS-3808) Refactor Personal Data Request content
- [PLUS-3816](https://olp.atlassian.net/browse/PLUS-3816) Show the voucher code if voucher is applied
- [PLUS-3818](https://olp.atlassian.net/browse/PLUS-3818) Remove from site.webmanifest Atida Plus and add Atida
- [PLUS-3819](https://olp.atlassian.net/browse/PLUS-3819) Fixed notification design on the basket page
- [PLUS-3822](https://olp.atlassian.net/browse/PLUS-3822) Change the links of the new request to support on Account pages
- [PLUS-3823](https://olp.atlassian.net/browse/PLUS-3823) Display conditions updated for free shipping component, icon and text
- [PLUS-3839](https://olp.atlassian.net/browse/PLUS-3839) Update in return type for the use feature flag hook
- [PLUS-3855](https://olp.atlassian.net/browse/PLUS-3855) Simplified free-shipping component for MVP
- [PLUS-3856](https://olp.atlassian.net/browse/PLUS-3856) Add address format warning notification when the first name or last name are missing
- [PLUS-3898](https://olp.atlassian.net/browse/PLUS-3898) Fix second page on order history page
- [PLUS-3921](https://olp.atlassian.net/browse/PLUS-3921) Revert PLUS-3466-Restore page X content when pressing back button

## [1.29.0]

- [PLUS-3549](https://olp.atlassian.net/browse/PLUS-3549) Add condition to product basket tile to redirect to PDP only if it is a not promotional item
- [PLUS-3584](https://olp.atlassian.net/browse/PLUS-3584) Add rich text translations for order history notification
- [PLUS-3607](https://olp.atlassian.net/browse/PLUS-3607) Filter the declined promotional items
- [PLUS-3718](https://olp.atlassian.net/browse/PLUS-3718) Fix duplicate Search as you type Segment events and add full URL to ReportPageView event.
- [PLUS-3726](https://olp.atlassian.net/browse/PLUS-3726) Add AddressList component for sorting and displaying addresses
- [PLUS-3742](https://olp.atlassian.net/browse/PLUS-3742) Fix subdivision field value in the Address Form of the Address book
- [PLUS-3751](https://olp.atlassian.net/browse/PLUS-3751) Replace string payment methods for their corresponding variables
- [PLUS-3755](https://olp.atlassian.net/browse/PLUS-3755) Adjust width of notifications in basket page to suit the cart list width
- [PLUS-3761](https://olp.atlassian.net/browse/PLUS-3761) Free shipping add on component designed
- [PLUS-3762](https://olp.atlassian.net/browse/PLUS-3762) Get product information from LaunchDarkly object with Elastic Search
- [PLUS-3764](https://olp.atlassian.net/browse/PLUS-3764) Adding feature flag for Free Shipping Products
- [PLUS-3768](https://olp.atlassian.net/browse/PLUS-3768) Error notification displayed on the basket page when we get an error adding the free shipping product to the cart
- [PLUS-3769](https://olp.atlassian.net/browse/PLUS-3769) Add the update address notification when the subdivision is missing
- [PLUS-3771](https://olp.atlassian.net/browse/PLUS-3771) Add icon to basket notifications, error and warning ones
- [PLUS-3784](https://olp.atlassian.net/browse/PLUS-3784) Hide the products unit volume displayed in order history when undefined
- [PLUS-3787](https://olp.atlassian.net/browse/PLUS-3787) Fix Address Form format notification
- [PLUS-3790](https://olp.atlassian.net/browse/PLUS-3790) Change Atida Plus for Atida in MetaData.tsx
- [PLUS-3793](https://olp.atlassian.net/browse/PLUS-3793) Fix issues in order history notification
- [PLUS-3802](https://olp.atlassian.net/browse/PLUS-3802) Change Total for subtotal in Component for FreeShipping
- [PLUS-3804](https://olp.atlassian.net/browse/PLUS-3804) Stop displaying address form format notification when new address is being added
- [PLUS-3838](https://olp.atlassian.net/browse/PLUS-3838) Remove the duplicated notification from Order History page
- [PLUS-3868](https://olp.atlassian.net/browse/PLUS-3868) Change "View all products" html element from button to anchor element

## [1.28.0]

- [INFRA-250](https://olp.atlassian.net/browse/INFRA-250) Atida-hosted Lighthouse server
- [PLUS-2320](https://olp.atlassian.net/browse/PLUS-2320) A new Contentful app for promotion editing pages. It will watch for changes to labels and categories and inject them automatically to the "items to filter by"
- [PLUS-2860](https://olp.atlassian.net/browse/PLUS-2860) Order addresses on address book
- [PLUS-3205](https://olp.atlassian.net/browse/PLUS-3205) Add Organization structured data to all pages, sourcing data from Contentful
- [PLUS-3375](https://olp.atlassian.net/browse/PLUS-3375) Set as default if no default address yet when adding or editing an address
- [PLUS-3459](https://olp.atlassian.net/browse/PLUS-3459) Fixing 'previousPageName' and 'previousPageType' in Session Storage for the Login page
- [PLUS-3474](https://olp.atlassian.net/browse/PLUS-3474) Pop up tax exempt region appearing only once (1y expiration) or when delivery address is changed from mainland Spain to a tax exempt region
- [PLUS-3495](https://olp.atlassian.net/browse/PLUS-3495) Add focus on added or edited addresses in address book
- [PLUS-3531](https://olp.atlassian.net/browse/PLUS-3531) Add two attribute more to payload in BraintreePaymentMethod in PaymentMethodTriggerData function
- [PLUS-3537](https://olp.atlassian.net/browse/PLUS-3537) Notification and error message added to basket summary if promotional item is out-of-stock
- [PLUS-3539](https://olp.atlassian.net/browse/PLUS-3539) Fix margin for Personal Details on Account Page
- [PLUS-3577](https://olp.atlassian.net/browse/PLUS-3577) Use default gift image on order history
- [PLUS-3593](https://olp.atlassian.net/browse/PLUS-3593) Contentful General CSV Importer for Brands
- [PLUS-3594](https://olp.atlassian.net/browse/PLUS-3594) Contentful General CSV Importer for Categories
- [PLUS-3605](https://olp.atlassian.net/browse/PLUS-3605) Show confirmation modal when removing gift product from basket
- [PLUS-3614](https://olp.atlassian.net/browse/PLUS-3614) Fixes to structured data in POP and Brand Pages
- [PLUS-3619](https://olp.atlassian.net/browse/PLUS-3619) Fix segment tracking issues in Account area / Login
- [PLUS-3634](https://olp.atlassian.net/browse/PLUS-3634) Preserve space for Algolia Search box in order to avoid CLS
- [PLUS-3640](https://olp.atlassian.net/browse/PLUS-3640) Now the filter query works properly when a user is redirected from any page
- [PLUS-3649](https://olp.atlassian.net/browse/PLUS-3649) Update loading wireframes on POP and Search results
- [PLUS-3650](https://olp.atlassian.net/browse/PLUS-3650) Replace GIFT translation string for the confirmation and failed pages
- [PLUS-3671](https://olp.atlassian.net/browse/PLUS-3671) Fix Tax reference (DNI) field validation and appearance issue on Account Edit details page
- [PLUS-3673](https://olp.atlassian.net/browse/PLUS-3673) Ignore account type for address update tax notification
- [PLUS-3674](https://olp.atlassian.net/browse/PLUS-3674) Notification displayed on the checkout page if any error is received from BE through /checkout-data endpoint.
- [PLUS-3677](https://olp.atlassian.net/browse/PLUS-3677) Fixed video smaller on tablet layout for products with one image
- [PLUS-3680](https://olp.atlassian.net/browse/PLUS-3680) Allow more than 1000 translations to be fetched from Contentful
- [PLUS-3683](https://olp.atlassian.net/browse/PLUS-3683) Update URL in Brand & PDP structured data to be absolute
- [PLUS-3687](https://olp.atlassian.net/browse/PLUS-3687) Fix password strength indicator alignment issue on account creation format
- [PLUS-3720](https://olp.atlassian.net/browse/PLUS-3720) Create modal for address selector
- [PLUS-3723](https://olp.atlassian.net/browse/PLUS-3723) Add link to Address Book on Address selector modal
- [PLUS-3729](https://olp.atlassian.net/browse/PLUS-3729) Used constant PAYMENT_OPTIONS for all payment_method in the triggerReportAddPaymentInfo
- [PLUS-3736](https://olp.atlassian.net/browse/PLUS-3736) Fix icon width in address notification
- [PLUS-3748](https://olp.atlassian.net/browse/PLUS-3748) Fix issue that prevented new created addresses to be set as default ones
- [PLUS-3758](https://olp.atlassian.net/browse/PLUS-3758) Trigger the password validation only on blur
- [PLUS-3766](https://olp.atlassian.net/browse/PLUS-3766) Fix auto scroll on new created addresses on address book
- [PLUS-3932](https://olp.atlassian.net/browse/PLUS-3932) Added campaign label colours to Tailwind's colour safelist

## [1.27.2]

- [PLUS-3734](https://olp.atlassian.net/browse/PLUS-3734) Refactor normalizer for menu item.

## [1.27.1]

- [PLUS-3727](https://olp.atlassian.net/browse/PLUS-3727) Fix SSR rendering for es-es on the POP, Brand detail, Promotion page

## [1.27.0]

- [PLUS-1460](https://olp.atlassian.net/browse/PLUS-1460) Add tracking for Search-as-you-type
- [PLUS-2464](https://olp.atlassian.net/browse/PLUS-2464) Display promotional item in order details
- [PLUS-3130](https://olp.atlassian.net/browse/PLUS-3130) Campaign filter and category filter on promotional overview page are now combinable.
- [PLUS-3137](https://olp.atlassian.net/browse/PLUS-3137) Adding 'non-interaction' field to these events: 'Cart Viewed', 'Checkout Step Viewed', 'Product List Viewed', 'Product Viewed', 'Promotion List Viewed', 'Order Completed'
- [PLUS-3206](https://olp.atlassian.net/browse/PLUS-3206) Added structured data script to home page.
- [PLUS-3209](https://olp.atlassian.net/browse/PLUS-3209) Added structured data script to brand page.
- [PLUS-3282](https://olp.atlassian.net/browse/PLUS-3282) Display downloadable product certificate
- [PLUS-3310](https://olp.atlassian.net/browse/PLUS-3310) Change login page name when landing from basket
- [PLUS-3327](https://olp.atlassian.net/browse/PLUS-3327) Now we are using the URL query params to set an initial array of filters in the Promotion Overview Page
- [PLUS-3335](https://olp.atlassian.net/browse/PLUS-3335) Minor UX/UI fixes to the create account form
- [PLUS-3379](https://olp.atlassian.net/browse/PLUS-3379) Improve inline notification on Address successfully created and return to check out
- [PLUS-3412](https://olp.atlassian.net/browse/PLUS-3412) Fix link to request customer data to be per locale onthe account details page
- [PLUS-3428](https://olp.atlassian.net/browse/PLUS-3428) Truncate the first and last name-on personal account details
- [PLUS-3450](https://olp.atlassian.net/browse/PLUS-3450) PLUS 3450 Truncate name in header menu if too long
- [PLUS-3475](https://olp.atlassian.net/browse/PLUS-3475) Fix issue where the last page of the order history wasnt shown
- [PLUS-3488](https://olp.atlassian.net/browse/PLUS-3488) Fixed issue where video appears smaller on mobile for products with 1 image
- [PLUS-3496](https://olp.atlassian.net/browse/PLUS-3496) Making able the footer country selector to update the cookie, for not showing the Country Selector Header when a user uses the footer one
- [PLUS-3502](https://olp.atlassian.net/browse/PLUS-3502) Remove hour and minute from order time on detail page
- [PLUS-3506](https://olp.atlassian.net/browse/PLUS-3506) Allow customers to view or edit account details when there is no address
- [PLUS-3513](https://olp.atlassian.net/browse/PLUS-3513) Fixed Basket modal design and fixed image stretching
- [PLUS-3518](https://olp.atlassian.net/browse/PLUS-3518) Fix-the background of Default billing and default delivery address labels size
- [PLUS-3521](https://olp.atlassian.net/browse/PLUS-3521) Fix USP block alignment issue if more than one row
- [PLUS-3525](https://olp.atlassian.net/browse/PLUS-3525) Show word GIFT in order confirmation/failed payment page
- [PLUS-3553](https://olp.atlassian.net/browse/PLUS-3553) Truncate the customer name and address on address book
- [PLUS-3560](https://olp.atlassian.net/browse/PLUS-3560) Add max length validation of the Address House number and City fields on the address book
- [PLUS-3565](https://olp.atlassian.net/browse/PLUS-3565) Use separate translation for the gift product
- [PLUS-3566](https://olp.atlassian.net/browse/PLUS-3566) Promotional Item default images dimensions fixed
- [PLUS-3570](https://olp.atlassian.net/browse/PLUS-3570) Change the ES position to be below the shipping price and made some UI adjustments
- [PLUS-3574](https://olp.atlassian.net/browse/PLUS-3574) Remove asterisk from discount label on order history
- [PLUS-3578](https://olp.atlassian.net/browse/PLUS-3578) Fix issue with selected subdivision on address book form
- [PLUS-3580](https://olp.atlassian.net/browse/PLUS-3580) Show the bullet list when the password field is on focus
- [PLUS-3583](https://olp.atlassian.net/browse/PLUS-3583) Fixed incorrect spacing in promotions page filters
- [PLUS-3592](https://olp.atlassian.net/browse/PLUS-3592) Align CTA on Product Cards when RRP is not shown
- [PLUS-3615](https://olp.atlassian.net/browse/PLUS-3615) Create "Organization" content type in Contentful for managing Organization schema
- [PLUS-3642](https://olp.atlassian.net/browse/PLUS-3642) Fixed promo teasers block in COP needs to be responsive on mobile
- [PLUS-3669](https://olp.atlassian.net/browse/PLUS-3669) Remove no indexing for ES for SEO
- [PLUS-3717](https://olp.atlassian.net/browse/PLUS-3717) Put search as you type Segment work behind feature flag.

## [1.26.0]

- [INFRA-253](https://olp.atlassian.net/browse/INFRA-253) Increase HPA replicas and lower thresholds in production (in response to incident Mon 20 Dec 2 2021)
- [PLUS-2507](https://olp.atlassian.net/browse/PLUS-2507) Add security related HTTP headers in next config
- [PLUS-2941](https://olp.atlassian.net/browse/PLUS-2941) Fix Address book UX issues
- [PLUS-3207](https://olp.atlassian.net/browse/PLUS-3207) Add Product structured data to Brand and POP pages
- [PLUS-3208](https://olp.atlassian.net/browse/PLUS-3208) Add Product structured data to PDP
- [PLUS-3328](https://olp.atlassian.net/browse/PLUS-3328) Refactor category overview page to take promotions from category COP content type
- [PLUS-3329](https://olp.atlassian.net/browse/PLUS-3329) Add gift voucher to add coupon response
- [PLUS-3332](https://olp.atlassian.net/browse/PLUS-3332) Make R&R visible for users who have already accepted cookies
- [PLUS-3338](https://olp.atlassian.net/browse/PLUS-3338) Remove validation from promotions when in preview mode
- [PLUS-3342](https://olp.atlassian.net/browse/PLUS-3342) Added a LinkBlock as promotions CTA to COP
- [PLUS-3344](https://olp.atlassian.net/browse/PLUS-3344) Page level filters (i.e promotions) will now be populated from Contentful data. Depends on Contentful migration PLUS-3345
- [PLUS-3346](https://olp.atlassian.net/browse/PLUS-3346) Adjust add to cart CTA button on grid view
- [PLUS-3354](https://olp.atlassian.net/browse/PLUS-3354) Fix country selector showing for a brief moment when reloading the homepage
- [PLUS-3372](https://olp.atlassian.net/browse/PLUS-3372) Add properties object to password-related Segment events
- [PLUS-3381](https://olp.atlassian.net/browse/PLUS-3381) Solve removable bug when a sellable product was also the gift of another product
- [PLUS-3422](https://olp.atlassian.net/browse/PLUS-3422) Gift product added when the gift is added as normal product before discounted product
- [PLUS-3432](https://olp.atlassian.net/browse/PLUS-3432) Update password validation for customers
- [PLUS-3433](https://olp.atlassian.net/browse/PLUS-3433) Update password security levels for Password Strength Meter
- [PLUS-3445](https://olp.atlassian.net/browse/PLUS-3445) Display optional address line in checkout
- [PLUS-3446](https://olp.atlassian.net/browse/PLUS-3446) Don't show RRP for gift promo if 0
- [PLUS-3447](https://olp.atlassian.net/browse/PLUS-3447) Add the missing DNI value error when submitting the registration form
- [PLUS-3454](https://olp.atlassian.net/browse/PLUS-3454) Cut off add and remove messages fixed for on small devices on basket modal notification
- [PLUS-3465](https://olp.atlassian.net/browse/PLUS-3465) Fix Sellable Promotional Items
- [PLUS-3477](https://olp.atlassian.net/browse/PLUS-3477) Fix an issue when product found in elastic search array was not matching the basket item
- [PLUS-3486](https://olp.atlassian.net/browse/PLUS-3486) Add special province tax notification after selecting special province
- [PLUS-3490](https://olp.atlassian.net/browse/PLUS-3490) Add bullet list of password conditions to the form
- [PLUS-3492](https://olp.atlassian.net/browse/PLUS-3492) Fix login form after resetting password
- [PLUS-3494](https://olp.atlassian.net/browse/PLUS-3494) Remove getSlugAfterPayment.test.tsx and add the test scenario to getPageUrlSlug.test.tsx
- [PLUS-3497](https://olp.atlassian.net/browse/PLUS-3497) Fix ID taken as a reference for the Items-state when removing items from cart
- [PLUS-3522](https://olp.atlassian.net/browse/PLUS-3522) Change order of out-of-stock notifications between product and promotional items on the basket page
- [PLUS-3527](https://olp.atlassian.net/browse/PLUS-3527) Show the rrp of a gift (if rrp for that gift exists)
- [PLUS-3546](https://olp.atlassian.net/browse/PLUS-3546) Fix equivalence surcharge is missing in order details
- [PLUS-3554](https://olp.atlassian.net/browse/PLUS-3554) (Fix) Enable feature flag for Seo Structured Data in POP an Brand Pages
- [PLUS-3558](https://olp.atlassian.net/browse/PLUS-3558) Add hotfix on the bullet list of password conditions to the form
- [PLUS-3561](https://olp.atlassian.net/browse/PLUS-3561) Add hotfix on the bullet list of password conditions field
- [PLUS-3586](https://olp.atlassian.net/browse/PLUS-3586) Update symbol regex to exclude whitespace chars
- [PLUS-3598](https://olp.atlassian.net/browse/PLUS-3598) Prevent password whitespace from being trimmed on form submission

## [1.25.1]

- [PLUS-3464](https://olp.atlassian.net/browse/PLUS-3464) Show thumbnails on products with single image + video and adjust image width on large screen
- [PLUS-3473](https://olp.atlassian.net/browse/PLUS-3473) Remove promotional item notification bug fixed

## [1.25.0]

- [PLUS-1239](https://olp.atlassian.net/browse/PLUS-1239) Enable Lighthouse CI + Server
- [PLUS-1459](https://olp.atlassian.net/browse/PLUS-1459) Add 'existing_customer' field to identify call after signing in
- [PLUS-1707](https://olp.atlassian.net/browse/PLUS-1707) Make paginators accessible for Search engines by adding page query in the URL
- [PLUS-2470](https://olp.atlassian.net/browse/PLUS-2470) Add New Customer Notification to the Login page
- [PLUS-3115](https://olp.atlassian.net/browse/PLUS-3115) Create new query for fetching menus
- [PLUS-3121](https://olp.atlassian.net/browse/PLUS-3121) Show notification if special province is selected (and not Equivalence surcharge)
- [PLUS-3198](https://olp.atlassian.net/browse/PLUS-3198) Add tracking to grid-, list-view toggle
- [PLUS-3210](https://olp.atlassian.net/browse/PLUS-3210) Remove the canonical tag from the search pages
- [PLUS-3213](https://olp.atlassian.net/browse/PLUS-3213) Update basket tile for promotion item labels
- [PLUS-3214](https://olp.atlassian.net/browse/PLUS-3214) Add default image for gift item
- [PLUS-3215](https://olp.atlassian.net/browse/PLUS-3215) Amend the remove from basket service to pass the product id, instead of the product sku
- [PLUS-3219](https://olp.atlassian.net/browse/PLUS-3219) Add Out-of-stock notification to the basket modal is at least of the promotional items is not available
- [PLUS-3222](https://olp.atlassian.net/browse/PLUS-3222) Add Promotional item out-of-stock notification to basket page
- [PLUS-3237](https://olp.atlassian.net/browse/PLUS-3237) Add xmas campaign variant to info label
- [PLUS-3244](https://olp.atlassian.net/browse/PLUS-3244) Improve appearance of content blocks inside product lists
- [PLUS-3292](https://olp.atlassian.net/browse/PLUS-3292) Display a proper warning message when user tries to add more than 1 coupons to the basket
- [PLUS-3297](https://olp.atlassian.net/browse/PLUS-3297) Add tests for ExponeaRecommendationBlock
- [PLUS-3303](https://olp.atlassian.net/browse/PLUS-3303) Adjust the margin for the title on Account Business Details page
- [PLUS-3304](https://olp.atlassian.net/browse/PLUS-3304) Fix Address Form Validation for non required fields
- [PLUS-3306](https://olp.atlassian.net/browse/PLUS-3306) Add loading animation for 'Any Questions' component
- [PLUS-3311](https://olp.atlassian.net/browse/PLUS-3311) Adjust gallery and video according to design review comments
- [PLUS-3312](https://olp.atlassian.net/browse/PLUS-3312) Fix surcharge notification for non business customers
- [PLUS-3322](https://olp.atlassian.net/browse/PLUS-3322) Fix position of Equivalent surcharge in order totals
- [PLUS-3333](https://olp.atlassian.net/browse/PLUS-3333) Fix NIF validation in the Account Creation and Address Book
- [PLUS-3340](https://olp.atlassian.net/browse/PLUS-3340) Add to cart enabled for products already added to basket as a gift
- [PLUS-3343](https://olp.atlassian.net/browse/PLUS-3343) Fix House nr and province/district not displayed in checkout
- [PLUS-3345](https://olp.atlassian.net/browse/PLUS-3345) Add new filter migration Contentful
- [PLUS-3347](https://olp.atlassian.net/browse/PLUS-3347) Fix Application error is shown
- [PLUS-3363](https://olp.atlassian.net/browse/PLUS-3363) Fix AnyQuestions block unresolved loading state issue
- [PLUS-3376](https://olp.atlassian.net/browse/PLUS-3376) Enable When parent item quantity changes, promotional item notification is removed
- [PLUS-3377](https://olp.atlassian.net/browse/PLUS-3377) Fix Product removal notification message updated when this item contains a gift
- [PLUS-3380](https://olp.atlassian.net/browse/PLUS-3380) Reduce H2 spacing in Account/Business details block
- [PLUS-3387](https://olp.atlassian.net/browse/PLUS-3387) Fix tax reference validation (CIF/NIF/NIE) for Address Creation
- [PLUS-3393](https://olp.atlassian.net/browse/PLUS-3393) Fix the gift label to be one line
- [PLUS-3395](https://olp.atlassian.net/browse/PLUS-3395) Change the color of Free shipping text and added space between shipping and Equivalent surcharge
- [PLUS-3400](https://olp.atlassian.net/browse/PLUS-3400) Fix Loading circle appears on the order confirmation page after placing
- [PLUS-3402](https://olp.atlassian.net/browse/PLUS-3402) Fix redirect to home after search
- [PLUS-3411](https://olp.atlassian.net/browse/PLUS-3411) Fix fetching Login notification content on Login Page
- [PLUS-3425](https://olp.atlassian.net/browse/PLUS-3425) Fix loading animation when fetching content from contentful
- [PLUS-3440](https://olp.atlassian.net/browse/PLUS-3440) Fix product removed message when the item contains a gift
- [PLUS-3451](https://olp.atlassian.net/browse/PLUS-3451) Refactor the basket page change quantity item request for initial page load error
- [PLUS-3463](https://olp.atlassian.net/browse/PLUS-3463) Add getPageSlug function to trim the proper slug for Contentful pages
- [PLUS-3479](https://olp.atlassian.net/browse/PLUS-3479) Fix filter and sort on SRP

## [1.24.1]

- [PLUS-3356](https://olp.atlassian.net/browse/PLUS-3356) Check for error in Add to Favourites useEffect

## [1.24.0]

- [PLUS-2148](https://olp.atlassian.net/browse/PLUS-2148) Update Preview App Source code
- [PLUS-2436](https://olp.atlassian.net/browse/PLUS-2436) Add additional account and login events and properties
- [PLUS-2974](https://olp.atlassian.net/browse/PLUS-2974) Fix menu background position so that it fills the whole screen
- [PLUS-3127](https://olp.atlassian.net/browse/PLUS-3127) Remove back link from PDP and list pages if there is no history within our domain
- [PLUS-3166](https://olp.atlassian.net/browse/PLUS-3166) Replace the billing address zip code validation on the checkout with the shiping address zip code
- [PLUS-3170](https://olp.atlassian.net/browse/PLUS-3170) Set validation per field instead of all validation on blur for account creation form
- [PLUS-3179](https://olp.atlassian.net/browse/PLUS-3179) Fix Notification zip code validation block is visible when user add correct address for current store
- [PLUS-3191](https://olp.atlassian.net/browse/PLUS-3191) Hide the account already exists error on the account creation when the email is updated
- [PLUS-3212](https://olp.atlassian.net/browse/PLUS-3212) Remove qty selectors in promotional item in basket
- [PLUS-3218](https://olp.atlassian.net/browse/PLUS-3218) Fix Basket modal notification updated when a promotional item is added
- [PLUS-3224](https://olp.atlassian.net/browse/PLUS-3224) Fix List ID recorded on search results pages events
- [PLUS-3240](https://olp.atlassian.net/browse/PLUS-3240) Fix issue where equivalent surcharge on order confirmation page was 0 when the user is from tax exempt region
- [PLUS-3254](https://olp.atlassian.net/browse/PLUS-3254) Add the missing tax reference value when billing address is not on a special tax region
- [PLUS-3256](https://olp.atlassian.net/browse/PLUS-3256) Add white spaces validation on account related forms and trim values after being submited
- [PLUS-3263](https://olp.atlassian.net/browse/PLUS-3263) Add list_id property to the product from the search results
- [PLUS-3264](https://olp.atlassian.net/browse/PLUS-3264) Add "info" icon to the Login Notification
- [PLUS-3271](https://olp.atlassian.net/browse/PLUS-3271) Fix spacing of promotions on COP.
- [PLUS-3276](https://olp.atlassian.net/browse/PLUS-3276) Handle equivalence charge status when editing address in the Address Book
- [PLUS-3291](https://olp.atlassian.net/browse/PLUS-3291) Refactor "View all products" button.
- [PLUS-3293](https://olp.atlassian.net/browse/PLUS-3293) Fix Province and District values in the Account area when trying to match the stored BE and the hard-coded FE values
- [PLUS-3279](https://olp.atlassian.net/browse/PLUS-3279) Fix Customer can't pay when the billing address is not for the store he is on

## [1.23.0]

- [PLUS-1967](https://olp.atlassian.net/browse/PLUS-1967) Added list_id to report-product-list viewed and report product-clicked-events for Segment
- [PLUS-2547](https://olp.atlassian.net/browse/PLUS-2547) Disable equivalence surcharge and display notification for specific provinces
- [PLUS-2548](https://olp.atlassian.net/browse/PLUS-2548) Add client side validation for PT VAT and ES CIF/NIF numbers
- [PLUS-2551](https://olp.atlassian.net/browse/PLUS-2551) Disable the update business details form when the customer account type is not Business
- [PLUS-2703](https://olp.atlassian.net/browse/PLUS-2703) Removing test feature flags and related code
- [PLUS-2735](https://olp.atlassian.net/browse/PLUS-2735) Added page_name,page_type,previous_page_name,previous_page_type properties for all Segment events
- [PLUS-2793](https://olp.atlassian.net/browse/PLUS-2793) Add logic for surcharge-region clash notification
- [PLUS-2819](https://olp.atlassian.net/browse/PLUS-2819) Enable the full-width image (landscape) option for marketing teasers
- [PLUS-2852](https://olp.atlassian.net/browse/PLUS-2852) Sorting Promotions by Weight, Validity and Published
- [PLUS-2901](https://olp.atlassian.net/browse/PLUS-2901) Add is_logged_in property to Segment middleware.
- [PLUS-2913](https://olp.atlassian.net/browse/PLUS-2913) Show ES in order summary in basket confirmation page, unsuccessful order page and in account details
- [PLUS-2914](https://olp.atlassian.net/browse/PLUS-2914) Show ES in order summary in checkout, order details
- [PLUS-2918](https://olp.atlassian.net/browse/PLUS-2918) Add "Product Ordered" event
- [PLUS-2945](https://olp.atlassian.net/browse/PLUS-2945) Disable 'Add to cart' CTA if product is disabled in Akeneo
- [PLUS-2995](https://olp.atlassian.net/browse/PLUS-2995) Promotional item added to the cart
- [PLUS-3001](https://olp.atlassian.net/browse/PLUS-3001) Added alternate language meta urls to the PDPs
- [PLUS-3004](https://olp.atlassian.net/browse/PLUS-3004) Adding AlternateLinks component (for alternate language meta tags) to listing pages (POP, COP and Brand pages)
- [PLUS-3012](https://olp.atlassian.net/browse/PLUS-3012) Remove duplicate page view event when customer views "all brands" page
- [PLUS-3015](https://olp.atlassian.net/browse/PLUS-3015) Fix UAT finding: wrong price is shown when placing an order with user from special region in Order Completed event
- [PLUS-3017](https://olp.atlassian.net/browse/PLUS-3017) Fixed PDP gallery bug while selecting thumbnail
- [PLUS-3053](https://olp.atlassian.net/browse/PLUS-3053) Aligning Header image for Brand, COP and POP according to new design (also removing the Category image in the mobile menu, and fixing COP GraphqQL query for fetching the image)
- [PLUS-3063](https://olp.atlassian.net/browse/PLUS-3063) Show pricing tags as labels on POP and PDP
- [PLUS-3077](https://olp.atlassian.net/browse/PLUS-3077) Fixed flashing on the PDP background when adding and removing products from the basket modal
- [PLUS-3083](https://olp.atlassian.net/browse/PLUS-3083) Improvement and adjustment of styles in video and image galleries
- [PLUS-3116](https://olp.atlassian.net/browse/PLUS-3116) Fix checkout wrong zip code notification when ACCOUNT_ADDRESS_BOOK is enabled
- [PLUS-3117](https://olp.atlassian.net/browse/PLUS-3117) Fix delivery method selection issue on checkout
- [PLUS-3119](https://olp.atlassian.net/browse/PLUS-3119) Show and edit business details on my account details page
- [PLUS-3128](https://olp.atlassian.net/browse/PLUS-3128) Fixing the Hero Banner width when there is no Link (CTA) assigned, and fixing its text layout
- [PLUS-3133](https://olp.atlassian.net/browse/PLUS-3133) Added logic to share DNI value between shipping and billing addresses in account creation flow
- [PLUS-3142](https://olp.atlassian.net/browse/PLUS-3142) Prevent user from typing 0 in quantity input
- [PLUS-3144](https://olp.atlassian.net/browse/PLUS-3144) Wrong shipping method is shown when changing delivery address from ES Mainland to ES Special regions
- [PLUS-3145](https://olp.atlassian.net/browse/PLUS-3145) Truncate and format customer data before sending them to 3D Secure
- [PLUS-3148](https://olp.atlassian.net/browse/PLUS-3148) Add general inline notification to Login Page
- [PLUS-3149](https://olp.atlassian.net/browse/PLUS-3149) Add DNI value to the update account details payload
- [PLUS-3153](https://olp.atlassian.net/browse/PLUS-3153) Add page scrolling to the top when on step 2 of account creation
- [PLUS-3155](https://olp.atlassian.net/browse/PLUS-3155) Fix validation for District and Provinces
- [PLUS-3162](https://olp.atlassian.net/browse/PLUS-3162) Remove product array from the Product Ordered event
- [PLUS-3164](https://olp.atlassian.net/browse/PLUS-3164) Send only required data when updating address values
- [PLUS-3173](https://olp.atlassian.net/browse/PLUS-3173) Remove DNI from the create account payload when none of the addresses is from a special region
- [PLUS-3178](https://olp.atlassian.net/browse/PLUS-3178) Fix validation issue for Tax reference (NIF/CIF/NIE) field regarding business account
- [PLUS-3189](https://olp.atlassian.net/browse/PLUS-3189) Fix surcharge logic on Create Address form for business customers
- [PLUS-3194](https://olp.atlassian.net/browse/PLUS-3194) Fix default district/province option value when opening address creation form in Address Book
- [PLUS-3195](https://olp.atlassian.net/browse/PLUS-3195) Pass isPromo attribute while adding promotional item to cart and update conditions for adding the gift to the basket
- [PLUS-3200](https://olp.atlassian.net/browse/PLUS-3200) Adding the current locale Alternate language meta tag to Homepage, Search, POP, COP, Brand, Promotions Overview and Brand Overview pages
- [PLUS-3202](https://olp.atlassian.net/browse/PLUS-3202) Alternate language meta tags also include the current locale
- [PLUS-3216](https://olp.atlassian.net/browse/PLUS-3216) Amend the equivalence surcharge label of Business account on Account Details page
- [PLUS-3227](https://olp.atlassian.net/browse/PLUS-3227) Hide equivalence surcharge for Portugal store on Personal Details page
- [PLUS-3232](https://olp.atlassian.net/browse/PLUS-3232) Fix related products in PDP
- [PLUS-3249](https://olp.atlassian.net/browse/PLUS-3249) Swap notification style for surcharge-region conflict

## [1.22.0]

- [INFRA-239](https://olp.atlassian.net/browse/INFRA-239) Enable Spanish blog
- [PLUS-1336](https://olp.atlassian.net/browse/PLUS-1336) Fix commonly occurring error: cannot read property "common" of undefined
- [PLUS-1358](https://olp.atlassian.net/browse/PLUS-1358) Translated plural and singular values for product
- [PLUS-1930](https://olp.atlassian.net/browse/PLUS-1930) Introducing 'Country Selector Header' component to the Header
- [PLUS-2024](https://olp.atlassian.net/browse/PLUS-2024) Remove parameters in canonicals link
- [PLUS-2096](https://olp.atlassian.net/browse/PLUS-2096) Reduce number of unnecessary reported errors when fetching recommendations, and add a 1 second timeout on Exponea requests
- [PLUS-2149](https://olp.atlassian.net/browse/PLUS-2149) Create preview app for contentful allowing preview of content in different locales
- [PLUS-2471](https://olp.atlassian.net/browse/PLUS-2471) Added personal details summary block to multi-step create account form
- [PLUS-2472](https://olp.atlassian.net/browse/PLUS-2472) Split account registration form
- [PLUS-2473](https://olp.atlassian.net/browse/PLUS-2473) Create conditional DNI field shown if Delivery location is within special tax region
- [PLUS-2474](https://olp.atlassian.net/browse/PLUS-2474) Add optional Billing Address form on Create Address
- [PLUS-2496](https://olp.atlassian.net/browse/PLUS-2496) Improve feedback when trying to add more than available quantity to basket
- [PLUS-2532](https://olp.atlassian.net/browse/PLUS-2532) prevent product tile add to basket clicks also triggering product click events
- [PLUS-2546](https://olp.atlassian.net/browse/PLUS-2546) Add surcharge, CIF/NIF, company name & customer type fields to the account/address creation forms.
- [PLUS-2566](https://olp.atlassian.net/browse/PLUS-2566) Checkout Started `discount` property not decimal
- [PLUS-2600](https://olp.atlassian.net/browse/PLUS-2600) Add video to the video gallery in the PDPs
- [PLUS-2601](https://olp.atlassian.net/browse/PLUS-2601) Pause video when changing Slide
- [PLUS-2604](https://olp.atlassian.net/browse/PLUS-2604) Added GalleryLoading component to improve PDP loading performance
- [PLUS-2633](https://olp.atlassian.net/browse/PLUS-2633) Set `stripLinks` prop to false in the Description section and break long words
- [PLUS-2648](https://olp.atlassian.net/browse/PLUS-2648) Hide address fields edit from Account details page
- [PLUS-2667](https://olp.atlassian.net/browse/PLUS-2667) Increase number of items per SKU from 10 to 50, Refactor of BasketModal
- [PLUS-2763](https://olp.atlassian.net/browse/PLUS-2763) Hide navigation arrows if images + videos length is more than 6 on MD and more than 10 on LG
- [PLUS-2831](https://olp.atlassian.net/browse/PLUS-2831) Removing incorrect spacing in the 'container of content blocks' on the product grid
- [PLUS-2869](https://olp.atlassian.net/browse/PLUS-2869) Contentful Richtext Validation
- [PLUS-2870](https://olp.atlassian.net/browse/PLUS-2870) Contentful add min/max validation
- [PLUS-2907](https://olp.atlassian.net/browse/PLUS-2907) Add additional fields in Account creation (House nr, Optional address, Province/District)
- [PLUS-2928](https://olp.atlassian.net/browse/PLUS-2928) Remove CookiePro related feature flags, clear unnecessary script ids and remove AutoBlock script
- [PLUS-2965](https://olp.atlassian.net/browse/PLUS-2965) Limiting the width of text section inside the Hero Banner
- [PLUS-2973](https://olp.atlassian.net/browse/PLUS-2973) Fix displaying country in the Address Book when creating account
- [PLUS-2977](https://olp.atlassian.net/browse/PLUS-2977) Use of horizontal margins in between components.
- [PLUS-2983](https://olp.atlassian.net/browse/PLUS-2983) Remove unnecessary grey border from newsletter subscribe button.
- [PLUS-2991](https://olp.atlassian.net/browse/PLUS-2991) Remove input arrows for Mozilla
- [PLUS-2992](https://olp.atlassian.net/browse/PLUS-2992) Added extra validations for the quantity input
- [PLUS-2994](https://olp.atlassian.net/browse/PLUS-2994) Spryker Response normalized to include the promotional item
- [PLUS-2997](https://olp.atlassian.net/browse/PLUS-2997) Fix saving personal details in the account area when the customer is logged into a different store where it was registered originally
- [PLUS-2998](https://olp.atlassian.net/browse/PLUS-2998) Fixed page scrolling "under" opened account menu on mobile.
- [PLUS-2999](https://olp.atlassian.net/browse/PLUS-2999) Remove unnecessary white space from basket modal; also don't allow page to scroll underneath.
- [PLUS-3002](https://olp.atlassian.net/browse/PLUS-3002) Adding all slugs in the page content in the different languages/locales
- [PLUS-3003](https://olp.atlassian.net/browse/PLUS-3003) Add alternate hreflang tags to content pages (including homepage)
- [PLUS-3005](https://olp.atlassian.net/browse/PLUS-3005) wrap promotion overview and brand overview hreflang meta tags in feature flag & remove en-gb alternates
- [PLUS-3010](https://olp.atlassian.net/browse/PLUS-3010) Add feature flag to control releasing of hreflang meta tag work
- [PLUS-3021](https://olp.atlassian.net/browse/PLUS-3021) Gallery labels are blocking Basket Modal from opening
- [PLUS-3031](https://olp.atlassian.net/browse/PLUS-3031) Include DNI field on the account details page ans update account details when possible
- [PLUS-3045](https://olp.atlassian.net/browse/PLUS-3045) Checkout change address user journey fixed when ACCOUNT_ADDRESS_BOOK enabled
- [PLUS-3046](https://olp.atlassian.net/browse/PLUS-3046) Use the name fields from the selected shipping address on the order
- [PLUS-3055](https://olp.atlassian.net/browse/PLUS-3055) Add the dni value when included during address editing on the address book.
- [PLUS-3062](https://olp.atlassian.net/browse/PLUS-3062) Modify create account onSubmit to fix early validation warning error
- [PLUS-3064](https://olp.atlassian.net/browse/PLUS-3064) Equivalent Surcharge customer data stored to Redux
- [PLUS-3065](https://olp.atlassian.net/browse/PLUS-3065) Fix the house number field on the multi step account creation
- [PLUS-3066](https://olp.atlassian.net/browse/PLUS-3066) Fix the validation for the one step account creation
- [PLUS-3068](https://olp.atlassian.net/browse/PLUS-3068) Included parameter 'p=x' in the canonical URL if pagination exists
- [PLUS-3102](https://olp.atlassian.net/browse/PLUS-3102) Fix stuck in scrolling which usually happens after navigating from mobile menu
- [PLUS-3125](https://olp.atlassian.net/browse/PLUS-3125) Fix Promotion visibility on POP pages
- [PLUS-3131](https://olp.atlassian.net/browse/PLUS-3131) Fix the create business account issue that prevents customers to advance on the account creation
- [PLUS-3158](https://olp.atlassian.net/browse/PLUS-3158) Fixed basket modal Add to basket button
- [PLUS-3159](https://olp.atlassian.net/browse/PLUS-3159) Remove taxReference on the update account payload when address book is disabled
- MISC Fix product labels overlapping navigation drop down backdrop and add to basket button.
- MISC Added Expedite Gitlab Pipeline for fast deployment

## [1.21.4]

- MISC Fix The Promo detail page visibility for Black Friday

## [1.21.3]

- [PLUS-3014](https://olp.atlassian.net/browse/PLUS-3014) Use validity dates to query promotions

## [1.21.2]

- [PLUS-3058](https://olp.atlassian.net/browse/PLUS-3058) Load more button fixed on promo overview

## [1.21.1]

- [PLUS-2863](https://olp.atlassian.net/browse/PLUS-2863) Add filter for campaign promos on Promo overview page
- [PLUS-3007](https://olp.atlassian.net/browse/PLUS-3007) Fix filters layout
- [PLUS-3008](https://olp.atlassian.net/browse/PLUS-3008) Putting the Footer Country selector behind a Feature Flag

## [1.21.0]

- [PLUS-2369](https://olp.atlassian.net/browse/PLUS-2369) Remove Hardcoded Shipping Estimate from Order Confirmation Page
- [PLUS-24](https://olp.atlassian.net/browse/PLUS-24) Creating Contentful preview environment
- [PLUS-2412](https://olp.atlassian.net/browse/PLUS-2412) Hide the NEW CookiePro scripts behind feature flag in order to test the production scripts on the production site
- [PLUS-2590](https://olp.atlassian.net/browse/PLUS-2590) add exponea project tokens for ES environments
- [PLUS-2599](https://olp.atlassian.net/browse/PLUS-2599) Adding Accessibility Parameters for Gallery component
- [PLUS-2603](https://olp.atlassian.net/browse/PLUS-2603) Implement gallery cursors for zoom,drag and move
- [PLUS-2605](https://olp.atlassian.net/browse/PLUS-2605) Add tracking to category overview pages.
- [PLUS-2683](https://olp.atlassian.net/browse/PLUS-2683) Add hardcoded list of provinces and districts in FE
- [PLUS-2686](https://olp.atlassian.net/browse/PLUS-2686) Add province or district to address payload when save the form
- [PLUS-2687](https://olp.atlassian.net/browse/PLUS-2687) Add feature flag for province and districts field
- [PLUS-2759](https://olp.atlassian.net/browse/PLUS-2759) Add Notification Modal logic for Address Book
- [PLUS-2762](https://olp.atlassian.net/browse/PLUS-2762) Remove thumbnails if product has only one image, add left and right arrows, adjust styles.
- [PLUS-2766](https://olp.atlassian.net/browse/PLUS-2766) Updating Hero Banner according to the design (for example, now it's a 'container' and not a full-width block, and also now the whole block is clickable)
- [PLUS-2767](https://olp.atlassian.net/browse/PLUS-2767) Removing the light grey border in the button on the Content Block with Image, and updating the hex code for the color 'secondary/dark-sky-blue'
- [PLUS-2771](https://olp.atlassian.net/browse/PLUS-2771) Change font weight of h4 tags.
- [PLUS-2813](https://olp.atlassian.net/browse/PLUS-2813) Adding the country selector to the footer
- [PLUS-2822](https://olp.atlassian.net/browse/PLUS-2822) Adding new icon 'Box', and making it an option in the Contentful content type 'Icon', as well as 'Lock' and 'FastDelivery' icons
- [PLUS-2838](https://olp.atlassian.net/browse/PLUS-2838) Segment - wrong price is shown when placing an order with user from special region in Order Completed event
- [PLUS-2862](https://olp.atlassian.net/browse/PLUS-2862) Add black friday filter on product list pages
- [PLUS-2898](https://olp.atlassian.net/browse/PLUS-2898) Allow Googlebot and Googlebot-Image user agents
- [PLUS-2899](https://olp.atlassian.net/browse/PLUS-2899) The notification appears for addresses that are not set as default delivery or billing address
- [PLUS-2903](https://olp.atlassian.net/browse/PLUS-2903) The default delivery address is not marked as default billing address after removing the default billing address
- [PLUS-2935](https://olp.atlassian.net/browse/PLUS-2935) LaunchDarkly Feature flag added for Bizum
- [PLUS-2943](https://olp.atlassian.net/browse/PLUS-2943) LaunchDarkly Feature flag for Multibanco Sibs and Multibanco Stripe
- [PLUS-2952](https://olp.atlassian.net/browse/PLUS-2952) Sort list of provinces and districts alphabetically
- [PLUS-2953](https://olp.atlassian.net/browse/PLUS-2953) LaunchDarkly Feature flag for MB Way
- [PLUS-2954](https://olp.atlassian.net/browse/PLUS-2954) LaunchDarkly Feature flag for Paypal / Credit card

## [1.20.3]

- [PLUS-2950](https://olp.atlassian.net/browse/PLUS-2950) Fix bug where page content could be "carried over" to subsequent page views
- [PLUS-2927](https://olp.atlassian.net/browse/PLUS-2927) Fix background colour for promo label in teaser and promo header

## [1.20.2]

- [PLUS-2884](https://olp.atlassian.net/browse/PLUS-2884) Updating braintree-drop-in package to the latest version 1.32.0
- [PLUS-2654](https://olp.atlassian.net/browse/PLUS-2654) Add promotion and campaign labels to promo teasers and product tiles and cards

## [1.20.1]

- [PLUS-2922](https://olp.atlassian.net/browse/PLUS-2922) Hide Brand image in header

## [1.20.0]

- [PLUS-2104](https://olp.atlassian.net/browse/PLUS-2104) Trending products section on COP will now recommend products from the selected category.
- [PLUS-2185](https://olp.atlassian.net/browse/PLUS-2185) Notification modal for tax exempt regions designed
- [PLUS-2383](https://olp.atlassian.net/browse/PLUS-2383) Remove Hardcoded Shipping Estimate from Checkout Delivery Step
- [PLUS-2462](https://olp.atlassian.net/browse/PLUS-2462) Creating the new header for the Promotion Details Page
- [PLUS-2477](https://olp.atlassian.net/browse/PLUS-2477) Delete Customer address from Address Book
- [PLUS-2479](https://olp.atlassian.net/browse/PLUS-2479) Enable adding of Addresses in Address Book
- [PLUS-2480](https://olp.atlassian.net/browse/PLUS-2480) Enable address editing in Address Book
- [PLUS-2517](https://olp.atlassian.net/browse/PLUS-2517) Tax inclusion or exclusion text added to Order Total.
- [PLUS-2518](https://olp.atlassian.net/browse/PLUS-2518) Adjust order summary in order details for Tax Exempt regions
- [PLUS-2529](https://olp.atlassian.net/browse/PLUS-2529) Contentful add campaign-key translation
- [PLUS-2627](https://olp.atlassian.net/browse/PLUS-2627) Changing content='noindex' in MetaData for the Spain shop
- [PLUS-2644](https://olp.atlassian.net/browse/PLUS-2644) Add notification on address form modal when updating addresses with the old format
- [PLUS-2660](https://olp.atlassian.net/browse/PLUS-2660) Redirect to the brand details page from the PDP
- [PLUS-2694](https://olp.atlassian.net/browse/PLUS-2694) Shipping total added and Discount total updated on unsuccessful page
- [PLUS-2702](https://olp.atlassian.net/browse/PLUS-2702) Decouple COP and POP title from what is being shown in the navigation drop down.
- [PLUS-2707](https://olp.atlassian.net/browse/PLUS-2707) Design the confirmation page products summary
- [PLUS-2709](https://olp.atlassian.net/browse/PLUS-2709) Add new payment icon (Bizum) in Contentful
- [PLUS-2710](https://olp.atlassian.net/browse/PLUS-2710) Doing some small design improvements for the campaign hero banner on LG screen sizes
- [PLUS-2713](https://olp.atlassian.net/browse/PLUS-2713) Recommendations in PDPs are displayed first time without having to reload the page.
- [PLUS-2718](https://olp.atlassian.net/browse/PLUS-2718) Tracking added for unsuccessful page
- [PLUS-2730](https://olp.atlassian.net/browse/PLUS-2730) Moving the brand image to the header (in the brand page) instead of being below the header
- [PLUS-2743](https://olp.atlassian.net/browse/PLUS-2743) Add houseNumber and addition on create address payload request
- [PLUS-2744](https://olp.atlassian.net/browse/PLUS-2744) Fix styling for zip code and city for XS only
- [PLUS-2748](https://olp.atlassian.net/browse/PLUS-2748) Added compression to fetch-page-contents GraphQL query
- [PLUS-2754](https://olp.atlassian.net/browse/PLUS-2754) Fix when new addresses are added after deleting any other addresses, the address book displays one less address than the total
- [PLUS-2765](https://olp.atlassian.net/browse/PLUS-2765) Add notification on Address book when customer doesn't have a valid default delivery address for the current country
- [PLUS-2769](https://olp.atlassian.net/browse/PLUS-2769) Disable and hide buttons of AddressTiles when displayed on a different country
- [PLUS-2778](https://olp.atlassian.net/browse/PLUS-2778) Order details page - orderDetailsItemImageLink is showing the gross price instead of the net price when placing an order with zipcode from special region
- [PLUS-2796](https://olp.atlassian.net/browse/PLUS-2796) SIBS Multibanco replaced by Stripe on UAT
- [PLUS-2805](https://olp.atlassian.net/browse/PLUS-2805) Fix displaying null when the house number is missing
- [PLUS-2808](https://olp.atlassian.net/browse/PLUS-2808) Payment Info Entered event added to Bizum
- [PLUS-2823](https://olp.atlassian.net/browse/PLUS-2823) Sort Addresses in the Address Book by default Shipping and Billing status
- [PLUS-2646](https://olp.atlassian.net/browse/PLUS-2646) Update address summary on order details page to include new extra fields. Everything has been wrapped inside the extra fields feature flag.
- [PLUS-2647](https://olp.atlassian.net/browse/PLUS-2647) Add feature flag to either hide or display address book extra fields
- [PLUS-2759](https://olp.atlassian.net/browse/PLUS-2759) Add Notification Modal logic for Address Book
- [PLUS-2855](https://olp.atlassian.net/browse/PLUS-2855) Feature flag added to Braintree for disabling credit cards payments on the Spanish store
- [PLUS-2880](https://olp.atlassian.net/browse/PLUS-2880) Pinning compromised packages to prevent malware
- [PLUS-2883](https://olp.atlassian.net/browse/PLUS-2883) Create feature flag for Canary Islands work

## [1.19.1]

- [PLUS-2807](https://olp.atlassian.net/browse/PLUS-2807) Amend styles for Marketing teasers

## [1.19.0]

- [INFRA-205-UAT](https://olp.atlassian.net/browse/INFRA-205-UAT) Move UAT domain to public load balancer so that bot protection test layer can be applied to it.
- [PLUS-1440](https://olp.atlassian.net/browse/PLUS-1440) Add Payment Info Entered event
- [PLUS-1468](https://olp.atlassian.net/browse/PLUS-1468) Setup consent manager per country
- [PLUS-2015](https://olp.atlassian.net/browse/PLUS-2015) Check for single voucher code if it was already used by the user after login, displayed warning block and the coupon in the form.
- [PLUS-2373](https://olp.atlassian.net/browse/PLUS-2373) Bringing the styles of the product box closer to the design.
- [PLUS-2475](https://olp.atlassian.net/browse/PLUS-2475) Added AddressSummaryTile component for Address Book
- [PLUS-2476](https://olp.atlassian.net/browse/PLUS-2476) Create address book page with list of addresses
- [PLUS-2478](https://olp.atlassian.net/browse/PLUS-2478) Add Address domain, api, and defaulting functionality
- [PLUS-2481](https://olp.atlassian.net/browse/PLUS-2481) Fixed issues where user cannot add any recommendation products to the basket
- [PLUS-2491](https://olp.atlassian.net/browse/PLUS-2491) enable newsletter consent checkbox for all available locales (PT & ES)
- [PLUS-2492](https://olp.atlassian.net/browse/PLUS-2492) Adapting the 'ContentWithImage' component to be able to create the 'Campaign Banner' from the design
- [PLUS-2536](https://olp.atlassian.net/browse/PLUS-2536) Adding feature flags from an external service
- [PLUS-2552](https://olp.atlassian.net/browse/PLUS-2552) Add favourites functionality for recommended products
- [PLUS-2580](https://olp.atlassian.net/browse/PLUS-2580) Fixing responsiveness and styles issues for the Campaign Hero Banner
- [PLUS-2581](https://olp.atlassian.net/browse/PLUS-2581) Making 'finishingDate' an optional field in the Campaign hero banner, and adding a boolean field for showing (or not) the CTA
- [PLUS-2588](https://olp.atlassian.net/browse/PLUS-2588) Unsuccessful page designed
- [PLUS-2597](https://olp.atlassian.net/browse/PLUS-2597) Created Storybook Gallery component
- [PLUS-2598](https://olp.atlassian.net/browse/PLUS-2598) Integrate Gallery component into PDP
- [PLUS-2611](https://olp.atlassian.net/browse/PLUS-2611) Spain shipment method displays PT Carrier name
- [PLUS-2634](https://olp.atlassian.net/browse/PLUS-2634) Create New Address Modal Form
- [PLUS-2635](https://olp.atlassian.net/browse/PLUS-2635) Create Address Book notification modal
- [PLUS-2656](https://olp.atlassian.net/browse/PLUS-2656) Add new form for creating/editing addresses. Add the logic to handle the modal.
- [PLUS-2659](https://olp.atlassian.net/browse/PLUS-2659) Basket subtotal price is not correct
- [PLUS-2662](https://olp.atlassian.net/browse/PLUS-2662) Updating the ProductCard styles in order to the promo label overlays the product image
- [PLUS-2700](https://olp.atlassian.net/browse/PLUS-2700) UI Adjustments for Address Book
- [PLUS-2708](https://olp.atlassian.net/browse/PLUS-2708) Bizum enabled on UAT
- [PLUS-2712](https://olp.atlassian.net/browse/PLUS-2712) Adding 'ui-black' to the 'colorReference' in the 'color' content-type in Contentful
- [PLUS-2715](https://olp.atlassian.net/browse/PLUS-2715) Coupon issue fixed on the Unsuccessful page
- [PLUS-2716](https://olp.atlassian.net/browse/PLUS-2716) Fixing the height of the campaign banner (content block with image)
- [PLUS-2790](https://olp.atlassian.net/browse/PLUS-2790) 'Payment Info Entered' event naming fixed
- [PLUS-2461](https://olp.atlassian.net/browse/PLUS-2461) Add promo information text box to product details page.
- [PLUS-2749](https://olp.atlassian.net/browse/PLUS-2749) Add Address Book feature flag
- [PLUS-2750](https://olp.atlassian.net/browse/PLUS-2750) Add new feature flag solution for handling the visibility of Favourites
- [PLUS-2772](https://olp.atlassian.net/browse/PLUS-2772) Fix width of add to basket and favorite buttons container.

## [1.18.2]

- [PLUS-2738](https://olp.atlassian.net/browse/PLUS-2738) SIBS Multibanco replaced by Stripe Multibanco on PROD

## [1.18.0]

- [INFRA-205](https://olp.atlassian.net/browse/INFRA-205) Moved UAT domain to public load balancer so that bot protection test layer can be applied to it
- [PLUS-2143](https://olp.atlassian.net/browse/PLUS-2143) Added sample implementation of utilising Yotpo widgets for multiple locales
- [PLUS-2169](https://olp.atlassian.net/browse/PLUS-2169) Refreshed Yotpo widget on toggle view by adding productView as a useEffect dependance in connected.tsx
- [PLUS-2219](https://olp.atlassian.net/browse/PLUS-2219) Redirected Customer to Bizum with form params
- [PLUS-2440](https://olp.atlassian.net/browse/PLUS-2440) Disallowed displaying disabled products on Favourites page
- [PLUS-2457](https://olp.atlassian.net/browse/PLUS-2457) Created the "View all promotions" button for Landing Pages
- [PLUS-2468](https://olp.atlassian.net/browse/PLUS-2468) Fixed free shipping display in order details
- [PLUS-2488](https://olp.atlassian.net/browse/PLUS-2488) Adjusted style of promotion and marketing teasers in content container to match design.
- [PLUS-2493](https://olp.atlassian.net/browse/PLUS-2493) Fixed loading spinner on Favourites pin when adding item to Favourites
- [PLUS-2500](https://olp.atlassian.net/browse/PLUS-2500) Added tests to normalizeCategoryCop
- [PLUS-2524](https://olp.atlassian.net/browse/PLUS-2524) Removed Bizum redirection from Confirmation page to home page
- [PLUS-2528](https://olp.atlassian.net/browse/PLUS-2528) Identified label type from promotion key
- [PLUS-2533](https://olp.atlassian.net/browse/PLUS-2533) Added ability to have a localised title on a "container of content blocks"
- [PLUS-2554](https://olp.atlassian.net/browse/PLUS-2554) Increased promotion limit & decrease content block limit RT UAT
- [PLUS-2557](https://olp.atlassian.net/browse/PLUS-2557) Removed Favourites summary from Account Overview
- [PLUS-2558](https://olp.atlassian.net/browse/PLUS-2558) Fixed the number of items for Favourites page
- [PLUS-2582](https://olp.atlassian.net/browse/PLUS-2582) Fixed the black background error in the Campaign Hero Banner
- [PLUS-2589](https://olp.atlassian.net/browse/PLUS-2589) Fixed styling for category overview pages
- [PLUS-2584](https://olp.atlassian.net/browse/PLUS-2584) Disabled SIBS MBWay and Multibanco payment methods and enable Stripe multibanco payment method
- [PLUS-2609](https://olp.atlassian.net/browse/PLUS-2609) Corrected Payment_token_uuid in Spryker db
- [PLUS-2612](https://olp.atlassian.net/browse/PLUS-2612) Enabled Sibs MBWay and Multibanco payment methods on PROD and UAT while Stripe is disabled
- [PLUS-2616](https://olp.atlassian.net/browse/PLUS-2616) Adapted Order Completed event to Bizum and order history & orderId recovered on Confirmation page if redirection
- [PLUS-2630](https://olp.atlassian.net/browse/PLUS-2630) Adjusted Promo Teaser dimensions across pages and sizes. Adjusted promo teasers on LG screens

## [1.17.0]

- [PLUS-2210](https://olp.atlassian.net/browse/PLUS-2210) Adjusted zip code validation in checkout
- [PLUS-2218](https://olp.atlassian.net/browse/PLUS-2218) Enabled Create-bizum-payment endpoint for processing Bizum payment
- [PLUS-2264](https://olp.atlassian.net/browse/PLUS-2264) Updated Contentful Categories for ES
- [PLUS-2265](https://olp.atlassian.net/browse/PLUS-2265) Updated Contentful Brands for ES
- [PLUS-2301](https://olp.atlassian.net/browse/PLUS-2301) Added sorting method for brands before grouping
- [PLUS-2307](https://olp.atlassian.net/browse/PLUS-2307) Created 'Campaign hero banner' component
- [PLUS-2308](https://olp.atlassian.net/browse/PLUS-2308) Created the new content type for 'Campaign hero banner'
- [PLUS-2309](https://olp.atlassian.net/browse/PLUS-2309) Integrated 'Campaign hero banner' in content blocks layout
- [PLUS-2335](https://olp.atlassian.net/browse/PLUS-2335) Added view all products to category overview page.
- [PLUS-2336](https://olp.atlassian.net/browse/PLUS-2336) Removed unnecessary helper and add a translation to handle the prefilled country value on the create/update account form
- [PLUS-2336](https://olp.atlassian.net/browse/PLUS-2367) Moved fetching of promotions to server side for COP
- [PLUS-2388](https://olp.atlassian.net/browse/PLUS-2388) Adjusted Favourites page spacing at MD and LG sizes
- [PLUS-2391](https://olp.atlassian.net/browse/PLUS-2391) Added product to favourites after redirecting from login
- [PLUS-2406](https://olp.atlassian.net/browse/PLUS-2406) Fixed add to cart functionality on Favourites page
- [PLUS-2409](https://olp.atlassian.net/browse/PLUS-2409) Fixed 'Add to basket' button label duplicate for Product Tile
- [PLUS-2424](https://olp.atlassian.net/browse/PLUS-2424) Removed router destructuring to avoid null error
- [PLUS-2433](https://olp.atlassian.net/browse/PLUS-2433) Fixed for re-adding products for Favourites once they were added and removed
- [PLUS-2435](https://olp.atlassian.net/browse/PLUS-2435) Fixed colored border in products drop down menu for type categoryCop.
- [PLUS-2445](https://olp.atlassian.net/browse/PLUS-2445) Added notification triggering for login page for Favourites
- [PLUS-2449](https://olp.atlassian.net/browse/PLUS-2449) Fixed Add to Cart and button and Favourites pin styling issue for iOS devices with XS screen
- [PLUS-2485](https://olp.atlassian.net/browse/PLUS-2485) Fixed Notification block appearance on Login Page

## [1.16.0]

- [PLUS-936](https://olp.atlassian.net/browse/PLUS-936) Added a sticky CTA add to cart on the PDP
- [PLUS-1543](https://olp.atlassian.net/browse/PLUS-1543) Fixed the alignment on POP according to the current designs, and the Promotion Overview Page filters bug. Also adding 404 page test IDs
- [PLUS-2033](https://olp.atlassian.net/browse/PLUS-2033) An object containing the user data is created and sent to /create-device-data endpoint
- [PLUS-2093](https://olp.atlassian.net/browse/PLUS-2093) Created category overview page, which displays list of subcategories, promotions, top brands and trending products of the selected category
- [PLUS-2103](https://olp.atlassian.net/browse/PLUS-2103) Created new content type and component for Top Brands
- [PLUS-2114](https://olp.atlassian.net/browse/PLUS-2114) Created Favourite Redux logic for adding to favourites list
- [PLUS-2115](https://olp.atlassian.net/browse/PLUS-2115) Created Favourite Redux logic for retrieving favourites list
- [PLUS-2116](https://olp.atlassian.net/browse/PLUS-2116) Created Favourite Redux logic for removing favourites from list
- [PLUS-2119](https://olp.atlassian.net/browse/PLUS-2119) Added styling for Favourites page empty state
- [PLUS-2139](https://olp.atlassian.net/browse/PLUS-2139) Set locale script to be used manually or with CI
- [PLUS-2161](https://olp.atlassian.net/browse/PLUS-2161) Improve validation on incorrect email addresses
- [PLUS-2163](https://olp.atlassian.net/browse/PLUS-2163) Displayed the number of items on the Favourites pin icon in the header
- [PLUS-2164](https://olp.atlassian.net/browse/PLUS-2164) Fetched and display products on the Favourites page
- [PLUS-2188](https://olp.atlassian.net/browse/PLUS-2188) Adapted The zip code validation Regex on the checkout page in order to add more flexibility
- [PLUS-2196](https://olp.atlassian.net/browse/PLUS-2196) Blocked robots & crawlers from accessing /es-es
- [PLUS-2209](https://olp.atlassian.net/browse/PLUS-2209) Striped feature tags disabled on all environments
- [PLUS-2215](https://olp.atlassian.net/browse/PLUS-2215) Fixed Users inablility to choose another payment method after paying with unsupported cart type
- [PLUS-2221](https://olp.atlassian.net/browse/PLUS-2221) Added notification block on login page when customers are redirected after trying to add a new product to their wishlist
- [PLUS-2226](https://olp.atlassian.net/browse/PLUS-2226) Made the POP work well regardless of locale and fix the bug in the sort filter
- [PLUS-2229](https://olp.atlassian.net/browse/PLUS-2229) Added es-es translated route for brands
- [PLUS-2236](https://olp.atlassian.net/browse/PLUS-2236) Added add to the basket button label
- [PLUS-2238](https://olp.atlassian.net/browse/PLUS-2238) Removed counter from favourites pin indicator
- [PLUS-2243](https://olp.atlassian.net/browse/PLUS-2243) Added Bizum payment method to Spanish store only
- [PLUS-2244](https://olp.atlassian.net/browse/PLUS-2244) Added helper function to retrieve required lookup fields per locale
- [PLUS-2261](https://olp.atlassian.net/browse/PLUS-2261) Corrected value of pre-filled Country field for ES-ES
- [PLUS-2271](https://olp.atlassian.net/browse/PLUS-2271) Adjusted zip code validation by locale in account creation/update
- [PLUS-2275](https://olp.atlassian.net/browse/PLUS-2275) Applied ES tag to specific Content-types
- [PLUS-2306](https://olp.atlassian.net/browse/PLUS-2306) Added aria-label attributes to Header links
- [PLUS-2316](https://olp.atlassian.net/browse/PLUS-2316) Fixed infinity loading circle appears when user tries placing order after error, a little refactor, cleared errors when going from basket to checkout
- [PLUS-2323](https://olp.atlassian.net/browse/PLUS-2323) Created BizumPaymentMethod component
- [PLUS-2328](https://olp.atlassian.net/browse/PLUS-2328) Fixed Issue about error 500 in pop
- [PLUS-2332](https://olp.atlassian.net/browse/PLUS-2332) Dispatched Bizum Create Order Trigger
- [PLUS-2335](https://olp.atlassian.net/browse/PLUS-2335) Added view all products to category overview page
- [PLUS-2345](https://olp.atlassian.net/browse/PLUS-2345) Handled the validation of the email address by the onBlur prop from our FormField component
- [PLUS-2351](https://olp.atlassian.net/browse/PLUS-2351) Removed .co and .cm from the top level domain email typos
- [PLUS-2352](https://olp.atlassian.net/browse/PLUS-2352) Fixed an issues with user cancelling Braintree 3rd secure cannot place a order with MBway or Multibanco
- [PLUS-2356](https://olp.atlassian.net/browse/PLUS-2356) Refactored PhoneNumberForm component to be an organism
- [PLUS-2359](https://olp.atlassian.net/browse/PLUS-2359) Renamed create braintree token slice and selector
- [PLUS-2366](https://olp.atlassian.net/browse/PLUS-2366) Fixed Empty page for Favourites, fix loading flickering issue on Favourites Page
- [PLUS-2382](https://olp.atlassian.net/browse/PLUS-2382) Fixed the position of the favourites icon and the promotion label in the grid display
- [PLUS-2437](https://olp.atlassian.net/browse/PLUS-2437) Fixed category reference name in fragment

## [1.15.1]

- [PLUS-2395](https://olp.atlassian.net/browse/PLUS-2395) Changed CookiePro script id to test version

## [1.15.0]

- [INFRA-223](https://olp.atlassian.net/browse/INFRA-223) Fixed Elasticsearch logging error - message must be string
- [MISC-MR-840](https://olp.atlassian.net/browse/INFRA-223) Fixed Elasticsearch 400 error caused by logged error message being an object not a string.
- [MISC-MR-843](https://olp.atlassian.net/browse/INFRA-223) Fixed Elasticsearch 400 error caused by request_id sometimes being interpreted by ElasticSearch as text, and other times as long, when it is logged.
- [PLUS-1642](https://olp.atlassian.net/browse/PLUS-1642) Sey loading spinner instead of text "loading.." on Order history
- [PLUS-1798](https://olp.atlassian.net/browse/PLUS-1798) Prevented showing error in payment step if redirecting bc of availability
- [PLUS-1871](https://olp.atlassian.net/browse/PLUS-1871) Replaced incremental static generation on content/POP/PDP/PromoDP/BrandDP with caching in redis for slow (contentful graphql) requests. Introduces caching for promotions LP & brands LP.
- [PLUS-1891](https://olp.atlassian.net/browse/PLUS-1891) Returned 404 for ULRs without locale prefix
- [PLUS-1946](https://olp.atlassian.net/browse/PLUS-1946) Availability check on checkout - check on create order if the quantity of any product is still available
- [PLUS-1948](https://olp.atlassian.net/browse/PLUS-1948) Availability check in basket - check on quantity change if the requested quantity is still available
- [PLUS-1992](https://olp.atlassian.net/browse/PLUS-1992) Validated slugs in contentful & trim slugs of whitespace before sending page request
- [PLUS-2026](https://olp.atlassian.net/browse/PLUS-2026) Fixed Referrer not recorded correctly in My Account section
- [PLUS-2030](https://olp.atlassian.net/browse/PLUS-2030) Improve feedback when entering an invalid coupon
- [PLUS-2031](https://olp.atlassian.net/browse/PLUS-2031) Show more specific payment error messages to the user
- [PLUS-2035](https://olp.atlassian.net/browse/PLUS-2035) Modify JWT cookie domain pattern in kubernetes config to fix iOS logout issue
- [PLUS-2050](https://olp.atlassian.net/browse/PLUS-2050) User cannot reduce item Qty in basket after the qty has changed in availability while the product processed in checkout
- [PLUS-2064](https://olp.atlassian.net/browse/PLUS-2064) Adding spanish shop and es-es locale
- [PLUS-2106](https://olp.atlassian.net/browse/PLUS-2106) Updating the content model for 'promotions' to have an optional text list field
- [PLUS-2107](https://olp.atlassian.net/browse/PLUS-2107) Creating 'filtered-promotions' saga to fetch promotions according to a list of category filters, so only promotions that satisfy the filter are being returned
- [PLUS-2108](https://olp.atlassian.net/browse/PLUS-2108) Create FE component for displaying a list of checkboxes with a title and a callback function for handling when checkboxes are changed
- [PLUS-2110](https://olp.atlassian.net/browse/PLUS-2110) Standard delivery date = 1-3 workdays
- [PLUS-2118](https://olp.atlassian.net/browse/PLUS-2118) Add Favourites page and Favourites link in header
- [PLUS-2126](https://olp.atlassian.net/browse/PLUS-2126) Show an error in case zip code validation fails in checkout
- [PLUS-2131](https://olp.atlassian.net/browse/PLUS-2131) Payment methods configured depending of the locale
- [PLUS-2145](https://olp.atlassian.net/browse/PLUS-2145) Fix fetching empty Contentful data errors for es-es
- [PLUS-2153](https://olp.atlassian.net/browse/PLUS-2153) After changing country for MBWay phone field the errors are cleared
- [PLUS-2158](https://olp.atlassian.net/browse/PLUS-2158) Remove whitespace from address line 2 on checkout
- [PLUS-2168](https://olp.atlassian.net/browse/PLUS-2168) 3DS Feature tag enabled on PROD
- [PLUS-236](https://olp.atlassian.net/browse/PLUS-236) Implement a loading state for basket page: now when the basket is loading by default a spinner is showed, but when there's items into, a grey placeholder is showed for each for them
- [PLUS-312](https://olp.atlassian.net/browse/PLUS-312) Remove eCommerceDelAno logo and replace GLS logo with proper SVG file.
- [PLUS-734](https://olp.atlassian.net/browse/PLUS-734) upgrade from next.js 10.x to 11.x
- [PLUS-915](https://olp.atlassian.net/browse/PLUS-915) Creating the 404 page
- [PLUS-2232](https://olp.atlassian.net/browse/PLUS-2232) Fixed issue where status of multiple products does not change for unavailable quantity
- [PLUS-2234](https://olp.atlassian.net/browse/PLUS-2234) CookiePro script ID for Portuguese shop changed to use domain www.atida.com/pt-pt
- [PLUS-2186](https://olp.atlassian.net/browse/PLUS-2186) Added logic to delete customer reference on action failure
- [PLUS-2223](https://olp.atlassian.net/browse/PLUS-2223) User cannot continue from first time to checkout after error is thrown
- [PLUS-2250](https://olp.atlassian.net/browse/PLUS-2250) Now users should see all the promotions that match at least one of the requested category filters
- [PLUS-2318](https://olp.atlassian.net/browse/PLUS-2318) Fix translations for promotional overview filters
- [PLUS-2339](https://olp.atlassian.net/browse/PLUS-2339) Adjusting styles for Promotion category filters on mobile and small screens

## [1.14.1]

- [PLUS-2235](https://olp.atlassian.net/browse/PLUS-2235) Remove .aa-Detached class from body

## [1.14.0]

- [PLUS-1457](https://olp.atlassian.net/browse/PLUS-1457) Segment page load events firing in correct order during client side navigation
- [PLUS-1810](https://olp.atlassian.net/browse/PLUS-1810) Creating the saga to fetch SEO blocks from Contentful. Now the pages 'brands' and 'promotions' are using this data for the <MetaData /> to show a title and meta description
- [PLUS-1897](https://olp.atlassian.net/browse/PLUS-1897) Show the order status in order details
- [PLUS-1908](https://olp.atlassian.net/browse/PLUS-1908) Enable 3d secure
- [PLUS-1932](https://olp.atlassian.net/browse/PLUS-1932) Prefilled country not clearly blocked when you get redirected from the checkout flow
- [PLUS-1939](https://olp.atlassian.net/browse/PLUS-1939) Improve the way we handle expired login in 'checkout'. Now when the session expires, the user is redirected to 'login'
- [PLUS-1944](https://olp.atlassian.net/browse/PLUS-1944) In case of a 500 or wrong number, customer should be able to select another payment method.
- [PLUS-1950](https://olp.atlassian.net/browse/PLUS-1950) referrer value dynamically updated on internal navigation
- [PLUS-1994](https://olp.atlassian.net/browse/PLUS-1994) Fix order summary in basket - padding around the block should be smaller
- [PLUS-1997](https://olp.atlassian.net/browse/PLUS-1997) Increase font size and padding around Your order block on LG screen
- [PLUS-2007](https://olp.atlassian.net/browse/PLUS-2007) Created grid view for products on product overview page, brand pages, promo detail pages and search results page.
- [PLUS-2011](https://olp.atlassian.net/browse/PLUS-2011) modify number of products between content blocks
- [PLUS-2012](https://olp.atlassian.net/browse/PLUS-2012) Include tracking for the new grid view
- [PLUS-2013](https://olp.atlassian.net/browse/PLUS-2013) Adjust ProductCard for the new grid view. Add <Provider> component to storybooks.
- [PLUS-2016](https://olp.atlassian.net/browse/PLUS-2016) Show more button should only appear when there is more than 3 products
- [PLUS-2022](https://olp.atlassian.net/browse/PLUS-2022) On the checkout the stepper in the header is not working properly on medium and larger screens
- [PLUS-2036](https://olp.atlassian.net/browse/PLUS-2036) Align the position of order summary
- [PLUS-2061](https://olp.atlassian.net/browse/PLUS-2061) Fix styling on accordions
- [PLUS-2066](https://olp.atlassian.net/browse/PLUS-2066) Implement new design for add to basket button in grid/list view
- [PLUS-2076](https://olp.atlassian.net/browse/PLUS-2076) Remove non-ASCII-printable characters 3D Secure
- [PLUS-2087](https://olp.atlassian.net/browse/PLUS-2087) Adjust the Grid View to the design in POP'S
- [PLUS-2089](https://olp.atlassian.net/browse/PLUS-2089) User can click other payment methods/cards after 3d secure is submitted which makes the pay button to load infinitely and order status stays pending
- [PLUS-2155](https://olp.atlassian.net/browse/PLUS-2155) Fix issues about styles in Product Card of Product Grid

## [1.13.3]

- [PLUS-2130](https://olp.atlassian.net/browse/PLUS-2130) Adding again the Exponea token to runtimeConfig.js

## [1.13.2]

- [PLUS-1572](https://olp.atlassian.net/browse/PLUS-1572) Enable MBway payment option in PROD
- [PLUS-2090](https://olp.atlassian.net/browse/PLUS-2090) Enable SIBS Multibanco payment option in PROD

## [1.13.1]

- [PLUS-2028](https://olp.atlassian.net/browse/PLUS-2028) Remove the option to use multiple vouchers

## [1.13.0]

- [PLUS-139](https://olp.atlassian.net/browse/PLUS-139) Show order summary in checkout
- [PLUS-320](https://olp.atlassian.net/browse/PLUS-320) Add show more products functionality
- [PLUS-1656](https://olp.atlassian.net/browse/PLUS-1656) Create new content type for the PDPs recommendationId
- [PLUS-1683](https://olp.atlassian.net/browse/PLUS-1683) Bug fix for Add 'is_first_order' to Order Completed event, and 'is_logged_in' to all events
- [PLUS-1698](https://olp.atlassian.net/browse/PLUS-1698) Safari/Chrome (iOS) | Logout doesn't work correctly in iOS
- [PLUS-1727](https://olp.atlassian.net/browse/PLUS-1727) Adjust filter styles based on design
- [PLUS-1758](https://olp.atlassian.net/browse/PLUS-1758) Fix basket free shipping coupon handling
- [PLUS-1831](https://olp.atlassian.net/browse/PLUS-1831) Password reset error if you click the link twice needs a change
- [PLUS-1887](https://olp.atlassian.net/browse/PLUS-1887) Updating the BasketSummary and OrderTotals components styles according to the new designs
- [PLUS-1914](https://olp.atlassian.net/browse/PLUS-1914) Payment method is missing from most Order Completed events
- [PLUS-1928](https://olp.atlassian.net/browse/PLUS-1928) Add Links to FAQ block in My Account pages
- [PLUS-1931](https://olp.atlassian.net/browse/PLUS-1931) Shipping value is missing in order completed events
- [PLUS-1938](https://olp.atlassian.net/browse/PLUS-1938) Update Coupon Added and Coupon Removed events
- [PLUS-1952](https://olp.atlassian.net/browse/PLUS-1952) Translate expiration date confirmation page
- [PLUS-1957](https://olp.atlassian.net/browse/PLUS-1957) Adapt add coupon event to the cart value coupons
- [PLUS-1958](https://olp.atlassian.net/browse/PLUS-1958) Segment 'Coupon Added' event not recorded when incorrect capitalisation used.
- [PLUS-1959](https://olp.atlassian.net/browse/PLUS-1959) Add Checkout Attempted event
- [PLUS-1987](https://olp.atlassian.net/browse/PLUS-1987) Added padding to order summary block in checkout
- [PLUS-1993](https://olp.atlassian.net/browse/PLUS-1993) User is redirected to homepage when clicking in the area outside delivery step
- [PLUS-1995](https://olp.atlassian.net/browse/PLUS-1995) Chevron alignment fix on accordions.
- [PLUS-2029](https://olp.atlassian.net/browse/PLUS-2029) Don't show Load more in order summary

## [1.12.1]

- [PLUS-1644](https://olp.atlassian.net/browse/PLUS-1644) add market property to all segment events
- [PLUS-1945](https://olp.atlassian.net/browse/PLUS-1945) only replace page data when event properties already have it
- [PLUS-1963](https://olp.atlassian.net/browse/PLUS-1963) No identify calls are being made

## [1.12.0]

- [PLUS-1805](https://olp.atlassian.net/browse/PLUS-1805) Prepending URLs with slash
- [PLUS-1809](https://olp.atlassian.net/browse/PLUS-1809) Update links in the Questions-block editable in contentful
- [PLUS-1826](https://olp.atlassian.net/browse/PLUS-1826) "Coupon added" event created when a coupon is added with the following properties: cart_id, coupon_id, coupon_name, discount, discount_percent, is_logged_in
- [PLUS-1843](https://olp.atlassian.net/browse/PLUS-1843) segment middleware added for seo
- [PLUS-1857](https://olp.atlassian.net/browse/PLUS-1857) Delivery date should be "1-3 workdays" from today in confirmation, except for SIBS that should be "1-3 workdays after receiving your payment"
- [PLUS-1869](https://olp.atlassian.net/browse/PLUS-1869) Now promo labels are been displayed correctly in the basket
- [PLUS-1900](https://olp.atlassian.net/browse/PLUS-1900) Back button added to the Login form when user is not logged from basket to checkout page.
- [PLUS-1911](https://olp.atlassian.net/browse/PLUS-1911) Improve reliability of Contentful scripts during release post-deploy
- [PLUS-1915](https://olp.atlassian.net/browse/PLUS-1915) Fix view basket button loading state in basket modal
- [PLUS-1920](https://olp.atlassian.net/browse/PLUS-1920) 'Login Failed' event now has 'error_key' and 'error_message' properties
- [PLUS-1933](https://olp.atlassian.net/browse/PLUS-1933) Multiple vouchers: number should be behind add coupon text

## [1.11.0]

- [PLUS-836](https://olp.atlassian.net/browse/PLUS-836) nextjs locale detection enabled
- [PLUS-1451](https://olp.atlassian.net/browse/PLUS-1451) Report event "Account Updated" followed by identify call for Segment
- [PLUS-1596](https://olp.atlassian.net/browse/PLUS-1596) Add loading state to basket modal button
- [PLUS-1633](https://olp.atlassian.net/browse/PLUS-1633) To be able to add more than 1 voucher to my order
- [PLUS-1678](https://olp.atlassian.net/browse/PLUS-1678) Add 'is_first_order' to Order Completed event, and 'is_logged_in' to all events
- [PLUS-1808](https://olp.atlassian.net/browse/PLUS-1808) Translating the delivery date on the 'Thank you' page
- [PLUS-1839](https://olp.atlassian.net/browse/PLUS-1839) Add static sitemap xml files
- [PLUS-1854](https://olp.atlassian.net/browse/PLUS-1854) updates to robots.txt configuration to address indexing issues
- [PLUS-1862](https://olp.atlassian.net/browse/PLUS-1862) Incorrect payload when removing product using dropdown from basket
- [PLUS-1876](https://olp.atlassian.net/browse/PLUS-1876) Updated the styling of the country field
- [PLUS-1879](https://olp.atlassian.net/browse/PLUS-1879) Add a line of text below the bullet points of the Multibanco payment details on the confirmation page.
- [PLUS-1881](https://olp.atlassian.net/browse/PLUS-1881) Update Account Form >> BE validations for name, city are not shown in the UI
- [PLUS-1883](https://olp.atlassian.net/browse/PLUS-1883) Fix country field styling on iOS browsers
- [PLUS-1884](https://olp.atlassian.net/browse/PLUS-1884) Updated account tracking list is not cleaned up when new action is applied
- [PLUS-1889](https://olp.atlassian.net/browse/PLUS-1889) Find a better solution for the translated dates helpers: creating 'useDateTranslationLibrary' custom hook
- [PLUS-1893](https://olp.atlassian.net/browse/PLUS-1893) Fix unexpected add to basket pop up after a user has emptied the basket
- [PLUS-1902](https://olp.atlassian.net/browse/PLUS-1902) Remove .gz extension from urls in sitemap-index.xml
- [PLUS-1911](https://olp.atlassian.net/browse/PLUS-1911) Improve reliability of Contentful scripts during release post-deploy
- [PLUS-1913](https://olp.atlassian.net/browse/PLUS-1913) Add correct error message to Login Failed event
- [PLUS-1920](https://olp.atlassian.net/browse/PLUS-1920) 'Login Failed' event now has 'error_key' and 'error_message' properties
- [PLUS-1947](https://olp.atlassian.net/browse/PLUS-1947) sitemap url updated in robots.txt

## [1.10.0]

- [PLUS-1280](https://olp.atlassian.net/browse/PLUS-1280) Show payment status on order history items
- [PLUS-1428](https://olp.atlassian.net/browse/PLUS-1428) Sorting on promotion overview page
- [PLUS-1565](https://olp.atlassian.net/browse/PLUS-1565) Fixing the alignment on the Promo Detail Page
- [PLUS-1628](https://olp.atlassian.net/browse/PLUS-1628) Out of stock product in basket should be stroked through
- [PLUS-1653](https://olp.atlassian.net/browse/PLUS-1653) Avoid the use of NextLink for external links in header and footer
- [PLUS-1666](https://olp.atlassian.net/browse/PLUS-1666) redis store added to implement shared caching of contentful requests
- [PLUS-1712](https://olp.atlassian.net/browse/PLUS-1712) Font of checkbox to subscribe to newsletter too big
- [PLUS-1718](https://olp.atlassian.net/browse/PLUS-1718) Improving coverage tests of atoms and molecules
- [PLUS-1728](https://olp.atlassian.net/browse/PLUS-1728) Promotions overview page is not server-side rendered
- [PLUS-1747](https://olp.atlassian.net/browse/PLUS-1747) Add missing queryId to Product Clicked event
- [PLUS-1795](https://olp.atlassian.net/browse/PLUS-1795) Update logo for credit card payments
- [PLUS-1813](https://olp.atlassian.net/browse/PLUS-1813) Improved basket coupon logging such that it is the same as other API logs
- [PLUS-1824](https://olp.atlassian.net/browse/PLUS-1824) Added ZIP Code validation for Portugal
- [PLUS-1832](https://olp.atlassian.net/browse/PLUS-1832) Promo label was not showing the translation on recommendations: now we use <ProductLabels /> as in the product listings
- [PLUS-1836](https://olp.atlassian.net/browse/PLUS-1836) Add 'Login Failed' event when a user introduces wrong credentials at login
- [PLUS-1841](https://olp.atlassian.net/browse/PLUS-1841) Implement link to the basket in checkout page
- [PLUS-1844](https://olp.atlassian.net/browse/PLUS-1844) Fixing an issue with the Multibanco payment data: the <Action /> component disappears after 1 sec since 'mbWayPaymentRef' is cleared before
- [PLUS-1853](https://olp.atlassian.net/browse/PLUS-1853) Removing parameters from canonical urls
- [PLUS-1899](https://olp.atlassian.net/browse/PLUS-1899) Hide error message after failed payment in my basket
- MISC Fix Contentful Scheduling script for Release Process

## [1.9.8]

- [PLUS-1827](https://olp.atlassian.net/browse/PLUS-1827) Have Order Completed event for MB payment method to fire just before redirect to MB

## [1.9.7]

- [PLUS-1513](https://olp.atlassian.net/browse/PLUS-1513) Fixing the events order for Segment ('Checkout Started' and 'Checkout Step Viewed')
- [PLUS-1720](https://olp.atlassian.net/browse/PLUS-1720) Incorrect payload when adding product using dropdown from basket
- [PLUS-1726](https://olp.atlassian.net/browse/PLUS-1726) Checkout Started event firing on basket page
- [PLUS-1761](https://olp.atlassian.net/browse/PLUS-1761) Shipping cost should be removed from the Checkout Started event
- [PLUS-1765](https://olp.atlassian.net/browse/PLUS-1765) Add payment method to Order Completed event

## [1.9.6]

- [PLUS-1757](https://olp.atlassian.net/browse/PLUS-1757) Replace the page title that appears in the browser tab
- [PLUS-1762](https://olp.atlassian.net/browse/PLUS-1762) Fix Home page and Search results page canonical links
- [PLUS-1788](https://olp.atlassian.net/browse/PLUS-1788) Link from delivery step in checkout to MyAccount
- [PLUS-1814](https://olp.atlassian.net/browse/PLUS-1814) Moving the canonical link logic from app to page level to prevent duplicate canonical link
- [PLUS-1849](https://olp.atlassian.net/browse/PLUS-1849) Fix Search results page canonical link

## [1.9.5]

- [INFRA-210](https://olp.atlassian.net/browse/INFRA-210) Align frontend resources
- [PLUS-1776](https://olp.atlassian.net/browse/PLUS-1776) Fix errors caused by Google translate extension
- [PLUS-1791](https://olp.atlassian.net/browse/PLUS-1791) Order Complete event coupon value incorrectly specified
- [PLUS-1794](https://olp.atlassian.net/browse/PLUS-1794) Fixing canonical links in brand and promotion overview pages
- [PLUS-1800](https://olp.atlassian.net/browse/PLUS-1800) Fix images in basket tile.

## [1.9.4]

- [PLUS-1793](https://olp.atlassian.net/browse/PLUS-1793) add new site verification file and delete old one

## [1.9.3]

- MISC Fix typo on Exponea's PROD keys

## [1.9.2]

- [INFRA-209](https://olp.atlassian.net/browse/INFRA-209) Remove the about redirect
- [PLUS-1689](https://olp.atlassian.net/browse/PLUS-1689) Refetch basket data when product is changed
- [PLUS-1705](https://olp.atlassian.net/browse/PLUS-1705) Order completed event properties missing on when using multibanco
- [PLUS-1755](https://olp.atlassian.net/browse/PLUS-1755) Redeploy of ticket
- [PLUS-1760](https://olp.atlassian.net/browse/PLUS-1760) Update Exponea Keys for PROD
- [PLUS-1778](https://olp.atlassian.net/browse/PLUS-1778) Fix shipping price display in checkout
- [PLUS-1779](https://olp.atlassian.net/browse/PLUS-1779) Update Exponea scripts
- [PLUS-1782](https://olp.atlassian.net/browse/PLUS-1782) only show skeleton tiles when there are no results, and the data is loading
- [PLUS-1784](https://olp.atlassian.net/browse/PLUS-1784) add google site verification file

## [1.9.1]

- [PLUS-1714](https://olp.atlassian.net/browse/PLUS-1714) Timer to retrieve new Contentful environment
- [PLUS-1719](https://olp.atlassian.net/browse/PLUS-1719) Add MBWay icon and update SVGs.
- [PLUS-1755](https://olp.atlassian.net/browse/PLUS-1755) Remove identify call after Email Subscribed event
- [PLUS-1759](https://olp.atlassian.net/browse/PLUS-1759) Fix Promo Display in Page Content blocks
- [PLUS-1768](https://olp.atlassian.net/browse/PLUS-1768) Scroll is blocked on PDP and Homepage after choosing an item from Search bar

## [1.9.0]

- [PLUS-297](https://olp.atlassian.net/browse/PLUS-297) Updating canonical links to absolute urls
- [PLUS-910](https://olp.atlassian.net/browse/PLUS-910) Canonical Link Rework
- [PLUS-1472](https://olp.atlassian.net/browse/PLUS-1472) Second batch of imported Brands
- [PLUS-1525](https://olp.atlassian.net/browse/PLUS-1525) Update Exponea Keys to use UAT env
- [PLUS-1584](https://olp.atlassian.net/browse/PLUS-1584) Tax in monetary values to be consistent with business definitions
- [PLUS-1606](https://olp.atlassian.net/browse/PLUS-1606) Fix getting basket discounts and expenses from Spryker
- [PLUS-1643](https://olp.atlassian.net/browse/PLUS-1643) ensure that brands content is hydrated on client-side navigation
- [PLUS-1677](https://olp.atlassian.net/browse/PLUS-1677) Add position prop when event is triggered from Search bar.
- [PLUS-1688](https://olp.atlassian.net/browse/PLUS-1688) Create missing tests for helpers
- [PLUS-1692](https://olp.atlassian.net/browse/PLUS-1692) make checkout api error responses more detailed & explicit
- [PLUS-1699](https://olp.atlassian.net/browse/PLUS-1699) Exponea SDK - service worker
- [PLUS-1704](https://olp.atlassian.net/browse/PLUS-1704) Add Facebook meta tag
- [PLUS-1711](https://olp.atlassian.net/browse/PLUS-1711) Adding canoncial meta tags to URL's
- [PLUS-1716](https://olp.atlassian.net/browse/PLUS-1716) MB Way block displayed for Braintree card Confirmation page
- [PLUS-1722](https://olp.atlassian.net/browse/PLUS-1722) Reduce products in ProductListViewed event
- [PLUS-1730](https://olp.atlassian.net/browse/PLUS-1730) Add success field to Order Completed event for Segment
- [PLUS-1731](https://olp.atlassian.net/browse/PLUS-1731) Redirect to basket page when payment fails
- [PLUS-1733](https://olp.atlassian.net/browse/PLUS-1733) Use brand.code to filter products of a brand
- [PLUS-1752](https://olp.atlassian.net/browse/PLUS-1752) fix product price for Segment events

## [1.8.0]

- [PLUS-1006](https://olp.atlassian.net/browse/PLUS-1006) Input field zooming on IOS devices
- [PLUS-1267](https://olp.atlassian.net/browse/PLUS-1267) Enrich page meta titles
- [PLUS-1499](https://olp.atlassian.net/browse/PLUS-1499) Fix order of "Identify" calls
- [PLUS-1510](https://olp.atlassian.net/browse/PLUS-1510) modify page content type to use referencedContent and pageType fields
- [PLUS-1535](https://olp.atlassian.net/browse/PLUS-1535) Product normalizer updated to use image_derivatives for image URLs
- [PLUS-1580](https://olp.atlassian.net/browse/PLUS-1580) Separating the productListViewed event into multiple events to conform to GA requirements
- [PLUS-1595](https://olp.atlassian.net/browse/PLUS-1595) Add loading state to Add to basket button
- [PLUS-1589](https://olp.atlassian.net/browse/PLUS-1589) Remove accordion element from price filter (mobile)
- [PLUS-1615](https://olp.atlassian.net/browse/PLUS-1615) Add loading feedback to overview pages
- [PLUS-1629](https://olp.atlassian.net/browse/PLUS-1629) Adjust disabled state of button according to the design
- [PLUS-1637](https://olp.atlassian.net/browse/PLUS-1637) Add flags to country selector MBWay
- [PLUS-1640](https://olp.atlassian.net/browse/PLUS-1640) Fix formatting in monetary values + report order completed refactor
- [PLUS-1654](https://olp.atlassian.net/browse/PLUS-1654) Fix Marketing Teaser styling
- [PLUS-1657](https://olp.atlassian.net/browse/PLUS-1657) Updating Exponea token
- [PLUS-1661](https://olp.atlassian.net/browse/PLUS-1661) Fix 2 Checkout Started event properties
- [PLUS-1665](https://olp.atlassian.net/browse/PLUS-1665) Show hint that you have to have the MB Way app
- [PLUS-1667](https://olp.atlassian.net/browse/PLUS-1667) Scan components for uses of next/link component and set `prefetch` to false
- [PLUS-1668](https://olp.atlassian.net/browse/PLUS-1668) Add sibs multibanco payment option to payment method selection page
- [PLUS-1670](https://olp.atlassian.net/browse/PLUS-1670) Show Multibanco payment details on order success page
- [PLUS-1676](https://olp.atlassian.net/browse/PLUS-1676) Add missing properties and change props names in Product Clicked event.
- [PLUS-1684](https://olp.atlassian.net/browse/PLUS-1684) Update confirmation page for MB Way
- [PLUS-1715](https://olp.atlassian.net/browse/PLUS-1715) Add CorreosExpress icon to contentful

## [1.7.1]

- [PLUS-1179](https://olp.atlassian.net/browse/PLUS-1179) Allow search engines discover Atida and exclude specific pages.

## [1.7.0]

- [PLUS-1114](https://olp.atlassian.net/browse/PLUS-1114) Add Contentful Scripts to Gitlab CI
- [PLUS-1180](https://olp.atlassian.net/browse/PLUS-1180) Stock info on basket page is hardcoded
- [PLUS-1190](https://olp.atlassian.net/browse/PLUS-1190) Fix total products price and new error message for availability
- [PLUS-1237](https://olp.atlassian.net/browse/PLUS-1237) Fix redirect path after login
- [PLUS-1238](https://olp.atlassian.net/browse/PLUS-1238) Don't show modal when removing a product from your basket on the listpage/pdp
- [PLUS-1254](https://olp.atlassian.net/browse/PLUS-1254) Updated footer with correct information
- [PLUS-1289](https://olp.atlassian.net/browse/PLUS-1289) Quantity selector in the add to basket modal.
- [PLUS-1442](https://olp.atlassian.net/browse/PLUS-1442) Implement Exponea script
- [PLUS-1492](https://olp.atlassian.net/browse/PLUS-1492) PROD sorting options + details ratings is missing on PDP
- [PLUS-1509](https://olp.atlassian.net/browse/PLUS-1509) Quantity in Add Products event not matching what is in basket
- [PLUS-1517](https://olp.atlassian.net/browse/PLUS-1517) List items get hidden on desktop view
- [PLUS-1537](https://olp.atlassian.net/browse/PLUS-1537) Fix when user clicks on view to basket button from basket modal , he is not redirected to basket page
- [PLUS-1554](https://olp.atlassian.net/browse/PLUS-1554) Add Product Clicked event
- [PLUS-1558](https://olp.atlassian.net/browse/PLUS-1558) Create next mb way endpoint and integrate with payment option
- [PLUS-1566](https://olp.atlassian.net/browse/PLUS-1566) Remove hardcoded shipping price in basket
- [PLUS-1570](https://olp.atlassian.net/browse/PLUS-1570) Add Country code selector to MBWay payment option
- [PLUS-1612](https://olp.atlassian.net/browse/PLUS-1612) Adding incremental static generation work for [[..all]] route pages
- [PLUS-1635](https://olp.atlassian.net/browse/PLUS-1635) Fixed route query matcher prepending the locale
- [PLUS-1659](https://olp.atlassian.net/browse/PLUS-1659) don't show content blocks if on the search page
- [PLUS-371](https://olp.atlassian.net/browse/PLUS-371) Add pharmaceutical advice as part of the product description
- [PLUS-592](https://olp.atlassian.net/browse/PLUS-592) Add header title ‘Reviews’ to PDP review section

## [1.6.1]

- [PLUS-1237](https://olp.atlassian.net/browse/PLUS-1237) Fix redirect path after login
- [PLUS-1624](https://olp.atlassian.net/browse/PLUS-1624) Implement LUX script

## [1.6.0]

- [INFRA-194](https://olp.atlassian.net/browse/INFRA-194) reverse proxy to mifarma pt blog
- [PLUS-1215](https://olp.atlassian.net/browse/PLUS-1215) Show "Out of stock" if no availability data is present
- [PLUS-1217](https://olp.atlassian.net/browse/PLUS-1217) When a product is no longer in stock when it's in your basket, disable order button
- [PLUS-1243](https://olp.atlassian.net/browse/PLUS-1243) CSS changes updated to fix layout issues on iPad
- [PLUS-1244](https://olp.atlassian.net/browse/PLUS-1244) keep open the search dropdown does not disappear until the pdp arrives.
- [PLUS-1298](https://olp.atlassian.net/browse/PLUS-1298) Add ContainerOfContentBlocks and MarketingTeaser content types to show new content block on home page
- [PLUS-1314](https://olp.atlassian.net/browse/PLUS-1314) Alignment of text in order summary
- [PLUS-1323](https://olp.atlassian.net/browse/PLUS-1323) 2 promotions in content blocks next to each other
- [PLUS-1342](https://olp.atlassian.net/browse/PLUS-1342) Improve Contentful Sync Script (and refactoring)
- [PLUS-1343](https://olp.atlassian.net/browse/PLUS-1343) Questions-block on Thank you page missing margin at the bottom
- [PLUS-1399](https://olp.atlassian.net/browse/PLUS-1399) Fix FE Order Completed event
- [PLUS-1416](https://olp.atlassian.net/browse/PLUS-1416) Add Segment tracking for coupon removal
- [PLUS-1444](https://olp.atlassian.net/browse/PLUS-1444) Session cookies should be applied to www.atida.com
- [PLUS-1446](https://olp.atlassian.net/browse/PLUS-1446) Fixed issue when two messages are displayed for invalid coupon code
- [PLUS-1481](https://olp.atlassian.net/browse/PLUS-1481) Add currency to all events with monetary values
- [PLUS-1482](https://olp.atlassian.net/browse/PLUS-1482) Reduce payload of product list viewed event
- [PLUS-1536](https://olp.atlassian.net/browse/PLUS-1536) Localise href inside tags in Brands Overview Page
- [PLUS-1539](https://olp.atlassian.net/browse/PLUS-1539) Add the current product ID as an extra field to Exponeas requests on PDPs
- [PLUS-1540](https://olp.atlassian.net/browse/PLUS-1540) Make PDPs recommendationId be updatable from contentful
- [PLUS-1545](https://olp.atlassian.net/browse/PLUS-1545) Add feature flagged simple MBWay payment option
- [PLUS-1546](https://olp.atlassian.net/browse/PLUS-1546) Add phone number field and validation to MBWay payment option
- [PLUS-1560](https://olp.atlassian.net/browse/PLUS-1560) Product Tile and Card components updated to add disabled feature to add to cart button
- [PLUS-1561](https://olp.atlassian.net/browse/PLUS-1561) Change footer logo
- [PLUS-1569](https://olp.atlassian.net/browse/PLUS-1569) Products array property names incorrect

## [1.5.1]

- [PLUS-1575](https://olp.atlassian.net/browse/PLUS-1575) Expand NewRelic instrumentation to cover renderPage & getServerSideProps in catch-all route

## [1.5.0]

- [PLUS-146](https://olp.atlassian.net/browse/PLUS-146) Remove coupon from basket, refactored add coupon to basket, refactored basket
- [PLUS-926](https://olp.atlassian.net/browse/PLUS-926) Pass the google analytics client id through the order placement process and to segment
- [PLUS-958](https://olp.atlassian.net/browse/PLUS-958) Add instantsearch component for promo promo filter
- [PLUS-1035](https://olp.atlassian.net/browse/PLUS-1035) Create Brands overview page
- [PLUS-1060](https://olp.atlassian.net/browse/PLUS-1060) Order Completed event for Segment to be tracked on Multibanco payment method.
- [PLUS-1245](https://olp.atlassian.net/browse/PLUS-1245) JS functionality added to fix scrolling position issue, CSS styles added to address overscrolling on menus
- [PLUS-1252](https://olp.atlassian.net/browse/PLUS-1252) Newsletter subscription, UI change, tests
- [PLUS-1356](https://olp.atlassian.net/browse/PLUS-1356) Allow adding voucher to guest cart
- [PLUS-1359](https://olp.atlassian.net/browse/PLUS-1359) Hide email preferences in account details page
- [PLUS-1376](https://olp.atlassian.net/browse/PLUS-1376) Added locale to the default redirect on logout
- [PLUS-1393](https://olp.atlassian.net/browse/PLUS-1393) RRP is missing in basket
- [PLUS-1441](https://olp.atlassian.net/browse/PLUS-1441) Postpone firing events before Segment is initialised
- [PLUS-1469](https://olp.atlassian.net/browse/PLUS-1469) Update monetary value fields to be consistent with business definitions for Segment ( revenue,total).
- [PLUS-1538](https://olp.atlassian.net/browse/PLUS-1538) Amend promo teaser image styles to prevent odd behaviour depending on content and image size
- [PLUS-1541](https://olp.atlassian.net/browse/PLUS-1541) Products array for checkout started event
- [PLUS-1542](https://olp.atlassian.net/browse/PLUS-1542) Cache REST requests to Contentful for 5 minutes
- MISC Disable the X-Powered-By header

## [1.4.0]

- [PLUS-1142](https://olp.atlassian.net/browse/PLUS-1142) Show proper error notification if new password doesn't meet the criteria
- [PLUS-1219](https://olp.atlassian.net/browse/PLUS-1219) Track Segment Shopping flow events of Product Viewed and Products Searched
- [PLUS-1258](https://olp.atlassian.net/browse/PLUS-1258) Display formatted text in promotion description
- [PLUS-1275](https://olp.atlassian.net/browse/PLUS-1275) Load Exponea recommendations on Homepage
- [PLUS-1310](https://olp.atlassian.net/browse/PLUS-1310) Promo labels shouldn't be truncated.
- [PLUS-1316](https://olp.atlassian.net/browse/PLUS-1316) Separate image for header and teaser for Promotions
- [PLUS-1338](https://olp.atlassian.net/browse/PLUS-1338) Increase pagination for promotions overview
- [PLUS-1375](https://olp.atlassian.net/browse/PLUS-1375) Hide "This might also be interesting for you..." on promotion detail page.
- [PLUS-1378](https://olp.atlassian.net/browse/PLUS-1378) Creating brand details page and productSearchLayout refactoring
- [PLUS-1385](https://olp.atlassian.net/browse/PLUS-1385) Hide brand links on promotion detailpage
- [PLUS-1432](https://olp.atlassian.net/browse/PLUS-1432) Block Yotpo cookies until cookie consent is given
- [PLUS-1445](https://olp.atlassian.net/browse/PLUS-1445) Show basket qty badge after login
- [PLUS-1464](https://olp.atlassian.net/browse/PLUS-1464) Add trending text to search suggestions
- [PLUS-827](https://olp.atlassian.net/browse/PLUS-827) Create a feature flag for Favourites
- [PLUS-829](https://olp.atlassian.net/browse/PLUS-829) Add Algolia properties to track calls
- [PLUS-947](https://olp.atlassian.net/browse/PLUS-947) Load Exponea recommendations on PDP
- [PLUS-948](https://olp.atlassian.net/browse/PLUS-948) Create recommendations component

## [1.3.0]

- [PLUS-1152](https://olp.atlassian.net/browse/PLUS-1152) Change properties for identify calls case from camel to snake
- [PLUS-1208](https://olp.atlassian.net/browse/PLUS-1208) Add track checkout flow events for Segment
- [PLUS-1212](https://olp.atlassian.net/browse/PLUS-1212) Make identify call after specific events for Segment
- [PLUS-1231](https://olp.atlassian.net/browse/PLUS-1231) Add remaining_products array to Product Added/Removed events
- [PLUS-1261](https://olp.atlassian.net/browse/PLUS-1261) Hide RRP when sale price and RRP are equal
- [PLUS-1309](https://olp.atlassian.net/browse/PLUS-1309) Don't show discount label when there's a promo label
- [PLUS-1351](https://olp.atlassian.net/browse/PLUS-1351) Do not show discount label if discount is less than 5 percent
- [PLUS-1449](https://olp.atlassian.net/browse/PLUS-1449) When creating an order, send the Segment anonymousUserId token to Spryker
- [PLUS-950](https://olp.atlassian.net/browse/PLUS-950) Analytics files updated to track category data in one unified string instead of multi level categories.

## [1.2.1]

- [INFRA-195](https://olp.atlassian.net/browse/INFRA-195) Change uat domain to www and add www redirect to uat and prod

## [1.2.0]

- [PLUS-1026](https://olp.atlassian.net/browse/PLUS-1026) Hide Filter by categories in Promotion overview page
- [PLUS-1126](https://olp.atlassian.net/browse/PLUS-1126) Change product image derivatives file type to PNG
- [PLUS-1134](https://olp.atlassian.net/browse/PLUS-1134) Apply Contentful migrations bugfixes
- [PLUS-1195](https://olp.atlassian.net/browse/PLUS-1195) Fix Product List Viewed event by reducing the number of products on POP to 50.
- [PLUS-1213](https://olp.atlassian.net/browse/PLUS-1213) Add track user interaction events for Segment
- [PLUS-1218](https://olp.atlassian.net/browse/PLUS-1218) Add track internal promo events for Segment
- [PLUS-1240](https://olp.atlassian.net/browse/PLUS-1240) Hide the Invoice section and the payment method in the order details section on the Order Details page.
- [PLUS-1256](https://olp.atlassian.net/browse/PLUS-1256) Display promotion labels in teaser block , promotion detail page , category header. Fix teaser card layout issue.
- [PLUS-1287](https://olp.atlassian.net/browse/PLUS-1287) Add email subscription events for Segment
- [PLUS-1324](https://olp.atlassian.net/browse/PLUS-1324) Fix teaser card text layout issue in promotion overview page
- [PLUS-1339](https://olp.atlassian.net/browse/PLUS-1339) Adding ratings and reviews on PDP
- [PLUS-1341](https://olp.atlassian.net/browse/PLUS-1341) Prevent the changing of order totals when paying
- [PLUS-1384](https://olp.atlassian.net/browse/PLUS-1384) Add basic New Relic agent
- [PLUS-1390](https://olp.atlassian.net/browse/PLUS-1390) Add custom next.js server to allow for more detailed reporting in New Relic
- [PLUS-941](https://olp.atlassian.net/browse/PLUS-941) 1 Add product added and product removed events for item quantity changes

## [1.1.0]

- [INFRA-160](https://olp.atlassian.net/browse/INFRA-160) Migrate dev to atidaplus-dev cluster and update dev domain to .dev.atida.com
- [PLUS-211](https://olp.atlassian.net/browse/PLUS-211) Contentful logging
- [PLUS-293](https://olp.atlassian.net/browse/PLUS-293) Add modal to checkout's T&C text
- [PLUS-321](https://olp.atlassian.net/browse/PLUS-321) Modal component
- [PLUS-372](https://olp.atlassian.net/browse/PLUS-372) Show content size data correctly for all products
- [PLUS-1043](https://olp.atlassian.net/browse/PLUS-1043) Create brand content type migration
- [PLUS-1099](https://olp.atlassian.net/browse/PLUS-1099) FIX - update cookiePro script id, add cookiePro script
- [PLUS-1162](https://olp.atlassian.net/browse/PLUS-1162) add mifarma logo in header and minimal header components
- [PLUS-1212](https://olp.atlassian.net/browse/PLUS-1212) fix layout issues on promotion detail page
- [PLUS-1221](https://olp.atlassian.net/browse/PLUS-1221) Adding the release strategy config, tooling and documentation
- [PLUS-1236](https://olp.atlassian.net/browse/PLUS-1236) show badge in the header when a product is added/removed
- [PLUS-1271](https://olp.atlassian.net/browse/PLUS-1271) Remove Helptext on Category Content-type
- MISC Remove missing dev middleware patch definition
- MISC Fix dev middleware and implement pt -> pt-pt in all envs

## [1.0.0]

- State of master from updated release process

[1.0.0]: https://gitlab.com/atida/frontend/atida-plus/-/tags/1.0.0
[1.1.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.0.0...1.1.0
[1.2.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.1.0...1.2.0
[1.2.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.2.0...1.2.1
[1.3.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.2.1...1.3.0
[1.4.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.3.0...1.4.0
[1.5.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.4.0...1.5.0
[1.5.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.5.0...1.5.1
[1.6.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.5.1...1.6.0
[1.6.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.6.0...1.6.1
[1.7.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.6.1...1.7.0
[1.7.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.7.0...1.7.1
[1.8.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.7.1...1.8.0
[1.9.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.8.0...1.9.0
[1.9.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.9.0...1.9.1
[1.9.2]: https://gitlab.com/atida/frontend/atida-plus/compare/1.9.1...1.9.2
[1.9.3]: https://gitlab.com/atida/frontend/atida-plus/compare/1.9.2...1.9.3
[1.9.4]: https://gitlab.com/atida/frontend/atida-plus/compare/1.9.3...1.9.4
[1.9.5]: https://gitlab.com/atida/frontend/atida-plus/compare/1.9.4...1.9.5
[1.9.6]: https://gitlab.com/atida/frontend/atida-plus/compare/1.9.5...1.9.6
[1.9.7]: https://gitlab.com/atida/frontend/atida-plus/compare/1.9.6...1.9.7
[1.9.8]: https://gitlab.com/atida/frontend/atida-plus/compare/1.9.7...1.9.8
[1.10.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.9.8...1.10.0
[1.11.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.10.0...1.11.0
[1.12.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.11.0...1.12.0
[1.12.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.12.0...1.12.1
[1.13.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.12.1...1.13.0
[1.13.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.13.0...1.13.1
[1.13.2]: https://gitlab.com/atida/frontend/atida-plus/compare/1.13.1...1.13.2
[1.13.3]: https://gitlab.com/atida/frontend/atida-plus/compare/1.13.2...1.13.3
[1.14.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.13.3...1.14.0
[1.14.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.14.0...1.14.1
[1.15.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.14.1...1.15.0
[1.15.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.15.0...1.15.1
[1.16.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.15.1...1.16.0
[1.17.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.16.0...1.17.0
[1.18.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.17.0...1.18.0
[1.18.2]: https://gitlab.com/atida/frontend/atida-plus/compare/1.18.0...1.18.2
[1.19.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.18.2...1.19.0
[1.19.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.19.0...1.19.1
[1.20.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.19.1...1.20.0
[1.20.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.20.0...1.20.1
[1.20.2]: https://gitlab.com/atida/frontend/atida-plus/compare/1.20.1...1.20.2
[1.20.3]: https://gitlab.com/atida/frontend/atida-plus/compare/1.20.2...1.20.3
[1.21.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.20.3...1.21.0
[1.21.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.20.0...1.21.1
[1.21.2]: https://gitlab.com/atida/frontend/atida-plus/compare/1.20.1...1.21.2
[1.21.3]: https://gitlab.com/atida/frontend/atida-plus/compare/1.21.2...1.21.3
[1.21.4]: https://gitlab.com/atida/frontend/atida-plus/compare/1.21.3...1.21.4
[1.22.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.21.4...1.22.0
[1.23.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.22.0...1.23.0
[1.24.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.23.0...1.24.0
[1.24.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.24.0...1.24.1
[1.25.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.24.1...1.25.0
[1.25.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.25.0...1.25.1
[1.26.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.25.1...1.26.0
[1.27.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.26.0...1.27.0
[1.27.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.27.0...1.27.1
[1.27.2]: https://gitlab.com/atida/frontend/atida-plus/compare/1.27.1...1.27.2
[1.28.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.27.2...1.28.0
[1.29.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.28.0...1.29.0
[1.30.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.29.1...1.30.0
[1.31.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.30.0...1.31.0
[1.31.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.31.0...1.31.1
[1.31.2]: https://gitlab.com/atida/frontend/atida-plus/compare/1.31.1...1.31.2
[1.31.3]: https://gitlab.com/atida/frontend/atida-plus/compare/1.31.2...1.31.3
[1.31.4]: https://gitlab.com/atida/frontend/atida-plus/compare/1.31.3...1.31.4
[1.32.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.31.4...1.32.0
[1.32.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.32.0...1.32.1
[1.33.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.32.1...1.33.0
[1.33.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.33.0...1.33.1
[1.34.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.33.1...1.34.0
[1.35.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.34.0...1.35.0
[1.36.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.35.0...1.36.0
[1.37.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.36.0...1.37.0
[1.38.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.37.0...1.38.0
[1.39.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.38.0...1.39.0
[1.39.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.39.0...1.39.1
[1.39.2]: https://gitlab.com/atida/frontend/atida-plus/compare/1.39.1...1.39.2
[1.40.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.39.2...1.40.0
[1.41.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.40.0...1.41.0
[1.41.2]: https://gitlab.com/atida/frontend/atida-plus/compare/1.41.1...1.41.2
[1.43.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.41.2...1.43.0
[1.43.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.41.2...1.43.1
[1.44.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.43.1...1.44.0
[1.44.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.44.0...1.44.1
[1.45.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.44.1...1.45.0
[1.46.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.45.0...1.46.0
[1.46.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.46.0...1.46.1
[1.47.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.46.1...1.47.0
[1.47.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.47.0...1.47.1
[1.48.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.47.1...1.48.0
[1.49.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.48.0...1.49.0
[1.50.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.49.0...1.50.0
[1.51.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.50.0...1.51.0
[1.51.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.51.0...1.51.1
[1.52.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.51.1...1.52.0
[1.52.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.52.0...1.52.1
[1.53.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.52.1...1.53.0
[1.54.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.53.0...1.54.0
[1.55.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.54.0...1.55.0
[1.56.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.55.0...1.56.0
[1.57.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.56.0...1.57.0
[1.57.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.57.0...1.57.1
[1.58.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.57.1...1.58.0
[1.58.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.58.0...1.58.1
[1.59.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.58.1...1.59.0
[1.60.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.59.0...1.60.0
[1.61.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.60.0...1.61.0
[1.62.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.61.0...1.62.0
[1.63.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.62.0...1.63.0
[1.64.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.63.0...1.64.0
[1.65.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.64.0...1.65.0
[1.66.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.65.0...1.66.0
[1.67.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.66.0...1.67.0
[1.67.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.67.0...1.67.1
[1.67.2]: https://gitlab.com/atida/frontend/atida-plus/compare/1.67.1...1.67.2
[1.68.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.67.2...1.68.0
[1.68.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.68.0...1.68.1
[1.68.2]: https://gitlab.com/atida/frontend/atida-plus/compare/1.68.1...1.68.2
[1.69.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.68.2...1.69.0
[1.70.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.69.0...1.70.0
[1.70.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.70.0...1.70.1
[1.70.2]: https://gitlab.com/atida/frontend/atida-plus/compare/1.70.1...1.70.2
[1.70.3]: https://gitlab.com/atida/frontend/atida-plus/compare/1.70.2...1.70.3
[1.71.0]: https://gitlab.com/atida/frontend/atida-plus/compare/1.70.3...1.71.0
[1.71.1]: https://gitlab.com/atida/frontend/atida-plus/compare/1.71.0...1.71.1
