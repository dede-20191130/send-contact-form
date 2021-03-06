module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": ["prettier"],
    "rules": {
        "semi": "error",
        "prettier/prettier": [
            "error", {
                "semi": true,
                "tabWidth": 4,
            }
        ],
    }
};
