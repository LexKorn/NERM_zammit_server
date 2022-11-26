const {Contacts} = require('../models/models');

const _transformContacts = (contacts) => {
    return {
        id: contacts.id,
        phone: contacts.phone,
        address: contacts.address,
        link: contacts.link
    }
};


class ContactsController {
    async create(req, res) {
        try {
            let {phone, address, link} = req.body;

            const contacts = await Contacts.create({phone, address, link});            
            return res.json(_transformContacts(contacts));

        } catch(err) { 
            res.status(400).json(err.message);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;
            const contacts = await Contacts.findOne({where: {id}});
            return res.json(_transformContacts(contacts));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {phone, address, link} = req.body;

            await Contacts.update({phone, address, link}, {where: {id}});
            return res.json('Contacts was updated');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new ContactsController();