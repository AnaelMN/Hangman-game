var newGame = function(mustContinue){  
  var buttons = document.getElementsByClassName('btn');
  var letterButtons = document.getElementsByClassName('letter');
  var newGameButton = document.getElementById('newGame');
  var hintButton = document.getElementById('hint');
  var restartButton = document.getElementById('restart');
  var changeLangButton = document.getElementById('changeLang');
  window.game = localStorage.getItem('game') ? JSON.parse(localStorage.getItem('game')) : null;
  if (mustContinue !== false || game === null) {
    if (game === null) {
      game = {};
    }
    if (game.hasOwnProperty('isWin') && game.isWin == null) {
      game.losts += 1;
    }
    if (game.hasOwnProperty('timer') === true) {
      clearTimeout(game.timer);
    }
    game['fails'] = 5;
    game['hints'] = 5;
    game['stringToKnow'] = '';
    game['stringKnown'] =  '';
    game['over'] = false;
    game['time'] = 60;
    game['timer'] = null;
    game['isWin'] = null;
    game['alreadyClicked'] = [];
    game['language'] = 'es_ES';
    game['texts'] = {};
    game['texts']['en_EN'] = {
      'points': 'Points',
      'losts': 'Losts',
      'wins': 'Wins',
      'time': 'Time',
      'attempts': 'Attempts',
      'hints': 'Hints',
      'youWin': 'You win',
      'youLost': 'You lost',
      'newGame': 'New Game!',
      'hint': 'Hint!',
      'changeLang': 'Inténtalo en español'
    }
    game['texts']['es_ES'] = {
      'points': 'Puntos',
      'losts': 'Perdidas',
      'wins': 'Ganadas',
      'time': 'Tiempo',
      'attempts': 'Intentos',
      'hints': 'Pistas',
      'youWin': 'Has ganado',
      'youLost': 'Has perdido',
      'newGame': '¡Nueva partida!',
      'hint': '¡Pista!',
      'changeLang': 'Try on English'
    }
    game.stringToKnow = getNewStringToKnow().toLowerCase();
    game.stringKnown = convertNewString();
  }
  game['wins'] = game['wins'] ? game['wins'] : 0;
  game['losts'] = game['losts'] ? game['losts'] : 0;
  game['points'] = game['points'] ? game['points'] : 0;
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e){e.preventDefault();});
    buttons[i].classList.remove('off');
  }
  for (var i = 0; i < letterButtons.length; i++) {
    letterButtons[i].addEventListener('click', eventGuess);
  }
  for (id in game.alreadyClicked) {
    document.getElementById(game.alreadyClicked[id]).classList.add('off');
    document.getElementById(game.alreadyClicked[id]).removeEventListener('click', eventGuess);
  }
  newGameButton.addEventListener('click', newGame);
  hintButton.addEventListener('click', getHint);
  restartButton.addEventListener('click', restart);
  changeLangButton.addEventListener('click', changeLang);
  timeDown();
  refreshHTML();
}

var eventGuess = function(){
  if (!game.over) {
    check(this.innerHTML);
    game.alreadyClicked.push(this.getAttribute('id'));
    this.classList.add('off');
    this.removeEventListener('click', eventGuess);
    if (game.stringToKnow === game.stringKnown) {
      gameOver();
    }
    refreshHTML();
  }
}

var restart = function(e){
  localStorage.removeItem('game');
  clearTimeout(game.timer);
  delete game;
  newGame(e);
}

var check = function(letter) {
  var index = game.stringToKnow.indexOf(letter);
  if(index !== -1) {
    for (var i = 0; i < game.stringToKnow.length; i++) {
      if (game.stringToKnow[i] == letter) {
        replaceString(i,letter);
      }
    }
  } else {
    game.fails -= 1;
    if (game.fails === 0) {
      gameOver();
    }
  }
  refreshHTML();
}

var replaceString = function(index,letter){
  game.stringKnown = game.stringKnown.substr(0, index) + letter + game.stringKnown.substr(index + 1);
}

