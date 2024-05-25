/* 1. */ db.test.find({ age : { $gt : 30}}, { name:1 , email: 1})

/* 2. */ db.test.find({ $or : [ { favoutiteColor : "Maroon" }, { favoutiteColor : "Blue"}]}, {skills: 1})

/* 3. */ db.test.find({skills: []}, {skills: 1})

/* 4. */ db.test.find({ $and : [ {"skills.name" : "JAVASCRIPT" }, { "skills.name" : "JAVA"}]}, {skills: 1})

/* 5. */ db.test.updateMany(
    {
        skills: {
            name: "PYTHON", level: "Beginner", isLearning: true
        }
    },
    {
        $push: { skills : { email: "aminextleveldeveloper@gmail.com" } }
    }
    
)

/* 6. */ db.test.updateOne(
	{
    	    _id : ObjectId("6406ad65fc13ae5a400000c7")
        },
        { $push: {
              languages: "Spanish",
              }
        }
    )

/* 7. */ db.test.updateMany(
    { },
    { $pull: { skills : { name : "KOTLIN"}}})
