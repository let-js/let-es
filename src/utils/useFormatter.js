export default function useFormatter(source, formatter, Domain) {
    if (_.isArray(source)) {
        return _.map(source, (item) => _getFormatEntity(item, formatter, Domain))
    }
    const entity = _getFormatEntity(source, formatter, Domain)
    return entity
}
  
function _getFormatEntity(source, formatter, Domain) {
    let formatEntity
    formatEntity = _.assign({}, source)
    _.forOwn(formatter, (value, key) => {
      formatEntity[key] = _.isFunction(value) ? value(source) : value
    })
    return Domain ? new Domain(formatEntity) : formatEntity
}