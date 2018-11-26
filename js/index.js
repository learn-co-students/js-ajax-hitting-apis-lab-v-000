// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  const userName = document.getElementById("username").value
  const URI = 'https://api.github.com/users/' + userName + '/repos'
  req.addEventListener('load', displayRepositories);
  req.open('GET', URI);
  req.send(); 
}
function displayRepositories() {
    var repos = JSON.parse(this.responseText);
    const repoList = `<ul>${repos.map(r => {
        return `
        <li>${r.name} 
        <a href="${r.html_url}">${r.html_url}</a>
        <a href="#" data-username="${r.owner.login}" data-repository="${r.name}" onclick="getCommits(this)">Get Commits</a>
        <a href="#" data-username="${r.owner.login}" data-repository="${r.name}" onclick="getBranches(this)">Get Branches</a>
        </li>`

        
    }).join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}
function getCommits(el) {
    const name = el.dataset.repository;
    const req = new XMLHttpRequest();
    const userName = document.getElementById("username").value
    const URI = 'https://api.github.com/repos/' + userName + '/' + name + '/commits'
    
    
    req.addEventListener('load', displayCommits);
    req.open('GET', URI);
    req.send();
  }

  function displayCommits() {
      var commits = JSON.parse(this.responseText)
      const commitList = `<ul>${commits.map(c => {
        return `
       <li>${c.commit.author.name}
       ${c.author.login}
       ${c.commit.message}
    
        </li>
       `
    }).join('')}</ul>`;
    document.getElementById('details').innerHTML = commitList;
}
  function displayBranches() {
      var branches = JSON.parse(this.responseText)
      console.log("branches", branches);
      console.log("call")
      const branchList = `<ul>${branches.map(b => {
        return `
       <li>${b.name}
        </li>
       `
    }).join('')}</ul>`;
    document.getElementById('details').innerHTML = branchList;
}

function getBranches(el) {
    const name = el.dataset.repository;
    const req = new XMLHttpRequest();
    const userName = document.getElementById("username").value
    const URI = 'https://api.github.com/repos/' + userName + '/' + name + '/branches'
    

    req.addEventListener('load', displayBranches);
    req.open('GET', URI);
    req.send();
  }
  


