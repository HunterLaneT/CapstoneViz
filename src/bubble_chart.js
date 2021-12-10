/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */
function bubbleChart() {

  // ---------------------------//
  //     CREATING VARIABLES     // -----------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------//

  // size of the SVG
  var width = 1450;
  var height = 1200;

  // Locations to move bubbles towards when all the bubbles need to be combined
  var center = { x: width / 2 - 50, y: height / 2 };

  // Locations to move bubbles towards when the bubbles need to be split
  var collegeCenters = {
    //top and bottom group of bubbles
    'Belk College of Business': { x: width / 2  - 50, y: 400 },
    'College of Arts + Architecture': { x: width / 2 - 50, y: 800 },

    //left group of bubbles
    'College of Computing & Informatics': { x: 558, y: 470 },
    'College of Education': { x: 608- 50, y: 750 },

    //very left group of bubbles
    'College of Health & Human Services': { x: 490, y: height / 2 },

    //right groups of bubbles
    'College of Liberal Arts & Sciences': { x: 867, y: 455 },
    'Lee College of Engineering': { x: 917- 50, y: 750 },

    //very right group of bubbles
    'School of Data Science (SDS)': { x: 900, y: height / 2 }
  };

  var collegeScaleY = {
    //top and bottom group of bubbles
    'Belk College of Business': { y: 150 },
    'College of Arts + Architecture': {y: 300 },

    //left group of bubbles
    'College of Computing & Informatics': { y: 450 },
    'College of Education': { y: 600 },

    //very left group of bubbles
    'College of Health & Human Services': { y: 750 },

    //right groups of bubbles
    'College of Liberal Arts & Sciences': { y: 900 },
    'Lee College of Engineering': { y: 1050 },

    //very right group of bubbles
    'School of Data Science (SDS)': {y: 1200 }
  };


  var collegeTitles = {
    //top and bottom group of bubbles
    'Belk College of Business': { x: 520, y: 100, 
      category: 'Belk College of Business<br>', 
      description: "UNC Charlotte's Belk College of Business has been driving business in the Charlotte region for over 50 years. <br> ",
      link: "https://belkcollege.charlotte.edu/"
    },
    
    'College of Arts & Architecture': { x: 530, y: 1120, 
      category: 'College of Arts & Architecture<br>', 
      description: "A diverse community of visionary thinkers, designers, and makers, who seek to create a more beautiful and just world through innovation, research and collaborative engagement. <br>",
      link: "https://coaa.charlotte.edu/"
    },

    //left group of bubbles
    'College of Computing & Informatics': { x: 20, y: 250, 
      category: 'College of Computing & Informatics<br>', 
      description: "Fostering critical knowledge and talent to speed next-generation research and technological breakthroughs — Artificial Intelligence, Robotics, Big Data Analysis, Computer-Aided Education, Bioinformatics and Cybersecurity — for North Carolina. <br> ",
      link: "https://cci.charlotte.edu/"
    },

    'College of Education': { x: 150, y: 1000, 
      category: 'Cato College of Education<br>', 
      description: "Supporting North Carolina schools, teachers, superintendents and policy makers working to advance educational research, equity, excellence and engagement for all students. <br>",
      link: "https://education.charlotte.edu/"
    },

    //very left group of bubbles
    'College of Health & Human Services': { x: 0, y: 440, 
      category: 'College of Health & Human Services<br>', 
      description: "Translating clinical and public health research to improve patient outcomes, especially for vulnerable, underinsured and underserved communities. <br> ",
      link: "https://health.charlotte.edu/"
    },

    //right groups of bubbles
    'College of Liberal Arts & Sciences': { x: 1000, y: 200, 
      category: 'College of Liberal Arts & Science<br>', 
      description: "Teachers, researchers and students joined in the pursuit of foundational understanding and bold thinking across core disciplines, interdisciplinary programs and novel collaborations. <br> ",
      link: "https://clas.charlotte.edu/"
    },
    
    'Lee College of Engineering': { x: 1090, y: 980, 
      category: 'Lee College of Engineering<br>', 
      description: "Among the top engineering programs in North Carolina, where ideas become reality through research, study, design, hands-on prototyping and often interdisciplinary collaboration with industry supporters. <br> ",
      link: "https://engr.charlotte.edu/"
    },

    //very right group of bubbles
    'School of Data Science (SDS)': { x: 1070, y: 520, 
      category: 'School of Data Science<br>', 
      description: "Uniquely centered in the hub of big data, UNC Charlotte has created the Carolinas' first School of Data Science, tapping the region’s expansive ecosystem of research, industry, and community engagement to apply a visionary lens to the education and application of data science. <br> ",
      link: "https://datascience.charlotte.edu/"
    }
  };

  //Tooltip for bubble map
  var Tooltip = d3.select('#vis')
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

  // Strength to apply to the position forces (makes the bubbles move)
  var forceStrength = 0.03;

  // Creating variables to be used later on
  var svg = null;
  var bubbles = null;
  var nodes = [];



  // --------------------------------------------//
  //    CREATING SIMULATION, BUBBLES, COLORS     // -----------------------------------------------------------------------------------------------------------------------------------
  // --------------------------------------------//

  /** Charge function that is called for each node.
  This is what creates the repulsion between nodes.
  Charge is proportional to the diameter of the
  circle (which is stored in the radius attribute
  of the circle's associated data).
  This is done to allow for accurate collision
  detection with nodes of different sizes.
  Charge is negative because we want nodes to repel .
  */
  function charge(d) {
    return -Math.pow(d.radius + 1, 2.0) * forceStrength;
  }

  // Here we create a force layout. We create a force simulation now and add forces to it.
  var simulation = d3.forceSimulation()
    .velocityDecay(0.2)
    .force('x', d3.forceX().strength(forceStrength).x(center.x))
    .force('y', d3.forceY().strength(forceStrength).y(center.y))
    .force('charge', d3.forceManyBody().strength(charge))
    .on('tick', ticked);

  // Force starts up automatically which we don't want as there aren't any nodes yet, so we stop the simulation.
  simulation.stop();

  // Choosing the colors of the bubbles
  var fillColor = d3.scaleOrdinal()
    .domain(['Belk College of Business',
      'College of Arts + Architecture',
      'College of Computing & Informatics',
      'College of Education',
      'College of Health & Human Services',
      'College of Liberal Arts & Sciences',
      'Lee College of Engineering',
      'School of Data Science (SDS)'
    ])
    .range(['#f1da14',
      '#3ab988',
      '#b8e04a',
      '#8cd646',
      '#2c909a',
      '#426697',
      '#523983',
      '#c71575'
    ])

  /*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
  function createNodes(rawData) {
    // Sizes bubbles based on area.
    var radiusScale = d3.scalePow()
      .exponent(0.6)
      .domain([1, 300])
      .range([5, 150]);

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on working with data.
    var myNodes = rawData.map(function (d) {
      return {
        id: d.id,
        radius: radiusScale(+d.count),
        value: +d.count,
        name: d.topic,
        college: d.college,
        URL: d.URL,
        first_Author: d.first_Author,
        URL_forAuthor1: d.URL_forAuthor1,
        second_Author: d.second_Author,
        URL_forAuthor2: d.URL_forAuthor2,
        third_Author: d.third_Author,
        URL_forAuthor3: d.URL_forAuthor3,
        //Math.random() places the bubbles on different spots in the SVG.
        //Without this, the bubbles would be sorted from biggest to smallest.
        x: Math.random() * 900,
        y: Math.random() * 800
      };
    });

    // Sort the bubbles to prevent blockage of smaller bubbles/nodes.
    myNodes.sort(function (a, b) { return b.value - a.value; });

    return myNodes;
  }



  // ---------------------------//
  //       CREATING CHART       // -----------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------//
  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   *
   * selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   *
   * rawData is expected to be an array of data objects as provided by
   * a d3 loading function like d3.csv.
   */
  var chart = function chart(selector, rawData) {
    // convert raw data into nodes data
    nodes = createNodes(rawData);

    
    // ---------------------------//
    //   SETTING SVG DIMENSIONS   // 
    // ---------------------------//

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 1450 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;

    // Create a SVG element inside the provided selector
    // with desired size.
    svg = d3.select(selector)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleBand()
      .domain(['Business',
        'Arts + Architecture',
        'Computing & Informatics',
        'Education',
        'Health & Human Services',
        'Liberal Arts & Sciences',
        'Engineering',
        'Data Science (SDS)'
      ])
      .range([ 0, width ]);
    svg.append("g")
      .attr("class", "axisWhite")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 30])
      .range([ height, 0]);
    svg.append("g")
      .attr("class", "axisWhite")
      .call(d3.axisLeft(y));

    //set axis opacity to 0 so that it doesn't show right away
    svg.selectAll('.axisWhite').style("opacity", 0)

    // Bind nodes data to what will become DOM elements to represent them.
    bubbles = svg.selectAll('.bubble')
      .data(nodes, function (d) {
        return d.id
      })


    // --------------------------------------//
    //     CREATING TOOL TIPS  AND BUBBLES   // 
    // --------------------------------------//
    d3.selection.prototype.moveToFront = function () {
      return this.each(function () {
        this.parentNode.appendChild(this);
      });
    };

    // Create new circle elements each with class `bubble`.
    // There will be one circle.bubble for each object in the nodes array.
    // Initially, their radius (r attribute) will be 0.
    // Selections are immutable, so lets capture the
    // enter selection to apply our transtition to below.
    var bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', function (d) {
        return fillColor(d.college)
      })
      .attr('stroke', "#181818")
      .attr('stroke-width', 2)
      .on('mouseover', function (d) {
        d3.select(this)
          .transition()
          .duration('100')
          .attr('r', function (d) {
            return d.radius + 5
          })
          .style("stroke", "black")

        Tooltip
          //.html("Name: " + d.name + "<br>College: " + d.college + "<br>Total Publication: " + d.value + "<br><a href=" + d.URL + ">More Info</a>" + "<br>1. <a href=" + d.URL_forAuthor1 + ">" + d.first_Author + "</a>" + "<br>2. <a href=" + d.URL_forAuthor2 + ">" + d.second_Author + "</a>" + "<br>3. <a href=" + d.URL_forAuthor3 + ">" + d.third_Author + "</a>")
          .html("Name: " + d.name + "<br>College: " + d.college + "<br>Total Publication: " + d.value + "<br><br>1. <a href=" + d.URL_forAuthor1 + ">" + d.first_Author + "</a>" + "<br>2. <a href=" + d.URL_forAuthor2 + ">" + d.second_Author + "</a>" + "<br>3. <a href=" + d.URL_forAuthor3 + ">" + d.third_Author + "</a><br><br><button class='btn-tooltip' onclick=\"window.location.href='"+ d.URL +"';\">More Info</button><br>")
          .transition().duration(500)
          .style("opacity", 1)
          .style("left", (d3.event.pageX + 28) + "px")
          .style("top", (d3.event.pageY) + "px")
      })
      .on("mouseleave", function (d) {
        d3.select(this).transition()
          .duration('100')
          .attr("r", function (d) {
            return d.radius
          })
          .style("stroke", "black")
        Tooltip
          .transition().duration(4000)
          .style("opacity", 0)
      })

    // Merge the original empty selection and the enter selection
    bubbles = bubbles.merge(bubblesE)

    // Fancy transition to make bubbles appear, ending with the correct radius
    bubbles.transition()
      .duration(2000)
      .attr('r', function (d) {
        return d.radius
      })

    // Set the simulation's nodes to our newly created nodes array.
    // Once we set the nodes, the simulation will start running automatically!
    simulation.nodes(nodes);

    // Set initial layout to single group.
    groupBubbles();
  };



  // ----------------------------------//
  //       BUBBLE MAP ANIMATIONS       // -----------------------------------------------------------------------------------------------------------------------------------
  // ----------------------------------//
  /*
   * Callback function that is called after every tick of the
   * force simulation.
   * Here we do the acutal repositioning of the SVG circles
   * based on the current x and y values of their bound node data.
   * These x and y values are modified by the force simulation.
   */
  function ticked() {
    bubbles
      .attr('cx', function (d) {
        return d.x
      })
      .attr('cy', function (d) {
        return d.y
      })
  }

  /*
   * Provides a x value for each node to be used for the College filter
   */
  function nodeCollegePositionX(d) {
    return collegeCenters[d.college].x
  }

  /*
  * Provides a x value for each node to be used for the College filter
  */
  function nodeCollegePositionY(d) {
    return collegeCenters[d.college].y
  }

  /*
   * Provides a x value for each node to be used for the Scale filter
   */
  function nodeScalePositionX(d) {
    return collegeScaleY[d.college].y
  }

  /*
  * Provides a x value for each node to be used used for the Scale filter
  */
  function nodeScalePositionY(d) {
    return (height - 45) - (d.value * (1450/39))
  }

  /*
   * Sets visualization in "single group mode".
   * The year labels are hidden and the force layout
   * tick function is set to move all nodes to the
   * center of the visualization.
   */
  function groupBubbles() {

    // @v4 Reset the 'x' force to draw the bubbles to the center.
    simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));

    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  //functionality for college button
  chart.toggleCollege = function () {

    //HIDE AXIS 
    svg.selectAll('.axisWhite').style("opacity", 0)
    svg.selectAll("circle").style("opacity", 1)

    //SHOW COLLEGE TITLES
    var collegeData = d3.keys(collegeTitles);
    var colleges = svg.selectAll('.college')
      .data(collegeData);

    colleges.enter().append('text')
      .attr('class', 'college')
      .attr('x', function (d) {
        return collegeTitles[d].x
      })
      .attr('y', function (d) {
        return collegeTitles[d].y
      })
      //.attr('text-anchor', 'middle')
      .text(function (d) {
        return d;
      })
      .on("mouseover", function(d){
        Tooltip
        .html("<strong> Category: </strong>" + collegeTitles[d].category + "<strong> Description: </strong>" + collegeTitles[d].description + "<br><button class='btn-tooltip' onclick=\"window.location.href='"+ collegeTitles[d].link +"';\">More Info</button></br>")
        .transition().duration(500)
            .style("opacity", 1)
            .style("left", (d3.event.pageX +28) + "px")
            .style("top", (d3.event.pageY ) + "px")
      })
      .on("mouseout", function(d){
        Tooltip
        .transition().duration(4000)
        .style("opacity", 0)
      })

    //FORCES TO MAKE THE BUBBLES SPLIT
    //Reset the 'x' force to draw the bubbles to their year centers
    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeCollegePositionX))
    simulation.force('y', d3.forceY().strength(forceStrength).y(nodeCollegePositionY))


    //We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart()
  }

  //functionality for commbine button
  chart.toggleCombine = function () {

    // //HIDE COLLEGE TITLES
    svg.selectAll('.college').remove();
    svg.selectAll('.axisWhite').style("opacity", 0)
    svg.selectAll("circle").style("opacity", 1)

    //FORCES TO GROUP BUBBLES
    //Reset the 'x' force to draw the bubbles to the center.
    simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
    simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));

    //We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  //functionality for toggling the scale
  chart.toggleScale = function() {

    svg.selectAll('.axisWhite').style("opacity", 1.0)
    svg.selectAll("circle").style("opacity", 0.8)

    //HIDE YEAR TITLES
    svg.selectAll('.college').remove();

    //FORCES TO MOVE BUBBLES TO POSITIONS ON THE SCALE
    //Reset the 'x' and 'y' force to draw the bubbles to their positions on the scale.
    simulation.force('x', d3.forceX().strength(0.065).x(nodeScalePositionX));
    simulation.force('y', d3.forceY().strength(0.2).y(nodeScalePositionY));

    //We can reset the alpha value and restart the simulation
    simulation.alpha(0.3).restart();
  }

  // return the chart function from closure.
  return chart;
}




// ----------------------------------//
//    PUTTING EVERYTHING TOGETHER    // -----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------//
/*
 * Below is the initialization code as well as some helper functions
 * to create a new bubble chart instance, load the data, and display it.
 */
var myBubbleChart = bubbleChart();

/*
 * Function called once data is loaded from CSV.
 * Calls bubble chart function to display inside #vis div.
 */
function display(error, data) {
  if (error) {
    console.log(error);
  }
  myBubbleChart('#vis', data);
}

/*
 * Allows for the button to be clicked and filter through the options
 */
function setupButtons() {
  d3.select('#college')
    .on('click', function () {
      console.log("You clicked college!")
      myBubbleChart.toggleCollege()
    });

  d3.select('#combine')
    .on('click', function () {
      console.log("You clicked combine!")
      myBubbleChart.toggleCombine()
    });

  d3.select('#scale')
    .on('click', function () {
      console.log("You clicked scale!")
      myBubbleChart.toggleScale()
  });
}

// Load the data.
d3.csv('OfficialCharlotteData.csv', display);

setupButtons();
