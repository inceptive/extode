/**
 * @class Ext.Servlet
 * 
 * Class that provides standard dispatcher methods
 * for HTTP operations. Can deliver any static file content
 * and also render EJS (embedded js) templates as HTML and JSON.
 */
Ext.define('Ext.Servlet', {

    singleton: true,
    
    
    /**
     * @var {String} indexFile Name of the index file
     */
    indexFile: "index.ejs",
    
    
    /**
     * Method to dispatch static file requests
     * @param {Object} req Request object
     * @param {object} res Response object
     * @return void
     */
    dispatchStaticFiles: function(req, res) {
    
        var me = this, fs = global.App.fs,
            rootDir = global.App.getWebFolderPath(),
            reqPath = req.params[0], 
            targetFile = "";
        
        // If no path given, use index file
        if (reqPath.length === 0) {
            reqPath = Ext.Servlet.indexFile;
        }
        
        // Determine target file
        targetFile = Ext.appDirPath + "/" + rootDir + "/" + reqPath;

        log("TARGET: "  + targetFile);

        // Dispatch file dispatching
        fs.stat(targetFile, function(err, stats) {
        
            if (err) {
                if (err.code === 'ENOENT') {
                    Ext.Servlet.on404(req, res);
                } else {
                    Ext.Servlet.on500(req, res);
                }
            } else {
                Ext.Servlet.deliverFile(req, res, targetFile, fs);
            }
        });

        // Free memory
        delete rootDir, reqPath, targetFile;
    },
    
    
    /**
     * Impl whats todo on error 404 (not found)
     * @param {Object} req Request object
     * @param {object} res Response object
     * @return void
     */
    on404: function(req, res) {
        res.send(404);
    },
    
    
    /**
     * Impl whats todo on error 500 (internal server error)
     * @param {Object} req Request object
     * @param {object} res Response object
     * @return void
     */
    on500: function(req, res) {
        res.send(500);
    },
    
    
    /**
     * Delivers a file requested via HTTP/GET
     *
     * @param {Object} req Request object
     * @param {object} res Response object
     * @param {String} filePath Path of file to deliver
     * @param {Object} fs Filesystem module reference
     * @return void
     */
    deliverFile: function(req, res, filePath, fs) {
    
        var contentType = global.App.mime.lookup(filePath),
            fileNameEnding = filePath.split('.'),
            fileNameEnding = fileNameEnding[fileNameEnding.length-1],
            data = fs.readFileSync(filePath, "binary"),
            httpStatus = 200;
            
        // EJS html/json files need to be processed by ejs
        if (fileNameEnding === "ejs" || fileNameEnding === "ejson") {
        
            // Set content type explicitly
            contentType = 'text/html';
            
            // Render the EJS template
            try {
                data = Ext.Template.render(data, {
                    App: global.App,
                    Request: req,
                    Response: res,
                    Ext: Ext
                });
            } catch(e) {

                // In case of any error, emit an internal server error
                httpStatus = 500;
                data = "Template error: " + e.message;
            }
            
            if (fileNameEnding === "ejson") {
                contentType = "application/json";
            }
        }
                
        // Synchronous deliver the content
        res.writeHead(httpStatus, {'Content-Type': contentType});
        res.write(data, "binary");
        res.end();

        // Free memory
        delete contentType, data, fileNameEnding, httpStatus;
    }
});