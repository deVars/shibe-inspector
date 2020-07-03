# shibe inspector

A UI that parses the [Dog](https://dog.ceo/dog-api/about) API.

## what it lets you do
1. Look at majestic shibes/ doges
1. Favorite some shibes/ doges
1. Stay at home and social distance if need be

## how do I run it?
### like, deploy as a web site?
1. (easy mode) Check it out @[shibe-inspector](https://devars.duckdns.org/shibe-inspector).
1. (easy mode DIY) place the project folder on any `web server` app that you know  and go for it!
1. (for the browser afficionado) drag to a browser and make sure to lighten-up same-site CORS security measures.

### Oh you mean the test suite?
`pnpm run test`

## the nitty gritty
My initial bet was on the *shibe as a service* API but the API wasn't fully CORS compliant.

Goals are:
* to be as vanilla JS as possible
* could've used bootstrap for CSS but we'll aim for flexbox and pixie dust
* vanilla JS SPA routing will be the most technical thing here (and won't be tested as a unit)
* we'll try to get some basic font-awesome icons for navigation
* since there's no browser scope in-place, browser scope is now all ES6-supporting browsers (it's already 2020, ES8 should be the target, really)

## design decisions
* no mixing of data and HTML-element/site domains.  
    
    If your data is good, then the problem is on the other domain (e.g. templating rules). Likewise, if the HTML-Element side has to append/enrich data, that's a problem on the data domain.

* no such thing as a `public` folder since there's no packing/bundling to be done here.  

    Usually, a public/dist folder's role is to hold the resulting bundle and the \[web] server would just read from said folder. 

* multiple js scripts based on what they do -- not all of them are routes:
  * routing
  * list
  * faves
* most of the good sites with fancy data is protected by OAuth or apiKey.  I have to pick a public API with a real public offering, so please do not abuse their generous offer.  

    Since the `shibe-inspector` only has client-side code, it would be a really unsecure (note: *really* bad) move to keep apiKeys or OAuth creds in the code base.  Keeping keys is the server's domain.
* No unit tests on templating. 
    
    Frameworks(woot~! react/mithril JSX) usually have this portion behind them so you don't have to double test.  Also, UI library suites like Storybook tackle this portion better than any unit-test/e2e test can.  
    * so what should we unit test: list module, for sure, since it is a data domain; faves, and routing modules

* certainly we can add dehydration/ rehydration techniques on faves, but that's a problem for a later time.

* *"Halp! I can't unfave!"* How can you unlike these good boys?  Anyways, this isn't a big change as all the faves module needs is to get the imgName, *filter* it in its list and save it back.  The actual coding is left intentionally for the reader.  