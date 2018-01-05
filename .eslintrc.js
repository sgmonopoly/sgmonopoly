module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": false
        },
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "rules": {
        "strict": 0,
        "linebreak-style": [
            "error",
            "unix"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": 0,
        "no-unused-vars": 0,
        "no-undef": 0,
        "no-case-declarations": 0,
        "no-extra-boolean-cast": 0
    }
};