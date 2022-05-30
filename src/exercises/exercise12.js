const {fromHttpRequest} = require("../utils/http");
const {mergeAll, groupBy, mergeMap, count, map, min, toArray, take, filter, max} = require("rxjs/operators");
const {from} = require("rxjs");

// fromHttpRequest('https://orels-moviedb.herokuapp.com/movies').pipe(
//     mergeAll(),
//     map(movie => movie.genres),
//     mergeAll(),
//     groupBy(rating => rating),
//     mergeMap(group => group.pipe(count(),
//         map((movieCount) => {
//             return {genre_id: group.key, count: movieCount}
//         }))),
//     min((a, b) => a.count < b.count ? -1 : 1),
//     mergeMap(movie => from(movie.genre_id).pipe(
//         mergeMap(genreId => {
//             return fromHttpRequest(`https://orels-moviedb.herokuapp.com/genres/${genreId}`)
//                 .pipe(map(genre => genre.name))
//         }),
//         // toArray(),
//         map(genres => {
//             return {
//                 name: genres.name,
//                 count: genres.count
//             }
//         })
//     ))
// ).subscribe(console.log);
//



fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeAll(),
        take(100),
        mergeMap(movie => from(movie.genres).pipe(
            mergeMap(genreId => {
                return fromHttpRequest(`https://orels-moviedb.herokuapp.com/genres/${genreId}`)
                    .pipe(map(genre => genre.name))
            }),
            toArray(),
            map(genres => genres)
        )),
        mergeAll(),
        groupBy(rating => rating),
        mergeMap(group => group.pipe(count(),
            map((movieCount) => {
                return {genre_name: group.key, count: movieCount}
            }))),
        min((a, b) => a.count < b.count ? -1 : 1)
    ).subscribe(console.log);
