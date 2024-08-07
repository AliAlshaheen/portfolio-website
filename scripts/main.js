document.addEventListener("DOMContentLoaded", function() {
    var width = document.getElementById('word-cloud').offsetWidth;
    var height = 500;

    var words = [
        {text: "Java", size: 90, color: "orangered"},
        {text: "Python", size: 80, color: "orangered"},
        {text: "SQL", size: 70, color: "orangered"},
        {text: "C/C++", size: 70, color: "white"},
        {text: "F#", size: 60, color: "white"},
        {text: "Dart", size: 90, color: "white"},
        {text: "JavaScript", size: 80, color: "white"},
        {text: "HTML/CSS", size: 60, color: "white"},
        {text: "AWS", size: 90, color: "orangered"},
        {text: "React", size: 80, color: "white"},
        {text: "Django", size: 60, color: "white"},
        {text: "Android Studio", size: 70, color: "white"},
        {text: "Flutter", size: 60, color: "white"},
        {text: "Data Visualization", size: 90, color: "white"},
        {text: "Pandas", size: 70, color: "white"},
        {text: "Excel", size: 60, color: "white"},
        {text: "Linux/Unix", size: 90, color: "white"},
        {text: "Git", size: 80, color: "white"},
        {text: "UI Design", size: 60, color: "white"}
    ];

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
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")");

        var text = svg.selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("fill", function(d) { return d.color; })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")";
            })
            .text(function(d) { return d.text; });

        animateWords(text);
    }

    function animateWords(text) {
        text.transition()
            .duration(2000)
            .attr("transform", function(d) {
                d.x = Math.random() * (width - d.size) - (width / 2 - d.size / 2);
                d.y = Math.random() * (height - d.size) - (height / 2 - d.size / 2);
                return "translate(" + [d.x, d.y] + ")";
            })
            .on("end", function() {
                d3.select(this).call(animateWords);
            });

        setInterval(function() {
            text.style("fill", function(d, i) {
                return i % 2 === 0 ? "orangered" : "white";
            });
        }, 3000);
    }
});
