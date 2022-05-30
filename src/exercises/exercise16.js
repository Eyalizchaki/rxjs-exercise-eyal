const {fromHttpRequest} = require("../utils/http");
const {mergeAll, take, mergeMap, map, toArray, groupBy, count, min, reduce} = require("rxjs/operators");
const {from} = require("rxjs");

fromHttpRequest('https://orels-moviedb.herokuapp.com/ratings').pipe(
    mergeAll(),
    groupBy(rating => rating.movie),
    mergeMap(group => group.pipe(
        reduce((acc, res) => {
            acc.sum += res.score;
            acc.index += 1;

            return acc
        }, {sum:0, index:0}),
        map(({sum, index}) => {
            return {movie_id: group.key, avg: sum / index}
        }),
    ))
).subscribe(console.log);
