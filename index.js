const rootURL = 'https://api.github.com/'

function getRepositories(){
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("get", rootURL + 'users/' + username + '/repos');
  req.send() ;
};

function displayRepositories(){
  var repos = JSON.parse(this.responseText);
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
      <li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
      </li>`
      )}).join('') + "</ul>";
    document.getElementById('repositories').innerHTML = repoList;
};

function getCommits(el){
  const name = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("get", rootURL + 'repos/' + name + '/' + repo + '/commits');
  req.send();
};

function displayCommits(){
  var commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.committer.name + " - " + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
};

function getBranches(el){
  const name = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("get", rootURL + 'repos/' + name + '/' + repo + '/branches');
  req.send();
};

function displayBranches(){
  var branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
};
