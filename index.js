function getRepositories(){
  const req = new XMLHttpRequest();

  const username = document.getElementById('username').value;

  req.addEventListener('load', displayRepositories);

  req.open('GET', `https://api.github.com/users/${username}/repos`);

  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);

  const repoList =
    `<ul>
      ${repos.map(r => {
        const dataRepoName = `data-repository= "${r.name}"`

        const dataUsername = `data-username= "${r.owner.login}"`

        return (
          '<h3>' +  r.name + '</h3>' +
          '<li>' + `<a href=${r.html_url}>${r.html_url}</a>` + '</li>' +
          '<li>'
            + `<a href="#" ${dataRepoName} ${dataUsername}
              onclick="getCommits(this)">Get Commits
            </a>` +
          '</li>' +
          '<li>'
            + `<a href="#" ${dataRepoName} ${dataUsername}
              onclick="getBranches(this)">Get Branches
            </a>` +
          '</li>'
        );
      }).join('')}
    </ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repository;

  const username = el.dataset.username;

  const req = new XMLHttpRequest();

  req.addEventListener('load', displayCommits);

  req.open('GET',
    'https://api.github.com/repos/' + username + '/' + name + '/commits'
  );

  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);

  const commitsList =
    `<ul>
      ${commits.map(commit =>
        '<strong>' +
          commit.author.login +
        '</strong><br />' +

        '<em>' +
          commit.commit.author.name +
        '</em><br />' +

        '<li>' +
          commit.commit.message +
        '</li>').join('')
      }
    </ul>`;

  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository;

  const username = el.dataset.username;

  const req = new XMLHttpRequest();

  req.addEventListener('load', displayBranches);

  req.open('GET',
    'https://api.github.com/repos/' + username + '/' + name + '/branches'
  );
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);

  const branchesList =
    `<ul>
      ${branches.map(branch => '<li>' +  branch.name + '</li>').join('')}
    </ul>`;

  document.getElementById("details").innerHTML = branchesList
}