var getNewStringToKnow = function(){
  var strings = ["Forrest Gump","Titanic","El Padrino","Gladiator","El Señor de los anillos: El retorno del rey","El rey león","El caballero oscuro","Cadena perpetua","Piratas del Caribe: La maldición de la Perla Negra","Braveheart","La lista de Schindler","Toy Story","El Señor de los anillos: La comunidad del anillo","Eduardo Manostijeras","Salvar al soldado Ryan","Regreso al futuro","Monstruos, S.A.","Buscando a Nemo","El Señor de los anillos: Las dos torres","Harry Potter y el Prisionero de Azkaban","American History X","300","El sexto sentido","Pulp Fiction","V de Vendetta","El silencio de los corderos","Rocky","El club de la lucha","E.T.","Matrix","Parque Jurásico","La milla verde","Ratatouille","El Padrino. Parte II","Grease","Wall-E","El exorcista","Iron Man","Piratas del Caribe: El cofre del hombre muerto","Seven","Terminator 2: el juicio final","La bella y la bestia","El resplandor","Hombres de negro","Spider-Man","Regreso al futuro II","El show de Truman","Pesadilla antes de navidad","Toy Story 2","Star Wars. Episodio IV: Una nueva esperanza","Saw","Terminator","Kill Bill Vol. 1","El Laberinto del Fauno","El precio del poder","Los increíbles","El viaje de Chihiro","King Kong","Lo que el viento se llevó","Aladdin","Indiana Jones y la última cruzada","Ben-Hur","Ciudad de Dios","Infiltrados","Entrevista con el vampiro","Batman Begins","Star Wars. Episodio III: La venganza de los Sith","En busca del arca perdida","Alien","El Padrino. Parte III","El bueno, el feo y el malo","Star Wars. Episodio V: El imperio contraataca","Star Wars. Episodio VI: El retorno del Jedi","Escuela de Rock","Rambo","Tiburón","American Beauty","El profesional","El planeta de los simios","Full Metal Jacket","Amélie","Trainspotting","Taxi driver","Alguien voló sobre el nido del cuco","Casablanca","Kill Bill Vol. 2","X-Men 2","Transformers","Spider-Man 2","Star Wars. Episodio I: La amenaza fantasma","Apocalypse Now","Ocean's Eleven","Sweeney Todd: El barbero diabólico de la calle Fleet","Los cazafantasmas","El libro de la selva","Blade Runner","Mejor... imposible","La vida de Brian","Predator","Blancanieves y los siete enanitos","Uno de los nuestros","Indiana Jones y el templo maldito","A.I. Inteligencia Artificial","Sin City","Moulin Rouge","Psicosis","¿Quién engañó a Roger Rabbit?","Bailando con lobos","El indomable Will Hunting","Réquiem por un sueño","Rain Man","Dos tontos muy tontos","Gremlins","Reservoir Dogs","Pesadilla en Elm Street","El cuervo","Los intocables de Eliot Ness","El último mohicano","El caso Bourne","Snatch","Los Goonies","Dirty Dancing","El truco final: El prestigio","Romeo + Julieta de William Shakespeare","El castillo ambulante","Jungla de cristal","Brokeback Mountain","Indiana Jones y el reino de la calavera de cristal","Juno","2001: Una odisea del espacio","Cinema Paradiso","Pequeña Miss Sunshine","Platoon","El mago de Oz","Aliens","Doce monos","Sin perdón","El mito de Bourne","Ciudadano Kane","Batman vuelve","Amores Perros","Batman","Espartaco","Memento","Casino","El ultimátum de Bourne","Los siete samuráis","Arma letal","Big","El paciente inglés","Casino Royale","RoboCop","Carrie","Amadeus","Superman: la película","12 hombres sin piedad","Top gun: Ídolos del aire","Qué bello es vivir","El golpe","28 días después","La matanza de Texas","La quimera del oro","Hacia rutas salvajes","Cantando bajo la lluvia","No es país para viejos","El tercer hombre","La ventana indiscreta","¿Teléfono rojo? Volamos hacia Moscú","Con faldas y a lo loco","King Kong","Rebelde sin causa","Tigre y dragón","El puente sobre el río Kwai","Con la muerte en los talones","Atrapado en el tiempo","El graduado","Lawrence de Arabia","Dos hombres y un destino","El cazador","Encuentros en la tercera fase","La princesa Mononoke","El apartamento","Cabaret","L.A. Confidential","La ley del silencio","Desayuno con diamantes","La leyenda del indomable","Scream","Tootsie","El halcón maltés","Cowboy de medianoche","Chinatown","¡Olvídate de mí!","Speed","Heat","La gran evasión","Cuenta conmigo","Érase una vez en América","El hundimiento","Colisión","El gran Lebowski","El acorazado Potemkin","American Psycho","Toro salvaje","La delgada línea roja","Operación Dragón","Mi vecino Totoro","Harry el sucio","Supersalidos","Hasta que llegó su hora","Sospechosos habituales","Fargo","El hombre elefante","Donnie Darko","La semilla del diablo","Vértigo (De entre los muertos)","Mad Max 2","Los siete magníficos","Superman Returns","Cuatro bodas y un funeral","Un perro andaluz","Hijos de los hombres","Viridiana","Los olvidados","La cosa","Le llaman Bodhi","Amanecer de los muertos","La princesa prometida","Good morning, Vietnam","Matar a un ruiseñor","Aterriza como puedas","La noche del cazador","La dolce vita","La novia de Frankenstein","Sucedió una noche","Manhattan","M, el vampiro de Düsseldorf","Jerry Maguire","El buscavidas","París, Texas","American Graffiti","Brazil","Magnolia","Jackie Brown","Terciopelo azul","El gatopardo","Rebeca","Atrapado por su pasado","Un hombre lobo americano en Londres","Annie Hall","Akira","Zodiac","Zulú","La última noche de Boris Grushenko","Ninotchka","El protegido","Ladrón de bicicletas","Los caballeros de la mesa cuadrada (y sus locos seguidores)","Sentido y sensibilidad","Asesinos natos","Atracción fatal","Vacaciones en Roma","Sopa de ganso","La noche de los muertos vivientes","Zombies party","J.F.K.: caso abierto","Siete novias para siete hermanos","Cyrano de Bergerac","Senderos de gloria","Miedo y asco en Las Vegas","El crepúsculo de los dioses","La vida de los otros","Todos los hombres del presidente","Ed Wood","El club de los cinco","Centauros del desierto","Granujas a todo ritmo","Tarde de perros","Oldboy","La noche de Halloween","Cuando Harry encontró a Sally","Las vírgenes suicidas","Lost in Translation","Eva al desnudo","Monstruoso","Historias de Filadelfia","James Bond contra Goldfinger","Vuelo 93","El séptimo sello","Una historia de violencia","Golpe en la pequeña China","El asesinato de Jesse James por el cobarde Robert Ford","Un concierto gatuno","Río Bravo","El fuera de la ley","Expiación, más allá de la pasión","El tesoro de Sierra Madre","El ejército de las tinieblas","Pozos de ambición","Qué noche la de aquel día","Muerte entre las flores","Jóvenes ocultos","Grupo salvaje","El hombre que pudo reinar","Cómo ser John Malkovich","Ran","Das Boot. El submarino","Battle Royale","Mulholland Drive","Antes de amanecer","Perdición","Casi famosos","Horizontes de grandeza","Delicatessen","Terroríficamente muertos","Encadenados","Arma fatal","Rashomon","Los cuatrocientos golpes","Alta fidelidad","Días de radio","Tener y no tener","Amor a quemarropa","La decisión de Sophie","El rock de la cárcel","Sed de mal","Todo en un día","El espíritu de la colmena","Ocho y medio","Clerks","The French Connection, contra el imperio de la droga","Antes del atardecer","Campo de sueños","La Bella y la Bestia","Sunshine","Los amos de Dogtown","Serenity","Yojimbo","La gran aventura de Pee-Wee","Los mejores años de nuestra vida","Hairspray","Arizona Baby","Cabeza borradora","Veredicto final","Luna nueva","El odio","Tres colores: rojo","La fuente de la vida","El salario del miedo","Un hombre para la eternidad","Boogie Nights","Delitos y faltas","Bienvenido Mr. Chance","El año que vivimos peligrosamente","Malas calles","El bazar de las sorpresas","Entre copas","Rocco y sus hermanos","Un día en Nueva York","Napoléon","Network (Un mundo implacable)","Pat Garrett y Billy The Kid","Un lugar en el sol","Pasión de los fuertes","El cuarto mandamiento","Que el cielo la juzgue","Vidas rebeldes","El invisible Harvey","Arthur, el soltero de oro","Los Tenenbaums. Una familia de genios","Amanecer","Mal gusto","Jóvenes prodigiosos","Una cara con ángel","Cuentos de Tokio","El reportero: la leyenda de Ron Burgundy","Las zapatillas rojas","Secretos y mentiras","Solaris","Crimen organizado","Breve encuentro","Huida a medianoche","Jules y Jim","El infierno del odio","El globo rojo","Empieza el espectáculo","La conversación","Ikiru","Las tres noches de Eva","La vida secreta de Walter Mitty","Lejos del cielo","Fitzcarraldo","Zelig","Avaricia","Un romance muy peligroso","Haz loque debas","El gran carnaval","Días del cielo","La caja de Pandora","Satanás","La regla del juego","El muelle de las brumas","Z.","Desmadre a la americana","Alarma en el expreso","Loquilandia","Celebración","Las vacaciones del señor Hulot","Un marido rico","Ghost World","Una partida de campo","El silencio de un hombre","Narciso Negro","Ocho sentencias de muerte","La batalla de Argel","Vida y muerte del Coronel Blimp","Spring in a Small Town","Al final de la escapada","Brighton Rock","Un cuento de Canterbury","A vida o muerte","Santa Sangre","Infielmente tuyo","El ejército de las sombras","Uno rojo, división de choque","El enigma de Kaspar Hauser","Suspiria","Caché","Asesino implacable","El reportero","Malas tierras","Noche de circo","La habitación del hijo","Sillas de montar calientes","Suspense","El rey de la comedia","La aventura","Betty Blue","A Man Escaped","Andrei Rublev","Ten","El último vals","Chantaje en Broadway","Carne","Election","This is Spinal Tap","La muerte del Sr. Lazarescu","El confidente","La doble vida de Verónica","Soy Cuba","El regreso","El círculo rojo","Masacre: ven y mira","El largo adiós","El pájaro de las plumas de cristal","Un tipo genial","El valle de los placeres","Impacto","El árbol de los zuecos","Escuela de jóvenes asesinos","El gran silencio","El arca rusa","Madre e hijo","Canciones del segundo piso","The Killer","Bugsy Malone","La mamá y la puta","Darling","The Addiction","Un asesino algo especial","Movida del 76","Academia Rushmore","Shampoo","Al azar de Baltasar","Heimat","El hombre de mimbre","Brick","2 días en París","En compañía de hombres","Topsy-Turvy","Dead Man’s Shoes","La piel en el asfalto","La última seducción","Juntos","Voces distantes","Los vividores","Killer of Sheep","Lone Star","Domingo, maldito domingo","Amenaza en la sombra","Harold and Maude","Éxito a cualquier precio","Danger: Diabolik","El intruso","Algo en común","Safe","Performance","Una mujer bajo la influencia","Withnail And I"];
  return strings[Math.floor(Math.random() * (strings.length))].toLowerCase();
}

