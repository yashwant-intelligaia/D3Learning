var parseDate = d3.timeParse("%m/%d/%Y");

d3.csv("/asset/csv/prices.csv")
    .row(function(d){ return {month:parseDate(d.month), price:Number(d.price.trim())}})
    .get(function(error, data){
        console.log('CSV Format',data);
    })

d3.tsv("/asset/other/prices.tsv")
    .get(function(error,data){
        console.log("TSV data",data);
    })

d3.json("/asset/json/expenses.json")
    .get(function(error, data){
        console.log('JSON data',data);
    });

var psv = d3.dsvFormat("|");
d3.text("/asset/other/prices.txt")
    .get(function(error, data){
        let rows = psv.parse(data);
        console.log('TXt data',rows);
    })

d3.xml("/asset/other/expenses.xml")
    .get(function(error, data){
        var xmlLetter = data.documentElement.getElementsByTagName("category")
        var nodes = d3.select(data).selectAll("category");
        console.log('XML Data',xmlLetter);
        console.log('XML nodes',nodes);
    })