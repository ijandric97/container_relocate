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

CREATE (p1:Problem { id: 1, row_size: 3, col_size: 3})
// Column nodes
CREATE (d10:Data { data: [3, 4]})
CREATE (d11:Data { data: [6, 5]})
CREATE (d12:Data { data: [7, 2, 1]})
// Solution nodes
CREATE (s10:Data { data: [2, 1]})
CREATE (s11:Data { data: [2, 0]})
CREATE (s12:Data { data: [1, 0]})
CREATE (s13:Data { data: [1, 0]})
CREATE
    // Column relationships
    (p1)-[:COLUMN { sort: 0 }]->(d10),
    (p1)-[:COLUMN { sort: 1 }]->(d11),
    (p1)-[:COLUMN { sort: 2 }]->(d12),
    // Solution relationships
    (p1)-[:SOLUTION { sort: 0 }]->(s10),
    (p1)-[:SOLUTION { sort: 1 }]->(s11),
    (p1)-[:SOLUTION { sort: 2 }]->(s12),
    (p1)-[:SOLUTION { sort: 3 }]->(s13)

CREATE (p2:Problem { id: 2, row_size: 4, col_size: 4})
//Column nodes
CREATE (d20:Data { data: [11, 6, 1, 7]})
CREATE (d21:Data { data: [2, 4, 10, 12]})
CREATE (d22:Data { data: [9, 8, 5]})
CREATE (d23:Data { data: [13, 3]})
// Solution nodes
CREATE (s20:Data { data: [0, 2]})
CREATE (s21:Data { data: [0, 3]})
CREATE (s22:Data { data: [3, 0]})
CREATE (s23:Data { data: [3, 0]})
CREATE (s24:Data { data: [0, 3]})
CREATE (s25:Data { data: [2, 3]})
CREATE (s26:Data { data: [2, 3]})
CREATE (s27:Data { data: [2, 3]})
CREATE
    // Column relationships
    (p2)-[:COLUMN { sort: 0 }]->(d20),
    (p2)-[:COLUMN { sort: 1 }]->(d21),
    (p2)-[:COLUMN { sort: 2 }]->(d22),
    (p2)-[:COLUMN { sort: 3 }]->(d23),
    // Solution relationships
    (p2)-[:SOLUTION { sort: 0 }]->(s20),
    (p2)-[:SOLUTION { sort: 1 }]->(s21),
    (p2)-[:SOLUTION { sort: 2 }]->(s22),
    (p2)-[:SOLUTION { sort: 3 }]->(s23),
    (p2)-[:SOLUTION { sort: 4 }]->(s24),
    (p2)-[:SOLUTION { sort: 5 }]->(s25),
    (p2)-[:SOLUTION { sort: 6 }]->(s26),
    (p2)-[:SOLUTION { sort: 7 }]->(s27)

