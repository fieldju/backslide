const Lang = imports.lang;
const MessageTray = imports.ui.messageTray;
const St = imports.gi.St;
const Main = imports.ui.main;

/**
 * A simple to use class for showing notifications.
 * @type {Lang.Class}
 */
const Notification = new Lang.Class({
    Name: "Notification",

    _source: {},

    _init: function(){
        this._source = new SimpleSource("BackSlide", "dialog-error");
    },

    /**
     * Issue a simple notification.
     * @param title the notification-title
     * @param banner_text the text for the banner
     * @param body the body-text (larger).
     */
    notify: function(title, banner_text, body){
        Main.messageTray.add(this._source);
        let notification = new MessageTray.Notification(this._source, title, banner_text,
            {
                body: body,
                bodyMarkup: true
            }
        );
        notification.setTransient(true);
        this._source.notify(notification);
    }
});

/**
 * A simple source-implementation for notifying new Notifications.
 * @type {Lang.Class}
 */
const SimpleSource = new Lang.Class({
    Name: "SimpleSource",
    Extends: MessageTray.Source,

    /**
     * Create a new simple source for notifications.
     * @param title the title
     * @param icon_name the image to show with the notifications.
     * @private
     */
    _init: function(title, icon_name){
        this.parent(title, icon_name);
        this._icon_name = icon_name;
        this.setTransient(true);
    },

    createNotificationIcon: function() {
        let iconBox = new St.Icon({
            icon_name: this._icon_name,
            icon_size: 48
        });
        if (St.IconType !== undefined){
            iconBox.icon_type = St.IconType.FULLCOLOR; // Backwards compatibility with 3.4
        }
        return iconBox;
    },

    open: function() {
        this.destroy();
    }
});