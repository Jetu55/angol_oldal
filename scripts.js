let user;
let szo_eng = [];// = ['apple', 'lemon']; //angol és magyar szavak
let szo_hun = [];// = ['alma', 'citrom'];

let mondat = [];// = ['Szeretem az almákat.|I like apples.|Van az asztalon egy alma.|There is an apple on the table.', 'A citrom jó.|The lemon is good'];
let tag = [];// = ['Food|Fruit','Food'];
let id = [];// = ['1', '2'];
let date = [];// = [739196, 739100];

let current_date;

let favs = [];

let parsedArray;//ebben vannak a fájlból beolvasott adatok

function file_adatok_betoltese()
{
    for (let index = 0; index < parsedArray.length; index++)
    {
        szo_hun.push(parsedArray[index][0]);
        szo_eng.push(parsedArray[index][1]);
        mondat.push(parsedArray[index][2]);
        tag.push(parsedArray[index][3]);
        id.push(parsedArray[index][4]);
        date.push(parsedArray[index][5]);
    }
}

function addword_addword()
{
    szo_hun.push(document.getElementById('magyarszo').value);
    szo_eng.push(document.getElementById('angolszo').value);
    mondat.push(document.getElementById('mondat').value);
    tag.push(document.getElementById('tag').value);
    id.push((szo_hun.length));
    
    date.push(current_date+30);

    let i = szo_hun.length-1;
    let string = szo_hun[i]+';'+szo_eng[i]+';'+mondat[i]+';'+tag[i]+';'+id[i]+';'+date[i];
    console.log(string);
    saveData(string);
}

async function saveData(rawInput) {
    console.log(rawInput);
    const data = rawInput.trim();  // Trim, hogy eltávolítsuk az extra szóközöket és sorvégeket

    try {
        const response = await fetch(`https://angol-oldal-server.onrender.com/save-data`, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"  // Itt már sima szöveges tartalom
            },
            body: data  // Az adatokat közvetlenül a szöveggel küldjük
        });

        const result = await response.text();  // A választ szöveges formátumban olvassuk
        console.log("Szerver válasza:", result);
    } catch (error) {
        console.error("Hiba történt az adatmentés során:", error);
    }
}

function user_select(button_id)
{
    sessionStorage.setItem('user', button_id);

    window.location.href = 'main.html';
}

function visszamenube()
{
    window.location.href = 'index.html';
}
function addword()
{
    window.location.href = 'add_word.html';
}

function szoveg_cella_jobb_text(id)
{
    document.getElementById(id).style.color = "black";
}

//ha rákattintasz a sentences cuccra akkor megjeleníti a szarokat
function szoveg_cella_content_reveal(id)
{
    document.getElementById(id).style.height = "fit-content";
}
function tooltip_on(id, id2)
{
    document.getElementById(id).style.visibility = "visible";
    document.getElementById(id2).style.visibility = "visible";
}
function tooltip_off(id, id2)
{
    document.getElementById(id).style.visibility = "hidden";
    document.getElementById(id2).style.visibility = "hidden";
}
function favourite_add_remove(id)
{
    let number = id.match(/\d+$/)[0];
    favs.push(number);
    console.log(favs);
}

//kedvencek listázása
function favourites_list()
{
    document.getElementById("kiiras").innerHTML = "";
    for(let i = 0; i < szo_eng.length; i++)
        {
            if(favs.includes(id[i]))
            {
                data_listing(i);
            }
            
        }
}

//keresésnek megfelelő listázás
function search_list(id)
{
    document.getElementById("kiiras").innerHTML = "";
    for(let i = 0; i < szo_eng.length; i++)
    {
        if(document.getElementById(id).value[0] == "#") tag_list(document.getElementById(id).value.slice(1).toLowerCase());
        if((szo_eng[i].includes(document.getElementById(id).value) || szo_hun[i].includes(document.getElementById(id).value)))
        {
            data_listing(i);
        }
    }
}

