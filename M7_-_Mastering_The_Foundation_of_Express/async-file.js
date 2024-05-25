const fs = require('fs')

// reading text asynchronously

fs.readFile('./texts/read.txt', 'utf-8', (err, data) => {
    if(err){
        throw Error('Error Reading Text!!!')
    }
    console.log(data)

    fs.writeFile('./texts/read.txt', data, 'utf-8', (err) => {
        if(err){
            throw Error('Error writing data!!!')
        }
    })
})