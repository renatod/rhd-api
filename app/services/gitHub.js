const axios = require('axios')
const { Repository } = require('../models')

const requestGitHub = async ({ lang, page = 1, per_page = 10 }) => {   
    let items = []
    let total = 0
    
    try {
        const { data } = await axios.get(`https://api.github.com/search/repositories?q=language:${lang || ''}&page=${page}&per_page=${per_page}&sort=stars&order=desc`)
        items = data.items
        total = data.total_count
    } catch (err) {
        console.log(err)
    }

    return {
        items,
        total
    }
};

const importRepository = async (item) => {
    const model = await Repository.findOne({ where: { fullName: item.full_name }})
    if (model !== null) {
        return model
    }

    let license = null
    if (item.license) {
        license = item.license.spdx_id
    }

    return await Repository.create({
        fullName: item.full_name,
        description: item.description || '',
        license: license,
        language: item.language,
        stargazers: item.stargazers_count,
        forks: item.forks_count,
    })
};

exports.loadFromGitHub = async (params) => {
    const { items } = await requestGitHub(params)

    for (const item of items) {
        await importRepository(item)
    }
};