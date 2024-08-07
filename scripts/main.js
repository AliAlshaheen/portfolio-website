document.addEventListener("DOMContentLoaded", function() {
    var container = document.getElementById('word-cloud');
    var width = container.offsetWidth;
    var height = container.offsetHeight;

    console.log('Container dimensions:', width, height);

    var words = [
        {text: "Java", size: 90},
        {text: "Python", size: 80},
        {text: "SQL", size: 70},
        {text: "C/C++", size: 70},
        {text: "F#", size: 60},
        {text: "Dart", size: 90},
        {text: "JavaScript", size: 80},
        {text: "HTML/CSS", size: 60},
        {text: "AWS", size: 90},
        {text: "React", size: 80},
        {text: "Django", size: 60},
        {text: "Android Studio", size: 70},
        {text: "Flutter", size: 60},
        {text: "Data Visualization", size: 90},
        {text: "Pandas", size: 70},
        {text: "Excel", size: 60},
        {text: "Linux/Unix", size: 90},
        {text: "Git", size: 80},
        {text: "UI Design", size: 60}
    ];

    // Corrected scaling factor for font sizes
    var maxFontSize = 60; // Adjust this value as needed
    var minFontSize = 20; // Adjust this value as needed
    var scale = d3.scaleLinear()
        .domain([20, 100]) // Adjust this domain based on the original word sizes
        .range([minFontSize, maxFontSize]);

    words.forEach(function(d) {
        d.size = scale(d.size);
    });

    console.log('Scaled words:', words);

    var layout = d3.layout.cloud()
        .size([width, height])
        .words(words)
        .padding(5)
        .rotate(0) // Ensure all words are right-side up
        .fontSize(function(d) { return d.size; })
        .on("end", draw);

    layout.start();

    function draw(words) {
        var svg = d3.select("#word-cloud")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        console.log('SVG and group created');

        var text = svg.selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("fill", "white")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                d.x = Math.random() * (width - d.size) - (width / 2 - d.size / 2);
                d.y = Math.random() * (height - d.size) - (height / 2 - d.size / 2);
                console.log('Position for', d.text, ':', d.x, d.y);
                return "translate(" + [d.x, d.y] + ")";
            })
            .text(function(d) { return d.text; });

        console.log('Text elements created');

        animateWords(text);
        setInterval(updateHighlight, 3000, text);
    }

    function animateWords(text) {
        text.transition()
            .duration(20000)
            .ease(d3.easeLinear)
            .attr("transform", function(d) {
                d.x = Math.random() * (width - d.size) - (width / 2 - d.size / 2);
                d.y = Math.random() * (height - d.size) - (height / 2 - d.size / 2);
                console.log('Animating', d.text, 'to', d.x, d.y);
                return "translate(" + [d.x, d.y] + ")";
            })
            .on("end", function() {
                d3.select(this).call(animateWords);
            });
    }

    function updateHighlight(text) {
        var allWords = text.nodes();
        var highlightedWord = d3.select(allWords.filter(function(word) {
            return d3.select(word).style("fill") === "rgb(255, 69, 0)"; // Check for orangered color
        })[0]);

        // Unhighlight the current highlighted word gradually
        highlightedWord.transition()
            .duration(1000)
            .style("fill", "white")
            .style("font-weight", "normal")
            .on("end", function() {
                animateWords(highlightedWord);
            });

        // Highlight a new word gradually
        var newHighlightedWord = d3.select(d3.shuffle(allWords).filter(function(word) {
            return d3.select(word).style("fill") !== "rgb(255, 69, 0)"; // Avoid already highlighted word
        })[0]);

        newHighlightedWord.raise() // Ensure highlighted word stays on top
            .transition()
            .duration(1000)
            .style("fill", "orangered")
            .style("font-weight", "bold")
            .on("end", function() {
                animateWords(newHighlightedWord);
            });
    }
});
 