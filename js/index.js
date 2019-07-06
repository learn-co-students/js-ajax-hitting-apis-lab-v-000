// function displayCommits() {}
//
// function displayBranches() {}

function displayRepositories() {
  let repoList = '<ul>';
  for (let i = 0; i < this.responseText.length; i++) {
    repoList += '<li>' + this.responseText[i]['name'] + '</li>';
  }
  repoList += '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  user = $('input[id=username]').value
  req.open('GET', `https://api.github.com/users/${user}/repos`);
  req.send();
}

// function getCommits() {}
//
// function getBranches() {}
