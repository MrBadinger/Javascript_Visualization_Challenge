 
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
    gauge_chart(data.names[0])

});

function optionChanged(id) {
    demographics(id)
    bar_chart(id)
    bubble_chart(id)
    gauge_chart(id)
};




// Demographics Table
// Select the Meta Data info from sample data
// Function ties the ID value we want to select in the drop down
function demographics(id) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;

        // filter metadata to the set that equals the the value in the dropdown menu
        var filtered_data = metadata.filter(meta => meta.id.toString() === id)[0];

        // set variable to assing sample-metadata id to hold the demographics table & then remove any potential old values that are not needed
        var demographics = d3.select("#sample-metadata");
        demographics.html("");

        // get the demographic data for the value selected in the drop down and fill out the demographic table
        Object.entries(filtered_data).forEach((value) => {demographics.append("h5").text(value[0] + ": " + value[1]);    
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
        var top_samples = (subject_sample.otu_ids.slice(0, 10)).reverse();
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
        
        // define the bubble chart values
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


// Gauge chart
function gauge_chart(id) {
    d3.json("samples.json").then((data)=> {


        // grab the sample data of the person choosen in the dropdown
        var person = data.metadata.filter(meta => meta.id.toString() === id)[0];
        
        var hand_wash_data = person.wfreq

        // define the gauge chart values
        var data = [
            {
              type: "indicator",
              mode: "gauge+number",
              value: parseFloat(hand_wash_data),
              title: { text: "Weakly Washing Frequency", font: { size: 24 } },
              gauge: {
                axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: "darkblue" },
                steps: [
                  { range: [0, 1], color: "cyan" },
                  { range: [1, 2], color: "royalblue" },
                  { range: [2, 3], color: "cyan" },
                  { range: [3, 4], color: "royalblue" },
                  { range: [4, 5], color: "cyan" },
                  { range: [5, 6], color: "royalblue" },
                  { range: [6, 7], color: "cyan" },
                  { range: [7, 8], color: "royalblue" },
                  { range: [8, 9], color: "cyan" }
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: parseFloat(hand_wash_data)
                }
              }
            }
          ];
          
          var layout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
          };
          
          Plotly.newPlot('gauge', data, layout);

    });
}