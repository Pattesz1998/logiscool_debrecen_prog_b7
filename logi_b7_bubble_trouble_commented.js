stage {
    backdrop Homogén_7("gallery:General/Homogene 7")
    // 2. lépés: felvesszük a változónkat:

    let gameOn = false; // itt létrehozzuk a már lentebb említett gameOn változónkat, mely meghatározza, hogy a játékunk megy e még? amennyiben igen: true, ha már nem, vagy még nem akkor false.
    let points = 0; // létre kell hoznunk egy points változót is, amivel majd a pontjainkat számoljuk.

    actor Törpemalac { // a törpemalac szereplőként csak az Áll_ -al kezdődő jelmezekre van szükségünk, a többit töröljük ki. (3. lépésként folytassuk a törpemalachoz kapcsolódó kódok megírásával.)
        costume Áll_Alap("gallery:Animals/Mini Pig Standing Idle")
        costume Állva_Sétál_1("gallery:Animals/Mini Pig Standing Walk 1")
        costume Állva_Sétál_2("gallery:Animals/Mini Pig Standing Walk 2")

        when stage.setup // megadjuk az előzetes beállítás paramétereket, azaz azokat a dolgokat, melyeket szeretnénk ha már a program indulása előtt be lennének állítva.
        {
            this.hide(); // szeretnénk, hogy a játék elején tűnjön el a szereplőnk (ezt a this.hide parancs segítségével tehetjük meg.) - erre azért van szükség, mivel a visszaszámláláskor egyik szereplőnk sem látszódhat, csak a szám!
            this.rotationStyle = "leftRight"; // forgási stílus megadása, megadjuk, hogy merre mozoghat a szereplőnk, jelenesetben balra-jobbra mozoghat.
            this.setPosition(0, -160); // pozíciója középen lent lesz, így 0, -160 értéket veszünk fel neki. (x tengely mentén 0, y tengely mentén -160)
            this.physics.collisionShape = "polygon"; // érintkezési formája a jelmez alakja lesz (tehát polygon)
        }

        when stage.started  // ez a rész már a játék indítása utáni történésekre vonatkozik, azaz ebben a blokkban azokat a paramétereket adjuk meg, melyeket a játék indítása után szeretnénk futtatni.
            {
            while(!gameOn){} // először is a szereplőnknek meg kell várnia, amíg a játék elindul (egy várj erre parancsot fogunk megírni.) ,azaz a gameOn változó értéke igaz legyen. (itt mindig a felkiáltójel utáni állításra várunk, a várj erre parancs esetén.)
            this.show(); // amennyiben a gameOn változónk értéke igaz, tehát a fenti esemény igaz, abban az esetben megjelenítjük a szereplőnket. (a fentebb meghatározott pozícióra [this.setPosition(0, -160);] fog kerülni.)
            while(gameOn)
            {
                // magára a mozgatásra ezután kerül sor, amit addig lehet végezni, amíg a gameOn változónk értéke igaz értéket ad vissza.
                if(isKeyPressed("left arrow") && !this.touching(Edge.left))
                { // ha le van nyomva a balra nyíl, és (fontos, hogy nem mehetünk ki a pályáról), nem érinti a bal szélét a pályának, akkor..
                    this.heading = -90; // az iránya legyen -90 fok, azaz bal oldali irány.
                    this.nextCostume(); // ugorjon a szereplőnk a következő jelmezre, ezzel tudjuk majd az animálást elvégezni.
                    this.x -= 5; // az x értékét 5-tel csökkentjük (-= 5).
                    this.wait(0.01); // minimális késleltetés, amire azért van szükség, hogy ne menjen olyan gyorsan a malacunk.
                }
                else if(isKeyPressed("right arrow") && !this.touching(Edge.right))
                { // ha le van nyomva a jobbra nyíl, és (fontos, hogy nem mehetünk ki a pályáról), nem érinti a jobb szélét a pályának, akkor.. (a különben ágban készíthetnénk egy ha, akkor-t), itt azonban egy else if-t fogunk létrehozni. (ami lényegében ugyan az mintha a különben ágba tettünk volna bele egy if-et.), viszont így meg tudjuk oldani, hogyha nem a felső eset van akkor kizárólagosság van, és ha ez sem meg az sem érvényesül, akkor meg tudnunk majd adni egy végső esetet, hogy mi is történjen ebben az esetben.
                    this.heading = 90; // az iránya legyen +90 fok, azaz jobb oldali irány.
                    this.nextCostume(); // ugorjon a szereplőnk a következő jelmezre, ezzel tudjuk majd az animálást elvégezni.
                    this.x += 5; // az x értékét 5-tel növeljük (+= 5).
                    this.wait(0.01); // minimális késleltetés, amire azért van szükség, hogy ne menjen olyan gyorsan a malacunk.
                }
                else 
                {
                    this.setCostume(1); // amennyiben nincs mozgásban a törpemalacunk, azaz a fenti feltételek közül egyik sem teljesül, akkor az 1-es azaz a sima áll jelmezre álljon be.
                }    
            }
        }
    }
    
    actor Villám { // 4- lépés: a törpemalachoz tartozik a villám is, így következő lépésként őt is gyorsan leprogramozzuk.
        costume Alap("gallery:Objects/Lightning Idle")
        costume Kicsi("gallery:Objects/Lightning Little")
        costume Élénk("gallery:Objects/Lightning Bright")

        when stage.setup // megadjuk az előzetes beállítás paramétereket, azaz azokat a dolgokat, melyeket szeretnénk ha már a program indulása előtt be lennének állítva.
        {
            this.hide(); // szeretnénk, hogy a játék elején tűnjön el a szereplőnk (ezt a this.hide parancs segítségével tehetjük meg.) - erre azért van szükség, mivel a visszaszámláláskor egyik szereplőnk sem látszódhat, csak a szám!
            this.heading = 0; // az irányt amerre szeretnénk, hogy a szereplőnk azaz a villám nézzen 0-ra állítjuk, azaz felfelé, mivel felfelé fogjuk lőni a villámokat.
            this.rotationStyle = "leftRight"; // fontos, hogy a forgási stílusát át kell állítanunk (balra-jobbra mozoghat-ra), mivel amikor balra fordul, akkor néz abba az irányba a villamunk, ami nekünk kellene. (amennyiben nincs beállítva abban az esetben nem úgy mozogna, ahogy mi azt szeretnénk [csak felfelé nézne].)
            this.physics.collisionShape = "polygon"; // érintezési formát is be kell rá állítanunk, mely ebben az esetben is a jelmez alakja lesz. (tehát polygon)
            this.size = 50; // mérete pedig 50% -os lesz.
        }

        // ahogyan a többi szereplőnkhöz, ehhez a szereplőhöz is tartozik egy indításkor parancs is...
        when stage.started // ez a rész már a játék indítása utáni történésekre vonatkozik, azaz ebben a blokkban azokat a paramétereket adjuk meg, melyeket a játék indítása után szeretnénk futtatni.
        {
            while(!gameOn){} // várja meg amíg a gameOn változó értéket igaz nem lesz 
            // this.wait(4); // ez a játék elején történő várakozás (4mp) amíg magának a visszaszámlálásnak a folyamata zajlik, és helyére áll minden. (eredeti ezt kell majd átírnunk.)
            while(gameOn) 
            { // ezután amíg a gameOn változó értéke igaz
                if (isKeyPressed("space"))
                { // a szóköz gomb lenyomásakor, amíg igaz a gameOn változó értéke:
                    createClone(this); // készítünk egy másolatot erről.
                    this.wait(0.5); // majd várunk 0.5 mp-t (ezzel megadjuk, hogy 0.5 mp ként tudjuk kilőni a villámokat.)
                }
            }
        }

        when cloned // amennyiben klónozunk, a klónokra is be kell állítani különböző értékeket.
        {
            this.goTo(Törpemalac); // a törpemalacból fogjuk kilőni a villámokat, így oda kell ugranunk magához a törpemalac szereplőhöz.
            this.move(15); // ahhoz képest ahol a törpemalac pozíciója van, picit feljebbről kellene elindulnia, így megadjuk neki, hogy menjen 15-t felfelé, mivel előzetesen a felfelé irányba állítottuk be a villámot.
            this.show(); // ezután megjelenítjük a villámot mint szereplőt.
            while(!this.touching(Edge.top) && !this.touchingActorOrClone(Labda))
            { // addig fognak felfelé menni a villámok, amíg nem érintik a játéktér tetejét és nem érintik a labdának egyik másolatát sem.
                this.move(5); // addig fog előremenni 5-t.
                this.wait(0.01); // ezt 0.01 mp-ként fogja megtenni 
            }
            this.deleteClone(); // végül töröljük is ki az adott másolatot.
        }
    }
    
    actor Labda { // 5. lépésként írjuk meg a labda programját is (ez kicsit hosszabb lesz mint az előzőek voltak), de ezzel is simán meg fogunk tudni birkózni.
        costume Sárga("gallery:Objects/Ball Yellow")
        costume Zöld("gallery:Objects/Ball Green")
        costume Piros("gallery:Objects/Ball Red")

        let dir = 1; // létrehozunk egy lokális változót a labdában, ami nem lesz más mint a dir (direction), azaz irány változó, amivel megadjuk, hogy melyik labdának mely irányba kell pattannia.

        when stage.setup // megadjuk az előzetes beállítás paramétereket, azaz azokat a dolgokat, melyeket szeretnénk ha már a program indulása előtt be lennének állítva.
        {
            this.hide(); // első lépésként eltüntetjük az eredeti szereplőnket.
            this.setPosition(0, 0); // elhelyezzük őt az origónál , tehát a 0,0 pontnál.
            this.physics.isCollides = true; // következő lépésként beállítjuk, hogy a labdák ütközhessenek más szereplővel (ezért a true értéket fogjuk megadni.)
            this.physics.isStatic = false; // viszont nem szeretnénk, hogy statikusak legyenek, ami azt jelentené, hogy nem hat rájuk semmiféle fizikális valamint gravitációs hatás.
            this.physics.isSensor = true; // megadjuk, hogy érzékelhető-e az adott szereplő?
            this.physics.applyForce(100, 0); // majd egy lökést fogunk rá gyakorolni, így rögtön az elején.
            this.size = 200; // méretét pedig 200% -osra állítjuk, azaz kétszeres megjelenítést fogunk alkalmazni.
            // a fentebb található értékek/parancsok definiálják magát az első labdánkat.
        }

        when stage.started // ez a rész már a játék indítása utáni történésekre vonatkozik, azaz ebben a blokkban azokat a paramétereket adjuk meg, melyeket a játék indítása után szeretnénk futtatni.
        {
            while(!gameOn) {} // mint ahogy a törpemalac szereplőnk esetében, ezen esetben is meg kell várnunk, hogy a gameOn változó értéke igaz legyen.
            createClone(this); // ezután készítünk egy másolatot a labda szereplőről.   
        }
        // minden mást, már a másolatokban fogunk elvégezni.
        when cloned // amennyiben klónozunk, a klónokra is be kell állítani különböző értékeket.
        {
            this.size -= 40; // amikor létrehozunk a labdából egy másolatot, annak -40 -el kisebbnek kell lennie, mint az eredeti labdánknak.
            this.physics.collisionShape = "polygon"; // az érintkezési formát az összesnél beállítjuk a jelmez alakjára.
            this.physics.isCollides = "true"; // megadjuk, hogy a fentiekhez hasonlóan, ők is ütközhetnek más szereplőkkel.
            if(this.size >= 20)
            { // amennyiben a másolatunk mérete 20% felett van, abban az esetben...:
                if(this.cloneId % 2 == 0)
                { // a másolat sorszámok alapján fogjuk meghatározni, hogy jobbra vagy balra fognak menni a labdák.. - mivel mindig két másolatot hozunk létre, ezért minden esetben lesz egy páros és egy páratlan. (ez esetben a legegyszerűbb az az, ha beállítjuk, hogy a párosak és a páratlanok is mindig ugyanabba az irányba menjenek.)
                // meg kell vizsgálnunk, hogy páros vagy páratlan e a másolat sorszáma, ha páros akkor... 
                    dir = 1; // abban az esetben a dir értéke 1 lesz.
                    this.physics.setVelocity(20, 20 * dir); // valamint adunk neki egy minimális sebességet (20-as erővel, valamint 20 fokos irányba, viszont ezt megszorozzuk az iránnyal) - ez azt jelenti, hogy ha a dir értéke 1 jobb oldali irányba fog menni, ha -1 akkor bal oldali irányba fog menni.
                    this.heading = 60; // ezután a headinget beállítjuk 60-ra.
                }
                else // amennyiben ez viszont páratlan, akkor.... :
                { 
                    dir = -1; // abban az esetben a dir értéke -1 lesz.
                    this.physics.setVelocity(20, 20 * dir); // valamint adunk neki egy minimális sebességet (20-as erővel, valamint 20 fokos irányba, viszont ezt megszorozzuk az iránnyal) - ez azt jelenti, hogy ha a dir értéke 1 jobb oldali irányba fog menni, ha -1 akkor bal oldali irányba fog menni.
                    this.heading = -60; // ezután a headinget beállítjuk -60-ra.
                }
                this.move (30); // mindegyik elmozdul az adott irányba (amerre kell neki) 30-al. , ez azért kell, hiszen nem lehetséges az , hogy egymásban legyenek a kettéválás során. (pici távolság kell, hogy legyen köztük, hogy lássuk azt, hogy valóban szétesnek.)
                this.show(); // eljött az a pillanat, amikor már meg is jeleníthetjük ezeket a másolatainkat.
                while(gameOn)
                { // a while gameOn - on belül a játékban lévő viselkedésüket fogjuk leprogramozni.
                    if (this.touching(Edge.bottom))
                    { // ha bármikor érinti a játéktér alját, akkor....
                        this.physics.setVelocity(100, 20 * dir); // neki abba az irányba kell elpattannia, amerre alapvetően pattant eddig, ha jobbrol akkor itt is a földről jobb oldalra fog pattanni. (úgy állítjuk be a sebességet, amerre alapvetően pattant eddig) - az erő 100-lesz , az irány marad ez a 20 * dir
                    }
                    if (this.touching(Edge.right) && this.touching(Edge.left))
                    { // abban az esetben, ha vagy a bal, vagy a jobb oldali falat érintjük, (mindegy melyiket érintjük mert ugyanaz fog rájuk vonatkozni.)
                        dir *= -1; // ha érinti bármelyiket a két fal közül, a dir értékét a -1 szeresére változtatjuk, így -1 ből 1 lesz 1 ből pedig -1.
                        this.wait(0.1); // majd ezt követően várunk 0.1 mp-t.
                    }
                    if(this.touchingActorOrClone(Villám))
                    { // ha bármelyik labdát érinti a villám akkor.... :
                        createClone(this); // akkor készítünk belőlük kettő db másolatot
                        createClone(this); 
                        points += 1; // a points változó értéke növekedik 1 -gyel.
                        stage.broadcast("win?"); // küldünk egy jelzést, melyben azt fogjuk vizsgálni, hogy hol is tartunk éppen a pontok terén?
                        this.deleteClone(); // majd törüljük is ki az adott másolatot

                    }
                }
            }
            else // felül azt vizsgáltuk, hogy mekkora a labdánk mérete éppen(if) -40 es méretcsökkentés után, és itt biznyos méretnél már nem tudunk belőle majd új másolatokat készíteni (20 alatt) ezért meg kell nekünk mondania, ha felette van működhet, viszont, ha nem, akkor törlődnie kell a másolatoknak.
            { // egyéb esetben, ha a méret méret kisebb mint 20, akkor ....
                this.deleteClone(); // a klónoknak törlődniük kell. (a 20 még pont az a méret amiből még lehet 2 ami szétesik.)
            }
        }
    }
    
    actor Winner { // 6. és egyben utolsó lépésünkként a winner feliratot fogjuk leprogramozni:
        costume Kék("gallery:Text/Winner Blue")
        costume Zöld("gallery:Text/Winner Green")

        when stage.setup // megadjuk az előzetes beállítás paramétereket, azaz azokat a dolgokat, melyeket szeretnénk ha már a program indulása előtt be lennének állítva.
        {
            this.hide(); // a legelején el kell tüntetnünk a szereplőnket.
            this.size = 100; // a méretét 100% -ra fogjuk beállítani.
        }

        when stage.signalReceived("win?") // egy jelzés érkezésekor (korábban készített win jelzésekor), megvizsgáljuk majd, hogy mennyi pontunk van, és annak a függvényében , hogyha megérkezik ez a jelzés, akkor eldönti, hogy hogy állunk éppen. 
        { 
            this.wait(0.2); // 0.2 mp-t fogunk várni.
            if(points == 15)
            { // megvizsgáljuk, hogy ha a points értéke 15 -tel egyenlő, akkor....
                gameOn = false; // a gameOn változó értéke legyen hamis, azaz a játékunknak legyen vége.
                this.setCostume(1); // a jelmezét váltsuk át 1-re.
                this.show(); // jelenítsük meg a szereplőnket azaz a winner feliratot.
                while (true)
                { // itt pedig egy mindigben, fogjuk váltogatni a jelmezeinket.
                    this.nextCostume(); // jelmez váltás
                    this.wait(0.3); // 0.3 másodperc várakozás
                    this.previousCostume(); // jelmez váltás (előző jelmezre)
                    this.wait(0.3); // 0.3 másodperc várakozás
                }
            }
        }
    }
    
    actor Szám { // 1. első lépésként a szám szereplőnknél, a visszaszámlálást fogjuk leprogramozni.
        costume Egy("gallery:Text/One")
        costume Kettő("gallery:Text/Two")
        costume Három("gallery:Text/Three")
        // a szám szereplőnél, csak az 1-3-ig számokra van szükségünk a visszaszámláláshoz.
        // a többi számot (beleértve a 0-t is) töröljük ki!
        when stage.setup // megadjuk az előzetes beállítás paramétereket, azaz azokat a dolgokat, melyeket szeretnénk ha már a program indulása előtt be lennének állítva.
        {
            this.setPosition(0, 0); // megadjuk a szereplőnk kezdő pozícióját (jelenesetben pontosan középre, az origóhoz helyezzük el), a pontosvesszőt ne hagyjuk le a sor végéről!
            this.size = 250; // méretét 250% - osra állítjuk, tehát 2,5 szeres nagyítást alkalmazunk. (alap méret 100%)
            this.setCostume(3); // a jelmezt 3 -as értékre állítjuk.
            this.show(); // ezt követően megjelenítjük a szereplőnket.
        }
        when stage.started // megadjuk, hogy amikor elindul maga a programunk mi történjen?
        {
            for(let i = 1; i <= 3; i++)
            {
                this.size = 200; // azért van szükség nagy számok megjelenítésére, mivel ahogy a visszaszámlálás folyamatban lesz, a méretük csökkenni fog. (2x es megjelenítés), olyan lesz mintha a háttérben tűnnének el, de igazából csak lekicsinyítjük őket.
                for(let j = 1; j <= 33; j++)
                { // maga a kisebbítés 33 alkalommal fog ismétlődni/megtörténni. (belső for ciklusnál j-t használjunk, ne pedig i-t!)
                    this.size -= 4; // a mérete 4 -el csökken, tehát amennyiben csökkenteni szeretnénk a méretet, akkor az érték előtt használnunk kell a negatív előjelet.
                    this.wait(0.02); // itt megadjuk, hogy hány mp -ként történjen meg ez a kicsinyítés (jelenesetben 0.02 mp-ként).
                }
                this.previousCostume(); // ezután visszalépünk az előző jelmezünkre, ehhez adjátok meg a this.previousCostume parancsot.
            }
            gameOn = true; // létrehozunk egy gameOn változót, mely a játék indításáért felelős, azonban ez a változó még nincs létrehozva, így ezt létre kell még hoznunk.
            this.hide(); // valamimt eltüntetjük a szereplőnket.
        }
    }
}