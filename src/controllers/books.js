import axios from 'axios';

const apiUrl = 'https://www.anapioficeandfire.com/api/books';

const Books = {
    async external(req, res) {
        try {
            const {data} = await axios.get(apiUrl);
            const { name } = req.query;
            const newData = data.map(({name, isbn, authors, numberOfPages:number_of_pages, publisher, country, released:release_date}) => {
                return {name, isbn, authors, number_of_pages, publisher, country, release_date}
            })
            if (!name) {
                return res.status(200).json({
                    status_code: 200,
                    status: 'success',
                    data: newData,
                });
            } 
            if (name){
                const nameData = newData.find(({name:itemName}) => itemName === name);
                if (nameData) {
                    return res.status(200).json({
                        status_code: 200,
                        status: 'success',
                        data: nameData,
                    });
                } return res.status(200).json({
                    status_code: 200,
                    status: 'success',
                    data: [],
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: (error.message),
            });
        }
        
    }
}

export default Books;