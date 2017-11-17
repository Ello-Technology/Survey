
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

Survey.JsonObject.metaData.addProperty("dropdown", {name: "renderAs", default: "standard", choices: ["standard", "imagepicker"]});

window.survey = new Survey.Model({ title: 'Rate your experience – Answer 3 questions', showProgressBar: 'top',showQuestionNumbers: 'off', pages: [{
    questions: [

        {
            type: "text",
            isRequired: true,
            name: "Company Name:"
        }



    ]},{ questions: [
{
        type: "rating",
        name: "department",
        rateValues: [
            {
                value: "TechnicalTeam",
                text: "Technical Team"
            },
            {
                value: "SalesTeam",
                text: "Sales Team"
            },
            {
                value: "AdminTeam",
                text: "Admin Team"
            },
            {
                value: "NetworkingTeam",
                text: "Networking Team"
            },

        ],
        title: "The Ello representative who assisted you falls in which department?"
    },

    { type: "dropdown", name: "Technical Team", visibleIf: "{department} == TechnicalTeam", renderAs: "imagepicker", title: "Please select the Ello representative:",
        choices: [
            {value: "Aphiwe", text: "images/Aphiwe.png"},
            {value: "Awi", text: "images/Awi.png"},
            {value: "Bennie", text: "images/Bennie.png"},
            {value: "Danté", text: "images/Danté.png"},
            {value: "Davin", text: "images/Davin.png"},
            {value: "Dehan", text: "images/Dehan.png"},
            {value: "Garry", text: "images/Garry.png"},
            {value: "George", text: "images/George.png"},
            {value: "Jayson", text: "images/Jayson.png"},
            {value: "Johan", text: "images/Johan.png"},
            {value: "JonathanNaude", text: "images/JonathanN.png"},
            {value: "Les", text: "images/Les.png"},
            {value: "Michael", text: "images/Michael.png"},
            {value: "Petrie", text: "images/Petrie.png"},
            {value: "Tyrone", text: "images/Tyrone.png"},
            {value: "WernerP", text: "images/WernerP.png"},
         ]
    },

    { type: "dropdown", name: "Sales Team", visibleIf: "{department} == SalesTeam", renderAs: "imagepicker", title: "Please select to customer representative in question:",
        choices: [
            {value: "Alex", text: "images/Alexander.png"},

            {value: "Deon", text: "images/Deon.png"},

            {value: "Hannelie", text: "images/Hannelie.png"},

            {value: "JonathanW", text: "images/Jonathan.png"},
                        
            {value: "Francois", text: "images/Francois.png"},
            {value: "Rory", text: "images/Rory.png"},
            
            {value: "Amber", text: "images/Amber.png"}
        ]
    },

    { type: "dropdown", name: "Admin Team", visibleIf: "{department} == AdminTeam", renderAs: "imagepicker", title: "Please select to customer representative in question:",
        choices: [
            {value: "Hesphia", text: "images/Hesphia.png"},
            {value: "Kayla", text: "images/Kayla.png"},

            {value: "Marisha", text: "images/Marisha.png"},
            {value: "Rozanne", text: "images/Rozanne.png"},

        ]
    },
    { type: "dropdown", name: "Networking Team", visibleIf: "{department} == NetworkingTeam", renderAs: "imagepicker", title: "Please select to customer representative in question:",
        choices: [
          {value: "Augustine", text: "images/Augustine.png"},
          {value: "Russel", text: "images/Russel.png"},
          {value: "Tino", text: "images/Tino.png"},

        ]
    },


        { type: "rating", name: "FriendlyAndHelpful", title: "Did you find the Ello representative you selected friendly and helpful?",
            mininumRateDescription: "Needs Improvement", maximumRateDescription: "Awesome Experience" },
        { type: "rating", name: "Urgency",
            title: "When dealing with the selected Ello representative, did you feel the urgency of your request was met?",
            mininumRateDescription: "Needs Improvement", maximumRateDescription: "Awesome Experience" },
    { type: "rating", name: "Promise",
        title: "Did you feel that all promises made by the Ello representative were met?",
        mininumRateDescription: "Needs Improvement", maximumRateDescription: "Awesome Experience" },



    { type: "comment", name: "suggestions", title:"Have your say:" },

    {
        type: "radiogroup",
        choices: [
        "Yes",
        "No"
        ],
        name: "Would you like to receive feedback Y / N  "
     }
]}
],
  completedHtml: "<p><h4>Thank you for completing the survey!</h4></p><button onClick={window.location.reload()}>Retake Survey</button>"
});



    //survey.onComplete.add(function(result) {
	//document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
    //});

var widget = {
    name: "imagepicker",
    isFit : function(question) { return question["renderAs"] === 'imagepicker'; },
    isDefaultRender: true,
    afterRender: function(question, el) {

        var $el = $(el).find("select");

        var options = $el.find('option');
        for (var i=1; i<options.length; i++) {
            $(options[i]).data("imgSrc", options[i].text);
            options[i].selected = question.value == options[i].value;
        }
        $el.imagepicker({
            hide_select : true,
            show_label  : false,
            selected: function(opts) {
                question.value = opts.picker.select[0].value;
            }
        })
    }

        ,
        willUnmount: function(question, el) {
            var $el = $(el).find("select");
            $el.data('picker').destroy();
        }

}

Survey.CustomWidgetCollection.Instance.addCustomWidget(widget);




ReactDOM.render(<Survey.Survey model={survey}/>, document.getElementById("surveyElement"));



window.surveyForceUpdate = function() {
    document.getElementById("surveyElement").innerHTML = "";

    ReactDOM.render(<Survey.Survey model={survey}/>, document.getElementById("surveyElement"));

}




survey.onComplete.add (function (result) {
// Initialize Firebase
    var config = {
        apiKey: "AIzaSyCjt34AnxhfJJmS5d1H5P6PobE7Rif8sHY",
        authDomain: "satisfactionsurvey-b7928.firebaseapp.com",
        databaseURL: "https://satisfactionsurvey-b7928.firebaseio.com",
        projectId: "satisfactionsurvey-b7928",
        storageBucket: "satisfactionsurvey-b7928.appspot.com",
        messagingSenderId: "777918522429"

    };
    firebase.initializeApp(config);

    const preObject = document.getElementById('object');

    const dbRefObject = firebase.database().ref().child('object');

    dbRefObject.push().set(result.data);

    dbRefObject.on('value', snap => console.log(snap.val()));

});


