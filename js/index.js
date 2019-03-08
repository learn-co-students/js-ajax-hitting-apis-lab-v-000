// your code here
function getRepositories() {
    let userName = document.getElementById("username").value;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', `https://api.github.com/users/${userName}/repos`);
    req.send();
  }

  function displayRepositories() {
    var repos = JSON.parse(this.responseText);
    console.log(repos);
    const repoList = `<ul>${repos
      .map(
        r =>
          '<li><a href="' +
          r.html_url+
          '">'+
          r.name +
          '</a> - <a href="#" data-repo="' +
          r.name +
          '" onclick="getCommits(this)">Get Commits</a> - <a href="#" onclock="getBranches(this)">Get Branches</a></li>'
      )
      .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
  }
12
  function getCommits(el) {
    userName = document.getElementById("username").value;
    const name = el.dataset.repository;
    // debugger;
    const req = new XMLHttpRequest();
    
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/' + userName + '/' + name + '/commits');
    
    req.send();
  }

  function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
      .map(
        commit =>
          // '<li><strong>' +
          commit.author.login +
          // `</strong> - ${commit.commit.author.name} - ` +
          commit.commit.author.name +
          commit.commit.message 
          // '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
  }

  function getBranches(el) {
    userName = document.getElementById("username").value;
    const name = el.dataset.repository;
    // debugger;
    const req = new XMLHttpRequest();
    
    req.addEventListener('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/' + userName + '/' + name + '/branches');
    
    req.send();
  }

  function displayBranches() {
    const branches = JSON.parse(this.responseText);
    // debugger;
    const branchesList = `<ul>${branches
      .map(
        branch =>
  
          // '<li><strong>' +
          branch.name
          // `</strong> - ${commit.commit.author.name} - ` +
          // commit.commit.author.name +
          // commit.commit.message 
          // '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
  }