const validProfile = {
    company: 'VOID',
    websites: 'https://dev.to/,https://dev.to/',
    status: 'Full time',
    skills: '600c47e4d607a31011481b96, 600c47e4d607a31011481b97',
    bio:
        'I\'m a Lead software Engineer and a competitive programming addict . I love discovering new technologies and learning about new trendy stuffs .',
    interest: 'Full time',
    profiltags: 'op,gg,ana',
};

const invalidProfile = {
    company: 'VOID',
    websites: 'https://dev.to/,https://dev.to/',
    status: 'Full time',
    bio:
        'I\'m a Lead software Engineer and a competitive programming addict . I love discovering new technologies and learning about new trendy stuffs .',
    interest: 'Full time',
    profiltags: 'op,gg,ana',
};

const qs = {
    limit: 1,
    sort: 'updated_at',
    offset: 1,
};

module.exports = {
    validProfile,
    invalidProfile,
    qs,
};
