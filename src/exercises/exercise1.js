const {fromHttpRequest} = require('../utils/http');
const {take, map, mergeAll} = require("rxjs/operators");

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        mergeAll(), take(1)
    ).subscribe(val => console.log(val));
