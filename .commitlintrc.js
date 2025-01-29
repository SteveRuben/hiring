module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nouvelles fonctionnalités
        'fix',      // Corrections de bugs
        'docs',     // Documentation
        'style',    // Changements de style (formatting, missing semi colons, etc)
        'refactor', // Refactoring du code
        'perf',     // Améliorations des performances
        'test',     // Ajout ou modification de tests
        'chore',    // Changements de configuration, tâches de build, etc
        'ci',       // Changements de CI
        'revert',   // Retour en arrière
      ],
    ],
  },
}; 