const rootUrl = 'https://api.github.com'
const usersRootUrl = rootUrl + '/users/'
const reposRootUrl = rootUrl + '/repos/'

function getRepositories() {
    const xhr = new XMLHttpRequest();
    const username = document.getElementById("username").value;
    xhr.addEventListener("load", displayRepositories)
    xhr.open(`GET`, usersRootUrl + username + '/repos');
    xhr.send();
    // return false => Prevents the default behavior
    return false;
}

function displayRepositories(event, data) {
    const jsonRepos = JSON.parse(this.responseText);
    console.log(jsonRepos)
    const repoList = `<ul>${jsonRepos.map( r=> '<li>' + r.name +
                                                ' - <a href="' + r.html_url + '">' + r.html_url + '</a>' +
                                                ' - <a href="#" data-repository="' + r.name + '" data-username="'+ r.owner.login +
                                                '" onclick="getCommits(this)">Get Commits</a>' +
                                                '- <a href="#" data-repository="' + r.name + '" data-username="'+ r.owner.login +
                                                '" onclick="getBranches(this)">Get Branches</a></li>'
                                            ).join('')}</ul>`;
    document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
    const repoName = el.dataset.repository;
    const owner = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayCommits);
    req.open('GET', reposRootUrl + owner + '/' + repoName + '/commits');
    req.send();
}

function displayCommits(event, data) {
    const jsonCommits = JSON.parse(this.responseText);
    console.log(jsonCommits);
    const commitList = `<ul>${jsonCommits.map( c => '<li>'+ c.author.login + '-' +
                                                            c.commit.author.name + '-' +                                                                     c.commit.message +
                                                    '</li>'
                                                ).join("")}</ul>`;
    document.getElementById("details").innerHTML = commitList;
}

function getBranches(el) {
    const repoName = el.dataset.repository;
    const owner = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayBranches);
    req.open('GET', reposRootUrl + owner + '/' + repoName + '/branches');
    req.send();


}

function displayBranches(event, data) {
    const jsonBranches = JSON.parse(this.responseText);
    console.log(jsonBranches);
    const branchesList = `<ul>${jsonBranches.map( b => '<li>'+ b.name +'</li>'
).join("")}</ul>`;
    document.getElementById("details").innerHTML = branchesList;


}
