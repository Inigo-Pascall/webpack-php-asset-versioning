# Webpack Asset Versioning - Inigo Pascall

*A simple Webpack plugin to produce a php class with the timestamp of each build; used to 'version' your asset files for cache-busting*

## Usage

### Install : 
```js
npm install --save-dev webpack-asset-versioning
```

## Configure webpack.config.js

### Import:

```js
const AssetVersioning = require('webpack-php-asset-versioning');
```

### Configure plugin:

```js
    plugins: [
		// ...
        new AssetVersioning({
            // options
        })
    ]
```

## Set options:

- **file_name** *the full path of the outputted php file*
- **class_name** *the name of the php class*

| Key        | Determines                                | Default                |
| ---------- | ----------------------------------------- | ---------------------- |
| file_name  | *the full path of the outputted php file* | `./assets.version.php` |
| class_name | *the name of the php class*               | `AssetsVersion`        |

### eg:

```js
    plugins: [
        new AssetVersioning({
            file_name: '../assets.version.php',
            class_name: 'BuildDate'
        })
    ]
```

### Produces

`assets.version.php` :

```php
<?php

class BuildDate {
	public $current = 1562363854500;
}
```



------

## Include in your php app

```php
include_once 'assets.version.php';
$assets_version = (new \AssetsVersion())->current;
```

### Laravel
*(I prefer to use a custom Webpack configuration rather than Laravel Mix. Thus I can include this in my app by loading within `AppServiceProvider.php`):*

```php
    public function boot()
    {
        include_once base_path() . '/assets.version.php';
        $assets_version = (new \AssetsVersion())->current;
        View::share('assets_version', $assets_version);
    }
```

