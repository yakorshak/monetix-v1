'use strcit'

/* 
general:project_id:3254
general:payment_id:id_38202316
customer:id:585741
customer:email:johndoe@mycompany.com
customer:first_name:John
customer:last_name:Doe
customer:address:Downing str., 23
customer:identify:doc_number:54122312544
customer:ip_address:111.222.333.444
payment:amount:10800
payment:currency:USD
payment:description:Computer keyboards
*/

const json = `{
    "general": {
        "project_id": 3254,
        "payment_id": "id_38202316"
    },
    "customer": {
        "id": "585741",
        "email": "johndoe@mycompany.com",
        "first_name": "John",
        "last_name": "Doe",
        "address": "Downing str., 23",
        "identify": {
            "doc_number": "54122312544"
        },
        "ip_address": "111.222.333.444"
    },
    "payment": {
        "amount": 10800,
        "currency": "USD",
        "description": "Computer keyboards"
    }
}`

let parsedJson = JSON.parse(json); //обьект с вложенными обьектами

function isObject(obj) {
    if (obj === null) { return false;}
    return ( (typeof obj === 'function') || (typeof obj === 'object') );
}

function transformationAlgoritm(globalObject){
    let arr = [];
    for (let key in globalObject) { //  на 1 итерации это ключ general c значениям в виде обьекта
        let innerObject = globalObject[key]; // innerObject = project_id, payment_id
        let stringOFValues = key + ':';

        for ( let innerKey in innerObject){
            let innerObject1 = innerObject[innerKey];
            stringOFValues += innerKey + ':';
            if(isObject(innerObject1)){

                for (let innerKey1 in innerObject1){
                    let innerObject2 = innerObject1[innerKey1];
                    stringOFValues += innerKey1 + ':';
                    try{
                        if(isObject(innerObject2)){
                            throw(alert('Нужно обработать еще один вложенный обьект'));
                        } else {
                            stringOFValues += innerObject2;
                            arr.push(stringOFValues);
                            stringOFValues = (key + ':');
                        }
                    } catch(error){
                        alert(error);
                    }
                }          
            } else {
                stringOFValues += innerObject1;
                arr.push(stringOFValues);
                stringOFValues = (key + ':');
            }
        }
    }
    return arr;
}

let result = transformationAlgoritm(parsedJson);

console.log(result);
