var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('speakerdb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'speakerdb' database");
        db.collection('speakers', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'speakers' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving speaker: ' + id);
    db.collection('speakers', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('speakers', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addSpeaker = function(req, res) {
    var speaker = req.body;
    console.log('Adding speaker: ' + JSON.stringify(speaker));
    db.collection('speakers', function(err, collection) {
        collection.insert(speaker, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateSpeaker = function(req, res) {
    var id = req.params.id;
    var speaker = req.body;
    delete speaker._id;
    console.log('Updating speaker: ' + id);
    console.log(JSON.stringify(speaker));
    db.collection('speakers', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, speaker, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating speaker: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(speaker);
            }
        });
    });
}

exports.deleteSpeaker = function(req, res) {
    var id = req.params.id;
    console.log('Deleting speaker: ' + id);
    db.collection('speakers', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var speakers = [
        {
            name: "Joel Sant Mirs",
            company: "Sadistico Records",
            skills: "Development",
            country: "Mexico",
            title: "MongoDB and Node.js.",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Fernando Monteiro",
            company: "newaeonweb",
            skills: "Development",
            country: "Brazil",
            title: "JavaScript Performance",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Phillip A",
            company: "NoSQL Now",
            skills: "Data Base",
            country: "USA",
            title: "Analog between SQL and NoSQL",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Mary Sunshine Brett",
            company: "InNm",
            skills: "Design",
            country: "USA",
            title: "Impressive Design",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Jeremy Ashkenas",
            company: "BB",
            skills: "Development",
            country: "USA",
            title: "Backbone, Backbone, Backbone",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Antonip Trivalle Cavets",
            company: "Slim Co.",
            skills: "Development",
            country: "Italy",
            title: "Whats on PHP 5 ",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Catherine Sillas",
            company: "Brunette Visual",
            skills: "Data Base",
            country: "France",
            title: "Perfromance on MongoDB",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Bruce Armandi",
            company: "Interactive",
            skills: "Development",
            country: "France",
            title: "Building an API with Rails",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Martin Exx.",
            company: "Code Now",
            skills: "Development",
            country: "USA",
            title: "Starting with Rails",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "John Doe",
            company: "Design for Future",
            skills: "UX",
            country: "USA",
            title: "User Experience on Mobile",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Ricco Friggas",
            company: "Friggas Studio",
            skills: "Design",
            country: "Argentina",
            title: "Web now",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Clare Notree Mar",
            company: "Build Co.",
            skills: "UX",
            country: "France",
            title: "Sales on IT",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Silvester Joshua",
            company: "Build Co.",
            skills: "Development",
            country: "Norway",
            title: "RWD and Mobile First",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Cliff B",
            company: "Metal Media",
            skills: "Development",
            country: "Spain",
            title: "Single Page Application how to",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Mark Miller",
            company: "Miller",
            skills: "Design",
            country: "Spain",
            title: "Do first and do better",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Oliver Marshall",
            company: "Studio A",
            skills: "Development",
            country: "USA",
            title: "HTML5 API",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "John Krammer",
            company: "Krammer Coding",
            skills: "Development",
            country: "USA",
            title: "SASS and Compass",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "João Macedo",
            company: "newaeonweb",
            skills: "Design",
            country: "Brazil",
            title: "Design for people",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Alex J. B.",
            company: "Freelancer",
            skills: "Development",
            country: "USA",
            title: "Building Frameworks the right way",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Joe",
            company: "MD5",
            skills: "Development",
            country: "USA",
            title: "Introdution to DART",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Diva Jones",
            company: "Make 4 people",
            skills: "Design",
            country: "USA",
            title: "What is Design?",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Allan Van K.",
            company: "VanK Code",
            skills: "Development",
            country: "France",
            title: "How to use Ember.js",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Eggberg",
            company: "Angular X",
            skills: "Development",
            country: "New Zealand",
            title: "Angular.js in action",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        },
        {
            name: "Billy Haiss",
            company: "Freelancer",
            skills: "Design",
            country: "USA",
            title: "Flex-box now",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            picture: "sample-image.jpg"
        }];

    db.collection('speakers', function(err, collection) {
        collection.insert(speakers, {safe:true}, function(err, result) {});
    });

};