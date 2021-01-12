

// Drop Down Menu
var drop_down = d3.select("#selDataset");

    // connects to the JSON data
d3.json("samples.json").then((data)=> {
    console.log(data)

    // adds name values to the dropdown menu
    data.names.forEach(function(name) {
        drop_down.append("option").text(name).property("value");
    });
});