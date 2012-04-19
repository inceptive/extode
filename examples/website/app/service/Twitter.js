/**
 * Define an service and it's event handlers
 */
Ext.service({


    // Start controller
    name: 'Twitter',


    /**
     * Gets called on controller init
     */
    init: function() {
          var me = this,
              twitter = new(require("twitter-node").TwitterNode)({

              user: 'krymel',
              password: 'Borlan7',
              track: ['munichnug']
          });


            twitter.headers['User-Agent'] = 'node.js-thingy';

            twitter.addListener('error', function(error) {
              warn(error.message);
            });

          //Set up the tweet stream
          twitter.addListener('tweet', function(tweet) {
               me.emit("tweet", tweet);
          });
          twitter.stream();
    }
});