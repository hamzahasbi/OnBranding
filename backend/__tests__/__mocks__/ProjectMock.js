const validProject = {
    name: 'first blog',
    intro:
        'jskhdjskdjskhdjskdjskhdjskdjskhdjskdjskhdjskdjskhdjskdjskhdjskdjskhdjskdjskhdjskdjskhdjskdjskhdjskdjskhdjskdjskhdjskdjskhdjskdjskhdjskdjskhdjskdjskhdjskd',
    link: 'https://www.youtube.com/watch?v=YgFyi74DVjc',
    thumbnail: 'https://www.youtube.com/watch?v=YgFyi74DVjc',
};

const invalidProject = {
    name: 'first blog',
    intro: 'jskhdjskdjskhdjskd',
    link: 'https://www.youtube.com/watch?v=YgFyi74DVjc',
    thumbnail: 'https://www.youtube.com/watch?v=YgFyi74DVjc',
};

const qs = {
    limit: 1,
    sort: 'updated_at',
    offset: 1,
};
module.exports = {
    validProject,
    invalidProject,
    qs,
};
