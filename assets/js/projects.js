$(document).ready(() => {
    render_projects('featured');
})


let render_projects = (slug) => {
    let projects_area = $('.projects-wrapper');

    $('.white-button').removeClass('white-button-hover');
    $(`#${slug}`).addClass('white-button-hover');

    let projects_obj = [
        {
            image: 'assets/qorpo.png',
            link: 'https://qorpo.world/games/spotlight',
            title: 'QORPO WORLD',
            technologies: ['C++', 'BP', 'UE5', 'Redmine', 'Git'],
            description: "Worked on a common framework, third person hero shooter and pokemon-like game. Responsabilities: modular C++ framework, gameplay programming, general debugging and optimization. Projects: QFramework, Citizen Conflict, Aneemate.",
            categories: ['featured', 'gamedev']
        },
        {
            image: 'assets/gamesfarm.png',
            link: 'https://www.games-farm.com/',
            title: 'GamesFarm',
            technologies: ['C++', 'BP', 'UE5', 'Jira', 'Perforce', 'Confluence'],
            description: "Worked on general bugfixing, profiling, and UI. Focused on extending and improving the inhouse UI framework (C++/WBP) as well as create gameplay UI elements. Project: Commandos Origins.",
            categories: ['featured', 'gamedev']
        },
    ]

    let projects = [];
    if(slug == 'all') {
        projects = projects_obj.map(project_mapper);
    } 
    else {
        projects = projects_obj.filter(project => project.categories.includes(slug)).map(project_mapper);
    }
    projects_area.hide().html(projects).fadeIn();
}

let project_mapper = project => {
    return `
        <div class="wrapper">
                
            <div class="card radius shadowDepth1">

                ${project.image ? 
                    `<div class="card__image border-tlr-radius">
                        <a href="${project.link}">
                            <img src="${project.image}" alt="image" id="project-image" class="border-tlr-radius">
                        </a>
                    </div>`           
                : ''}

        
                <div class="card__content card__padding">
        
                    <article class="card__article">
                        <h2><a href="${project.link}">${project.title}</a></h2>
        
                        <p class="paragraph-text-normal">${project.description} ${project.demo ? `<a href="${project.demo}">Demo</a>` : ''}</p>
                    </article>

                                
                    <div class="card__meta">
                        ${project.technologies.map(tech =>
                            `<span class="project-technology paragraph-text-normal">${tech}</span>`
                        ).join('')}
                    </div>

                </div>
            </div>
        </div>
    `
}

let selected = (slug) => {
    render_projects(slug);
}
