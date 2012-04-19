/**
 * Define an model and it's schema.
 * The schema is a mongoose schema, you can adapt it's configuration style.
 * @see https://github.com/LearnBoost/mongoose
 * but take care: The types are STRINGS here. Extode automatically resolves
 * the object references for you.
 */
Ext.model({

    // Name of the model
    name: 'Article',

    schema: {
        author: 'String',
        title: 'String',
        content: 'String',
        postDate: 'Date',
        keywords: 'Array'
    },


    pre: {

        /**
         * Index article for fulltext search
         * @param {Function} next Reference for the next hop
         * @return void
         */
        save: function(next) {

            var extractKeywords = function(text) {
                if (!text) return [];

                return text.split(/\s+/).
                    filter(function(v) { return v.length > 2; }).
                    filter(function(v, i, a) { return a.lastIndexOf(v) === i; });
            };
            this.keywords = extractKeywords(this.content);
            next();
        }
    }
});