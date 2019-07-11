let IA = {

    
    findData : (w) => {
        let french_word = DATA_FRENCH_WORDS.filter(d_word => d_word[0] == w);
        let french_name = DATA_FRENCH_NAMES
            .filter(d_name => d_name[0] == w)
            .map(i => [i[0], i[0], "PERS", i[1], "s"]);

        return french_word.concat(french_name);
    },

    splitMessage : (msg) => {
        let last_c = null;
        let split = [];
        let word = "";

        let insertWord = (w) => {
            if(w != "") {
                split.push(w);
                word = "";
                last_c = null;
            }
        }

        msg.split('').forEach(c => {
            console.log("C= " + c);
            switch(c) {
                case ' ': insertWord(word); break;
                case '-': insertWord(word); break;
                case '\'': insertWord(word+'\''); break;
                default:
                    word += c;
            }
        });

        insertWord(word);

        return split;
    },

    getAnswer : (msg) => {

        let arr = IA.splitMessage(msg);
        console.log(arr);
        res = "";
        arr.forEach(w => {
            w_res = IA.findData(w);
            console.log("Result for [" + w + "] : ", w_res);
            if(w_res != null && w_res.length > 0) {
                w_res.forEach(w_res_p => res += w_res_p + "<br>");
            }
        });

        return res;
    }
}