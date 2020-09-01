// This is an initialization script for the container relocate graph.
// Run it only once. ;)
// Have you run it twice? Use `MATCH (n) WHERE (n:Problem OR n:Data) DETACH DELETE n` to start over.

CREATE (p0:Problem { id: 0, row_size: 3, col_size: 3 })
// Column nodes
CREATE (d00:Data { data: [1, 7, 3]})
CREATE (d01:Data { data: [5, 6, 2]})
CREATE (d02:Data { data: [4]})
// Solution nodes
CREATE (s00:Data { data: [1, 2]})
CREATE (s01:Data { data: [1, 2]})
CREATE (s02:Data { data: [0, 1]})
CREATE (s03:Data { data: [2, 1]})
CREATE (s04:Data { data: [2, 1]})
CREATE
    // Column relationships
    (p0)-[:COLUMN { sort: 0 }]->(d00),
    (p0)-[:COLUMN { sort: 1 }]->(d01),
    (p0)-[:COLUMN { sort: 2 }]->(d02),
    // Solution relationships
    (p0)-[:SOLUTION { sort: 0 }]->(s00),
    (p0)-[:SOLUTION { sort: 1 }]->(s01),
    (p0)-[:SOLUTION { sort: 2 }]->(s02),
    (p0)-[:SOLUTION { sort: 3 }]->(s03),
    (p0)-[:SOLUTION { sort: 4 }]->(s04)