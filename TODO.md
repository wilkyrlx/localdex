# TODO

## General
- [ ] Limit the amount of fetch requests for the list of contacts
    - one idea would be to cache changes and make requests every few minutes, saving changes locally
    - could limit to ~100 contacts returned, more if the user scrolls far enough
    - could also limit to ~100 contacts returned, and have a search bar to find contacts
- [x] Implement one contact manager, so data can be accessed for contacts page, map, and home without being requested multiple times

## Frontend
- [ ] ~~delete contact button must be enabled before visible, also change hover color and cursor~~
- [ ] map view with mapbox.gl
- [x] deduplicate contacts with side by side comparison, field selection, and merge button
- [ ] landing page should be the about page - provide background on the project, how to use it. Also, load a dummy dataset with relationships, fields etc. to demo how localdex can be used
- [ ] The CLI idea would be really cool. It could expand out of the bottom left corner.
- [ ] Select which collection (i.e. demo, main, business/social)

## Backend
- [ ] deduplicate contacts

## Long term goals
- [ ] linkedin integration - chrome extension?
- [ ] facebook, instagram, snapchat integration - api?
- [ ] twitter integration
- data and analytics 