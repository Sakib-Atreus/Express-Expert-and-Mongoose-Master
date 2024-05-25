// Module Practice

/* M-6.1 */
            db.test.aggregate([
                // stage-1
                { $match: { gender: "Male", age : { $lte : 25 }} },
                // stage-2
                { $project: { name: 1, gender: 1, age: 1 }},
            ])

/* M-6.2 */
            db.test.aggregate([
                // stage-1
                { $match: { gender: "Male", age : { $lte : 25 }} },
                // stage-2
                { $addFields: { course : "Level-2", eduTech: "Programming Hero"} },
                // stage-3
                { $project: { name: 1, gender: 1, age: 1, course: 1, eduTech: 1}},
                // // stage-4
                // { $out: "course-students"},  // For create new database table
                // stage-4
                { $merge: "test"} // For merge new create (course-students) to test database table
            ])

/* M-6.3 */
            // db.test.aggregate([
            //     //stage-1
            //     { $group: { _id: "$gender", count: { $sum : 1}}},       // Group module practice
            //     //stage-2
            //     { $project: { gender: 1 , count: 1}},
            //     ])

            db.test.aggregate([
                //stage-1
                { $group: { _id: "$age", count: { $sum : 1},
                    // fullDoc: { $push : "$name"}
                    fullDoc: { $push: "$$ROOT" }
                }},
                
                //stage-2
                { $project: { "fullDoc.name": 1,  "fullDoc.email": 1, "fullDoc.phone": 1}}
            ])

/* M-6.4 */
            db.test.aggregate([
                //stage-1
                { $group: { _id: null,
                    totalSalary: { $sum: "$salary" },
                    maxSalary: { $max: "$salary" },
                    minSalary: { $min: "$salary" },
                    avgSalary: { $avg: "$salary" }
                }},
                //stage-2
                { $project: {
                    totalSalary: 1,
                    maxSalary: 1,
                    minSalary: 1,
                    averageSalary: "avgSalary",
                    rangeBetweenMaxAndMin: { $subtract: ["$maxSalary", "$minSalary"]}
                }}
            ])

/* M-6.5 */
            db.test.aggregate([
                // //stage-1
                // { $unwind: "$friends"},
                // //stage-2
                // { $group: { _id: "$friends", count: { $sum: 1}}},
                
                // Another Example
                
                //stage-1
                { $unwind: "$interests"},
                //stage-2
                { $group: { _id: "$age", interestPerAge: { $push: "$interests"}, count: { $sum: 1}}}
                
            ])

/* M-6.6 */
            db.test.aggregate([
                //stage-1
                {
                    $bucket: {
                        groupBy: "$age",
                        boundaries: [ 20, 40, 60, 80 ],
                        default: "80 er upore bura",
                        output: {
                            count: { $sum: 1 },
                            // who : { $push: "$name" }
                            allUsers : { $push : "$$ROOT" }
                        }
                        }
                },
                //stage-2
                {
                    $sort: { count: -1}
                },
                //stage-3
                {
                    $limit: 2 // For how much data show
                },
                //stage-4
                {
                    $project: {
                        count: 1
                    }
                }
            ])

/* M-6.7 */
            db.test.aggregate([
                {
                    $facet: {
                        //pipeline-1
                        "friendsCount" : [
                            //stage-1
                            { $unwind: "$friends"},
                            //stage-2
                            { $group: { _id: "$friends", count: { $sum: 1 }}}
                        ],
                        //pipeline-2
                        "educationCount" : [
                            //stage-1
                            { $unwind: "$education"},
                            //stage-2
                            { $group: { _id: "$education", count: { $sum: 1 }}}
                        ],
                        //pipeline-3
                        "skillsCount" : [
                            //stage-1
                            { $unwind: "$skills"},
                            //stage-2
                            { $group: { _id: "$skills", count: { $sum: 1 }}}
                        ]
                    }
                }
            ])

/* M-6.8 */
            db.orders.aggregate([
                {
                    $lookup: {
                        from: "test",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user"
                        }
                }
            ])

/* M-6.9 */
            // For CollScan
            db.test.find({email : "weffnert2r@networkadvertising.org"}).explain("executionStats")

            // For indexing
            db.getCollection("massive-data").createIndex({email : 1})

/* M-6.10 */
            // For remove indexing
            db.getCollection("massive-data").dropIndex({email : 1})

            // Set for text search individual
            db.getCollection("massive-data").createIndex({ about : "text" })

            // Now for find the text
            db.getCollection("massive-data").find({ $text: { $search: "dolor" }}).project({ about : 1})
            