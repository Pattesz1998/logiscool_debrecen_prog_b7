stage {
    backdrop Homogén_7("gallery:General/Homogene 7") 
    // 2. lépés: felvesszük a változónkat:
    // itt létrehozzuk a már lentebb említett gameOn változónkat, mely meghatározza, hogy a játékunk megy e még? amennyiben igen: true, ha már nem, vagy még nem akkor false.
    // létre kell hoznunk egy points változót is, amivel majd a pontjainkat számoljuk.
    let gameOn = false;
    let points = 0;
    
    actor Törpemalac {
        costume Áll_Alap("gallery:Animals/Mini Pig Standing Idle")
        costume Állva_Sétál_1("gallery:Animals/Mini Pig Standing Walk 1")
        costume Állva_Sétál_2("gallery:Animals/Mini Pig Standing Walk 2")

        when stage.setup // itt megadhatjuk azokat a paramétereket, melyeket még a programunk futása előtt szeretnénk megvalósítani.
        {
            this.hide(); // szeretnénk, hogy a játék elején tűnjön el a szereplőnk (ezt a this.hide parancs segítségével tehetjük meg.) - erre azért van szükség, mivel a visszaszámláláskor egyik szereplőnk sem látszódhat, csak a szám!
            this.rotationStyle = "leftRight"; // forgási stílus megadása, megadjuk, hogy merre mozoghat a szereplőnk, jelenesetben balra-jobbra mozoghat.
            this.setPosition(0, -160); // pozíciója középen lent lesz, így 0, -160 értéket veszünk fel neki. (x tengely mentén 0, y tengely mentén -160)
            this.physics.collisionShape = "polygon"; // érintkezési formája a jelmez alakja lesz (tehát polygon)
        }
        when stage.started // a lentebb található parancsok már a programunk futása közben futnak le...
        {
            while(!gameOn); // először is a szereplőnknek meg kell várnia, amíg a játék elindul (egy várj erre parancsot fogunk megírni.) ,azaz a gameOn változó értéke igaz legyen. (itt mindig a felkiáltójel utáni állításra várunk, a várj erre parancs esetén.)
            this.show(); // amennyiben a gameOn változónk értéke igaz, tehát a fenti esemény igaz, abban az esetben megjelenítjük a szereplőnket. (a fentebb meghatározott pozícióra [this.setPosition(0, -160);] fog kerülni.)
            while(gameOn) 
            { // magára a mozgatásra ezután kerül sor, amit addig lehet végezni, amíg a gameOn változónk értéke igaz értéket ad vissza.
                if(isKeyPressed("left arrow") && !this.touching(Edge.left))
                { // ha le van nyomva a balra nyíl, és (fontos, hogy nem mehetünk ki a pályáról), nem érinti a bal szélét a pályának, akkor..
                    this.heading = -90; // az iránya legyen -90 fok, azaz bal oldali irány.
                    this.nextCostume(); // ugorjon a szereplőnk a következő jelmezre, ezzel tudjuk majd az animálást elvégezni.
                    this.x -= 5; // az x értékét 5-tel csökkentjük (-= 5).
                    this.wait(0.01); // minimális késleltetés, amire azért van szükség, hogy ne menjen olyan gyorsan a malacunk.
                }
                else // egyébként....
                {
                  if(isKeyPressed("right arrow") && !this.touching(Edge.right)) 
                { // ha le van nyomva a jobbra nyíl, és (fontos, hogy nem mehetünk ki a pályáról), nem érinti a jobb szélét a pályának, akkor..
                    this.heading = 90; // az iránya legyen +90 fok, azaz jobb oldali irány.
                    this.nextCostume(); // ugorjon a szereplőnk a következő jelmezre, ezzel tudjuk majd az animálást elvégezni.
                    this.x += 5; // az x értékét 5-tel növeljük (+= 5).
                    this.wait(0.01); // minimális késleltetés, amire azért van szükség, hogy ne menjen olyan gyorsan a malacunk.
                }
                else // amennyiben a fenti feltételek közül egyik feltétel sem teljesül, azaz malacunk lényegében egyhelyben áll...
                { 
                    this.setCostume(1); //akkor az 1-es azaz a sima áll jelmezt vegye fel.         
                }  
                }
            }
        }
    }
    
    actor Villám {
        costume Alap("gallery:Objects/Lightning Idle")
        costume Kicsi("gallery:Objects/Lightning Little")
        costume Élénk("gallery:Objects/Lightning Bright")
    }
    
    actor Labda {
        costume Sárga("gallery:Objects/Ball Yellow")
        costume Zöld("gallery:Objects/Ball Green")
        costume Piros("gallery:Objects/Ball Red")
    }
    
    actor Winner {
        costume Kék("gallery:Text/Winner Blue")
        costume Zöld("gallery:Text/Winner Green")
    }
    
    actor Szám { 
        // 1. első lépésként a szám szereplőnknél, a visszaszámlálást fogjuk leprogramozni.
        // a szám szereplőnél, csak az 1-3-ig számokra van szükségünk a visszaszámláláshoz.
        // a többi számot (beleértve a 0-t is) töröljük ki!
        costume Egy("gallery:Text/One")
        costume Kettő("gallery:Text/Two")
        costume Három("gallery:Text/Three")

        when stage.setup
        {
            for(let i = 1; i <= 3; i++)
            { // a visszaszámlálás leprogramozása, maga a visszaszámlálás 3 alkalommal fog ismétlődni, 3-tól visszafelé (3,2,1)
                this.size = 200; // a méretet 200% -osra állítjuk, erre azért van szükség nagy számok megjelenítésére, mivel ahogy a visszaszámlálás folyamatban lesz, a méretük csökkenni fog. (2x es megjelenítés), olyan lesz mintha a háttérben tűnnének el, de igazából csak lekicsinyítjük őket.
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