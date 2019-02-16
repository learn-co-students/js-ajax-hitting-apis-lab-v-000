function getRepositories(){
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}


function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(r => '<li>' + r.html_url + '</li>')
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}


function getCommits(el){
 const username = el.dataset.username;
 const repo = el.dataset.repository;
 const req = new XMLHttpRequest();
 req.addEventListener('load', displayCommits);
 req.open('GET', `https://api.github.com/repos/${username}/${repo}/commits`);
 req.send();
}




function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
  .map(
    commit =>
     '<li><strong>' +
     commit.commit.author.name +
     '/' +
     commit.author.login +
     '</strong> - ' +
     commit.commit.message +
     '</li>'
  )
  .join('')}</ul>`;

 document.getElementById('details').innerHTML = commitsList;
}



function getBranches(el){
  const username = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/branches`);
  req.send();
}




function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
  .map(
    branch =>
    '<li>' +
    branch.name +
    '</li>'
  )
  .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
