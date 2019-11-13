function Client() {
    this.data = data;
}

Client.prototype.getInArrayById = function (arr, id) {
    let m = null;
    arr.some(e => {
        if(e.id == id) { m = e }
        return e.id == id;
    });
    return m;
}

Client.prototype.getConversationFromId = function (id) {
    return this.getInArrayById(this.data.conversation_list, id);
}
Client.prototype.getId = function() {
    return this.data.current_user_id;
}
Client.prototype.getUserWithId = function (id) {
    return this.getInArrayById(this.data.user_list, id);
}
Client.prototype.sendMessage = function(id, data) {
    let conv = this.getConversationFromId(id);
    if(conv != null) {
        conv.message_list.push(data);
        return true;
    }
    return false;
}

// Create mocked database
let lorem = "Lorem ipsum dolor sit amet consectetur " +
"adipisicing elit. Ipsam, sapiente quaerat perferendis " +
"nulla molestias praesentium qui molestiae itaque voluptatum " +
"maxime aut non cumque sunt consequatur, quos sit iste odio? Voluptas!";

let data = {
    current_user_id: '00000',
    conversation_list: [
        {   
            id: '00001',
            name: 'Bureau',
            member_id: ['00000','00001','00002','00003'],
            last_viewed_message_id: '00005',
            message_list: [
                {id: '00052', author: '00001', time: '17h20', content: 'Coucou'},
                {id: '00053', author: '00002', time: '17h20', content: 'Salut'},
                {id: '00054', author: '00000', time: '17h20', content: 'Hey !'},
                {id: '00055', author: '00002', time: '17h20', content: 'Ca va ?'},
                {id: '00056', author: '00002', time: '17h20', content: lorem},
                {id: '00062', content: 'Vendredi 30 Août 2019'},
                {id: '00057', author: '00000', time: '17h20', content: lorem},
                {id: '00058', author: '00001', time: '17h20', content: lorem},
                {id: '00059', author: '00000', time: '17h20', content: lorem},
                {id: '00060', author: '00002', time: '17h20', content: 'Bof'},
                {id: '00061', author: '00001', time: '17h20', content: 'Oui !'},
                {id: '00062', content: 'Samedi 31 Août 2019'},
                {id: '00063', author: '00002', time: '17h20', content: 'Salut'},
                {id: '00064', author: '00000', time: '17h20', content: 'Hey !'},
                {id: '00065', author: '00002', time: '17h20', content: 'Ca va ?'},
                {id: '00066', author: '00002', time: '17h20', content: lorem},
                {id: '00067', author: '00000', time: '17h20', content: lorem},
                {id: '00068', author: '00001', time: '17h20', content: lorem},
                {id: '00069', author: '00000', time: '17h20', content: lorem},
                {id: '00070', author: '00002', time: '17h20', content: 'Bof'},
                {id: '00081', author: '00001', time: '17h20', content: 'Oui !'},
            ]
        }, {
            id: '00002',
            name: 'CA',
            member_id: ['00000','00001','00002','00003','00004','00005'],
            last_viewed_message_id: '00060',
            message_list: [
                {id: '00052', author: '00001', time: '17h20', content: 'Coucou'},
                {id: '00053', author: '00002', time: '17h20', content: 'Salut'},
                {id: '00054', author: '00000', time: '17h20', content: 'Hey !'},
                {id: '00055', author: '00002', time: '17h20', content: 'Ca va ?'},
                {id: '00056', author: '00002', time: '17h20', content: lorem},
                {id: '00062', content: 'Vendredi 30 Août 2019'},
                {id: '00057', author: '00000', time: '17h20', content: lorem},
                {id: '00058', author: '00001', time: '17h20', content: lorem},
                {id: '00059', author: '00000', time: '17h20', content: lorem},
                {id: '00060', author: '00002', time: '17h20', content: 'Bof'},
                {id: '00061', author: '00001', time: '17h20', content: 'Oui !'},
                {id: '00062', content: 'Samedi 31 Août 2019'},
                {id: '00063', author: '00002', time: '17h20', content: 'Salut'},
                {id: '00064', author: '00000', time: '17h20', content: 'Hey !'},
                {id: '00065', author: '00002', time: '17h20', content: 'Ca va ?'},
                {id: '00066', author: '00002', time: '17h20', content: lorem},
                {id: '00067', author: '00000', time: '17h20', content: lorem},
                {id: '00068', author: '00001', time: '17h20', content: lorem},
                {id: '00069', author: '00000', time: '17h20', content: lorem},
                {id: '00070', author: '00002', time: '17h20', content: 'Bof'},
                {id: '00081', author: '00001', time: '17h20', content: 'Oui !'},
            ]
        }, {
            id: '00003',
            name: 'Baptiste',
            member_id: ['00000','00001','00002','00003','00004','00005'],
            last_viewed_message_id: '00001',
            message_list: [
                {id: '00052', author: '00001', time: '17h20', content: 'Coucou'},
                {id: '00053', author: '00002', time: '17h20', content: 'Salut'},
                {id: '00054', author: '00000', time: '17h20', content: 'Hey !'},
                {id: '00055', author: '00002', time: '17h20', content: 'Ca va ?'},
                {id: '00056', author: '00002', time: '17h20', content: lorem},
                {id: '00062', content: 'Vendredi 30 Août 2019'},
                {id: '00057', author: '00000', time: '17h20', content: lorem},
                {id: '00058', author: '00001', time: '17h20', content: lorem},
                {id: '00059', author: '00000', time: '17h20', content: lorem},
                {id: '00060', author: '00002', time: '17h20', content: 'Bof'},
                {id: '00061', author: '00001', time: '17h20', content: 'Oui !'},
                {id: '00062', content: 'Samedi 31 Août 2019'},
                {id: '00063', author: '00002', time: '17h20', content: 'Salut'},
                {id: '00064', author: '00000', time: '17h20', content: 'Hey !'},
                {id: '00065', author: '00002', time: '17h20', content: 'Ca va ?'},
                {id: '00066', author: '00002', time: '17h20', content: lorem},
                {id: '00067', author: '00000', time: '17h20', content: lorem},
                {id: '00068', author: '00001', time: '17h20', content: lorem},
                {id: '00069', author: '00000', time: '17h20', content: lorem},
                {id: '00070', author: '00002', time: '17h20', content: 'Bof'},
                {id: '00081', author: '00001', time: '17h20', content: 'Oui !'},
            ]
        }, {
            id: '00004',
            name: 'Adèle',
            member_id: ['00000','00007'],
            last_viewed_message_id: '00058',
            message_list: [
                {id: '00052', author: '00001', time: '17h20', content: 'Coucou'},
                {id: '00053', author: '00002', time: '17h20', content: 'Salut'},
                {id: '00054', author: '00000', time: '17h20', content: 'Hey !'},
                {id: '00055', author: '00002', time: '17h20', content: 'Ca va ?'},
                {id: '00056', author: '00002', time: '17h20', content: lorem},
                {id: '00062', content: 'Vendredi 30 Août 2019'},
                {id: '00057', author: '00000', time: '17h20', content: lorem},
                {id: '00058', author: '00001', time: '17h20', content: lorem},
                {id: '00059', author: '00000', time: '17h20', content: lorem},
                {id: '00060', author: '00002', time: '17h20', content: 'Bof'},
                {id: '00061', author: '00001', time: '17h20', content: 'Oui !'},
                {id: '00062', content: 'Samedi 31 Août 2019'},
                {id: '00063', author: '00002', time: '17h20', content: 'Salut'},
                {id: '00064', author: '00000', time: '17h20', content: 'Hey !'},
                {id: '00065', author: '00002', time: '17h20', content: 'Ca va ?'},
                {id: '00066', author: '00002', time: '17h20', content: lorem},
                {id: '00067', author: '00000', time: '17h20', content: lorem},
                {id: '00068', author: '00001', time: '17h20', content: lorem},
                {id: '00069', author: '00000', time: '17h20', content: lorem},
                {id: '00070', author: '00002', time: '17h20', content: 'Bof'},
                {id: '00081', author: '00001', time: '17h20', content: 'Oui !'},
            ]
        }
    ],
    user_list: [
        {id: '00000', name: 'Quentin', surname: 'Misslin'},
        {id: '00001', name: 'Baptiste', surname: 'Giroult'},
        {id: '00002', name: 'Théo', surname: 'Schmitt'},
        {id: '00003', name: 'Elodie', surname: 'Grasset'},
        {id: '00004', name: 'Yannick', surname: 'Czerw'},
        {id: '00005', name: 'Jeremy', surname: 'Grusser'},
        {id: '00006', name: 'Pauline', surname: 'Laurent'},
        {id: '00007', name: 'Adèle', surname: 'Jackemin'},
    ]
};