var convertNewString = function(){
  var string = '';
  for (var i = 0; i < game.stringToKnow.length; i++) {
    if(game.stringToKnow[i] == ' ') {
      string += ' ';
    } else {
      string += '*';
    }
  }
  return string;
}

var getHint = function(){
  if (game.hints > 0) {
    for (var i = 0; i < game.stringKnown.length; i++) {
      if (game.stringKnown[i] !== game.stringToKnow[i]) {
        game.time -= 10;
        replaceString(i,game.stringToKnow[i]);
        game.hints -= 1;
        document.getElementById(game.stringToKnow[i]).click();
        break;
      }
    }
    if (game.hints === 0) {
      this.classList.add('off');
      game.alreadyClicked.push(this.getAttribute('id'));
    }
  }
}

var refreshHTML = function(){
  if (game.over) {
    if (game.isWin) {
      document.getElementById('final').innerHTML = 'Ganaste ' + (game.hints * 6 + game.fails * 6 + game.time) + ' puntos =D';
    } else {
      document.getElementById('final').innerHTML = 'Has perdido =(';
    }
  } else {
    document.getElementById('final').innerHTML = '';
  }
  localStorage.setItem('game',JSON.stringify(game));
  draw();
  document.getElementById('losts').innerHTML = game.losts;
  document.getElementById('wins').innerHTML = game.wins;
  document.getElementById('points').innerHTML = game.points;
  document.getElementById('hints').innerHTML = game.hints;
  document.getElementById('fails').innerHTML = game.fails;
  document.getElementById('time').innerHTML = game.time;
  document.getElementById('wordToKnow').innerHTML = game.stringKnown;
}

