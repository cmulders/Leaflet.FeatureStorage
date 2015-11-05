Leaflet.FeatureStorage
==========
## Description
Leaflet.FeatureStorage is a simple plugin that loads and stores (geo)json.
As an utility, ```L.fs.myjson()``` could be used out of the box for json storage, by using [myjson](http://myjson.com)

## Requirements
- Leaflet

## Compatibility
Requires XHR support of the browser

## Usage
```js
//Using myjson api, simple GET and POST requests
var jsonStorage = L.featurestorage.json({
    exportUrl: 'https://api.myjson.com/bins', 
    importUrl: 'https://api.myjson.com/bins/{id}' 
});
// or 
var jsonStorage = L.fs.myjson();

var layer = L.rectangle([[54.559322, -5.767822], [56.1210604, -3.021240]]);

var jsonID;
jsonStorage.save(layer, function (id){
    jsonID = id
});


//Eg in another session
var newLayer = L.geojson();
jsonStorage.load(jsonID, function (geoJSON){
    newLayer.addData(geoJSON);
});


// newLayer will now have the rectangle as sublayer
```


## API
This plugin creates the L.FeatureStorage (= L.FS) namespace for the objects and L.featurestorage (= L.fs) for the factory methods.

### Creation
Factory                            | Description
---------------------------------- | --- 
L.featurestorage.json( *options* ) | Creates the instance, requires to set export- and importUrl options

#### Options
The regular L.Control options can be used and additionally:

Option         | Type           | Default      | Description
-------------- | -------------- | ------------ | ---
exportUrl      | String         | `undefined`  | Url used to POST json data
importUrl      | String         | `undefined`  | Url used to GET json data, {id} will be replaced by the json id provided in the load function



#### Methods
The regular L.Control methods can be used and additionally:

Method                  | Returns   | Description
----------------------- | --------- | ---
save(layer, callback)   | none      | Calls the callback with the id that could be used to recall the data
load(jsonID, callback)  | none      | Uses the ID returned by the save function to recall the data, callback will contain the json as parameter


## License
This software is released under the [MIT licence](http://www.opensource.org/licenses/mit-license.php).