var user;
var szo_eng = ['apple', 'lemon']; //angol és magyar szavak
var szo_hun = ['alma', 'citrom'];

var mondat = ['Szeretem az almákat.|I like apples.|Van az asztalon egy alma.|There is an apple on the table.', 'A citrom jó.|The lemon is good'];
var tag = ['Food|Fruit','Food'];
var id = ['1', '2'];

var favs = [];

function user_select(button_id)
{
    sessionStorage.setItem('user', button_id);

    window.location.href = 'main.html';
}

function visszamenube()
{
    window.location.href = 'index.html';
}

function szoveg_cella_jobb_text(id)
{
    document.getElementById(id).style.color = "black";
}

function szoveg_cella_alul_content(id)
{
    document.getElementById(id).style.height = "fit-content";
}

function favourite_add_remove(id)
{
    let number = id.match(/\d+$/)[0];
    favs.push(number);
    console.log(favs);
}

function favourites_list()
{
    document.getElementById("kiiras").innerHTML = "";
    for(let i = 0; i < szo_eng.length; i++)
        {
            if(favs.includes(id[i]))
            {
                let mondatok = mondat[i].split('|');
           
                document.getElementById("kiiras").innerHTML += `<div class="szoveg_cella">
                    <div class="szoveg_cella_bal">` +
                        szo_hun[i] +
                    `</div>
                    <div class="szoveg_cella_jobb" id="szovegcella`+i+`" onclick="szoveg_cella_jobb_text('szovegcella`+i+`')">`+
                        szo_eng[i] +
                    `<button class="fav-button" id="btn_fav`+id[i]+`" onclick="favourite_add_remove('btn_fav`+id[i]+`')">Fav</button></div>
                </div>`;
                        
                        let content = `<div class="szoveg_cella_alul" id="szovegcellaalul`+i+`" onclick="szoveg_cella_alul_content('szovegcellaalul`+i+`')"> Sentences:<br>`;
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
                document.getElementById("kiiras").innerHTML += content + '</div>';
            }
            
        }
}

function search_list(id)
{
    document.getElementById("kiiras").innerHTML = "";
    for(let i = 0; i < szo_eng.length; i++)
    {
        if(document.getElementById(id).value[0] == "#") tag_list(document.getElementById(id).value.slice(1).toLowerCase());
        if((szo_eng[i].includes(document.getElementById(id).value) || szo_hun[i].includes(document.getElementById(id).value)))
        {
            let mondatok = mondat[i].split('|');
        
            document.getElementById("kiiras").innerHTML += `<div class="szoveg_cella">
                <div class="szoveg_cella_bal">` +
                    szo_hun[i] +
                `</div>
                <div class="szoveg_cella_jobb" id="szovegcella`+i+`" onclick="szoveg_cella_jobb_text('szovegcella`+i+`')">`+
                    szo_eng[i] +
                `<button class="fav-button" id="btn_fav`+id[i]+`" onclick="favourite_add_remove('btn_fav`+id[i]+`')">Fav</button></div>
            </div>`;
                    
                    let content = `<div class="szoveg_cella_alul" id="szovegcellaalul`+i+`" onclick="szoveg_cella_alul_content('szovegcellaalul`+i+`')"> Sentences:<br>`;
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
            document.getElementById("kiiras").innerHTML += content + '</div>';
        }
    }
}

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
                let mondatok = mondat[i].split('|');
            
                document.getElementById("kiiras").innerHTML += `<div class="szoveg_cella">
                    <div class="szoveg_cella_bal">` +
                        szo_hun[i] +
                    `</div>
                    <div class="szoveg_cella_jobb" id="szovegcella`+i+`" onclick="szoveg_cella_jobb_text('szovegcella`+i+`')">`+
                        szo_eng[i] +
                    `<button class="fav-button" id="btn_fav`+id[i]+`" onclick="favourite_add_remove('btn_fav`+id[i]+`')">Fav</button></div>
                </div>`;
                        
                        let content = `<div class="szoveg_cella_alul" id="szovegcellaalul`+i+`" onclick="szoveg_cella_alul_content('szovegcellaalul`+i+`')"> Sentences:<br>`;
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
                document.getElementById("kiiras").innerHTML += content + '</div>';
            }
        }
    }
}

function kiiras()
{
    document.getElementById("kiiras").innerHTML = "";
    for(let i = 0; i < szo_eng.length; i++)
    {
        let mondatok = mondat[i].split('|');
       
            document.getElementById("kiiras").innerHTML += `<div class="szoveg_cella">
                <div class="szoveg_cella_bal">` +
                    szo_hun[i] +
                `</div>
                <div class="szoveg_cella_jobb" id="szovegcella`+i+`" onclick="szoveg_cella_jobb_text('szovegcella`+i+`')">`+
                    szo_eng[i] +
                `<button class="fav-button" id="btn_fav`+id[i]+`" onclick="favourite_add_remove('btn_fav`+id[i]+`')">Fav</button></div>
            </div>`;
                    
                    let content = `<div class="szoveg_cella_alul" id="szovegcellaalul`+i+`" onclick="szoveg_cella_alul_content('szovegcellaalul`+i+`')"> Sentences:<br>`;
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
            document.getElementById("kiiras").innerHTML += content + '</div>';
    }
}

window.onload = function()
{
    const currentPage = window.location.pathname.split('/').pop();
  
    //main ------------------- Word List
    if (currentPage === 'main.html') {
        user = sessionStorage.getItem('user');
        document.getElementById("cim").innerText = "Hello, " + user;
        kiiras();
    }
};