(function (window) {
	'use strict';

	/**
	 * Creates a new instance of WordModel.
	 * @constructor
	 * @param {string} word A reference to the client side storage class
	 */
	function Model(data) {

        // I use null value for property which doesn't have a default value
        this.id = null;
        this.word = "";
        this.definitions = [];
        this.phrases = [];
        this.audios = [];
        this.examples = []
        this.set(data);
	}

    Model.prototype.set = function (data) {
        for (var property in data) {
            // check if both data has this proprty as its own and if the type of both are the same
            // just to make sure no wrong input type is set
            if (data.hasOwnProperty(property) && (this[property] === null || (typeof this[property] === typeof data[property]))) {
                this[property] = data[property];
            }
        }
    };

    Model.prototype.get = function(propertyName) {
        return this[propertyName];
    };

	/**
	 * Creates a new instance WordCollection.
	 * @constructor
	 * @param {string} word A reference to the client side storage class
	 */
	function Collection(arrayOfData) {
        this.models = [];
        this.lastId = 0;

        arrayOfData = arrayOfData || [];
        for (var data of arrayOfData) {
            this.add(new Model(data));
        }
	}

    Collection.prototype.add = function (model) {
        this.lastId += 1;
        model.set({ id: this.lastId });
        this.models.push(model);
    };

    Collection.prototype.count = function() {
        return this.models.length;
    };

	// Export to window
	window.app = window.app || {};
    window.app.WordCollection = Collection;
	window.app.WordModel = Model;
})(window);
