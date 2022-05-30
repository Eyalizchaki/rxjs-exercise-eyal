const {fromHttpRequest} = require('../utils/http');
const {map, mergeAll, concat} = require("rxjs/operators");


fromHttpRequest('https://orels-moviedb.herokuapp.com/movies').pipe(
    mergeAll(), map(movie => movie.title), concat(
    fromHttpRequest('https://orels-moviedb.herokuapp.com/directors').pipe(
        mergeAll(), map(director => director.name))), concat(
        fromHttpRequest('https://orels-moviedb.herokuapp.com/genres').pipe(
            mergeAll(), map(genre => genre.name)
))).subscribe(console.log);
