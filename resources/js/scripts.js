//Building a REST Microservice giving a list of languages used by the 100 trending public repos on GitHub
//To show framework popularity over the 100 repos I drawed a bar graph using chartJs

//Construction of the API
const app = document.getElementById('content');
var chartDiv = document.getElementById('chart');
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
var NbrReposByLanguages = [] // an array that contains the number of repos by language

//Needed variables
var allRepos = [] //this array contain all languages (json format)
var allReposLanguages = [] //this array contains all languages
var FilteredLanguages = [] //this array contains FilteredLanguages (duplicated languages are removed)

window.onload = function() {
    getAllRepos() //call all Repos
}

//Needed variables
async function getAllRepos() {
    chartDiv.style.display = "none"
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
        icon.textContent = 'See repository'
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
    reposButton = document.querySelectorAll('.repos')
    reposButton.forEach(rb => {
        rb.addEventListener('click', () => clickRepo(rb))
    })

}

//Display repositories of every language
function showLanguagesRepos(name, repos) {
    const divTitle = document.createElement('div');
    const rep = document.createElement('p');
    divTitle.setAttribute("style", "margin-left: 24em;display: flex;margin-top: 1em")
    rep.setAttribute("id", "nbrRep")
    rep.textContent = name + " Repositories : " + repos.length
    const repPic = document.createElement('img');
    repPic.setAttribute("src", "https://img.icons8.com/carbon-copy/100/000000/repository.png")
    repPic.setAttribute("style", "width: 31px;height: 28px;")
    divTitle.appendChild(repPic)
    divTitle.appendChild(rep)
    app.appendChild(divTitle);
    app.appendChild(container)
    repos.forEach(r => {
        const col = document.createElement('div');
        col.setAttribute('class', 'content col-12 row row-flex');
        col.setAttribute('id', 'flex-card');
        const div = document.createElement('div');
        div.setAttribute("class", "repo-card text-left")

        //name of repo
        const a = document.createElement('a');
        a.href = r.html_url
        a.setAttribute('target', "_blank")
        const h4 = document.createElement('h4');
        h4.setAttribute('id', "repoTitle")
        h4.textContent = r.name
        const p = document.createElement('p');
        p.setAttribute("id", "repoDesc")

        //description of repos
        p.textContent = (r.description).slice(0, 200) + "..."

        //stars
        const spanStars = document.createElement('span');
        const iStars = document.createElement('i')
        iStars.setAttribute("class", "fa fa-star")
        iStars.textContent = ' ' + r.watchers_count

        //owner picture
        const spanOwner = document.createElement('span');
        const imgOwner = document.createElement('img')
        const aOwner = document.createElement('a')
        aOwner.href = r.owner.html_url

        aOwner.setAttribute('target', "_blank")
        imgOwner.setAttribute("class", "img-fluid")
        imgOwner.setAttribute("width", '20')
        imgOwner.setAttribute("height", '20')
        imgOwner.src = r.owner.avatar_url
        spanOwner.textContent = r.owner.login + ' '
        spanOwner.setAttribute("style", "margin-left:30px")

        //Add all elements to container
        container.setAttribute("style", "display:flex;justify-content:center;")
        aOwner.appendChild(imgOwner)
        spanStars.appendChild(iStars)
        spanOwner.appendChild(aOwner)
        a.appendChild(h4)
        div.appendChild(a)
        div.appendChild(p)
        div.appendChild(spanStars)
        div.appendChild(spanOwner)
        col.appendChild(div)
        container.appendChild(col)

    })