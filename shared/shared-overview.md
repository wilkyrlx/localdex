Overview of all shared assets

# config
config-writer writes to a .env file at any number of specified paths. It can be called using the config scripts `npm run config:dev` and `npm run config:prod`

Refer to the `.env.dummy` to look at the desired layout for .env files

# types
- Contact: contact type that extends ContactBase, used by react frontend and node.js backend. Can contain additional, non-specified fields (i.e. fields not defined in ContactBase)
- ContactBase: general contact type with specific fields