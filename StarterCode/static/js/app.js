// Pull in data
d3.json("samples.json").then((importedData) => {
    console.log(importedData);
    var data = importedData;
});