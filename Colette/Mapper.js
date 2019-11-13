let Mapper = {

    // Find all data with a value
    findDataBy : (table, label, value) => {
        let l = table.labels;
        let i = Object.keys(l).indexOf(label);
        
        if(i < 0) return null;
        
        let res = table.data
            .filter(e => e[i] == value)
            .map(e => (table.suffix).concat(e));
        res.labels = table.labels;
        return res;
    },

    // Test if word is complete in string
    isCompleteWord : (str, word) => {
        str = " " + str + " ";
        let pos = str.indexOf(word);
        let c_bef = str[pos - 1];
        let c_aft = str[pos + word.length];
        let sep = [" ", "-", "'"];

        return (sep.indexOf(c_bef) >= 0 && sep.indexOf(c_aft) >= 0);
    },

    // Find all data included in sentence
    matchDataBy : (table, label, sentence, matched) => {
        let l = table.labels;
        let i = Object.keys(l).indexOf(label);
        let res;
        
        if(i < 0) {
            console.error("Invalid label in matchDataBy : " + label);
            return null;
        }

        do {
            let max_size = 0;

            // Get all match
            res = table.data

                // Match
                .filter(e => sentence.includes(e[i]) && Mapper.isCompleteWord(sentence, e[i]))

                // Get max size match
                .map(e => { max_size = Math.max(e[i].length, max_size); return e})

                // Filter only match
                .filter(e => e[i].length == max_size); 
            
            // Select only one match and group element with same occurence
            if(res.length > 0) {
                
                // Create blanck with same size of word
                let space  = res[0][i].split('').map(c => " ").join('');

                // Get position of word in sentence
                let position = sentence.indexOf(res[0][i]); 
                
                // Replace word by blanck in sentence
                sentence = sentence.replace(res[0][i], space);

                // Select only same occurence
                res = res.filter(e => e[i] === res[0][i]);

                // Save data match
                matched.push({
                    position: position,
                    label_index : i,
                    table: table,
                    data: res,
                });
            }

        } while (res.length > 0);

        // Sort result
        matched = matched.sort((a, b) => 
            (a.position < b.position) ? -1 : 
            (a.position > b.position) ? 1 : 0
        );

        // Keep rest of not matched sentence
        matched.rest = sentence;
        return matched;
    },

    // Find data in sentence    
    findData : (sentence) => {
        let res = [];
        res.rest = sentence;

        res = Mapper.matchDataBy(DATA_FRENCH_TERRITORY, "region", res.rest, res);
        res = Mapper.matchDataBy(DATA_FRENCH_TERRITORY, "departement", res.rest, res);
        res = Mapper.matchDataBy(DATA_FRENCH_NAMES, "name", res.rest, res);
        res = Mapper.matchDataBy(DATA_FRENCH_WORDS, "spell", res.rest, res);
        res = Mapper.matchDataBy(DATA_WORLD_CITIES, "city", res.rest, res);
        res = Mapper.matchDataBy(DATA_WORLD_CITIES, "country", res.rest, res);
        res = Mapper.matchDataBy(DATA_WORLD_CITIES, "continent", res.rest, res);
        res = Mapper.matchDataBy(DATA_FRENCH_CITIES, "name", res.rest, res);

        return res;
    },

    // Adding some style on message before write it on page
    stylize : (msg) => {
        let arr = Mapper.findData(msg);
        let d_position = 0;

        // Loop on all group
        arr.forEach(word => {

            // Get position of word in sentence
            let position = word.position + d_position;
            
            // Get real word str
            let word_str = word.data[0][word.label_index];
            
            // Check type of word
            let prefix = "";
            let suffix = "";

            switch(word.table.id) {
                case "LIEU_FRANCE_VILLE" :
                case "LIEU_FRANCE_TERRITOIRE" :
                case "LIEU_MONDE" :
                    prefix = "<span class='localisation'>";
                    suffix = "</span>";
                    break;
                    
                case "NOM_FR" :
                    prefix = "<span class='people'>";
                    suffix = "</span>";
                    break;
            }

            // Add style around special word
            let insertInStr = (s, p, w) => s.substring(0, p) + w + s.substring(p);
                            
            msg = insertInStr(msg, position, prefix);
            msg = insertInStr(msg, position + word_str.length + prefix.length, suffix);

            d_position += prefix.length + suffix.length;
        });

        return msg;
    }
}