//tag alapján listázás
function tag_list(szoveg)
{
    document.getElementById("kiiras").innerHTML = "";
    for(let i = 0; i < szo_eng.length; i++)
    {
        let tagek = tag[i].split('|');

        for(let k = 0; k < tagek.length; k++)
        {
            if(tagek[k].toLowerCase() == szoveg)
            {
                data_listing(i);
            }
        }
    }
}

//minden kilistázása
function kiiras()
{
    document.getElementById("kiiras").innerHTML = "";
    for(let i = 0; i < szo_eng.length; i++)
    {
        data_listing(i);
    }
}

function data_listing(index)
{
    let mondatok = mondat[index].split('|');
       
    document.getElementById("kiiras").innerHTML += `<div class="szoveg_cella">
        <div class="szoveg_cella_bal">` +
            szo_hun[index] +
        `</div>
        <div class="szoveg_cella_jobb" id="szovegcella`+index+`" onclick="szoveg_cella_jobb_text('szovegcella`+index+`')">`+
            szo_eng[index] +
        `<button class="fav-button" id="btn_fav`+id[index]+`" onclick="favourite_add_remove('btn_fav`+id[index]+`')">Fav</button></div>
    </div>`;
                    
    let content = `<div class="szoveg_cella_alul" id="szovegcellaalul`+index+`" onclick="szoveg_cella_content_reveal('szovegcellaalul`+index+`')"> Sentences:<br>`;
    for(let j = 0; j < mondatok.length; j = j+2)
    {
        if(j+2 < mondatok.length)
        {
            content += mondatok[j]+'<br>'+mondatok[j+1]+'<br><br>';
        }
        else
        {
            content += mondatok[j]+'<br>'+mondatok[j+1];
        }
        
    }
    content += `<div class="szoveg_cella_tags" id="szovegcellatags`+index+`" onlick="szoveg_cella_content_reveal('szovegcellaalul`+index+`')"> Tags: `;
    let tagek = tag[index].split('|');
    for(let j = 0; j < tagek.length; j++)
    {
        content += tagek[j];
        if(tagek.length > j+1)
        {
            content += `, `;
        }
    }
    document.getElementById("kiiras").innerHTML += content + '</div>';
}

//oldal betöltésekor
window.onload = function()
{
    const date_ini = new Date();
    current_date = date_ini.getFullYear()*365 + (date_ini.getMonth()-1)*30 + date_ini.getDay();
    //ha ennél nagyobb akkor újként kell kezelni
    current_date -= 30;
    const currentPage = window.location.pathname.split('/').pop();
    
    //main ------------------- Word List
    if (currentPage === 'main.html') {
        user = sessionStorage.getItem('user');
        document.getElementById("cim").innerText = "Hello, " + user;
        kiiras();
    }
};










// Az adatok átalakítása tömbbé

//itt olvasódik be file tartalma, data tartalmazza
async function fetchData() {
    try {
        const response = await fetch('https://angol-oldal-server.onrender.com/get-data');
        if (!response.ok) {
            throw new Error('Hálózati hiba történt.');
        }
        const data = await response.text(); // Ha szöveg a fájl tartalma
        console.log('Beolvasott adatok:', data);
        parsedArray = parseData(data);
        file_adatok_betoltese();
        console.log(parsedArray);
        for (let index = 0; index < date.length; index++)
        {
            if(date[index]>current_date)
            {
                tag[index] += '|New';
            }
        }
        
        // Itt például megjelenítheted egy HTML elemben:
        //document.getElementById('data-container').innerText = data;

    } catch (error) {
        console.error('Hiba történt az adatok lekérésekor:', error);
    }
}

function parseData(data) {
    // JSON string kezelés
    const jsonData = JSON.parse(data);  // A JSON stringet objektummá alakítjuk
    const content = jsonData.content;   // Kinyerjük a 'content' kulcs értékét

    // A \r\n és \n mentén daraboljuk, majd ; mentén szedjük szét az elemeket
    return content.trim().split(/\r\n|\n/).map(row => row.split(";"));
}

// Adatok betöltése az oldal betöltésekor
document.addEventListener('DOMContentLoaded', fetchData);