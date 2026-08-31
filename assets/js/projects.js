$(document).ready(() => {
    render_projects('featured');
})


let render_projects = (slug) => {
    let projects_area = $('.projects-wrapper');

    $('.white-button').removeClass('white-button-hover');
    $(`#${slug}`).addClass('white-button-hover');

    let projects_obj = [
        {
            image: 'https://www.vhv.rs/dpng/d/201-2010185_thumb-image-placeholder-image-logo-svg-hd-png.png', // TODO: add a RAGE screenshot or capture
            link: 'https://github.com/Bibool/Rage_UE5', // TODO: EGS/Steam link
            title: 'RAGE — 6DoF Multiplayer Space Combat',
            technologies: ['C++', 'UE 5.7', 'GAS', 'Client Prediction', 'Niagara', 'Slate'],
            description: "Personal project. A third-person, six-degrees-of-freedom multiplayer space combat sim built from scratch in UE5 C++: GAS-driven networked abilities, a client-predicted movement system with custom physics sub-stepping, and a fully client-predicted projectile class using server reconciliation and catch-up simulation.",
            categories: ['featured', 'gamedev', 'personal']
        },
        {
            image: 'https://www.startupjobs.cz/cdn-cgi/image/w=1190,h=712/https://images-assets.startupjobs.cz/LOGO/1484/9b7149a819b43b0f1198f457b8364fb2.png',
            link: 'https://grip-digital.com/',
            title: 'GRIP Studios',
            technologies: ['C++', 'BP', 'UE5', 'GAS', 'Multithreading', 'Perforce', 'Jira'],
            description: "Senior gameplay programmer and sub-team lead. Authored a data-object-driven targeting system with designer-authored rules, multi-threaded from 15.5ms to 2.3ms per frame; input buffering at the input layer and on Gameplay Abilities; a rebuilt, network-optimised gib system; and the player interaction framework. Projects: an unannounced AAA co-op shooter for a Sony first-party studio, Icarus: Console Edition, and a Gen 8 to Gen 9 franchise port.",
            categories: ['featured', 'gamedev']
        },
        {
            image: 'https://i.imgur.com/oro9vk9_d.webp?maxwidth=760&fidelity=grand',
            link: 'https://www.games-farm.com/',
            title: 'GamesFarm',
            technologies: ['C++', 'BP', 'UE5', 'Slate/UMG', 'MVVM', 'Perforce', 'Jira'],
            description: "Credited as Senior Programmer on Dune: Awakening and UI Programmer on Commandos: Origins. Rebuilt in-house UI frameworks from Blueprint to C++ on a stateless MVVM architecture, and reclaimed roughly 5.4 GB against the Gen 8 memory budget by eliminating hard Blueprint references. Platforms: PC, PlayStation 5, Xbox Series X|S, PlayStation 4, Xbox One.",
            categories: ['featured', 'gamedev']
        },
        {
            image: 'https://static.chainbroker.io/mediafiles/projects/cryptocitizen/qorpo.jpeg', // TODO: add a logo if you want one
            link: 'https://qorpo.world/',
            title: 'QORPO',
            technologies: ['C++', 'BP', 'UE5', 'Networking'],
            description: "Gameplay programmer across two concurrent UE5 productions. Architected a shared modular gameplay framework used by both projects, authored an in-house ability system from the ground up, and built gameplay animation, vehicle and interaction systems.",
            categories: ['gamedev']
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
