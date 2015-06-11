# icons
Icon set for Ozone

## Prerequisites
Install Node.js and npm. Head over to [the Node.js website](http://nodejs.org/) if you need to do that. Next, install Gulp, you might need to run them as sudo.
```
npm install -g gulp
```

## To generate CSS and sprites

```
git clone https://github.com/ozone-development/icons.git
cd icons
npm run build
```

CSS and SVG Sprite is saved in `dist` directory along with an example HTML file.

## Error: spawn EMFILE

You might need to do `ulimit -n 10240` to increase the amount of files that are allowed open at once.