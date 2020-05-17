
// var arr = [1,4,3,2,6];
// console.log('min',d3.min(arr));
// console.log('max',d3.max(arr));
// console.log('extent',d3.extent(arr));
// console.log('sum',d3.sum(arr));
// console.log('mean',d3.mean(arr));
// console.log('median',d3.median(arr));
// console.log('quantile',d3.quantile(arr,0.5));
// console.log('variance',d3.variance(arr));
// console.log('deviation',d3.deviation(arr));

var arr2 = [5, 6, 6, 8];
// console.log(d3.scan(arr2, function(a,b){return a.val - b.val}))
console.log('bisectLeft', d3.bisectLeft(arr2, 5))
console.log('bisect', d3.bisect(arr2, 8))
console.log('bisectRight', d3.bisectRight(arr2, 8))

var data = [
    { date: new Date(2011, 1, 1), value: 0.5 },
    { date: new Date(2011, 3, 1), value: 0.7 },
    { date: new Date(2011, 4, 1), value: 0.6 },
    { date: new Date(2011, 5, 1), value: 0.8 }
];
var bisect = d3.bisector(function(d){ return d.date}).right;
console.log('bisector', bisect(data, new Date(2011, 2, 1)));