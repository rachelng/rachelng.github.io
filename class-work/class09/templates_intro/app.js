var ourClass = [
    {
        name: 'Chandler',
        role: 'Instructor',
    },
    {
        name: 'Matt',
        role: 'Student',
    },
    {
        name: 'Rachel',
        role: 'Student',
    },
    {
        name: 'Ari',
        role: 'Student',
    },
    {
        name: 'Rish',
        role: 'Student',
    },
    {
        name: 'Jessie',
        role: 'Student',
    },
    {
        name: 'Yogi',
        role: 'Student',
    },
    {
        name: 'Lewis',
        role: 'Student',
    },
    {
        name: 'Sino',
        role: 'Student',
    },
    {
        name: 'Desmond',
        role: 'Student',
    },
]

// ourClass.forEach(function(person) {
//     $('#class-list')
//         .append('<h4>' + person.name + '</h4>')
//         .append('<h6>' + person.role + '</h6>') 
//         .append('<hr />')
// }) 

var source = $('#person-template').html()
var template = Handlebars.compile(source)

// 3
var classTemplate = template(ourClass)

// 4
$('#person').append(classTemplate)
