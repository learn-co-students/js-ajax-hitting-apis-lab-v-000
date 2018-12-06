// your code here
function displayRepositories() {
  const repos    = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
       '<li><strong>Name:  </strong>' +
       r.name +
       '<br><strong>URL:  </strong><a href="' +
       r.html_url +
       '">' +
       r.html_url +
       '</a>' +
       '<br><a href="#" data-repository="' +
       r.name +
       '" onclick="getCommits(this)">Get Commits</a>' +
       '<br><a href="#" data-repository="' +
       r.name +
       '" onclick="getBranches(this)">Get Branches</a>' +
       '</li><br>'
     )
    .join('')}</ul>`;

  document.getElementById('repositories').innerHTML = repoList;
}

function displayCommits() {
  const commits     = JSON.parse(this.responseText);
  const commitsList = `</ul>${commits
    .map(
      commit =>
        '<strong>Username:  </strong>' +
        commit.commit.committer.name +
        '<br><strong>Name:  </strong>' +
        commit.author.login +
        '<br><strong>Message: </strong>' +
        commit.commit.message +
        '<br></br>'
    )
    .join('')}</ul>`;

  document.getElementById('details').innerHTML = commitsList;
}

function displayBranches() {
  const branches     = JSON.parse(this.responseText);
  const branchesList = `</ul>${branches
    .map(
      branch =>
        '<strong>Name:  </strong>' +
        branch.name +
        '<br></br>'
    )
    .join('')}</ul>`

  document.getElementById('details').innerHTML = branchesList;
}

function getRepositories() {
  const name = document.getElementById('username').value
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + name + '/repos');
  req.send();
  return false;
}

function getCommits(el) {
  const name = el.dataset.repository;
  const req  = new XMLHttpRequest();

  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}

function getBranches(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/branches');
  req.send();
}
