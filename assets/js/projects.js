$(document).ready(() => {
    render_projects('featured');
})


let render_projects = (slug) => {
    let projects_area = $('.projects-wrapper');

    $('.white-button').removeClass('white-button-hover');
    $(`#${slug}`).addClass('white-button-hover');

    let projects_obj = [
        {
            image: 'https://www.startupjobs.cz/cdn-cgi/image/w=1190,h=712/https://images-assets.startupjobs.cz/LOGO/1484/9b7149a819b43b0f1198f457b8364fb2.png',
            link: 'https://grip-digital.com/',
            title: 'GRIP Studios',
            technologies: ['C++', 'BP', 'UE5', 'Jira', 'Perforce'],
            description: "Implemented core gameplay systems and abilities; Generic input/ability buffering, data driven targeting system and various abilities. Project: Unannounced AAA title.",
            categories: ['featured', 'gamedev']
        },
        {
            image: 'https://i.imgur.com/oro9vk9_d.webp?maxwidth=760&fidelity=grand',
            link: 'https://www.games-farm.com/',
            title: 'GamesFarm',
            technologies: ['C++', 'BP', 'UE5', 'Jira', 'Perforce'],
            description: "Working in extending and bugfixing UI. Focused on extending and improving project specific UI frameworks. Projects: Commandos Origins, Dune: Awakening. Platforms: PC, PlayStation5, Xbox SeriesX.",
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
