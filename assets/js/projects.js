$(document).ready(() => {
    render_projects('featured');
})


let render_projects = (slug) => {
    let projects_area = $('.projects-wrapper');

    $('.white-button').removeClass('white-button-hover');
    $(`#${slug}`).addClass('white-button-hover');

    let projects_obj = [
        {
            image: 'assets/cc_banner1.png',
            link: 'https://qorpo.world/games/ebea97a8-81cd-4b74-b701-86e0f005ad44?category=Action',
            title: 'Citizen Conflict',
            technologies: ['C++', 'Blueprints'],
            description: "Multiplayer Third Person Hero Shooter with an emphasis on movement, abilities and reactionary gunplay.",
            categories: ['featured', 'gamedev']
        },
        {
            image: 'assets/ani_banner.png',
            link: 'https://qorpo.world/games/9a1bdfc2-0b75-47b7-98b8-754a5c7bd788?category=Adventure',
            title: 'Aneemate',
            technologies: ['C++', 'Blueprints'],
            description: "Pokemon inspired game where the purpose is to collect and gather powerful Aneemates.",
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
