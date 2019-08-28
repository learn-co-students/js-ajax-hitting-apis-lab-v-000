function displayRepositories() {
    var repos = JSON.parse(this.responseText);
    const repoList = `<ul>${repos
      .map(
        r =>
          '<li><a href="https://github.com/' +
          r.owner.login +
          '/' +
          r.name +
          '">' +
          r.name +
          '</a> - <a href="#" data-repository="' +
          r.name +
          '" data-username="' +
          r.owner.login +
          '" onclick="getCommits(this)">Get Commits</a></li>'
      )
      .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
  }

function getRepositories() {
    const req = new XMLHttpRequest();
    const username = document.getElementById("username").value
    req.addEventListener('load', displayRepositories);
    req.open('GET', 'https://api.github.com/users/' + username +'/repos');
    req.send();
}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
      .map(
        commit =>
          '<li>Monalisa Octocat <strong>' +
          commit.author.login +
          '</strong> - ' +
          commit.commit.message +
          ' - <a href="#" data-repository="Hello-World" data-username="octocat">Get Branches</a></li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
  }

function getCommits(el) {
    const name = el.dataset.repository;
    const username = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits');
    req.send();
  }

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    console.log(branches);
    const branchesList = `<ul>${branches
      .map(
        branch =>
          '<li>Monalisa Octocat <strong>' +
          branch.name +
          '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
}

function getBranches(el) {
    const name = el.dataset.repository;
    const username = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/branches');
    req.send();
    // https://api.github.com/repos/username/reponame/branches
}

