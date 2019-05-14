function retrieveGithubUsername(){
  return document.getElementById('username').value
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos)
  let repoList = `<ul>${repos
    .map(r =>'<b>' + r.name + '</b>' + '<br>' + '<li>' + r.html_url + '</li>' + '<br>' + `<a onsubmit="getCommits();return false;" href=${r.commits_url}>Commits<a>`)
    .join('')} </ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const usernameInput = retrieveGithubUsername()
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${usernameInput}/repos`);
  req.send();
}

function getCommits() {
  // const usernameInput = retrieveGithubUsername()
  // const req = new XMLHttpRequest();
  // req.addEventListener('load', displayRepositories);
  // req.open('GET', `https://api.github.com/users/${usernameInput}/repos`);
  // req.send();
}

function displayCommits() {

}
