// your code here

function getRepositories(){
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/'+ username +'/repos');
  req.send();
}

function getCommits(el){
    const owner = el.dataset.username;
    const repo = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/'+ owner +'/'+repo+'/commits');
    req.send();
}

function getBranches(el){
    const owner = el.dataset.username;
    const repo = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/'+ owner +'/'+repo+'/branches');
    req.send();
}


function displayRepositories(){
  const repos = JSON.parse(this.responseText);
  console.log(repos)
  const repoList = `<ul>${repos.map(
    r =>
      '<li>' +
      r.name +
      '<br> https://github.com/'+ r.owner.login + '/' + r.name +
      '<br><a href="#" data-username="'+ r.owner.login + '"data-repository="' + r.name +'"onclick="getCommits(this)">GetCommits</a>' +
      '<br><a href="#" data-username="'+ r.owner.login + '"data-repository="' + r.name +'"onclick="getBranches(this)">GetBranches</a></li>')
      .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>'+commit.commit.author.name+' ('+commit.author.login+')</strong>'+commit.commit.message+'</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li>'+branch.name+'</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList     
}