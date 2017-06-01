var  EventsManager = {

    _eventListeners : {},
    events : {
    },

    addListener : function(eventName, callbackFunction,uniqIdentifier){

        try {
            if(!this._eventListeners) this._eventListeners = {};
            if(!this._eventListeners[eventName]) this._eventListeners[eventName] = [];

            for(var i=0; i<this._eventListeners[eventName].length; i++)
                if(this._eventListeners[eventName][i][1] === uniqIdentifier) {
                    this.removeListener(eventName, uniqIdentifier);
                }
                this._eventListeners[eventName].push([callbackFunction, uniqIdentifier]);
            }
        catch(exception){
            console.log("exception in adding listener");
        }
    },

   removeListener : function(eventName, uniqIdentifier){
        if(!this._eventListeners[eventName]) return;

        for(var i=0; i<this._eventListeners[eventName].length; i++) {
            try {
             if(this._eventListeners[eventName][i][1]===uniqIdentifier) {
                 this._eventListeners[eventName].splice(i,1);
                 return;
             }
            }
            catch(exception){
                    this._eventListeners[eventName].splice(i,1);
            }
        }
    },
    removeAllListenersForEvent : function(eventName) {

        if(!this._eventListeners[eventName]) return;

        for(var i=0; i<this._eventListeners[eventName].length; i++) {
            this._eventListeners[eventName].splice(i,1);
        }

    },

    removeAllListeners : function(){
        this._eventListeners = {};
    },

    dispatchEvent : function(eventName, eventObject){
        var listeners = this._eventListeners[eventName];
        if(listeners) {
            //create a local copy, before the array is modified in any of the listener methods.

            listeners = listeners.slice();
            for(var i=0; i<listeners.length; i++) {
                try {
                    listeners[i][0].apply(window, [eventObject]);
                }catch(e) {
                //ignore handler errors for now, to make sure remaining handlers are called properly.
                }
            }
        }
    }
};
module.exports = EventsManager;
