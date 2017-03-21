var header = require('../templates/signUp/template');
 
var pageEl = document.getElementById('header');
header.renderSync({ name:'Marko' }).appendTo(pageEl);