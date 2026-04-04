// filtro-projetos.js

// Sample array of project objects
const projects = [
    { id: 1, title: { eng: 'Project One', pt: 'Projeto Um' }, type: 'web', technologies: ['HTML', 'CSS', 'JavaScript'] },
    { id: 2, title: { eng: 'Project Two', pt: 'Projeto Dois' }, type: 'data science', technologies: ['Python', 'Pandas'] },
    // Add more projects as needed
];

// Function to filter projects based on criteria
function filterProjects(technology, type, searchText, language) {
    return projects.filter(project => {
        const matchesTechnology = technology ? project.technologies.includes(technology) : true;
        const matchesType = type ? project.type === type : true;
        const matchesSearch = searchText ? project.title[language].toLowerCase().includes(searchText.toLowerCase()) : true;
        return matchesTechnology && matchesType && matchesSearch;
    });
}

// Function to display projects in a grid format
function displayProjects(filteredProjects, language) {
    const container = document.getElementById('project-container');
    container.innerHTML = '';
    filteredProjects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project';
        projectElement.innerHTML = `<h3>${project.title[language]}</h3>`;
        container.appendChild(projectElement);
    });
}

// Event listener for filter and search inputs
document.getElementById('filter-button').addEventListener('click', () => {
    const technology = document.getElementById('technology-select').value;
    const type = document.getElementById('type-select').value;
    const searchText = document.getElementById('search-input').value;
    const language = document.getElementById('language-select').value;

    const filteredProjects = filterProjects(technology, type, searchText, language);
    displayProjects(filteredProjects, language);
});

// Add responsive styles and animations in CSS
// This is an example of a basic implementation. Expand according to your project needs.