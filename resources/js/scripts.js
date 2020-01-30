//Building a REST Microservice giving a list of languages used by the 100 trending public repos on GitHub

//Construction of the API
const app = document.getElementById('content');
const Pagination = document.createElement('div')
const container = document.createElement('div');
container.setAttribute('class', 'container row row-flex');
container.setAttribute('id', 'row_flex');
const loader = document.getElementById('loader')
const Statistique = document.getElementById('Statistique')
const trending = document.getElementById('trending')

//Getting the canva element to show statistiques
const chart = document.getElementById('statChart')
app.appendChild(container)
var reposButton
var bntPagination
app.appendChild(Pagination)
var LanguagesStatistique = []

//Needed variables
var allRepos = [] //this array contain all languages (json format)
var allReposLanguages = [] //this array contains all languages
var FilteredLanguages = [] //this array contains FilteredLanguages (duplicated languages are removed)

window.onload = function() {
    GetAllRepos() //call all Repos
}

//Needed variables
async function GetAllRepos() {
    container.innerHTML = ''
    Pagination.innerHTML = ''
    var request = new XMLHttpRequest();
    loader.style.display = 'flex'
    var res = await request.open('GET', 'https://api.github.com/search/repositories?q=page=0&per_page=100&sort=stars&order=desc', true);
    request.onload = function() {

        //Begin accessing JSON data
        var data = JSON.parse(this.response);
        this.itemsSize = data.items.length
        var repos = []
        allRepos = []
        allReposLanguages = []
        data.items.forEach(element => {
            allRepos.push(element)
            if (element.language != null)
                allReposLanguages.push(element.language)
        });

        loader.style.display = 'none'
        getRepos(0)
    }
    request.send();
}

//Function to filter duplicated repos
function getFilteredLanguages(Repos) {
    FilteredLanguages = []

    function filterDup(value, index, self) {
        return self.indexOf(value) === index;
    }
    FilteredLanguages = Repos.filter(filterDup);
}