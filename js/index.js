// your code here
// Create a form with a username field that calls a getRepositories function that loads the repositories div with a list of public repositories for that user.
// The displayed repositories should include the name and a link to the URL (HTML URL, not API URL).

function getRepositories() {
  let user = document.getElementById('username').value;
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + user + '/repos');
  req.send();
}

function getCommits(element) {
  let name = element.dataset.username;
  let repo = element.dataset.repository;
  // console.log("name in GetCommits:", name);
  // console.log("URL of Request in GetCommits:",'https://api.github.com/repos/' + name + '/' + repo + '/commits');
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + name + '/' + repo + '/commits');
  req.send();

}

function getBranches(element) {
  // GET /repos/:owner/:repo/branches
  let name = element.dataset.username;
  let repo = element.dataset.repository;

  // Add a link to each repository that calls a getBranches function when clicked and, when complete,
  // calls a displayBranches function that fills the details div with a list of names of each branch of the repository.
  // Give the link data attributes

  let req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + name + '/' + repo + '/branches');
  req.send();

}


function displayRepositories(){
  let repos = JSON.parse(this.responseText);
  // console.log(repos[0]);
  let repoList = `<ul>${repos
    .map(r =>
        '<li>' +
        r.name + ' - '+
        `<a href=${r.html_url}>${r.html_url}</a>` +
        ' - <a href="#" data-repository="' + r.name +'" data-username="' + r.owner.login +'" onclick="getCommits(this)">Get Commits</a>' +
        ' - <a href="#" data-repository="' + r.name +'" data-username="' + r.owner.login +'" onclick="getBranches(this)">Get Branches</a>' +
        '</li>')
    .join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList;
  // r.owner.login
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  // console.log("displayCommits- 0 - author:", commits[0].author);
  const commitsList = `<ul>${commits
    .map(
        commit =>
        '<li><strong>' +
        commit.commit.author.name + ' - ' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
// Add a link to each repository that calls a getBranches function when clicked and, when complete,
// calls a displayBranches function that fills the details div with a list of names of each branch of the repository.
// Give the link data attributes of username and repository for use by the getBranches function.
  console.log("display Branches [0]", branches[0]);
const branchesList = `<ul>${branches
  .map(
      branch =>
      '<li><strong>' +
      branch.name +
      '</li>'
  )
  .join('')}</ul>`;
document.getElementById('details').innerHTML = branchesList;
}
