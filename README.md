# The `robo-shop` Workshops

This repo hosts a series of workshops on creating a traditional server side application with express, mongoose, passport and handlebars. It is based on the great series of tutorials by [Acdemind](https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w) and can be viewed as a collection at [Progtube](https://prog.tube/nodejs-shopping-cart/video/new-laravel-nodejs-project-shopping-cart). Since the original series was published in 2016, I changed a few things to update the code a bit. but don't worry, you can still follow along their version even if a few things might be different.

## The way it works

This repo has several branches with several stages of the development of the final app. For each stage, a list of changes will be added to the [`CHANGELOG.md`](CHANGELOG.md) file, to explain the changes made.

If you need a reminder on how this app changed through each of the workshops, simply checkout the branch for the phase you are interested in, and read the changelog.

In addition, branches with the prefix `task/` describe the task that needs to be achieved in that change. The tasks are all listed in the [`TASKS.md`](TASKS.md) file. If you want to start doing things yourself, simply checkout the task branch and make the change. To begin from the start, checkout the `task/01-db-models-and-seeding` branch.

## Using `master` as a boilerplate

In case you want to use the master branch of this repo as a boilerplate for your web app, don't forget to make the following changes:

1. Delete `yarn.lock` and the `.git` folder
2. In `package.json` change the name of the app in th following fields: `name`, `scripts.watch` and `scripts.debug`
3. In `now.json` change the name of the app in the following fields: `env.MONGO_URL` and `env.AUTH_TOKEN`
4. Run `yarn install` in the terminal
5. Start devloping, and have fun!
