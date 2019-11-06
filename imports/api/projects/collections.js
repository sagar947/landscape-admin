import { Mongo } from 'meteor/mongo';

const Projects = new Mongo.Collection('projects');

Projects.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

export default Projects
