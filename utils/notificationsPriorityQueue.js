const mongoose = require('mongoose');
const Notification = require('../models/Notification');

class PriorityQueue{
    constructor(){
        this.values = [];
    }

    enqueue(node,priority){
        var flag = false;
        for (let i = 0; i < this.values.length; i++) {
            if (this.values[i].priority> priority) {
                this.values.splice(i,0,{node,priority});
                flag = true;
                break;
            }
        }
        if (!flag) {
            this.values.push({node,priority});
        }
    }

    dequeue()
    {
        return this.values.shift();
    }

    size()
    {
        return this.values.length;
    }
}

const notificationQueue  = new PriorityQueue();

async function addNotificationToQueue(userId, type, message,priority) {

    const notification = new Notification({ userId, type, message });
    notificationQueue.enqueue(notification,priority);

}

async function  proccessNotifications() {
    while (notificationQueue.size() > 0) {
        const {node: notification} = notificationQueue.dequeue();
        await notification.save();
        console.log('Notification saved: ${notification.message}');
    }
}

module.exports = {addNotificationToQueue,proccessNotifications}