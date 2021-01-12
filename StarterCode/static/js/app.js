// Drop Down Menu
var drop_down = d3.select("#selDataset");

    // connects to the sample data
d3.json("samples.json").then((data)=> {

    // adds name values to the dropdown menu
    data.names.forEach(function(name) {
        drop_down.append("option").text(name).property("value");
    });

    // Connect the other fuctions to the value in drop down
    demographics(data.names[0])
});



// Demographics Table
// Select the Meta Data info from sample data
// Function ties the ID value we want to select in the drop down
function demographics(id) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;

        // filter metadata to the set that equals the the value in the dropdown menu
        var filtered_data = metadata.filter(meta => meta.id.toString() === id)[0];

        // select the panel-body html class with the id "sample-metadata"
        var demoInfo = d3.select("#sample-metadata");
        
        // clear demographic info
        demoInfo.html("");

        // grab the necessary demographic data for the id and append the info to the panel
        Object.entries(filtered_data).forEach((info) => {demoInfo.append("h5").text(info[0] + ": " + info[1]);    
        });
    });
}