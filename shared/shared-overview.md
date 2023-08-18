Overview of all shared assets

# config
config-writer writes to a JSON file located in the src directory of both the frontend and backend. The file is named config.json.

A ts file should be created like so to provide easier reference:
```ts
import configJSON from "../config.json"
const config = configJSON;
export default config;
```

# types
- Contact: contact type that extends ContactBase, used by react frontend and node.js backend. Can contain additional, non-specified fields (i.e. fields not defined in ContactBase)
- ContactBase: general contact type with specific fields