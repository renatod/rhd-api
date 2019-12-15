const { Repository } = require('../models')
const Sequelize = require('sequelize')

exports.findByPk = (pk) => {
    return Repository.findByPk(pk)
};

exports.findAll = async ({ lang, page = 1, per_page = 10 }) => {
    const params = {
        order: [
            ['stargazers', 'DESC']
        ],
        limit: per_page,
        offset: (page - 1) * per_page
    }

    if (lang) {
        params.where = {
            language: lang
        }
    }

    return Repository.findAndCountAll(params)
};