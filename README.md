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

!["Sign Up"](https://thumbs.gfycat.com/PalatableImportantImperialeagle-size_restricted.gif?raw=true)

-   Profile page
    -   Drag and Drop photo upload to AWS
    -   Google map of geolocation and distance matrix circle

!["Profile Page"](https://thumbs.gfycat.com/WillingWetEmperorpenguin-size_restricted.gif?raw=true)

-   Browse page with filters for: location, cuisine, availability
-   Payments
-   Direct messaging between users

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
nodemon ./bin/www
```

## Screenshots

ttps://github.com/hatchways/team-corn-pops/blob/sagar/signup-and-login/README_IMAGES/sign-in.png?raw=true)

### Sign In / Sign Up

!["Sign Up"](https://thumbs.gfycat.com/PalatableImportantImperialeagle-size_restricted.gif?raw=true)

### User Profile

!["User Profile"](https://github.com/hatchways/team-corn-pops/blob/sagar/signup-and-login/README_IMAGES/regular-user-profile.png?raw=true)

### Chef Profile

!["Chef Profile"](https://github.com/hatchways/team-corn-pops/blob/sagar/signup-and-login/README_IMAGES/chef-profile.png?raw=true)

### Messaging

!["Messaging"](https://github.com/hatchways/team-corn-pops/blob/sagar/signup-and-login/README_IMAGES/messages.png?raw=true)

### Checkout

!["Checkout"](https://github.com/hatchways/team-corn-pops/blob/sagar/signup-and-login/README_IMAGES/checkout.png?raw=true)

### Browse Chefs

!["Browse Chefs"](https://github.com/hatchways/team-corn-pops/blob/sagar/signup-and-login/README_IMAGES/browse-chefs.png?raw=true)

### Browse Meals

!["Browse Meals"](https://github.com/hatchways/team-corn-pops/blob/sagar/signup-and-login/README_IMAGES/browse-meals.png?raw=true)
