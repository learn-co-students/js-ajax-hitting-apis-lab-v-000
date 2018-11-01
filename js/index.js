// your code here
function getRepositories(){
  // How can I grab/store the input username
  const req = new XMLHttpRequest();
  var username = document.getElementById('username').value;
  var url = "https://api.github.com/users/" + username + "/repos"
  req.addEventListener('load',displayRepositories)
  req.open('GET', url);
  req.send();
  return false;
}

function displayRepositories(){
  // I need to load the repositories on the web page
  // We grab the id repositories and replace its innerHTML with the values we added to repoList variable from the repo
  var repos = JSON.parse(this.responseText);
  // Using map function to iterate through the array of repos, create a new array with the bane and html_url of each repository
  const repoList =
  '<ul>' +
    repos.map(repo => {
      return `
      <li>
        <h2>${repo.name}</h2>
        <h3>${repo.html_url}</h3>
        <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getBranches(this)">Get Branches</a>
      </li>`;
    }).join('') +
  '</ul>'
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el){
  // User data-repo above because we want to grab the data repositories
  // We'd use data-set if we wanted to grab the sets and below variable would change to dataset.set
  const repository = el.dataset.repository;
  const req = new XMLHttpRequest();
  const username = el.dataset.username
  const url = 'https://api.github.com/repos/' + username + '/' + repository + '/commits'
  req.addEventListener('load', displayCommits);
  // I need to write GET /repos/:owner/:repo/commits below
  // I had to add grab the username from repo.owner.login and store it in data-username but not sure why
  req.open('GET', url);
  req.send();
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(
    commit => '<li><h3>' +
    commit.commit.author.name +
    ' ('
    + commit.author.login +
    ')</h3>' +
    commit.commit.message +
    '</li>'
  ).join('')}</ul>`
   document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el){
  const username = el.dataset.username;
  const repository = el.dataset.repository;
  const url = "https://api.github.com/repos/" + username + "/" + repository + "/branches";
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', url);
  req.send();
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(
    branch => '<li>' + branch.name + '</li>'
  ).join('')}</ul>`
  document.getElementById('details').innerHTML = branchesList;
}
