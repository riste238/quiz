class Data {
    constructor(url) {
        this.url = url;
    }

    getData() {
       
        return new Promise((resolve) => {
            let xml = new XMLHttpRequest();
            xml.open('GET', this.url);
            xml.onreadystatechange = function () {
                if(xml.readyState === 4 && xml.status === 200){
                resolve(JSON.parse(xml.responseText));
            }
        }
            xml.send();
        });
    }

    selectCategory(cat){
          return this.getData().then(questions => {
              let filtered;
              if (cat !== 'all') {
             filtered = questions.filter(elements =>  elements.category === cat);
              }
              else {
                  filtered = questions;
              }
             return filtered;
           
           })

    }
}


let data = new Data('https://raw.githubusercontent.com/riste238/json_data/main/data.json');
