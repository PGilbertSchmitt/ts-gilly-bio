set -e

mongo <<EOF

use $MONGO_DATABASE
db.createUser({
  user: '$MONGO_INITDB_APP_USERNAME',
  pwd: '$MONGO_INITDB_APP_PASSWORD',
  roles: [ { role: 'readWrite', db: '$MONGO_DATABASE' } ]
})

EOF