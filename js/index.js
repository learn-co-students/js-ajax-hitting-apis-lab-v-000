function getRepositories(){
    const username = document.getElementById('username').value;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', `https://api.github.com/users/${username}/repos`);
    req.send();
}

function getCommits(repoJsonRep){
    const repository = repoJsonRep.dataset.repository;
    const username = repoJsonRep.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', `https://api.github.com/repos/${username}/${repository}/commits`);
    req.send();
}

function getBranches(repoJsonRep){
    const repository = repoJsonRep.dataset.repository;
    const username = repoJsonRep.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', `https://api.github.com/repos/${username}/${repository}/branches`);
    req.send();
}

function displayCommits(){
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
        .map( 
            commit => 
            '<li>' + commit.committer.login + ' ' + commit.commit.author.name + ' ' + commit.commit.message + '</li>'
            )}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
}

function displayBranches(){
    const branches = JSON.parse(this.responseText);
    // console.log(branches);
    const branchesList = `<ul>${branches
        .map( 
            branch => 
            '<li>' + branch.name + '</li>'
            ).join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
}

function displayRepositories(){
    const repos = JSON.parse(this.responseText);
    const repoList = `<ul>${repos
        .map(
          r =>
            '<li>' + '<a href="' + r.html_url + '">' + 
            r.name + '</a> - <a href="#" data-repo="' + 
            r.name + '" data-username="' +
            r.owner.login +
            '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo="' + 
            r.name + '" data-username="' +
            r.owner.login +
            '" onclick="getBranches(this)">Get Branches</a></li>'
        )
        .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}