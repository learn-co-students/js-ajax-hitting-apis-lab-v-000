const rootURL = 'https://api.github.com'

function getRepositories() {
    let username = document.getElementById('username').value
    let uri = rootURL + '/users/' + username + '/repos';
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', displayRepositories);
    xhr.open('GET', uri);
    xhr.send();
}

function displayRepositories() {
    const repos = JSON.parse(this.responseText)
    console.log(repos);
    const repoList = `<ul>${repos.map(repo => 
        '<li><h4>' + repo.name + '</h4></li>' +
        ' <a href="' + repo.html_url + '">URL</a>' +
        ' - <a href="#" data-repo="'+repo.name+'" ' + 
        ' onclick="getCommits(this)">Get Commits</a> ' + 
        ' - <a href="#" data-repo="'+repo.name+'" ' +
        ' onclick="getBranches(this)">Get Branches</a> ' 
        ).join(' ')}</ul>`;
    
    document.getElementById("repositories").innerHTML = repoList
} // '<li><h4>' + repo.name + '</h4></li> - <a href="' + repo.html_url + '">URL</a> - <a href="#" data-repo="' + repo.name + '"onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo="' + repo.name + '"onclick="getBranches(this)">Get Branches<a>' 

function getCommits(element) {
    const username = document.getElementById('username').value
    const repo_name = element.dataset.repo;
    const uri = rootURL + '/repos/' + username + '/' + repo_name + '/commits'
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', uri);
    req.send();
}

function displayCommits() {
    const commits = JSON.parse(this.responseText)
    console.log(commits);
    const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> -' + '<strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`

    document.getElementById("details").innerHTML = commitsList
}

