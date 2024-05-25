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

/* M-6.5 */

/* M-6.6 */

/* M-6.7 */

/* M-6.8 */

/* M-6.9 */

/* M-6.10 */