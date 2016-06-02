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

# OR

$ node build
```

### Deploy to gh-pages

```bash
# npm script
$ npm run deploy     // Deploys to gh-pages!
```
