import axios from 'axios';

//https://datausa.io/api/data?measures=Population

async function getPopulation({ drilldowns, measures }) {

   
    const urlGetPopulation = `https://datausa.io/api/data?drilldowns=Nation&measures=Population`;
    try {
        let result = []
        let resonsePopulations = await axios.get(urlGetPopulation)
        resonsePopulations.data.data.forEach(function (item) {
            let myObject = {};
            myObject.nationId = item['ID Nation']
            myObject.year = item['Year']
            myObject.population = item['Population']
            result.push(myObject)

        })
        return result

    } catch (error ){
        throw error
    }
        
    
}
    


export default {
    getPopulation
}