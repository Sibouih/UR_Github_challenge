//This file is created by Lahcen SIBOUIH
//Building a REST Microservice giving a list of languages used by the 100 trending public repos on GitHub

//Construction of the API
const app = document.getElementById('content');
const Pagination = document.createElement('div')
const container = document.createElement('div');
container.setAttribute('class', 'container row row-flex');
const loader = document.getElementById('loader')
const Statistique = document.getElementById('Statistique')
const trending = document.getElementById('trending')

//Getting the canva element to show statistiques
const chart = document.getElementById('statChart')
app.appendChild(container);
var bntPagination
var btnRepos
app.appendChild(Pagination)
var LanguagesStatistique = []

//Needed variables
var currentPage = 0 //the current page
var allRepos = [] //this array contain all languages (json format)
var allReposLanguages = [] //this array contain all languges (just language in string)
var UniqLanguages = [] //this array contain UniqLanguages (duplicated languages are removed)
var NmbrReposByLanguages = [] //array contain the number of repos by language

window.onload = function() {
    onLoadAllRepos() //call all Repos
}

//Needed variables
async function onLoadAllRepos() {
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
        data.items.forEach(l => {
            allRepos.push(l)
            if (l.language != null)
                allReposLanguages.push(l.language)
        });
        loader.style.display = 'none'
        getReposToHomePage(0)
    }
    request.send();
}