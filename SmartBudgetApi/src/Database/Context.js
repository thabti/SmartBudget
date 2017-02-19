import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

mongoose.Promise = Promise;
/* eslint-disable */
// import { config } from '../common/config';
// 'mongo <scheme_name> --eval "db.dropDatabase()"'
// mongoimport --db <scheme_name> --collection <collection_name>  --type json --file <path_to_json_file> --jsonArray
// collection_name: plural
/* eslint-enable */

function addScheme(context, connection, schemeName, scheme) {
    const SchemeDefinition = Object.assign({}, scheme);
    const { $statics, $virtual, $methods, $pre, $post } = SchemeDefinition;
    /* eslint-disable */
    delete SchemeDefinition['$statics'];
    delete SchemeDefinition['$virtual'];
    delete SchemeDefinition['$methods'];
    delete SchemeDefinition['$pre'];
    delete SchemeDefinition['$post'];
    const Scheme = mongoose.Schema(SchemeDefinition);
    let Model;
    /* eslint-enable */
    function $parse(json) {
        return new Model(json);
    }

    function $search(terms) {
        const answer = new Promise((resolve, reject) => {
            Model.search({ query: terms }, (err, results) => {
                // res.render("esearch", { terms:terms, books:results.hits.hits })
                if (err) {
                    reject([err, results]);
                } else {
                    resolve(results);
                }
            });
        });
        return answer;
    }

    Object.keys($statics || {}).forEach((itemName) => {
        Scheme.statics[itemName] = $statics[itemName];
    });

    Object.keys($virtual || {}).forEach((itemName) => {
        Scheme.virtual(itemName).get($virtual[itemName]);
    });

    Object.keys($methods || {}).forEach((itemName) => {
        Scheme.methods[itemName] = $methods[itemName];
    });

    Object.keys($pre || {}).forEach((itemName) => {
        Scheme.pre(itemName, $pre[itemName]);
    });

    Object.keys($post || {}).forEach((itemName) => {
        Scheme.post(itemName, $post[itemName]);
    });

    // creating a new entry
    Scheme.statics.$parse = $parse;
    // elastic search here
    Scheme.statics.$search = $search;

    Scheme.plugin(mongoosastic, connection);
    Model = mongoose.model(schemeName, Scheme);
    /* eslint-disable */
    context[schemeName] = Model;
    /* eslint-enable */
}

function loadSchemes(context, connection, schemes) {
    Object.keys(schemes)
        .forEach((schemeName) => {
            const SchemeDefinition = schemes[schemeName];
            addScheme(context, connection, schemeName, SchemeDefinition);
        });
}

/**
 * Class that manages the mongodb context for different documents mapped.
 */
class Context {
    /**
     * @param {config} - represents an object that contains as properties uri and schemes
     */
    constructor({ uri, schemes }) {
        this.connection = mongoose.connect(uri);
        loadSchemes(this, this.connection, schemes);
    }

    /**
     * Add one scheme and turn it accessible by schemeName in context
     * @param schemeName {string} - represents the name accessor for the
     * scheme provided
     * @param scheme {object} - represents a json object with all required
     * document specification
     * @returns {object} - represents the same context instance providing
     * cascade actions
     */
    addScheme(schemeName, scheme) {
        addScheme(this, this.connection, schemeName, scheme);
        return this;
    }

    /**
     * Add a group of schemes and turn it accessible by its key in schemes
     * @param schemes {object} - represents a json object containing the key
     * and scheme specification related
     * @returns {object} - represents the same context instance providing
     * cascade actions
     */
    addAllSchemes(schemes) {
        loadSchemes(this, this.connection, schemes);
        return this;
    }

    /**
     * Closes the connectino currently open
     * @param handler {function} - (err) => { ... }
     * @returns {object} - represents the same context instance providing
     * cascade actions
     */
    close(handler = (() => {})) {
        this.connection.disconnect(handler);
        return this;
    }
}

export default Context;
