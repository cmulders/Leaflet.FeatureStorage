L.FeatureStorage = L.FS = L.FeatureStorage || {};
L.FeatureStorage.JSON = L.Class.extend({
	options: {
		exportUrl: undefined,
		importUrl: undefined
	},

	initialize: function (options) {
		L.setOptions(this, options);

		if (!this.options.exportUrl || !this.options.importUrl) {
			throw new Error('No url set to acces JSON storage');
		}
	},

	load: function (jsonid, onSucces, onError) {
		if (jsonid === '' || jsonid === true || jsonid === false) {
			return false;
		}

		var xmlhttp = new XMLHttpRequest(),
		importUrl = L.Util.template(this.options.importUrl, {id: jsonid});

		xmlhttp.open('GET', importUrl, true);

		// status 200, parse geoJson
		L.DomEvent.on(xmlhttp, 'readystatechange', function () {
			if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
				onSucces(JSON.parse(xmlhttp.responseText));
			} else if (xmlhttp.readyState === 4) {
				onError(xmlhttp);
			}
		}, this);

		xmlhttp.send();
	},

	save: function (layer, onSucces, onError) {
		if (!layer || !layer.toGeoJSON) {
			onSucces(false);
			return;
		}
		var geojson = layer.toGeoJSON();
		if (geojson.features.length === 0) {
			onSucces(false);
			return;
		}

		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open('POST', this.options.exportUrl, true);
		xmlhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		// status 201, parse .uri
		L.DomEvent.on(xmlhttp, 'readystatechange', function () {
			if (xmlhttp.readyState === 4  && xmlhttp.status === 201) {
				var url = JSON.parse(xmlhttp.responseText).uri;
				var storageID = url.split('/').slice(-1)[0];
				onSucces(storageID);
			} else if (xmlhttp.readyState === 4) {
				onError(xmlhttp);
			}
		}, this);

		xmlhttp.send(JSON.stringify(geojson));
	}
});

L.featurestorage = L.fs = L.featurestorage || {};
L.fs.json = function (options) {
	return new L.FS.JSON(options);
};

L.FS.Myjson = L.FS.JSON.extend({
	options: {
		exportUrl: 'https://api.myjson.com/bins',
		importUrl: 'https://api.myjson.com/bins/{id}'
	}
});

L.fs.myjson = function (options) {
	return new L.FS.Myjson(options);
};
