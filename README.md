#bnb.im
## A static personal website powered by [Metalsmith](metalsmith.io)

My personal site. Based off my Metalsmith Boilerplate project, [metalsmith-barebones](https://github.com/bnb/metalsmith-barebones).

## Build/Deploy

### Build
Compiles site from src, layouts, partials, and assets:
Install dependencies...

```bash
$ cd /path/to/bnb.im
$ npm install
```

then, build the site...


```bash
$ npm run build # same as `node build`, I just like npm scripts.
```

### Deploy to gh-pages

#### Switch to gh-pages branch

```bash
# npm script
$ npm run pages

# OR

# Git
$ git checkout gh-pages
```

#### Copy all files from build folder

> This is the **only** bash-reliant command in this repo.

The build folder is ignored by .gitignore, so it's present in all branches.

```bash
# npm script
$ npm run copy

# OR

# Bash
$ cp -r ./build/. .
```
#### Check the status of the branch

Check the status of the branch, to see if you need to add files, commit, or push.

```bash
# npm script
$ npm run status

# OR

# Git
$ git status
```

#### Add files, if the status check says it's needed

If there are files that need to be added (as shown by the output of the status command)...


##### Add all files

Use if you are entirely sure all files reported as un-added by the `status` check should be published to your gh-pages.

```bash

# npm script
$ npm run add-all

# OR

# Git
$ git add -A
```
##### Add some files

If there are some files you want to add, but not others, you can add them via the npm script `add` with an arguments flag, `--`, and `git add` flags/input. I.e. `npm run add -- "-a -m 'Adding files! YAAAAAY!'"`.

```bash
# npm script
$ npm run add -- "" # Your `git add` arguments in the quotes

# OR

# Git
$ git add # plus whatever git addd arguments you want to use
```
#### Commit files

Use to commit your file changes to the gh-pages branch.

```bash
# npm script
$ npm run commit -- "" # Commit message in quotes

# OR

# Git
$ git commit -a -m "" # Commit message in quotes
```
#### Push and return to `master` branch

You can push and return to master with one command.
```bash
# npm script
$ npm run deploy

# OR

# Git
$ git push && git checkout master
```

##### Push

Push to `gh-pages` branch without returning to `master` branch.

```bash
# npm script
$ npm run push

# OR

# Git
$ git push
```

##### Return

Return (`checkout`) to the master branch.

```bash
# npm script
$ npm run return

# OR

# Git
$ git checkout master
```
