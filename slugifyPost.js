const slugify = str => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+/, '').replace(/-+$/, '') || 'untitled';

const getTitle = post => post.title ? post.title : post.headline;

module.exports = post => `/post/${post.id}-${slugify(getTitle(post))}`;