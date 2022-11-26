const uuid = require('uuid');
const path = require('path');

const {Slider} = require('../models/models');

const _transformSlider = (slider) => {
    return {
        id: slider.id,
        title: slider.title,
        photo: slider.photo
    }
};


class SliderController {
    async create(req, res) {
        try {
            let {title} = req.body;
            const {photo} = req.files;
            let fileName = uuid.v4() + ".jpg";

            photo.mv(path.resolve(__dirname, '..', 'static', fileName));

            const candicate = await Slider.findOne({where: {title}});
            if (candicate) {
                return res.status(400).json({message: 'Такая слайд уже существует!'});
            } 

            const slider = await Slider.create({title, photo: fileName});            
            return res.json(_transformSlider(slider));

        } catch(err) { 
            res.status(400).json(err.message);
        }
    }

    async getAll(req, res) {
        try {
            const sliders = await Slider.findAll();
            return res.json(sliders.map(slider => _transformSlider(slider)));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;
            const slider = await Slider.findOne({where: {id}});
            return res.json(_transformSlider(slider));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Slider.destroy({where: {id}});
            return res.json('Slide was deleted');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {title} = req.body;
            const {photo} = req.files;
            let fileName = uuid.v4() + ".jpg";

            photo.mv(path.resolve(__dirname, '..', 'static', fileName));

            await Slider.update({title, photo: fileName}, {where: {id}});
            return res.json('Slide was updated');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new SliderController();