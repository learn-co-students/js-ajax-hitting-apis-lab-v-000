const rootPath = 'https://api.github.com/'

function getRepositories(page = 1){
    const username = document.querySelector('#username').value;
    const req = new XMLHttpRequest();
    let path = rootPath + `users/${username}/repos`
    path = addQueries(path, {page: page, per_page: 100})
    req.open('get', path);
    req.addEventListener('load', () => displayRepositories.call(req, page));
    req.send();
}

function displayRepositories(page = 1){
    let repositories = JSON.parse(this.responseText);
    if(repositories.length > 0){
        getRepositories(page + 1)
    }
    showRepos(repositories, page == 1);
}

function showRepos(repos, overwrite = true){
    const repoDiv = document.querySelector('#repositories');
    html = `<ul>${repos.map(r => 
        '<li>' + r.name 
        + ' :: <a href="' + r.html_url + '">'+ r.html_url + '</a>' 
        + ' :: <a href="#" onclick="getCommits(this)" data-commitpath="' + r.commits_url + '">Get Commits</a>'
        + ' :: <a href="#" onclick="getBranches(this)" data-username="' + r.owner.login + '" data-repository = "' + r.name + '">Get Branches</a>'
        + '</li>'
    ).join('')}</ul>`;
    if(overwrite){
        repoDiv.innerHTML = html;
    }else{
        repoDiv.innerHTML += html;
    }
}

function addQueries(path, queriesObj){
    let postScript = '?'
    for(key in queriesObj){
        postScript += `${key}=${queriesObj[key]}&`
    }
    return path + postScript.slice(0, postScript.length - 1);
}

function getCommits(self){
    console.log("HERE")
    console.log(self)
    let path = self.dataset.commitpath;
    const optionIndex = path.indexOf('{');
    if(optionIndex > -1){
        path = path.slice(0, optionIndex)
    }
    path = addQueries(path, {page: 1, per_page: 100})
    const req = new XMLHttpRequest();
    req.open('get', path);
    req.addEventListener('load', displayCommits);
    req.send();
}

function getBranches(self){
    const username = self.dataset.username;
    const repository = self.dataset.repository;
    let path = `${rootPath}repos/${username}/${repository}/branches`;
    req = new XMLHttpRequest();
    req.open('get', path);
    req.addEventListener('load', displayBranches);
    req.send();
}


function displayCommits(){
    const commitDiv = document.querySelector('#details');
    commitDiv.innerHTML = '<ul>' + JSON.parse(this.responseText).map(commit => (
        `<li>${commit.commit.author.name} :: ${commit.author.login}:: ${commit.commit.message}</li>`
    )).join('') + '</ul>';
}

function displayBranches(){
    const detailsDiv = document.querySelector('#details');
    detailsDiv.innerHTML = '<ul>' + JSON.parse(this.responseText).map(branch => (
        `<li>${branch.name}</li>`
        )).join('') + '</ul>';
}