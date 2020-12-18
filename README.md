# Chef's Menu :man_cook:

-   Live App: https://chefsmenu1.herokuapp.com/

It’s always nice to have a homecooked meal that is authentic and made in your own kitchen!
This is a marketplace where you can book a chef in your area based on cuisine type and
availability! Users will use this either for big events they host or small intimate family dinners
when they want to try out a new cuisine.

> Who’s it for?
> Chefs and _food lovers!_

!["App Demo"](https://thumbs.gfycat.com/PinkScratchyArabianoryx-size_restricted.gif?raw=true)

## Tech Stack

-   React.js
-   Material UI
-   MongoDB
-   Google Maps API
-   Stripe
-   AWS - for image storage

## Features

-   Login / Sign up flow with auto predict address

!["Sign Up"](https://thumbs.gfycat.com/ImperfectEnchantedAfghanhound-size_restricted.gif?raw=true)

-   Profile page
    -   Drag and Drop photo upload to AWS
    -   Google map of geolocation and distance matrix circle

!["Profile Page"](https://thumbs.gfycat.com/WillingWetEmperorpenguin-size_restricted.gif?raw=true)

-   Browse Meals with filters: location,

    -   Cuisine Type Filter

        !["Cuisine Search"](https://thumbs.gfycat.com/SafeInformalFlyinglemur-size_restricted.gif?raw=true)

    -   Chef's Location Filter

        !["Chef Search"](https://thumbs.gfycat.com/ClumsyComfortableAyeaye-size_restricted.gif?raw=true)

-   Cart and Payment

    -   Integrated Stripe Checkout
    -   Cart context utilizing local storage

        !["Checkout Process"](https://thumbs.gfycat.com/AmazingDazzlingBarb-size_restricted.gif?raw=true)

## Running the project locally

### Front-End

```sh
cd client
npm install
npm run start
```

### Server

```sh
cd server
npm install
npm run dev
```
