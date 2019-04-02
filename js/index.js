function getRepositories() {
  const username = document.getElementById("username").value
  const request = new XMLHttpRequest();
  request.addEventListener('load', displayRepositories);
  request.open('GET', `https://api.github.com/users/${username}/repos`);
  request.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li>' + 
         r.name  
         + r.html_url 
         + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' 
         + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>')
    .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el){
  const username = el.dataset.username
  const repo = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/commits`)
  req.send()
}

function displayCommits(){
  const com = JSON.parse(this.responseText)
  const commits = `<ul>${com
  .map(c => `<li>${c.author.login} ${c.commit.author.name} ${c.commit.message}</li>`)
  .join('')}</ul>`
  document.getElementById('details').innerHTML = commits
}

function getBranches(el){
  const username = el.dataset.username
  const repo = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/branches`)
  req.send()
}

function displayBranches() {
 const branch = JSON.parse(this.responseText)
  const branches = `<ul>${branch.map(b => `<li>${b.name}</li>`).join('')}</ul>`

  document.getElementById('details').innerHTML = branches
}