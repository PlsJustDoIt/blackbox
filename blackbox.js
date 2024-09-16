
const LEVELS = [
    { id: 1, size: 8, atoms: [[3,2],[3,7],[6,4],[8,7]] },
    { id: 2, size: 8, atoms: [[1,4],[3,7],[3,2],[4,4]] },
    { id: 3, size: 8, atoms: [[4,4],[3,1],[6,3],[7,7]] },
    { id: 4, size: 8, atoms: [[3,6],[1,7],[6,6],[2,3],[5,3]] },
    { id: 5, size: 8, atoms: [[2,3],[4,6],[5,2],[6,4],[1,6]] },
    { id: 6, size: 8, atoms: [[5,6],[8,7],[5,4],[4,2],[3,4]] },
    { id: 7, size: 8, atoms: [[5,8],[3,4],[4,6],[2,7],[6,5]] },
    { id: 8, size: 8, atoms: [[2,2],[5,4],[1,5],[7,3],[3,4]] },
    { id: 9, size: 10, atoms: [[1,5],[3,2],[8,2],[8,9],[3,5]] },
    { id: 10, size: 10, atoms: [[8,4],[9,10],[4,7],[4,2],[2,7]] },
    { id: 11, size: 12, atoms: [[7,7],[12,6],[3,4],[5,2],[2,2]] },
    { id: 12, size: 12, atoms: [[11,7],[8,11],[5,3],[6,8],[4,9]] }
];

// TODO

document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('keypress', (event) => {
        if (event.key === 'D' || event.key === 'd') {
            toggleDarkMode();
        }
    });

    let displayMode = localStorage.getItem('darkMode');
    if (displayMode === 'true') {
        document.body.classList.add('dark');
    }

    let blocPuzzle = document.getElementById('bcPuzzles');
    if (blocPuzzle == null) { throw console.error('ahhh');}
    let i =1;
    for (let level of LEVELS) {
        let puzzle = document.createElement('div');
        puzzle.addEventListener('click',(event) => {
            console.log(event);
            let puzzle = event.target;
            let spPuzzle = document.getElementById('spPuzzle');
            if (spPuzzle == null) {
                throw console.error('rgtg');
                
            }
            let niveau = Number.parseInt(puzzle.innerHTML[2]);
            spPuzzle.innerHTML = ' #' +niveau+' - '+puzzle.getAttribute('data-atoms')+' atomes';

            let tabPlateau = document.getElementById('tabPlateau');
            if (tabPlateau == null) { throw console.error();}
            let gridSize = Number(puzzle.getAttribute('data-size'));
            console.log(gridSize);
            for (let i = 0;i<gridSize+2;++i) {
                let ligne = document.createElement('tr');
                for (let j = 0;j<gridSize+2;++j) {
                    let cell = document.createElement('td');
                    cell.addEventListener('click',(event) => {
                        cell.classList.toggle('atom');
                    })
                    ligne.appendChild(cell);
                }
                tabPlateau.appendChild(ligne);

            }



            
            document.getElementsByTagName('nav')[0].style.display = 'none';
            document.getElementsByTagName('main')[0].style.display = 'block';


        })
        puzzle.setAttribute('data-size',""+level.size);
        puzzle.setAttribute('data-atoms',level.atoms.length.toString());
        if (level.highscore != null) {
            puzzle.setAttribute('data-highscore',level.highscore.name+' ['+level.highscore.score+']');
        }
        puzzle.innerHTML = ' #'+i+' ';

        blocPuzzle.appendChild(puzzle);
        ++i;
    }

    document.getElementsByTagName('nav')[0].style.display = 'block';

});

function toggleDarkMode() {
    let isDarkMode = document.body.classList.contains('dark') ? true : false;
    if (isDarkMode) {
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
    } else {
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
    }
}

function giveUp() {
    let response = window.prompt("t'es sur de vouloir quitter ??");
}

