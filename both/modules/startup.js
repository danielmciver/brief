let startup = () => {};

Modules.both.startup = startup;



Briefs = new Mongo.Collection("briefs");
Briefs.attachSchema(new SimpleSchema({
  origin_type:
  {
    type: String,
    label: "Origin"
  },
  title:
  {
    type: String,
    label: "Title"
  },
  description:
  {
    type: String,
    label: "Description",
    optional: true
  },
  created:
  {
    type: Date,
    label: "Created"
  },
  resource:
  {
    type: String,
    label: "From"
  }
}));

TabularTables = {};

/*
 db.briefs.insert(
 {
 origin_type: "email",
 user_created: "Heather Paige",
 title: "screen mock ups",
 description:  "Get the screen mocks ups done.",
 created: new Date()
 }
 );
 */
// https://github.com/aldeed/meteor-tabular#example
/*
db.resources.insert(
  {
    "name": "Daniel McIver",
    "role": "Solutions Architect",
    "team": "Architecture",
    "outOfOffice": "2016-02-23T18:25:43.511Z",
    "vacation": "2016-02-23T18:25:43.511Z",
    "w1": 53,
    "w2": 41,
    "w3": 23,
    "w4": 12,
    "responseTime": 9,
    "tasks": 9,
    "questions": 11,
    "photo": "img/daniel_mciver.jpg",
    "fav": true,
    "review": 4.2,
    "cost": 90,
    "timeZoneOffset": -1,
    "currentLocation": "Chicago, IL"
  }
);
*/
TabularTables.Briefs = new Tabular.Table(
  {
    name: "Briefs",
    collection: Briefs,
    columns: [
      {
        data: "origin_type",
        title: "Origin",
        tmpl: Meteor.isClient && Template.origin
      },
      {
        data: "user_created",
        title: "From"
      },
      {
        data: "title",
        title: "Subject"
      },
      {
        data: "created",
        title: "Sent",
        render: function (val, type, doc)
        {
          if (val instanceof Date)
          {
            return moment(val).calendar();
          }
          else
          {
            return "";
          }
        }
      }
    ],
    responsive: true,
    autoWidth: false
  });
