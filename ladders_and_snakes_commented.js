stage {
    backdrop Anaconda("gallery:Games/Anaconda") // háttér beállítása (szabadon változtatható)
    let next = 0; // next változó segítségével megadjuk, hogy melyik szereplőnk lesz a kövezkező játékos, azaz melyiknek a köre következik.
    let game = false; // a let game = false változó azt jelöli. hogy a játékunk éppen folyamatban van-e vagy sem? Értéke lehet true(igaz), vagy false(hamis), igaz esetén folyamatban van..
    let characters = [  ];  // a characters (karakter) listában tároljuk majd a két résztvevő játékosunkat (innen tudjuk majd kiemelni a karakterek nevét)
    function movePlayer(who, where) { // játékos mozgatása függvény (movePlayer) - két paraméter - who/where (melyik szereplő lépjen? és hova lépjen?)
        let X = 0; // kiinduló pozíció megadása x tengely
        let Y = 0; // kiinduló pozíció megadása y tengely
        let h = 90; // h (= heading) változó felvétele, az érték megadja, hogy a karakterünk merre nézzen éppen.
        if(where >= 1 && where <= 6) { // mozgás programozása (különböző szakaszok megadásával (pl jelen szakasz 1-6-ig tart)) ezeket azonosan kell kezelnünk.
            Y = -110; // y tengely mentén lévő pozíció megadása.
            X = -170 + where * 60; //x tengely értéke mindig attól függ, hogy hová is kell lépnem (első eset, ha 1-t dobunk akkor 1*60 +- 170 = -110 lesz az első mező koordinátája)
            h = 90; // irány amerre a karakterünk néz (+ esetén jobbra - esetén balra 90 fok legyen az irány!)
        }
        if(where >= 7 && where <= 12) { //itt maga az érték egyenlő 13-al, az egyenlőséget ez esetben dupla = (==) jellel jelöljük.
            Y = -40; // magasság (x,y tengely esetén minden esetben az y tengely-t vizsgáljuk)
            X = 190 - (where - 7) * 65; // a legszélső 7-es mező a 190 értéket fogja felvenni mivel ha 7 ből kivonunk 7-t az 0 lesz -> 0 * 65 = 0 és 190 - 0 = 190..
            h = -90; // irány amerre a karakterünk néz (+ esetén jobbra - esetén balra 90 fok legyen az irány!)
        }
        if(where == 13) { // itt maga az érték egyenlő 13-al, az egyenlőséget ez esetben dupla = (==) jellel jelöljük. (speciális eset)
            Y = -20; // magasság (x,y tengely esetén minden esetben az y tengely-t vizsgáljuk)
            X = -175; // x tengely mentén lévő fixált pozíció
            h = 0; // irány amerre karakterünk néz, jelen esetben előre nézünk.
        }
        if(where >= 14 && where <= 19) { // mozgás programozása (különböző szakaszok megadásával (pl jelen szakasz 14-19-ig tart)) ezeket azonosan kell kezelnünk.
            Y = 40; // magasság (x,y tengely esetén minden esetben az y tengely-t vizsgáljuk)
            X = -150 + (where - 14) * 65;
            h = 90; // irány amerre a karakterünk néz (+ esetén jobbra - esetén balra 90 fok legyen az irány!)
        }
        if(where >= 20 && where <= 24) {
            Y = 110; // magasság (x,y tengely esetén minden esetben az y tengely-t vizsgáljuk)
            X = 190 - (where - 20) * 65;
            h = -90; // irány amerre a karakterünk néz (+ esetén jobbra - esetén balra 90 fok legyen az irány!)
        }
        if(where >= 25) {
            //végső rész, legszéle a játéknak (25-ös mező).
            Y = 110; // magasság (x,y tengely esetén minden esetben az y tengely-t vizsgáljuk)
            X = -195; // jelen esetben akárcsak a kezdő esetnél itt is fix pozíciója van az x tengelynek.
            h = -90; // irány amerre a karakterünk néz (+ esetén jobbra - esetén balra 90 fok legyen az irány!)
        }
        who.glideSecondsTo(0.3, X, Y); // a who azaz akivel közlekedünk, csússzon 0.3 sec-ig az X Y változóhelyen.
        who.heading = h; // az iránya pedig egy h változótól fog függeni. (heading=irány)
    }
    when keyPressed("space") { // programozzuk le, hogy mi történjen akkor, ha lenyomjuk a szóköz vagy space gombot?
        if(game) { // játék változó (ezt többféle módon fogjuk felhasználni) - a dobást is ettől fogjuk függővé tenni. (ha dobhat a másik játékos is akkor lesz ujra igaz a game azaz játék változó értéke) - illetve ha az egyik játékos már beért a célba, abban az esetben sem fogjuk már igazzá tenni a változó értékét.
            game = false; // dobás kezdeményezése esetén a game változó értékét hamis-ra kell állítanunk.
            let who = characters[next]; // létrehozunk egy who azaz ki változót , aki a characters listából a next-edik elem lesz (következő elem lesz) (next fogja tárolni azt, hogy hanyadik elemet szeretnénk felhasználni a listából)
            this.Dice.roll(); // kockával meghívjuk a roll függvényt - ezt követően számunkra két változó lesz fontos/mérvadó
            let oldpos = who.pos; // oldpos (eredeti pozíció), amely az éppen aktuális pozícióját menti el a szereplőnek.
            let newpos = oldpos + this.Dice.costumeId; // illetve a newpost (új pozíció) mely a régi pozíció + a kocka jelmezének sorszáma (dobástól függően (1,2,3,4,5,6))
            let i = oldpos; // i segédváltozó, mely az oldpos azaz eredeti pozíciótól fog számolni.
            if(i == 0) { // ha az i értéke 0 val egyenlő, ami abban az esetben áll fenn, ha éppen most kezdjük a játékot, akkor 
                i++; // automatikusan eggyel mindig tovább fogjuk növelni az értékét. (az első mezőre mindenképp el kell mennünk) - így ha 5-öst dobok, akkor az i értéke 0, egyet kapásból hozzádobunk, mivel egyet mindenképpen lépnünk kell.
            }
            while(i <= newpos) { // ezután továbbmegyünk mindaddig amíg el nem érjük az új pozíciónkat.
                this.movePlayer(who, i); // moveplayer fgv meghívjuk arra aki éppen jön, és az i-t fogja megkapni, ahanyadik mezőre kell lépnie
                i++; // majd hozzáadunk mégegyet -> egyenként lép minden mezőre , emiatt picit hosszabb lesz a játék, rendesen végiglépi a mezőket, sokkal látványosabb és életszerűbbek a lépések
            } // előfordulhat azonban, hogy létrára vagy kígyóra lépünk, ezért ezeket feltételek segítségével egyesével meg kell vizsgálnunk.
            if(newpos == 5) {
                newpos = 8;
                this.movePlayer(who, newpos);
            }
            if(newpos == 10) {
                newpos = 4;
                this.movePlayer(who, newpos);
            }
            if(newpos == 11) {
                newpos = 15;
                this.movePlayer(who, newpos);
            }
            if(newpos == 14) {
                newpos = 12;
                this.movePlayer(who, newpos);
            }
            if(newpos == 18) {
                newpos = 21;
                this.movePlayer(who, newpos);
            }
            if(newpos == 23) {
                newpos = 16;
                this.movePlayer(who, newpos);
            }

            /* if(newpos > 25) {
            newpos = oldpos + ((25 - oldpos) - (newpos - oldpos)); // 25 - oldpos (mennyi van a célig) new - oldpos kivonjuk hogy mennyit dobtunk, abbol kijön a különbség , ezt s - számot hozzáadjuk a oldpos-hoz.
            this.movePlayer(who, newpos)
            } */

            who.pos = newpos;
            if(newpos >= 25) { // == 25 egyenlővé tesszük, hogy akkor a feltétel teljesülése esetén kiírjuk a győztest.
                this.Dice.say(who.costumeName + " a győztes, gratulálunk!");
            } 
            else {
                next = 3 - next; // amennyiben nem érte el a játék végét, 1 játékos esetében 3 - 1 azaz 2 tehát a második játékos következik -> ez váltogatja egymást 1,2,1,2 stb.
                game = true; // game változó értéke true ,mivel a játék folytatódik ebben az esetben.
            }
        }
    }
    when started {
        next = 1;
        characters = [  ];
        characters.push(0);
        characters.push(Player);
        characters.push(Player2);
    }
    
    actor Player {
        costume Lady_Bug("gallery:Animals/Ladybug Idle")
        let pos = 0; // lokális változó (let pos) 
        when stage.started {  // indításkor mit csináljon a szereplőnk?
            this.setPosition(-240, -110); // elhelyezés/pozíció beállítása /(deklarálása) - kódban deklarálunk.
            this.show();  // megjelenítés deklarációja, ennek köszönhetően megjenik a karakterünk a játékban.
            this.rotationStyle = "leftRight"; // megadjuk,hogy merre mozoghat a szereplőnk. (jelenesetben jobb-bal, vagy bal-jobb irányba).
        } 
    }
    
    actor Player2 {
        costume Micky_Mouse("gallery:Animals/Mouse Plan 1")
        let pos = 0; // lokális változó (let pos) 
        when stage.started { // indításkor mit csináljon a szereplőnk?
            this.setPosition(-300, -110); // elhelyezés/pozíció beállítása /(deklarálása) - kódban deklarálunk.
            this.show(); // megjelenítés deklarációja, ennek köszönhetően megjenik a karakterünk a játékban.
            this.rotationStyle = "leftRight"; // megadjuk,hogy merre mozoghat a játékosunk. (jelenesetben jobb-bal, vagy bal-jobb irányba).
        }
         
    }
    
    actor Dice {
        costume Kocka_1("gallery:Objects/Cube 1")
        costume Kocka_2("gallery:Objects/Cube 2")
        costume Kocka_3("gallery:Objects/Cube 3")
        costume Kocka_4("gallery:Objects/Cube 4")
        costume Kocka_5("gallery:Objects/Cube 5")
        costume Kocka_6("gallery:Objects/Cube 6")
        function roll() { // kocka dobásának programozása (roll azaz dobás függvény segítségével) - megadunk egy roll függvényt.
            for(let i = 1; i <= 36; i++) { // magának a dobásnak a programozása , az i++ valamint a 36-os érték miatt, ez 36 esetben fog megismétlődni.
                this.turnRight(20); // 20 fokokkal történő fordulások (36*20=720 fok (360*2 tehát 2* fog körbefordulni))
                this.setCostume(Math.randomBetween(1, 6)); // jelmezét megváltoztatjuk, ez minden esetben egy véletlen szám lesz 1 és 6 között --> Math.random.Between
            }
        }
        when stage.started { // indításkor mit csináljon még a programunk? bár plussz dolog beállítása
            this.setPosition(-280, 20); // pozíció beállítása (Y, X)
            this.say("Nyomd meg a szóközt a dobáshoz!"); // megadjuk, hogy milyen utasítást (szöveget) mondjon nekünk a dobókockánk.
            this.wait(2); // megadjuk neki, hogy ezt mindösszesen 2mp-ig tegye meg..
            this.say(""); // ezt követően már nem szólal meg a dobókockánk. (nem ad ki szöveget)..
            game = true; // játékot elindítjuk, kezdetben False értéket adtunk meg neki, melyet itt átállítunk: True (Igaz) értékre
        }
    }
    
}