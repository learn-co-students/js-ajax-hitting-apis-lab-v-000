function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const html =
  '<ul>' +
    commits.map(function(commit){
      return `<li> ${commit.author.login} </li>
      <li> ${commit.commit.committer.name} </li>
      <li> ${commit.commit.message} </li>`
    }).join('')
    +
  '</ul>'
  $('#details').html(html)
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const html =
    '<ul>' +
    branches.map(function(branch){
      return `<p> ${branch.name} </p>
      `
    }).join('')
    +
    '</ul>'
  $('#details').html(html)
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const html =
    '<ul>' +
    repos.map(function(repo){
      return `<li><h2> ${repo.owner.login} </h2>
      <a href="${repo.html_url}" data-repo="${repo.name}"> ${repo.name} </a><br>
      <a href="#" onclick="getCommits(this)">Get Commits</a><br>
      <a href="#" onclick="getBranches(this)">Get Branches</a><br>
      `
    }).join('')
    +
    '</ul>'
  $('#repositories').html(html)
}


function getCommits(el){
  const req = new XMLHttpRequest();
  const repo_name = el.dataset.repository
  const name = el.dataset.username
  req.open('GET', 'https://api.github.com/repos/' + name + '/' + repo_name + '/commits');
  req.addEventListener('load', displayCommits);
  req.send();
}

function getBranches(el){
  // GET /repos/:owner/:repo/branches
  const req = new XMLHttpRequest();
  const repo_name = el.dataset.repository
  const name = el.dataset.username
  req.open('GET', 'https://api.github.com/repos/' + name + '/' + repo_name + '/branches');
  req.addEventListener('load', displayCommits);
  req.send();
}

function getRepositories(){
  const req = new XMLHttpRequest();
  const name = document.getElementById('username').value
  req.open('GET', 'https://api.github.com/users/' + name + '/repos');
  req.addEventListener('load', displayRepositories);
  req.send();
}
