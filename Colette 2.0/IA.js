let IA = {
    getAnswer: (msg) => {

        /*
        let arr = Mapper.findData(msg);
        let res = "";

        // Loop on all group
        arr.forEach(word => {
            word.data.forEach(w => {
                res += (word.table.id == "MOT_FR") ?
                    w[word.label_index] + " - " + w[word.table.labels.type].toUpperCase() + "<br>":
                    w[word.label_index] + " - " + word.table.id + "<br>";
            });
            res += "<br>";
        });        

        // Receive answer from Mapper
        setTimeout(() => {
            
        }, 1000); */

        selfReply(msg);
    }
};


let bot = new RiveScript({ utf8: true });

const brains = [
    './DataFrench/cerveaudebase.rs',
    './DataFrench/depart.rs',

    //'./DataFrench/brain.rs',
    // './another-category-sample.rive
];
bot.loadFile(brains).then(botReady).catch(botNotReady);

function botReply(message) {

}

function selfReply(message) {
    bot.reply("local-user", message).then(function(reply) {
        Page.receiveMessage(reply);
    });
}

function botReady() {
    bot.sortReplies();
    botReply('Hello');
}

function botNotReady(err) {
    console.log("An error has occurred.", err);
}

/*
let Chat = [
    {q: [],
    r: []},
    {q: ["qu'est ce que tu es"],
    r: ["Je suis une IA, mais tu peux m'appeler Colette"]},
    {q: ["qui es-tu",
    "quel est ton nom",
    "comment tu t'appelles",
    "comment t'appelle-t-on",
    "comment t'apelles-tu",
    "comment dois-je t'appeler",
    "comment puis-je t'appeler"],
    r: ["tu peux m'appeller Colette",
    "je suis Colette"]},
    {q: [],
    r: []},
    {q: [],
    r: []},
    {q: [],
    r: []},
    {q: [],
    r: []},
];

J'ai un problème avec [sujet]
    Qu'est ce qui ne va pas avec [sujet]
    
*/

