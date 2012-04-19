/**
 * @classs Ext.Template
 * @singleton
 *
 * Templating wrapper for EJS.
 */
Ext.define('Ext.Template', {

    singleton: true,


    /**
     * Renders an EJS markup given
     *
     * @param {String} data Markup to render
     * @param {Object} vars Local variables to expose to the template (Optional)
     * @param {String} filename Name of the file/path of the template (Optional)
     * @retrun {String} Rendered markup
     */
    render: function(data, vars, filename) {

        return global.App.ejs.render(data || "", {
            locals: vars || {},
            open: '<ejs>',
            close: '</ejs>',
            filename: filename || "",
            scope: global
        });
    },


    /**
     * Renders an EJS file from the web folder path
     *
     * @param {String} filename Name of the file/path to render
     * @param {Object} vars Local variables to expose to the template (Optional)
     * @retrun {String} Rendered markup
     */
    renderFile: function(filename, vars) {

        var fs = global.App.fs,
            data = "", fileStat,
            filename = global.App.getWebFolderPath() + "/" + filename;

        fileStat = fs.statSync(filename);

        if (fileStat.isFile()) {
            return Ext.Template.render(fs.readFileSync(filename, "binary"), vars || {});
        } else {
           Ext.warn("[Ext.Template] File to render is not a file or not existing: " + filename);
           return "";
        }
    },


    /**
     * This method is asynchronous!
     *
     * Renders a specific template as a partial in a asynchronous way
     * (Webbrowser requests a partial over a websocket via JavaScript _after_
     * the whole HTML template was loaded by the webbrowser via GET)
     * This is good for loading things like portlets, content areas or
     * even load-intense templates which produce load on the server.
     * Single requets can be better balanced than one big request.
     *
     * @param {String} domId ID of the DOM element to be filled with the replacing content
     * @param {String} filename Name/path of the template to render
     * @param {Object} options Allows to set options to specify like delay etc.
     *                 <pre><code>
     *                     {delay: 500} // Load content at point in time domReady + 500ms
     *                 </code></pre>
     * @param {Object} vars Local variables to expose to the template for rendering
     * @return {String} HTML string to pass to the root template that shall trigger the async partial rendering
     */
    renderPartial: function(domId, filename, options, vars) {

        return "<script type='text/javascript'>" +
            "Extode.addPartialExec(function() {" +
                "if (typeof Extode == 'undefined' || Extode.socket == 'undefined') {" +
                    "throw 'Extode.socket needs to initialized in <head>. Just insert the code: <%- Extode.renderInitHeadScripts() %> there!';" +
                "} else {" +
                    "Extode.socket.emit('getpartial', {" +
                        "domId: '" + domId + "'," +
                        "filename: '" + filename + "'," +
                        "options: " + JSON.stringify(options) + "," +
                        "vars: " + JSON.stringify(vars) +
                    "});" +
                "}" +
            "});" +
        "</script>"
    }
});