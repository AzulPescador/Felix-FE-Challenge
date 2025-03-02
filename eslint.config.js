import eslintConfigPrettier from 'eslint-config-prettier';
export default [eslintConfigPrettier, {
    ignores: ["eslint.config.cjs", "*.json","babel.config.cjs","vite.config.ts"],
}];
