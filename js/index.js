// your code here

//Create a form with a username field that calls a getRepositories function
//that loads the repositories div with a list of public repositories for
//that user. The displayed repositories should include the name and a
//link to the URL (HTML URL, not API URL).


function getRepositories() {
  let input = document.querySelector('input').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${input}/repos`);
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r => {
        const username = `data-username=${r.owner.login}`
            return(  '<li>' +
              r.name +
              ` <a href=${r.html_url}> go to repo </a>` +
              ` - <a href="#" ${username} data-repo="` +
              r.name +
              `" onclick="getCommits(this)">Get Commits</a></li>`)}

    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}
//Add a link to each repository that calls a getCommits function on click
// and, when the request is complete, calls a displayCommits function that
// fills the details div with a list of commits for that repository.
// The display of commits should include the author's Github name, the author's
// full name, and the commit message. Give the link data attributes of username
// and repository to be used by the getCommits function.

function getCommits(el) {
  console.log(el)
  let username = document.querySelector('input').value;
  let repository = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repository}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        (commit.commit.author.name || "Missing author name") +
        '<li><strong>' +
        (commit.author.login || "Missing author login") +
        '</strong> - ' +
        (commit.commit.message || "Missing commit message") +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(){

}

function displayBranches(){

}
// Add a link to each repository that calls a getBranches function when clicked and,
// when complete, calls a displayBranches function that fills the details div with
// a list of names of each branch of the repository. Give the link data attributes
// of username and repository for use by the getBranches function.
