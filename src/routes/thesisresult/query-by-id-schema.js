const S = require('fluent-schema');

const bodyJsonSchema = S.object()
    .prop('id', S.oneOf([S.string(), S.number()]));

module.exports = {
  params: bodyJsonSchema,
};