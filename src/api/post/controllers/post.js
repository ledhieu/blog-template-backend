'use strict';

/**
 *  post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::post.post');

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
    async findOne(ctx) {
        const { slug } = ctx.params;
        const { query } = ctx;
        console.log(query);
        console.log(ctx.request)
        const entity = await strapi.db.query('api::post.post').findOne({
            select: ['*'],
            where: {
                $and: [ 
                    { 
                        slug: slug 
                    },
                    query
                ]
            },
            populate: {
                cover: true,
                author: {
                    select: 'username',
                    populate: ['avatar']
                }
            }
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
    }
}));
