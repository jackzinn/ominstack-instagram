const Post = require('../models/Post');
const sharp =  require('sharp');
const path =  require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');
        // sort irá ordenar pelo mais recent
        return res.json(posts);
    },

    async store(req, res){
        
        const { author, place, description, hashstag } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;


        await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .png({ quality: 70 })
        .toFile(
            path.resolve(req.file.destination, 'resized', image)
        )

        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashstag,
            image: fileName,
        });

        req.io.emit('post', post);


        return res.json(post);
    }

};