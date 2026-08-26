const { publicationUri } = require('../sequoia.json')

// at://did:plc:xxx/collection/rkey → did:plc:xxx
const did = publicationUri.split('/')[2]

module.exports = {
  did,
  publicationUri
}
