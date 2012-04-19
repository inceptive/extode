/**
 * Implements a service to deliver partial content asynchronously.
 * This service will be activated by default and is the server-side
 * part of the Ext.Template.renderPartial() rendering feature.
 */
Ext.define('Ext.service.Partial', {

    extend: 'Ext.app.Service',

    name: 'Partial',

    statics: {

        /**
         * Returns the JavaScript code to support socket.io and
         * partial async rendering in the webbrowser.
         * @return {String}
         */
        getPartialWebSupportScript: function() {

            return Ext.String.format(
                "Extode.partialExecs = [];" +
                "Extode.hasRegisteredPartialRenderer = false;" +
                "Extode.addPartialExec = function(fn) {" +
                "    if (!Extode.hasRegisteredPartialRenderer) {" +
                "        Extode.registerPartialRenderer();" +
                "    }" +
                "    fn();" +
                "};" +

                "Extode.registerPartialRenderer = function() {" +
                "    Extode.hasRegisteredPartialRenderer = true;" +
                "    Extode.socket.on('partial', function(partial) {" +
                "        var targetEl = document.getElementById(partial.domId);" +
                "        if (typeof targetEl != 'undefined' && targetEl !== null) {" +
                "            targetEl.innerHTML = partial.html;" +
                "        }" +
                "    });" +
                "}"
            );
        }
    },
    

    /**
     * Gets called on controller init
     */
    init: function() {

        Ext.debug("Start Partial service");

        // Register a topic to handle
        this.handle({
            getpartial: this.onGetPartial
        });
    },


    /**
     * Gets called when the frontend emits a message
     * with the given topic
     *
     * @param {Object} payload Payload sent by the frontend
     * @return void
     */
    onGetPartial: function(partialInfo) {

        this.emit('partial', {
            domId: partialInfo.domId,
            options: partialInfo.options,
            html: 'Should deliver partial with path: ' + partialInfo.filename + ' :-) and info: ' + JSON.stringify(partialInfo.vars)
        });
    }
});