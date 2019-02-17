// your code here
function displayRepositories() {
  //this is set to the XMLHttpRequest object that fired the event
  // const username = document.getElementById("username").value;
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        `<li>
          <a href=${r.html_url}>${r.name}</a><br>
          <a href="#" data-repository=${r.name}
          onclick="getCommits(this)">Get Commits</a><br>
          <a href="#" data-repository=${r.name}
          onclick="getBranches(this)">Get Branches</a><br>
        </li>`
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function getCommits(el) {
  const username = document.getElementById("username").value;
  const commits_url = `https://api.github.com/repos/${username}/${el.dataset.repository}/commits`;
  const reqq = new XMLHttpRequest();
  reqq.addEventListener('load', displayCommits);
  reqq.open('GET', commits_url);
  reqq.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      c => `<li><strong>${c.commit.author.name}</strong>/${c.author.login} - ${c.commit.message}</li>`
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const username = document.getElementById("username").value;
  const branches_url = `https://api.github.com/repos/${username}/${el.dataset.repository}/branches`;
  const reqq = new XMLHttpRequest();
  reqq.addEventListener('load', displayCommits);
  reqq.open('GET', branches_url);
  reqq.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(
    b => `<li><strong>${b.name}</strong></li>`
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
