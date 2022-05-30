const {fromHttpRequest} = require('../utils/http');
const {map, mergeAll, concat, groupBy, mergeMap, reduce, count} = require("rxjs/operators");


fromHttpRequest('https://orels-moviedb.herokuapp.com/movies').pipe(
    mergeAll(),
    groupBy(movie => movie.year),
    mergeMap(group => group.pipe(count(), map(movieCount => [group.key, movieCount])))

).subscribe(console.log);
