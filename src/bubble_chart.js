/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */
function bubbleChart() {

    /**-------------------------------------------------- CREATING VARIABLES ---------------------------------------------------------- */
    // size of the SVG
    var width = 1450;
    var height = 1200;
  
    // // tooltip for mouseover functionality
    // var tooltip = floatingTooltip('gates_tooltip', 240);
  
    // Locations to move bubbles towards when all the bubbles need to be combined
    var center = { x: width / 2, y: height / 2 };
  
    // Locations to move bubbles towards when the bubbles need to be split
    var collegeCenters = {
      //top and bottom group of bubbles
      'Belk College of Business': { x: width / 2 , y: 400},
      'College of Arts + Architecture': { x: width / 2, y: 800 },
  
      //left group of bubbles
      'College of Computing & Informatics': { x: 608 , y: 470 },
      'College of Education': { x: 608 , y: 750 },
  
      //very left group of bubbles
      'College of Health & Human Services': { x: 540 , y: height / 2 },
  
      //right groups of bubbles
      'College of Liberal Arts & Sciences': { x: 900 , y: 455 },
      'Lee College of Engineering': { x: 917 , y: 750 },
  
      //very right group of bubbles
      'School of Data Science (SDS)': { x: 950 , y: height / 2 }
    };
  
    // Locations of the college titles when the bubbles are split
    var collegeTitles = {
      //top and bottom group of bubbles
      'Belk College of Business': { x: 570, y: 100},
      'College of Arts + Architecture': { x: 580, y: 1120 },
  
      //left group of bubbles
      'College of Computing & Informatics': { x: 70 , y: 250 },
      'College of Education': { x: 200 , y: 1000 },
  
      //very left group of bubbles
      'College of Health & Human Services': { x: 50 , y: 420},
  
      //right groups of bubbles
      'College of Liberal Arts & Sciences': { x: 1150 , y: 250 },
      'Lee College of Engineering': { x: 1140 , y: 980 },
  
      //very right group of bubbles
      'School of Data Science (SDS)': { x: 1120 , y: 520 }
    };
  
    // Strength to apply to the position forces (makes the bubbles move)
    var forceStrength = 0.03;
  
    // Creating variables to be used later on
    var svg = null;
    var bubbles = null;
    var nodes = [];
  
  
    /** ------------------------------------------------------- CREATING FUNCTIONS ---------------------------------------------------- */
  
    /** Charge function that is called for each node.
    This is what creates the repulsion between nodes.
    Charge is proportional to the diameter of the
    circle (which is stored in the radius attribute
    of the circle's associated data).
    This is done to allow for accurate collision
    detection with nodes of different sizes.
    Charge is negative because we want nodes to repel.
    */
    function charge(d) {
      return -Math.pow(d.radius + 1, 2.0) * forceStrength;
    }
  
    // Here we create a force layout.
    // We create a force simulation now and add forces to it.
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
        .exponent(0.5)
        .domain([1, 300])
        .range([5,150]);
  
      // Use map() to convert raw data into node data.
      // Checkout http://learnjsdata.com/ for more on working with data.
      var myNodes = rawData.map(function (d) {
        return {
          id: d.id,
          radius: radiusScale(+d.count),
          value: +d.count,
          name: d.topic,
          college: d.college,
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
  
      // Create a SVG element inside the provided selector
      // with desired size.
      svg = d3.select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
  
      // Bind nodes data to what will become DOM elements to represent them.
      bubbles = svg.selectAll('.bubble')
        .data(nodes, function (d) { 
          return d.id
        })
  
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
        // .on('mouseover', showDetail)
        // .on('mouseout', hideDetail);
  
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
     * Provides a x value for each node to be used with the split by year
     * x force.
     */
    function nodeCollegePositionX(d) {
      return collegeCenters[d.college].x
    }
  
     /*
     * Provides a x value for each node to be used with the split by year
     * x force.
     */
     function nodeCollegePositionY(d) {
      return collegeCenters[d.college].y
    }
  
  
    /*
     * Sets visualization in "single group mode".
     * The year labels are hidden and the force layout
     * tick function is set to move all nodes to the
     * center of the visualization.
     */ 
    function groupBubbles() {
      //hideYearTitles();
  
      // @v4 Reset the 'x' force to draw the bubbles to the center.
      simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
  
      // @v4 We can reset the alpha value and restart the simulation
      simulation.alpha(1).restart();
    }
  
  
    // /*
    //  * Function called on mouseover to display the
    //  * details of a bubble in the tooltip.
    //  */
    // function showDetail(d) {
    //   // change outline to indicate hover state.
    //   d3.select(this).attr('stroke', 'black');
  
    //   var content = '<span class="name">Title: </span><span class="value">' +
    //                 d.name +
    //                 '</span><br/>' +
    //                 '<span class="name">Amount: </span><span class="value">$' +
    //                 addCommas(d.value) +
    //                 '</span><br/>' +
    //                 '<span class="name">Year: </span><span class="value">' +
    //                 d.college +
    //                 '</span>';
  
    //   tooltip.showTooltip(content, d3.event);
    // }
  
    // /*
    //  * Hides tooltip
    //  */
    // function hideDetail(d) {
    //   // reset outline
    //   d3.select(this)
    //     .attr('stroke', d3.rgb(fillColor(d.college)).darker());
  
    //   tooltip.hideTooltip();
    // }
  
    // /*
    //  * Externally accessible function (this is attached to the
    //  * returned chart function). Allows the visualization to toggle
    //  * between "single group" and "split by year" modes.
    //  *
    //  * displayName is expected to be a string and either 'year' or 'all'.
    //  */
    // chart.toggleDisplay = function (displayName) {
    //   if (displayName === 'year') {
    //     //showYearTitles();
  
    //     // @v4 Reset the 'x' force to draw the bubbles to their year centers
    //     simulation.force('x', d3.forceX().strength(forceStrength).x(nodeYearPos));
  
    //     // @v4 We can reset the alpha value and restart the simulation
    //     simulation.alpha(1).restart();
    //   } else {
    //     hideYearTitles();
  
    //     // @v4 Reset the 'x' force to draw the bubbles to the center.
    //     simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
  
    //     // @v4 We can reset the alpha value and restart the simulation
    //     simulation.alpha(1).restart();
    //   }
    // }
  
    //functionality for college button
    chart.toggleCollege = function () {
  
      //SHOW YEAR TITLES
      // Another way to do this would be to create
      // the year texts once and then just hide them.
      var collegeData = d3.keys(collegeTitles);
      var colleges = svg.selectAll('.college')
        .data(collegeData);
  
      colleges.enter().append('text')
        .attr('class', 'year')
        .attr('x', function (d) { 
          return collegeTitles[d].x
        })
        .attr('y', function (d) { 
          return collegeTitles[d].y
        })
        //.attr('text-anchor', 'middle')
        .text(function (d) { 
          return d; 
        });
  
      //FORCES TO MAKE THE BUBBLES SPLIT
      // @v4 Reset the 'x' force to draw the bubbles to their year centers
      simulation.force('x', d3.forceX().strength(forceStrength).x(nodeCollegePositionX))
      simulation.force('y', d3.forceY().strength(forceStrength).y(nodeCollegePositionY))
      
  
      // @v4 We can reset the alpha value and restart the simulation
      simulation.alpha(1).restart()
    }
  
    //functionality for commbine button
    chart.toggleCombine = function () {
      //groupBubbles()
  
      // //HIDE YEAR TITLES
      svg.selectAll('.year').remove();
  
      //FORCES TO GROUP BUBBLES
      // @v4 Reset the 'x' force to draw the bubbles to the center.
      simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
      simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
  
      // @v4 We can reset the alpha value and restart the simulation
      simulation.alpha(1).restart();
    }
    
    // return the chart function from closure.
    return chart;
  }
  
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
   * Sets up the layout buttons to allow for toggling between view modes.
   */
  function setupButtons() {
    d3.select('#toolbar')
      .selectAll('.button')
      .on('click', function () {
        // Remove active class from all buttons
        d3.selectAll('.button').classed('active', false);
        // Find the button just clicked
        var button = d3.select(this);
  
        // Set it as the active button
        button.classed('active', true);
  
        // Get the id of the button
        var buttonId = button.attr('id');
  
        // Toggle the bubble chart based on the currently clicked button.
        myBubbleChart.toggleDisplay(buttonId);
      });
  }
  
  /*
   * Sets up the layout buttons to allow for toggling between view modes.
   */
  //allows for the button to be clicked and filter through the options
  function setupActualButtons(){
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
  }
  
  // /*
  //  * Helper function to convert a number into a string
  //  * and add commas to it to improve presentation.
  //  */
  // function addCommas(nStr) {
  //   nStr += '';
  //   var x = nStr.split('.');
  //   var x1 = x[0];
  //   var x2 = x.length > 1 ? '.' + x[1] : '';
  //   var rgx = /(\d+)(\d{3})/;
  //   while (rgx.test(x1)) {
  //     x1 = x1.replace(rgx, '$1' + ',' + '$2');
  //   }
  
  //   return x1 + x2;
  // }
  
  // Load the data.
  d3.csv('data/charlotteData1.csv', display);
  
  setupActualButtons();
  