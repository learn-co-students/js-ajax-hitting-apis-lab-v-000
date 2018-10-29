const rootURL = 'https://api.github.com';

function getRepositories(){
    const name = document.getElementById('username').value;
    const url = rootURL + '/users/' + name + '/repos';
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories); //callback function :that will get called when the event fires
    req.open('GET', url);
    req.send();
}

function displayRepositories(){
    const repos = JSON.parse(this.responseText);
    const repoList = '<ul>' + repos.map(
        repo => {
            const dataUserName = 'data-username"' + repo.owner.login + '"';
            const dataRepoName = 'data-repository"' + repo.name + '"';
            return `
             <li>
                <h2>${repo.name}</h2>
                <a href="${repo.html_url}">${repo.html_url}</a><br>
                <a href="#" ${dataUserName} ${dataRepoName} onclick="getCommits(this)">Get Commits</a><br>
                <a href="#" ${dataUserName} ${dataRepoName} onclick="getBranches(this)">Get Branches</a><br>
             </li> `
        })
        .join(''); + 
    '</ul>';

    document.getElementById('repositories').innerHTML = repoList;

    
    // const repoList = `<ul>${repos
    //     .map(
    //         r =>
    //           '<li>' +
    //           r.name +
    //           ' - <a href="#" data-repo="' +
    //           r.name +
    //           '" onclick="getCommits(this)">Get Commits</a></li>'
    //       )
    //       .join('')}</ul>`;
    // document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el){
    const repoName = el.dataset.repository;
    const uri = rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/commits';
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', uri);
    req.send();
}

function displayCommits(){
    var commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits.map(
        com =>
            '<li><h3>' + 
            com.author.login +
            ' (' + com.commit.author.name + ') </h3>' + 
            com.commit.message + '</li>'
        ).join('')
    }</ul>`;

    document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el){
    const repoName = el.dataset.repository
    const uri = rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/branches'
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', uri);
    req.send();
}

function displayBranches(){
    var branches = JSON.parse(this.responseText);
    var branchesList = `<ul>${branches
        .map(branch => '<li>' + branch.name + '</li>')
        .join('')}</ul>`;

    document.getElementById('details').innerHTML = branchesList;
}