// your code here
function getRepositories() {
    let username = document.getElementById('username').value;

    const req = new XMLHttpRequest();
    req.addEventListener('load', function() {
        let repos = JSON.parse(this.responseText);
        console.log(repos);

        const repoList = 
            `<ul>${
                repos.map( r=>
                    '<li>' + 
                    r.name +
                    ' - <a href="#" data-username="' + r.name + '" data-repository="' + r.commits_url + '" onclick="getCommits(this)">Get Commits</a></li>').join('')
            }
            </ul>`;
        
            document.getElementById('repositories').innerHTML = repoList;
        } 
    )
    req.open('GET', `https://api.github.com/users/${username}/repos`);

    req.send();
}

function getCommits(el) {
    let username = document.getElementById('username').value;
    let repoName = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', `https://api.github.com/repos/${username}/` + repoName + '/commits');
    req.send();

}

function displayCommits() {
    
}

function getBranches() {

}

function displayBranches(){

}