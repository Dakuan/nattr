/**x
 * @jsx React.DOM
 */

var React = require('react'),    
    app = document.getElementById('app'),
    Fluxxor = require('fluxxor'),
    UpdateStore = require('../stores/update-store'),
    Nattr = require('../ui/app');

window.React = require('react'); 

// Fire up flux
var flux = new Fluxxor.Flux({
    updateStore: new UpdateStore()
}, require('../actions/actions'));

// Sockets
var socket = require('./sockets/update-socket')();

socket.on('chat message', flux.actions.addUpdate);
socket.on('tweet', flux.actions.addUpdate);

React.renderComponent(<Nattr flux={flux} /> , app);
