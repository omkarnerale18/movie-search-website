let searchTerm = document.querySelector('#searchTerm')
let form = document.querySelector('form')
form.addEventListener('submit' ,async(e)=>{
    e.preventDefault()
    let api  = `https://api.tvmaze.com/search/shows?q=${searchTerm.value}`
    console.log(api);
    let res = await fetch(api)
   let data =  await res.json()
   createUI(data);
   searchTerm.value = ""
})
let container = document.querySelector('.container')
function createUI(data){
    container.innerHTML = ""
   data.forEach((el)=>{
    let div = document.createElement('div');
    div.classList.add('cards')
    let {show} = el;
    
    if(show?.image?.medium){
        let {name, image:{medium}, rating, genres, status, premiered, summary} = show;
        
        // Create card content
        let cardContent = `
            <div class="card-image">
                <img src="${medium}" alt="${name}">
                <div class="card-overlay">
                    <div class="rating">⭐ ${rating?.average || 'N/A'}</div>
                </div>
            </div>
            <div class="card-details">
                <h3 class="movie-title">${name}</h3>
                <div class="movie-info">
                    <span class="status ${status?.toLowerCase()}">${status || 'Unknown'}</span>
                    <span class="year">${premiered ? premiered.split('-')[0] : 'N/A'}</span>
                </div>
                <div class="genres">
                    ${genres ? genres.slice(0, 3).map(genre => `<span class="genre-tag">${genre}</span>`).join('') : ''}
                </div>
                <p class="summary">${summary ? summary.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 'No description available'}</p>
            </div>
        `;
        
        div.innerHTML = cardContent;
        container.appendChild(div)
    }
    
   })
}