var gameOver = function(){
  game.over = true;
  if (game.isWin === null) {
    if (game.stringToKnow === game.stringKnown) {
      game.isWin = true;
      game.wins += 1;
      game.points += game.hints * 6 + game.fails * 6 + game.time;
    } else {
      game.isWin = false;
      game.losts += 1;
    }
  }
}

var timeDown = function(){
  game.timer = setTimeout(function(){
    if (!game.over) {
      game.time -= 1;
      if(game.fails === 0 || game.time <= 0){
        clearTimeout(game.timer);
        gameOver();
      } else {
        timeDown();
      }
    }
    refreshHTML();
  }, 1000);
}

var draw = function(){
  var c=document.getElementById('canvas');
  var ctx=c.getContext('2d');
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.moveTo(90,140);
  ctx.lineTo(200,140);
  ctx.moveTo(90,140);
  ctx.lineTo(90,20);
  ctx.lineTo(150,20);
  ctx.lineTo(150,40);
  if(game.fails < 5) {
    /*Head*/
    ctx.moveTo(150,40);
    ctx.arc(138,40,10,0,2*Math.PI);
    /*body*/
    ctx.moveTo(150,40);
    ctx.lineTo(150,90);
  }
  if(game.fails < 4) {
    /*left arm*/
    ctx.moveTo(150,40);
    ctx.lineTo(145,80);
  }
  if(game.fails < 3) {
    /*right arm*/
    ctx.moveTo(150,40);
    ctx.lineTo(155,80);
  }
  if(game.fails < 2) {
    /*left leg*/
    ctx.moveTo(145,120);
    ctx.lineTo(150,90);
  }
  if(game.fails < 1) {
    /*right leg*/
    ctx.moveTo(155,120);
    ctx.lineTo(150,90);
  }
  ctx.strokeStyle='#333333';
  ctx.stroke();
}

