// AJAX CALLERS
function getRepositories(){
    const username = document.getElementById('username').value;

    const req = new XMLHttpRequest();

    req.addEventListener("load", displayRepositories);

    req.open(
        'GET',
        `https://api.github.com/users/${username}/repos`
    );

    req.send();
}

function getCommits(link){
    console.log(link.dataset);

    const req = new XMLHttpRequest();

    req.addEventListener("load", displayCommits);

    req.open(
        'GET',
        `https://api.github.com/repos/${link.dataset.username}/${link.dataset.repository}/commits`
    );

    req.send();
}

function getBranches(link){
    console.log(link.dataset);

    const req = new XMLHttpRequest();

    req.addEventListener("load", displayBranches);

    req.open(
        'GET',
        `https://api.github.com/repos/${link.dataset.username}/${link.dataset.repository}/branches`
    );

    req.send();
}

// AJAX CALLBACKS
function displayRepositories(event, data){
    const reposJSON = JSON.parse(this.responseText);

    console.log(reposJSON);

    reposList = 
        '<ul>' +
            reposJSON.map(repo => `<li><a href="${repo.html_url}" target="blank">${repo.name}</a> <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getCommits(this)">[Commits]</a> <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getBranches(this)">[Branches]</a></li>`).join('') +
        '</ul>';

    document.getElementById('repositories').innerHTML = reposList;
}

function displayCommits(event, data){
    const commitsJSON = JSON.parse(this.responseText);

    console.log(commitsJSON);

    const commitsHTML = commitsJSON.map(c => {
        let html = `<li>"${c.commit.message}" by ${c.commit.author.name}`;
        if (c.author){
            html += ` (${c.author.login})`;
        }
        return html;
    });

    const commitsList = '<ul>' + commitsHTML.join('') + '</ul>';

    document.getElementById('details').innerHTML = commitsList;
}

function displayBranches(event, date){
    const branchesJSON = JSON.parse(this.responseText);

    console.log(branchesJSON);

    const branchesList =
        '<ul>' + 
            branchesJSON.map(b => `<li>${b.name}</li>`).join('') +
        '</ul>';

    document.getElementById('details').innerHTML = branchesList;
}