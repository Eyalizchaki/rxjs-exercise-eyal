const {fromHttpRequest} = require('../utils/http');
const {take, map, filter, mergeAll, count} = require("rxjs/operators");

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeAll(), count()
    ).subscribe(val => console.log(val));
