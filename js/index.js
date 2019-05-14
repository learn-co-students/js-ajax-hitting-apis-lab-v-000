function retrieveGithubUsername(){
  return document.getElementById('username').value
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  // console.log(repos)
  let repoList = `<ul>${repos
    .map(r =>'<b>' + r.name + '</b>' + '<br>' + '<li>' + r.html_url + '</li>' + `<a onclick="getCommits(this);" href='#'>Commits<a>` + '<br><br>')
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

function getCommits(event) {
  console.log(this)
  // return event
  // http://api.github.com/repos/octocat/Hello-World/commits
  // const usernameInput = retrieveGithubUsername()
  // const req = new XMLHttpRequest();
  // req.addEventListener('load', displayRepositories);
  // req.open('GET', `https://api.github.com/users/${usernameInput}/repos`);
  // req.send();
}

function displayCommits() {

}
