//Building a REST Microservice giving a list of languages used by the 100 trending public repos on GitHub

//Construction of the API
const app = document.getElementById('content');
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
var LanguagesStatistique = []

//Needed variables
var allRepos = [] //this array contain all languages (json format)
var allReposLanguages = [] //this array contains all languages
var FilteredLanguages = [] //this array contains FilteredLanguages (duplicated languages are removed)

window.onload = function() {
    getAllRepos() //call all Repos
}

//Needed variables
async function getAllRepos() {
    container.innerHTML = ''
    var request = new XMLHttpRequest();
    loader.style.display = 'flex'
    var res = await request.open('GET', 'https://api.github.com/search/repositories?q=page=0&per_page=100&sort=stars&order=desc', true);
    request.onload = function() {

        //JSON data
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
        getRepos()
    }
    request.send();
}

//function to filter duplicated repos
function getFilteredLanguages(Repos) {
    FilteredLanguages = []

    function filterDup(value, index, self) {
        return self.indexOf(value) === index;
    }
    FilteredLanguages = Repos.filter(filterDup);
}

//function getRepos() to get all repositories
function getRepos() {
    getFilteredLanguages(allReposLanguages) //calling the function getFilteredLanguages
    displayRepos() //calling the function displayRepos to display all repos as cards
}

//Create a card for every repos and assign it to the container
function displayRepos() {
    FilteredLanguages.forEach(l => {
        const col = document.createElement('div');
        col.setAttribute('class', 'col-4');
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        const h3 = document.createElement('h3');
        h3.setAttribute('id', 'card_elmnt_title');
        const img = document.createElement('img');
        h3.textContent = l;
        const repos = document.createElement('button');
        const icon = document.createElement('span')
        icon.textContent = 'See repos'
        icon.style.textTransform = "lowercase";
        icon.setAttribute('id', 'icon');
        repos.appendChild(icon)
        repos.setAttribute('class', 'btn btn-outline');
        repos.setAttribute('id', 'card_button');
        repos.name = l
        repos.classList.add("repos")
        col.appendChild(card)
        container.appendChild(col);
        card.appendChild(h3);
        card.appendChild(repos)
    })

}