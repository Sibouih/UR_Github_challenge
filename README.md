## UR Github challenge

![](https://www.imageupload.net/upload-image/2020/01/31/trending83a5b139a80caf72.png)


> Develop a REST microservice that list the languages used by the 100 trending public repos on GitHub.
> For every language, you need to calculate the attributes below :
> - Number of repos using this language
> - The list of repos using the language
> - Framework popularity over the 100 repos

#### Highlights of the implementation
* I have used native javascript to implement this project.
* The architecture is following the Clean code basics.
* To get the 100 trending repos, I have used the github search API.

#### Deployment
I have deployed the project on Heroku : https://trending-github-repositories.herokuapp.com

![](https://www.imageupload.net/upload-image/2020/01/31/screen1.png)
![](https://www.imageupload.net/upload-image/2020/01/31/screen2.png)
![](https://www.imageupload.net/upload-image/2020/01/31/screen3.png)

#### Built With
```sh
Material kit library by Creative Tim
Github search api : https://api.github.com/search/repositories?q=page=0&per_page=100&sort=stars&order=desc
```

#### Author
* [lahcen sibouih](https://www.linkedin.com/in/lahcen-sibouih/)