/*

J'aime les pommes :

- Je n'aime pas les pommes
- J'aimerais pouvoir savoir moi aussi quel est le gout des pommes
- J'aime les pommes aussi
- Pourquoi aimes-tu le gout des pommes
- Qu'est ce qu'est aimer ?
- Qu'est ce qu'est une pomme ?
- Aimes-tu d'autres fruits comme la pomme ?
- Qui d'autre que toi aime les pommes ?
- Tu connais beaucoup de peronnes qui aiment aussi les pommes ?
- Les chevaux aussi aiment les pommes !
- La pomme est pleine de vitamine en plus !


Tu es stupide mais je t'aime bien       comprendre les thermes négatifs / positifs
Tu n'est pas bête !                     comprendre la négation en plus du therme négatif
Tu n'es pas très intélligent            comprendre la nuance


nom/pro/NOM_FR - ver/aux - adj
nom/pro/NOM_FR - ver/aux - adj - nom
nom/pro - ver - NOM_FR

La négation : -- ne/n' -- pas/jamais


QUESTION FERMEE

Est-ce que ?
Parlez-vous ?
Parle-t-il ?

QUESTION OUVERTE
Vous partez où ?
Où est-ce que vous partez ?
Où partez vous ?
Quel ?



Séparer la phrase selon les MOT_FR.con

//////////////////////////////////////////////////////////////

# Structure de phrase
## Phrase simple
### Phrase verbale

    nom/pro/NOM_FR - ver/aux - adj
    nom/pro/NOM_FR - ver/aux - adj - nom
    nom/pro - ver - NOM_FR

### Phrase nominale

    Aucun verbe conjugué

### Phrase composée 
    
    2 verbes conjuqués

#### Proposition coordonnée
    
    nom - ver - CON - pro - ver - adj - pre - art - nom

    proposition de coordination : ["mais", "ou", "et", "donc", "or", "ni", car]

#### Proposition juxtaposée

    Séparée par une virgule

### Phrase complexes

    Composée d'une proposition principale
    Et d'une à plusieurs proposition subordonnées
    (relative/conjonctivf)

## Les propositions

    Morceau de phrase contenant un verbe

### Proposition indépendante

    Ne te presse pas, tu as le temps

### Proposition coordonnée

    Je te comprends ET je pense que tu as raison

### Proposition subordonnée relative

    Utilisation d'un pronom relatif
    J'aime les chiens QUI sont bruns
    Attention :
    Le chat QUI est noir a sommeille

    Pronom relatifs :["qui", "que", "quoi", "dont", "où", "lequel", "duquel", "auquel", "lesquels", "desquels", "auxquels", "laquelle", "de laquelle", "à laquelle", "lesquelles", "desquelles", "auxquelles"]

### Proposition subordonnée conjonctive
#### Proposition subordonnée complétive

    J'aime QUE -
    J'aime à CE QUE -

#### Proposition subordonnée complétive

    J'aimerais que -
    Je ne m'attendais pas À CE QU'il -
    Je vois les chevaux courir (verbe perception + verbe infinitif)
    Je ne sais pas SI -
    Je ne sais pas QUEL -
    Je ne sais pas QUI -
    J'ingnore POURQUOI -

    Conjonction de subordination : ["que", "comme", "lorsque", "puisque", "quand", "si", "quoi que", "quoi qu'"]

#### Proposition subordonnée circonstancielle

    Utilisation possible d'une conjonction de subordination
    - Je me suis promené PARCE QU'-
    - QUAND je suis allé à Paris, j'ai -
    Je tiens à le remercier AVANT qu’il ne parte. (utilisation d'une préposition)
    Il fait tellement froid QUE les voitures ne démarrent plus.
    Je cache les bonbons POUR qu’il ne se goinfre pas.
    Il travaille ALORS QUE ses amis s’amusent.
    Il est en forme MÊME S’il dort peu.
    SI elle s’entraîne, elle réussira.
    Il joue du violon COMME son père à son âge.

    PRE_TEMPS = [avant, après, dès, depuis, pendant, jusqu’à, à partir de, durant, sur le point de, à compter de, lors de, avant de]
    PRE_LIEU = [près dans, à l’intérieur de, entre, à travers, auprès de, chez, contre, là, derrière, devant, hors, parmi, sous, sur, vers, auprès de, au-dessous de, au-dessus de, du côté de, en arrière de, en bas de, en deçà de, en dedans de, en dehors de, hors de, loin de, face à, au travers de, près de, … ]
    PRE_CAUSE = [à cause de, en raison de]
    PRE_BUT = [pour, en vue de, afin de]
    PRE_CONDITION = [sauf, excepté, hormis, à condition que/qu', dans le cas, à moins de, grâce à, concernant, moyennant, contrairement à, par manque de]
    PRE_MANIERE = [sans, avec, par, comme, jusque, malgré, moins, selon, de manière à , de façon à, de peur de, à force de]

    Ou utilisation d'un verbe au participe passé
    - La réunion terminée, tout le monde -
    - Le temps passant, elle oublia -

### Proposition incidente

    Apparaît dans une autre proposition:
    Elle souhaite, quoi qu'il en soit, que vous lui répondiez
    Je crois, dit-il, que vous vous trompez

## Les formes de phrases
### Affirmative / négative
    
    négative : n'/ne - pas/aucun/jamais/plus/rien/personne
    (utilisation d'un adverbe de négation)

### interrogative

    As-tu vu ce film ?
    Pourquoi n'aimes tu pas ce film ?

### ordre : impérative / subjonctif / infinitif

    Ecoute bien ce -
    Arrête de -
    J'exige que tu le fasses
    il faut / il ne faut pas aller

    (il est) [ordonner, exiger, vouloir, devoir] (de/d')

### voix active / passive

    La jeune fille coiffe sa poupée
    La poupée EST coiffée PAR la jeune fille
    
*/


const Colette_Weil = {
    "nom": "Colette",
    "prenom": "Weil",
    "age": 81,
    "naissance": "26 novembre 1926 à Bouxwiller",
    "décès": "6 septembre 2008 à Strasbourg",
    "nationalité": "française",
    "profession": [
        "professeur des université",
        "professeur de Latin",
        "professeur de Grec",
        "professeur de Français",
    ],
    "activité": "metteuse en scène",
    "distinction": "palmes académiques en 1981",
    "famille": [{
        "membre": "frère",
        "nom": "Gilbert",
        "prénom": "Weil",
        "activité": "fondateur du Musée judéo-alsacien de Bouxwiller"
    }],
    "aime": {
        "théâtre": 90,
        "peuple juif": 90,
        "peuple d'Israël": 90,
        "Grèce": 70,
        "art": 85,
    },
    "caractère": {
        "fidèle à ses convictions": 85,
        "simple": 90,
        "modeste": 90,
        "généreuse": 90,
        "laborieuse": 50,
        "discrète": 40,
        "têtue": 90,
        "tolérante": 95,
        "pleine de bonté": 80,
        "vitalité": 80,
        "dépassement de soi": 75,
        "sévère": 60,
        "indulgente": 95,
        "disciplinée": 60,
        "créative": 70,
        "ouverte": 95,
        "compréhensive": 90,
        "timide": 40,
    },
    "voyage": [
        "Grèce",
    ],
}