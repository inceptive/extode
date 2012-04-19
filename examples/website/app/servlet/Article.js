/**
 * Synchronous article serving ;-)
 */
Ext.servlet({

    name: 'Article',

    init: function() {

        // Implement synchronous content delivery
        this.handle("GET", "/artikel/*", function(req, res) {

            var Article = Ext.getModel('Article'),
                header = Ext.Template.renderFile('Header.ejs', {
                    Request: req
                }),
                footer = Ext.Template.renderFile('Footer.ejs', {}),
                responseContent = "";

            articleTitle = req.params[0];

            responseContent = header + Ext.Template.renderFile('artikel/' + articleTitle + '.ejs', {}) + footer;

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(responseContent, "binary");
            res.end();

            delete responseContent, header, footer, articleTitle;
        });
    }
});