function checkKey(e){
  try {
    var keynum;
    if(window.event) {
      keynum = e.keyCode;
    } else if(e.which){
      keynum = e.which;
    }
    keynum = String.fromCharCode(keynum).toLowerCase();
    console.log(keynum);
    keynum === '1'?keynum='newGame':'';
    keynum === '2'?keynum='hint':'';
    keynum === '3'?keynum='changeLang':'';
    keynum === '0'?keynum='restart':'';
    document.getElementById(keynum).click();
  } catch (err) {
  }
}

function changeLang() {
  if (game.language === 'es_ES') {
    game.language = "en_EN";
  } else {
    game.language = "es_ES";
  }
  var lang = game.language;
  document.getElementById('pointsText').innerHTML = game.texts[lang].points;
  document.getElementById('lostsText').innerHTML = game.texts[lang].losts;
  document.getElementById('winsText').innerHTML = game.texts[lang].wins;
  document.getElementById('timeText').innerHTML = game.texts[lang].time;
  document.getElementById('attemptsText').innerHTML = game.texts[lang].attempts;
  document.getElementById('hintsText').innerHTML = game.texts[lang].hints;
  document.getElementById('hintText').innerHTML = game.texts[lang].hint;
  document.getElementById('changeLangText').innerHTML = game.texts[lang].changeLang;
  document.getElementById('newGameText').innerHTML = game.texts[lang].newGame;
  document.getElementById('youWinText').innerHTML = game.texts[lang].youWin;
  document.getElementById('youLostText').innerHTML = game.texts[lang].youLost;
}
document.onkeydown = checkKey;
newGame(false);