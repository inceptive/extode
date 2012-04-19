/**
 * Define an service and it's event handlers 
 */ 
Ext.service({


    // Start controller
    name: 'ContentEditor',


    editorPassword: 'noditor',

    
    /**
     * Gets called on controller init
     */         
    init: function() {
        
        // Register a topic to handle
        this.handle({
            updatecontentlist: this.onUpdateContentList,
            getcontent: this.onGetContent,
            updatecontent: this.onUpdateContent,
            createcontent: this.onCreateContent,
            destroycontent: this.onDestroyContent,
            findcontent: this.onFindContent
        });
    },


    /**
     * Emits an error as stingified object
     * @param {Object} err Error object
     * @return void
     */
    _emitError: function(err) {
        this.emit('contenterror', {
            message: JSON.stringify(err)
        });
    },
    
    
    /**
     * Emits the current article content list
     * @return void
     */
    onUpdateContentList: function() {

        var me = this, articles = [], Article = Ext.getModel('Article');


        //log("ContentEditorService::onUpdateContentList", params);

        Article.find({}, function(err, docs) {

            if (!err) {

                // Reply the received message with the
                // same topic name
                me.emit('contentlist', {
                    articles: docs
                });

            } else {
                me._emitError(err);
            }
        });
    },


    /**
     * Emits the content of an requested article
     * @param {Object} params Request parameters object
     * @return void
     */
    onGetContent: function(params) {

        var me = this, Article = Ext.getModel('Article');

        //log("ContentEditorService::onGetContent", params);

        Article.find({_id: params.id}, function(err, docs) {
            if (!err) {
                me.emit('content', docs[0]);
            } else {
                me._emitError(err);
            }
        });
    },


    /**
     * Emits the content of an requested article
     * @param {Object} params Request parameters object
     * @return void
     */
    onFindContent: function(params) {

        var me = this, Article = Ext.getModel('Article');

        log("ContentEditorService::onFindContent", params);

        Article.find(params.filter, function(err, docs) {
            if (!err) {
                me.emit('contentfound', {

                    // Traverse meta data
                    meta: params.meta,

                    // Stream results
                    results: docs
                });
            } else {
                me._emitError(err);
            }
        });
    },


    /**
     * Updates the content and emits an error or update success
     * @param {Object} params Request parameters object
     * @return void
     */
    onUpdateContent: function(params) {

        var me = this, Article = Ext.getModel('Article');
        
        //log("ContentEditorService::onUpdateContent", params);

        if (params.password === this.editorPassword) {

            Article.update({_id: params.id}, {
                title: params.title,
                content: params.content,
                author: params.author
            }, function(err) {
                 if (!err) {
                    me.emit('contentupdated', {
                        message: 'Article updated.'
                    });
                } else {
                    me._emitError(err);
                }
            });
            
        } else {
            this.emit('contenterror', {
                message: 'Sorry, password is wrong. Content were not updated.'
            });
        }
    },


    /**
     * Creates the content and emits an error or create success
     * @param {Object} params Request parameters object
     * @return void
     */
    onCreateContent: function(params) {

        var me = this, Article = Ext.getModel('Article'),
            newArticle = null;
        
        //log("ContentEditorService::onCreateContent", params);

        if (params.password === this.editorPassword) {

            newArticle = new Article();
            newArticle.title = params.title;
            newArticle.content = params.content;
            newArticle.postDate = new Date();
            newArticle.author = params.author;
            newArticle.save(function(err, data) {

                if (!err) {
                    me.emit('contentcreated', {
                        id: data._id,
                        message: 'Article created.'
                    });
                } else {
                    me._emitError(err);
                }
            });

        } else {
            this.emit('contenterror', {
                message: 'Sorry, password is wrong. Content were not created.'
            });
        }
    },


    /**
     * Deletes the content and emits an error or destroy success
     * @param {Object} params Request parameters object
     * @return void
     */
    onDestroyContent: function(params) {

        var me = this, Article = Ext.getModel('Article');
        
        //log("ContentEditorService::onDestroyContent", params);

        if (params.password === this.editorPassword) {

            Article.remove({
                _id: params.id
            }, function(err) {
                
                if (!err) {
                    me.emit('contentdestroyed', {
                        message: 'Article destroyed.'
                    });
                } else {
                    me._emitError(err);
                }
            });
        } else {
            this.emit('contenterror', {
                message: 'Sorry, password is wrong. Content were not deleted.'
            });
        }
    }
});