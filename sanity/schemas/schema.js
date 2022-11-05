// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

import schemaTypes from 'all:part:@sanity/base/schema-type';

import dish from './dish';
import category from './category';
import restaurant from './restaurant';
import featured from './featured';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([restaurant, featured, category, dish]),
});
