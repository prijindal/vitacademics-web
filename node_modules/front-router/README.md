# Front Router

Front Router simplifies the creation of routes in AngularJS by allowing you to define them directly in your view templates.

State settings are defined in a [Front Matter](http://jekyllrb.com/docs/frontmatter/) block at the top of each template.

```html
---
name: post
url: /post/:id
controller: PostController
---

<h1>Post</h1>
```

Front Router parses each file, removing the Front Matter from the HTML and storing it in a JavaScript object of states. This object is saved as a new JavaScript file, which can be read by another library and converted into actual routes.

This library was developed for use with [Foundation for Apps](http://foundation.zurb.com/apps/), a responsive web app framework from [ZURB](http://zurb.com/), to simplify the process of prototyping single-page web apps.

## Usage

Front Router is a Gulp plugin that takes in HTML files, removes the Front Matter, and returns the modified file. When the stream ends, the route data is written to disk as a new file.

```js
var gulp = require('gulp');
var router = require('front-router');

gulp.src('./src/templates/**/*.html')
  .pipe(router({
    path: './build/js/routes.js',
    root: './src/templates/'
  }))
  .pipe(gulp.dest('./build/templates'));
```

The Front Router function accepts two parameters:

  - **path** (String): filename to write the routes to.
  - **root** (String): root folder of the templates.
