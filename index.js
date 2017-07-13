
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

Survey.JsonObject.metaData.addProperty("dropdown", {name: "renderAs", default: "standard", choices: ["standard", "imagepicker"]});

window.survey = new Survey.Model({ title: 'Satisfaction Survey', showProgressBar: 'top', pages: [{
    questions: [

        {
            type: "text",
            isRequired: true,
            name: "Email:"
        }



    ]},{ questions: [
{
        type: "rating",
        name: "department",
        rateValues: [
            {
                value: "ServiceDesk",
                text: "Service Desk"
            },
            {
                value: "Sales",
                text: "Sales"
            },
            {
                value: "Projects",
                text: "Projects"
            },
            {
                value: "Accounts",
                text: "Accounts"
            },
		{
                value: "Support",
                text: "Support"
            }
        ],
        title: "The Ello represeantitve who assisted you falls in which department?"
    },

    { type: "dropdown", name: "Service Desk", visibleIf: "{department} == ServiceDesk", renderAs: "imagepicker", title: "Please select the Ello representative:",
        choices: [
            {value: "Dehan", text: "images/Dehan.png"},
            {value: "Michael", text: "images/Michael.png"},
            {value: "Awi", text: "images/Awi.png"},
            {value: "Kyle", text: "images/Kyle.png"},
            {value: "Jayson", text: "images/Jayson.png"},
            {value: "Les", text: "images/Les.png"},
            {value: "Petrie", text: "images/Petrie.png"},
            {value: "Tyrone", text: "images/Tyrone.png"},
            {value: "Danté", text: "images/Danté.png"},
            {value: "George", text: "images/George.png"}


        ]
    },

    { type: "dropdown", name: "Sales", visibleIf: "{department} == Sales", renderAs: "imagepicker", title: "Please select to customer representative in question:",
        choices: [
             {value: "Rory", text: "images/Rory.png"},
            {value: "Francois", text: "images/Francois.png"},
            {value: "Alex", text: "images/Alexander.png"},
            {value: "WernerS", text: "images/WernerS.png"},
            {value: "Anneli", text: "images/Anneli.png"},
            {value: "Sharné", text: "images/Sharné.png"},
            {value: "Hannelie", text: "images/Hannelie.png"},
            {value: "Jonathan", text: "images/Jonathan.png"},
            {value: "Deon", text: "images/Deon.png"}
        ]
    },

    { type: "dropdown", name: "Projects", visibleIf: "{department} == Projects", renderAs: "imagepicker", title: "Please select to customer representative in question:",
        choices: [
            {value: "Les", text: "images/Les.png"},
            {value: "Werner", text: "images/WernerP.png"}
        ]
    },

    { type: "dropdown", name: "Accounts", visibleIf: "{department} == Accounts", renderAs: "imagepicker", title: "Please select to customer representative in question:",
        choices: [
            {value: "Phillip", text: "images/Phillip.png"},
            {value: "Rory", text: "images/Marisha.png"},
            {value: "Fatiema", text: "images/Fatiema.png"}

        ]
    },
	     { type: "dropdown", name: "Support", visibleIf: "{department} == Support", renderAs: "imagepicker", title: "Please select the Ello representative:",
        choices: [
            {value: "Dehan", text: "images/Garry.png"},
            {value: "Michael", text: "images/Amber.png"},
            {value: "Awi", text: "images/Rozanne.png"},
            {value: "Kyle", text: "images/Hesphia.png"},
            {value: "Jayson", text: "images/Evert.png"},
            {value: "Les", text: "images/Bennie.png"},
            {value: "Petrie", text: "images/Aphiwe.png"},
            {value: "Davin", text: "images/Davin.png"}


        ]
    },

        { type: "rating", name: "FriendlyAndHelpful", title: " Did you find the Ello representative was friendly and helpful?",
            mininumRateDescription: "Not Satisfied", maximumRateDescription: "Completely satisfied" },
        { type: "rating", name: "Urgency",
            title: "When dealing with an ello representative, do you feel the way you were dealt with was with the urgency you expected?",
            mininumRateDescription: "Not Satisfied", maximumRateDescription: "Completely Satisfied" },
    { type: "rating", name: "Promise",
        title: "Do you feel that the Ello representative kept there promise?",
        mininumRateDescription: "Not Satisfied", maximumRateDescription: "Completely Satisfied" },



    { type: "comment", name: "suggestions", title:"Please suggest any improvements that Ello could make (optional):", }
]}
]});

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


