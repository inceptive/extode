/**
 * Define an service and it's event handlers 
 */ 
Ext.service({


    // Start controller
    name: 'Reply',

    
    /**
     * Gets called on controller init
     */         
    init: function() {
    
        log("Start controller init.");
        
        // Register a topic to handle
        this.handle({
            sendmessage: this.onSendMessage
        });
    },
    
    
    /**
     * Gets called when the frontend emits a message
     * with the given topic
     *
     * @param {String} payload Payload sent by the frontend
     * @return void
     */
    onSendMessage: function(payload) {
    
        // Reply the received message with the
        // same topic name
        this.emit('sendmessage', {
            message: payload.message + ' :-)'
        });
    }
});