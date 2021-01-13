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
    bar_chart(data.names[0])
    bubble_chart(data.names[0])

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


// Bar chart
function bar_chart(id) {
    d3.json("samples.json").then((data)=> {


        // grab the sample data of the person choosen in the dropdown
        var subject_sample = data.samples.filter(sample => sample.id.toString() === id)[0];
        
        // orangize sample data from largest to smallest and collect top 10
        var subject_sample_data = subject_sample.sample_values.slice(0, 10).reverse();
  
        // orangize out ids from largest to smallest and collect top 10
        var top_samples = (subject_sample.otu_ids.slice(0, 10)).reverse();
        
        // organize top otu labels from filtered data and collect top 10
        var label = subject_sample.otu_labels.slice(0, 10);

        // format otu lables
        var top_samples_2 = top_samples.map(id => "OTU " + id + " ")
    

        // define the bar chart values
        var trace_bar = {
            x: subject_sample_data,
            y: top_samples_2,
            text: label,
            marker: {
                color: subject_sample.otu_ids,
                colorscale: "Earth"
        },
            type:"bar",
            orientation: "h",
        };
          
        var data_bar = [trace_bar];
  
        // define bar chart layout
        var layout_bar = {
            title: "Top Ten Operational Taxonomic Units",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100,
            }
        };
  
        // generate bar chart on bar id in the HTML
        Plotly.newPlot("bar", data_bar, layout_bar);

    });
}


// Bubble chart
function bubble_chart(id) {
    d3.json("samples.json").then((data)=> {

        // grab the sample data of the person choosen in the dropdown
        var subject_sample = data.samples.filter(sample => sample.id.toString() === id)[0];
        
        // define the bar chart values
        var trace_bubble = {
            x: subject_sample.otu_ids,
            y: subject_sample.sample_values,
            mode: "markers",
            marker: {
                size: subject_sample.sample_values,
                color: subject_sample.otu_ids,
                colorscale: "Blockbody"
            },
            text: subject_sample.otu_labels
  
        };
  
        // define bubble chart layout
        var layout_bubble = {
            title: { text: `Sample Values by Operational Taxonomic Unit` },
            xaxis:{title: "OTU ID"},
            height: 500,
            width: 1200
        };
  
        // Create the data array for the bubble plot 
        var data_bubble = [trace_bubble];
  
        // generate bubble chart on bubble id in the HTML
        Plotly.newPlot("bubble", data_bubble, layout_bubble);

    });
}