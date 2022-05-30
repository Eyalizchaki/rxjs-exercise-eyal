const {fromHttpRequest} = require('../utils/http');
const {filter, mergeAll} = require("rxjs/operators");

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        mergeAll(), filter(director =>
            director.name.charAt(0).toLowerCase() === director.name.slice(-1)
        )
    ).subscribe(val => console.log(val));
