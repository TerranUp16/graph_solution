// Import directed-graph aka https://github.com/codenameyau/directed-graph
var Graph = require('directed-graph');

// Initialize the graph from the picture
var theGraph = new Graph({
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['E', 'F'],
    'D': ['G', 'H'],
    'E': ['H', 'I'],
    'F': ['I', 'J'],
    'G': ['K'],
    'H': ['K', 'L'],
    'I': ['L', 'M'],
    'J': ['M'],
    'K': ['N'],
    'L': ['N', 'O'],
    'M': ['O'],
    'N': ['P'],
    'O': ['P'],
    'P': []
});

// Initialize a global counter and set it to zero
// This will track how many times 'P' is reached
var counter = 0;

// Take a start node and end node, and spawn every variation of path to get from start to end as possible
function findEnd(start, end) {
    // Check if we have reached end
    if (start == end) {
        // If we have, increment the counter
        counter++
        // Then evacuate this call
        return
    } else {
        // Retrieve the "neighbors" of start (the verticees to which start can connect to via its available edges)
        var neighbors = theGraph.getNeighbors(start)

        // neighbors is in the form of a map/dictionary/string array/wootev you want to call it
        // So we need to iterate over the length of its keys as the values are all 0
        for (var i=0; i<Object.keys(neighbors).length; i++) {
            // console.log(Object.keys(neighbors)[i]) //Debug print

            // Recursively call this function with a new "start"; ex- if "start" is A, then its neighbors will
            // be B and C, so this loop will spawn two new findEnd calls, one with findEnd('B','P') and one with
            // findEnd('C', 'P')
            findEnd(Object.keys(neighbors)[i], end)
        }
    }
}

// Seed the call to findEnd
findEnd('A', 'P')

// Output counter after all findEnd calls complete
console.log(counter)