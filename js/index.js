//<form onsubmit="getRepositories();return false;">



//REPOSITORIES

function getRepositories() {
    const username = document.getElementById('username').value;
    const req = new XMLHttpRequest();
    
    req.addEventListener('load', displayRepositories);
      
    req.open('GET', `https://api.github.com/users/${username}/repos`);
    req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos);
  
  const repoList = 
    '<ul>' +
     
     
     repos.map( r => {
        
        const dataUsername = `data-username="${r.owner.login}"`;
        const dataRepository = `data-repository="${r.name}"`;
        
        return `
            <li>
                <h2>${r.name}</h2>
                <a href="${r.html_url}" target="_blank">
                  ${r.html_url}
                </a><br><br>
                <a href="#" ${dataRepository} ${dataUsername} onclick="getCommits(this)">
                  Get Commits
                </a><br>
                <a href="#" ${dataRepository} ${dataUsername} onclick="getBranches(this)">
                  Get Branches
                </a>
            </li>`;
     }).join('') +
     
     
     '</ul>';
    
    
    
    document.getElementById('repositories').innerHTML = repoList;
}

//COMMITS

function getCommits(el){
  const username = el.dataset.username;
  const repo = el.dataset.repository;
  
  const req = new XMLHttpRequest();
  
  req.addEventListener('load', displayCommits);
  
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/commits`);
  req.send();
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  
  const commitsList = 
        '<ul>' +
        
        commits.map (c => `
                <li>
                  <h3> 
                    ${c.commit.author.name} (${c.author.login})
                  </h3>
                  ${c.commit.message} 
                </li>`
        ).join('') +
        
        '</ul>';
  
  
  document.getElementById('details').innerHTML = commitsList;
}

//BRANCHES 

function getBranches(el){
  const username = el.dataset.username;
  const repo = el.dataset.repository;
  
  const req = new XMLHttpRequest();
  
  req.addEventListener('load', displayBranches);
  
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/branches`);
  req.send();
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    
    const branchesList = 
      '<ul>' +
      
      branches.map(b => `
        <li>
          ${b.name}
        </li>`
      ).join('') +
        
      '</ul>';
    
    document.getElementById('details').innerHTML = branchesList;
} 
