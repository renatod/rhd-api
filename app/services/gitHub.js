const axios = require('axios');
const { Repository } = require('../models');

const importRepository = async (item) => {
    const repository = await Repository.findOne({ where: { fullName: item.full_name }, raw: true })
    if (repository !== null) {
        return repository
    }

    let license = null;
    if (item.license) {
        license = item.license.spdx_id
    }

    return await Repository.create({
        fullName: item.full_name,
        description: item.description,
        license: license,
        language: item.language,
        stargazers: item.stargazers_count,
        forks: item.forks_count,
    });
}

exports.importFromGitHub = async ({ languages, page = 1, per_page = 10 }) => {
    const langs = []
    languages.forEach(d => {
        langs.push(`language:${d}`)
    })

    const { data } = await axios.get(`https://api.github.com/search/repositories?q=${langs.join('+')}&page=${page}&per_page=${per_page}&sort=stars&order=desc`);
    const { items, total_count } = data;
    
    const repositories = []
    for (const item of items) {
        const repository = await importRepository(item)
        repositories.push(repository)
    }

    return {
        count: total_count,
        rows: repositories
    }
}
