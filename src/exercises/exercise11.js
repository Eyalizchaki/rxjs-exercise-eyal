const {fromHttpRequest} = require('../utils/http');
const {map, mergeAll, concat, groupBy, mergeMap, reduce, count, take, filter, toArray} = require("rxjs/operators");
const {zip, forkJoin} = require("rxjs");


// const ratings = fromHttpRequest('https://orels-moviedb.herokuapp.com/ratings').pipe(
//     mergeAll(),
//     // take(100),
//     groupBy(rating => rating.movie));
// const good_ratings = ratings.pipe(mergeMap(group => group.pipe(count(rating => rating.score >= 3),
//         map(movieCount => {
//         return {movie_id: group.key, count: movieCount}
//     })))
// );

// const all = ratings.pipe(mergeMap(group => group.pipe(count(),
//     map(movieCount => {
//         return {movie_id: group.key, count: movieCount}
//     })), concat(ratings.pipe(mergeMap(group => group.pipe(count(rating => rating.score >= 3),
//         map(movieCount => {
//             return {movie_id: group.key, count: movieCount}
//         })))
//     )))
// );
//
// all.subscribe(console.log)


fromHttpRequest('https://orels-moviedb.herokuapp.com/ratings').pipe(
    mergeAll(),
    groupBy(rating => rating.movie),
    mergeMap(group => group.pipe(reduce((acc, res) => {
            acc.rating_count += 1;
            if (res.score >= 3) {
                acc.good_rating_count += 1;
            }
            return acc
        }, {rating_count:0, good_rating_count:0}),
        map(({rating_count, good_rating_count}) => {
            return {movie_id: group.key, good_rating_present: good_rating_count / rating_count}
        }),
        filter(movie => movie.good_rating_present >= 0.7)))
).subscribe(console.log);


