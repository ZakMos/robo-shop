# The Tutorial Changelog

This changelog is ordered in reverse chronological order, meaning that the last changes made will always be on top of the file, so that readers will not have to scroll all the way down with each change.

## Stage 0: Boilerplate

This branch contains a boilerplate for almost every express server you are going to create, as long as you are using mongodb for your DB. This boilerplate consists of:

- Files create by `express-generator`, slightly modified and modernised. See list below.
- An environment config file in [`config/environment.js`](config/environment.js) to hold our environment specific configurations.
- A [`now.json`](now.json) file to configure various envrionment variables for deployment.

### Changes made to `express-generator` files:

- `routes/index.js` and `routes/users.js` have been updated to use `const`
- `app.js` was also updated to use `const`. In addition, Comments were added to seperate the file to smaller more easily readable chunks. Also, the mongodb connection is already made at the top of the file.
